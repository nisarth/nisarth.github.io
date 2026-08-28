// One-time migration: reads the legacy hand-written blog in public/blog/ and
// emits an Astro content collection in src/content/blog/.
//
// Run with: node tools/migrate-blog.mjs [--dry]
//
// Front matter goes to YAML. The article body is preserved as HTML inside the
// Markdown file rather than converted, so no wording can shift during the
// move. Bodies are dedented because Markdown would otherwise read the original
// 16-space indentation as code blocks.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DRY = process.argv.includes('--dry');
const root = process.cwd();
const srcDir = join(root, 'public', 'blog');
const outDir = join(root, 'src', 'content', 'blog');

const pick = (re, html, group = 1) => {
  const m = html.match(re);
  return m ? m[group].trim() : '';
};

// Collapse HTML entities that appear in extracted attribute text.
// Numeric entities are decoded first, since the emoji thumbnails are written
// as &#x2696; and similar.
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&middot;/g, '.')
    .replace(/&nbsp;/g, ' ');

function jsonLdBlocks(html) {
  const out = [];
  for (const m of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  )) {
    try {
      out.push(JSON.parse(m[1]));
    } catch {
      /* a malformed block is reported by the caller via missing fields */
    }
  }
  return out;
}

function findNode(blocks, type) {
  for (const b of blocks) {
    for (const node of [].concat(b['@graph'] || b)) {
      if (node && node['@type'] === type) return node;
    }
  }
  return null;
}

// The legacy pages hang the speakable spec directly off Article, and give
// cssSelector as a bare string rather than a list.
function speakableOf(article) {
  const spec = article?.speakable;
  if (!spec) return [];
  return [].concat(spec.cssSelector || spec.xpath || []);
}

// Category page membership is the authoritative post-to-category mapping,
// because the visible tag on a post ("Performance", "SaaS") does not always
// match the category page it is filed under.
function categoryIndex(dir) {
  const map = new Map();
  const meta = new Map();
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.html'))) {
    const cslug = file.replace(/\.html$/, '');
    const html = readFileSync(join(dir, file), 'utf8');
    meta.set(cslug, {
      title: decode(pick(/<title>([\s\S]*?)<\/title>/, html)).replace(
        /\s*\|\s*Nisarth Patel\s*$/, ''),
      description: decode(
        pick(/<meta name="description"\s*content="([\s\S]*?)">/, html)),
      heading: decode(pick(/<h1[^>]*>([\s\S]*?)<\/h1>/, html)).replace(/<[^>]+>/g, '').trim(),
    });
    for (const m of html.matchAll(/href="\.\.\/([a-z0-9-]+)\.html"/g)) {
      if (m[1] !== 'index') map.set(m[1], cslug);
    }
  }
  return { map, meta };
}

