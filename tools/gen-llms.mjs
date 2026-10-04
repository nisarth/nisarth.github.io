// Generates llms.txt from the built site.
//
// Run automatically by `npm run build`, after `astro build`.
//
// The hand-written prose lives in tools/llms-intro.md so it stays editable.
// Everything below it is derived, because the previous hand-maintained version
// listed 16 URLs and not one of the 55 articles, which are the most
// substantial content on the domain and the most likely to be cited. It also
// kept pointing at location pages for a while after they were deleted.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const BASE = 'https://nisarth.github.io';
const root = process.cwd();
const dist = join(root, 'dist');
const pub = join(root, 'public');

if (!existsSync(dist)) {
  console.error('gen-llms: dist/ not found. Run astro build first.');
  process.exit(1);
}

const intro = readFileSync(join(root, 'tools', 'llms-intro.md'), 'utf8').trimEnd();

const read = (rel) => readFileSync(join(dist, rel), 'utf8');
const titleOf = (html) =>
  (html.match(/<title>([\s\S]*?)<\/title>/) || ['', ''])[1]
    .replace(/\s*\|\s*Nisarth Patel\s*$/, '')
    .replace(/&amp;/g, '&')
    .trim();
const descOf = (html) =>
  (html.match(/<meta name="description"\s*content="([\s\S]*?)"/) || ['', ''])[1]
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const lines = [intro, ''];

// Core pages, in reading order rather than alphabetical.
const core = [
  ['Home', '/index.html', '/'],
  ['About', '/about.html', '/about.html'],
  ['Resume', '/resume.html', '/resume.html'],
  ['Services', '/services.html', '/services.html'],
  ['Work', '/work.html', '/work.html'],
  ['Process', '/process.html', '/process.html'],
  ['Contact', '/contact.html', '/contact.html'],
  ['Blog', '/blog.html', '/blog.html'],
];
lines.push('## Main pages', '');
for (const [label, file, url] of core) {
  if (existsSync(join(dist, file.replace(/^\//, '')))) {
    lines.push(`- ${label}: ${BASE}${url}`);
  }
}
lines.push('');

// Service pages, with their own descriptions so a model does not have to fetch
// each one to know what it covers.
const serviceFiles = readdirSync(join(dist, 'services')).filter((f) => f.endsWith('.html'));
if (serviceFiles.length) {
  lines.push('## Service pages', '');
  for (const f of serviceFiles.sort()) {
    const html = read(join('services', f));
    lines.push(`- ${titleOf(html)}: ${BASE}/services/${f}`);
    lines.push(`  ${descOf(html)}`);
  }
  lines.push('');
}

// Topic guides and reference pages. Listed only if they were built, so this
// section cannot point at a page that does not exist.
const guideFiles = [
  'guides.html',
  ...(existsSync(join(dist, 'guides'))
    ? readdirSync(join(dist, 'guides'))
        .filter((f) => f.endsWith('.html'))
        .sort()
        .map((f) => `guides/${f}`)
    : []),
  'glossary.html',
  'seo-audit-checklist.html',
  'aeo-checklist.html',
  'geo-checklist.html',
].filter((f) => existsSync(join(dist, f)));
if (guideFiles.length) {
  lines.push('## Guides and reference', '');
  for (const f of guideFiles) {
    const html = read(f);
    lines.push(`- ${titleOf(html)}: ${BASE}/${f}`);
    lines.push(`  ${descOf(html)}`);
  }
  lines.push('');
}

// Articles, grouped by the category page each belongs to.
const catDir = join(dist, 'blog', 'category');
if (existsSync(catDir)) {
  lines.push('## Articles', '');
  lines.push(
    'Written from client work. Grouped by topic, newest first within each group.',
    ''
  );
  for (const cf of readdirSync(catDir).filter((f) => f.endsWith('.html')).sort()) {
    const catHtml = read(join('blog', 'category', cf));
    const slugs = [
      ...new Set(
        [...catHtml.matchAll(/href="\/blog\/([a-z0-9-]+)\.html"/g)].map((m) => m[1])
      ),
    ];
    if (!slugs.length) continue;
    lines.push(`### ${titleOf(catHtml)}`);
    lines.push(`${BASE}/blog/category/${cf}`, '');
    for (const slug of slugs) {
      const html = read(join('blog', `${slug}.html`));
      lines.push(`- ${titleOf(html)}: ${BASE}/blog/${slug}.html`);
    }
    lines.push('');
  }
}

const out = lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';

// A running dev server watches public/, so retry a transient lock rather than
// failing the build.
function writeWithRetry(target, contents, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    try {
      writeFileSync(target, contents);
      return;
    } catch (err) {
      if (i === attempts - 1) throw err;
      const until = Date.now() + 120;
      while (Date.now() < until) { /* brief backoff */ }
    }
  }
}

writeWithRetry(join(pub, 'llms.txt'), out);
writeWithRetry(join(dist, 'llms.txt'), out);

const urls = (out.match(/https:\/\/nisarth\.github\.io\S*/g) || []).length;
console.log(`gen-llms: ${urls} URLs written`);