// Strip leading whitespace from every line. Removing only the shared indent is
// not enough: Markdown reads any line indented four or more spaces as a code
// block, which turned the nested FAQ markup into visible literal text. These
// bodies contain no <pre>, and the only <code> is inline, so no meaningful
// whitespace is lost.
function dedent(html) {
  return html
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trimStart())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Legacy pages use relative links because they sit one directory deep.
// The rebuilt site serves everything from the root.
function absolutiseLinks(html) {
  return html
    .replace(/href="\.\.\/blog\//g, 'href="/blog/')
    .replace(/href="\.\.\/blog\.html"/g, 'href="/blog.html"')
    .replace(/href="\.\.\/([a-z0-9-]+\.html)"/g, 'href="/$1"')
    .replace(/href="\.\.\/"/g, 'href="/"');
}

function yamlString(s) {
  return "'" + String(s).replace(/'/g, "''") + "'";
}

function yamlList(items, indent = '  ') {
  if (!items.length) return ' []';
  return '\n' + items.map((i) => `${indent}- ${yamlString(i)}`).join('\n');
}

// The index page carries a hand-written excerpt and an emoji thumbnail per
// post that appear nowhere else, so lift them here rather than lose them.
function indexCards(file) {
  const html = readFileSync(file, 'utf8');
  const cards = new Map();
  for (const m of html.matchAll(
    /<article class="blog-card"[\s\S]*?<\/article>/g
  )) {
    const card = m[0];
    const slug = (card.match(/href="blog\/([a-z0-9-]+)\.html"/) || [])[1];
    if (!slug) continue;
    cards.set(slug, {
      emoji: decode((card.match(/aria-hidden="true">([^<]+)<\/div>/) || [])[1] || ''),
      excerpt: decode((card.match(/class="blog-card-excerpt">([\s\S]*?)<\/p>/) || [])[1] || ''),
    });
  }
  return cards;
}

const cards = indexCards(join(root, 'public', 'blog.html'));
const { map: catOf, meta: catMeta } = categoryIndex(join(srcDir, 'category'));
const files = readdirSync(srcDir).filter((f) => f.endsWith('.html'));
const report = [];

for (const file of files) {
  const slug = file.replace(/\.html$/, '');
  const html = readFileSync(join(srcDir, file), 'utf8');
  const blocks = jsonLdBlocks(html);
  const article = findNode(blocks, 'Article');
  const faqPage = findNode(blocks, 'FAQPage');
  const webPage = findNode(blocks, 'WebPage');

  const rawTitle = decode(pick(/<title>([\s\S]*?)<\/title>/, html));
  const title = rawTitle.replace(/\s*\|\s*Nisarth Patel\s*$/, '');
  const description = decode(
    pick(/<meta name="description"\s*\n?\s*content="([\s\S]*?)">/, html)
  );
  const h1 = decode(pick(/<h1 class="text-h1 section-heading"[\s\S]*?>([\s\S]*?)<\/h1>/, html));
  const category = decode(pick(/<span class="tag tag-accent">([\s\S]*?)<\/span>/, html));
  const displayDate = decode(pick(/<div class="article-meta"[\s\S]*?<span>([^<]+)<\/span>/, html));
  const readingTime = decode(pick(/<span>(\d+ min read)<\/span>/, html));

  const published = (article?.datePublished || '').slice(0, 10);
  const modified = (article?.dateModified || published).slice(0, 10);

  const faqs = (faqPage?.mainEntity || []).map((q) => ({
    q: decode(String(q.name || '')),
    a: decode(String(q.acceptedAnswer?.text || '')),
  }));

  const speakable = speakableOf(article);

  // Related posts, taken from the legacy "related" section links.
  const relatedSection = pick(
    /<section class="article-related"[\s\S]*?>([\s\S]*?)<\/section>/,
    html
  );
  const related = [
    ...new Set(
      [...relatedSection.matchAll(/href="\.\.\/blog\/([a-z0-9-]+)\.html"/g)].map((m) => m[1])
    ),
  ].filter((s) => s !== slug);

  // Table of contents, from the h2 anchors the legacy pages already carry.
  const bodyMatch = html.match(
    /<div class="article-body prose">([\s\S]*?)\n\s*<\/div>\s*<\/div>\s*<\/article>/
  );
  if (!bodyMatch) {
    report.push({ slug, error: 'body not found' });
    continue;
  }
  let body = absolutiseLinks(dedent(bodyMatch[1]));

  const toc = [...body.matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: decode(m[2].replace(/<[^>]+>/g, '').trim()),
  }));

  const missing = [];
  for (const [k, v] of Object.entries({
    title, description, h1, category, published, readingTime, displayDate,
  })) {
    if (!v) missing.push(k);
  }
  if (!faqs.length) missing.push('faqs');
  if (!toc.length) missing.push('toc');
  if (!speakable.length) missing.push('speakable');
  if (!catOf.get(slug)) missing.push('categorySlug');
  if (related.length !== 3) missing.push(`related=${related.length}`);
  if (!cards.get(slug)?.excerpt) missing.push('excerpt');
  if (!cards.get(slug)?.emoji) missing.push('emoji');

  report.push({
    slug, title, description, h1, category, categorySlug: catOf.get(slug) || '',
    published, modified,
    readingTime, displayDate,
    faqCount: faqs.length, tocCount: toc.length, relatedCount: related.length,
    speakableCount: speakable.length,
    bodyChars: body.length, missing,
  });

  if (DRY) continue;

  const fm = [
    '---',
    `title: ${yamlString(title)}`,
    `description: ${yamlString(description)}`,
    `heading: ${yamlString(h1)}`,
    `category: ${yamlString(category)}`,
    `categorySlug: ${yamlString(catOf.get(slug) || '')}`,
    `published: ${published}`,
    `modified: ${modified}`,
    `readingTime: ${yamlString(readingTime)}`,
    `excerpt: ${yamlString(cards.get(slug)?.excerpt || description)}`,
    `emoji: ${yamlString(cards.get(slug)?.emoji || '')}`,
    `displayDate: ${yamlString(displayDate)}`,
    `related:${yamlList(related)}`,
    `speakable:${yamlList(speakable)}`,
    'toc:',
    ...toc.flatMap((t) => [`  - id: ${yamlString(t.id)}`, `    text: ${yamlString(t.text)}`]),
    'faqs:',
    ...faqs.flatMap((f) => [`  - q: ${yamlString(f.q)}`, `    a: ${yamlString(f.a)}`]),
    '---',
    '',
    body,
    '',
  ].join('\n');

  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `${slug}.md`), fm);
}

const broken = report.filter((r) => r.error || (r.missing && r.missing.length));
console.log(`posts processed: ${report.length}`);
console.log(`posts with missing fields: ${broken.length}`);
for (const b of broken.slice(0, 12)) {
  console.log('  ', b.slug, b.error || b.missing.join(','));
}
const sum = (k) => report.reduce((a, r) => a + (r[k] || 0), 0);
console.log(
  `totals: faqs=${sum('faqCount')} toc=${sum('tocCount')} related=${sum('relatedCount')} speakable=${sum('speakableCount')}`
);
console.log('categories:', [...new Set(report.map((r) => r.category))].join(', '));
const bySlug = {};
for (const r of report) bySlug[r.categorySlug] = (bySlug[r.categorySlug] || 0) + 1;
console.log('category pages:', JSON.stringify(bySlug));
if (!DRY) {
  writeFileSync(
    join(root, 'src', 'data', 'blog-categories.json'),
    JSON.stringify([...catMeta.entries()].map(([slug, m]) => ({ slug, ...m })), null, 2) + '\n'
  );
  console.log('wrote src/data/blog-categories.json');
}
if (DRY) console.log('\n(dry run, nothing written)');
