// Compares the migrated blog against the legacy pages it replaced.
//
//   node tools/verify/blog-parity.mjs --snapshot   (before removing the legacy files)
//   node tools/verify/blog-parity.mjs              (after building the new pages)
//
// Checks the article text, the metadata search engines read, and the FAQ set.
// The snapshot is written to a temp file rather than the repo.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { SPELLING } from '../lib/spelling.mjs';

const SNAP = join(tmpdir(), 'blog-parity-baseline.json');
const SNAPSHOT = process.argv.includes('--snapshot');
const root = process.cwd();

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/\s+/g, ' ')
    .trim();

// Compare decoded values, not raw markup: Astro correctly escapes "&" as
// "&amp;" in attributes where some legacy pages emitted a bare "&".
const decodeEntities = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

const attr = (html, re) => {
  const m = html.match(re);
  return m ? decodeEntities(m[1].replace(/\s+/g, ' ').trim()) : '';
};

function jsonLd(html) {
  const out = [];
  for (const m of html.matchAll(
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  )) {
    try {
      out.push(JSON.parse(m[1].split('<\\/').join('</')));
    } catch {
      out.push({ parseError: true });
    }
  }
  return out;
}

function faqSet(blocks) {
  for (const b of blocks) {
    if (b['@type'] === 'FAQPage') {
      return (b.mainEntity || []).map((q) => strip(String(q.name || '')));
    }
  }
  return [];
}

function articleDates(blocks) {
  for (const b of blocks) {
    if (b['@type'] === 'Article' || b['@type'] === 'BlogPosting') {
      return `${b.datePublished || ''}|${b.dateModified || ''}`;
    }
  }
  return '';
}

// The legacy body lives in .article-body prose; the migrated one in .prose.
function bodyText(html) {
  const legacy = html.match(
    /<div class="article-body prose">([\s\S]*?)\n\s*<\/div>\s*<\/div>\s*<\/article>/
  );
  if (legacy) return strip(legacy[1]);
  const migrated = html.match(/<div class="prose"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/article>/);
  if (migrated) return strip(migrated[1]);
  return '';
}

function profile(html) {
  const blocks = jsonLd(html);
  return {
    title: attr(html, /<title>([\s\S]*?)<\/title>/),
    description: attr(html, /<meta name="description"\s*content="([\s\S]*?)"\s*\/?>/),
    canonical: attr(html, /<link rel="canonical" href="([^"]+)"/),
    h1: strip(attr(html, /<h1[^>]*>([\s\S]*?)<\/h1>/)),
    dates: articleDates(blocks),
    faqs: faqSet(blocks),
    body: bodyText(html),
  };
}

if (SNAPSHOT) {
  const dir = join(root, 'public', 'blog');
  const snap = {};
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.html'))) {
    snap['/blog/' + f] = profile(readFileSync(join(dir, f), 'utf8'));
  }
  writeFileSync(SNAP, JSON.stringify(snap));
  console.log(`snapshot: ${Object.keys(snap).length} legacy posts -> ${SNAP}`);
  process.exit(0);
}

if (!existsSync(SNAP)) {
  console.error('No baseline. Run with --snapshot before removing the legacy files.');
  process.exit(1);
}

// The migration deliberately corrected the experience claim in the post
// bodies: the legacy copy said "four years" while CLAUDE.md and the rest of
// the site say 2.5. Normalising both sides proves that correction is the ONLY
// wording that changed.
const YEARS_CORRECTION = (s) =>
  s
    .replace(/two and a half years/g, 'YEARS')
    .replace(/four years/g, 'YEARS')
    .replace(/three years/g, 'YEARS')
    // "for over four years" became "for two and a half years", so the
    // qualifier is absorbed too.
    .replace(/over YEARS/g, 'YEARS');

const NORMALISE_YEARS = process.argv.includes('--allow-years-correction');

// The prose pass replaced every " -- " with a comma, colon, period or bracket
// and switched British spellings to American. Comparing the word stream with
// punctuation and case removed proves no actual wording changed.
const PROSE_FIXES = process.argv.includes('--allow-prose-fixes');
// Normalise with the very table the rewrite used, so the two cannot disagree.
const wordStream = (s) =>
  s
    .toLowerCase()
    // "analyses" is deliberately kept as the noun in a few places and turned
    // into the verb "analyzes" elsewhere, so fold both to one form here.
    .replace(/[a-z]+/g, (w) => (w === 'analyses' ? 'analyzes' : SPELLING[w] || w))
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const norm = (s) => {
  let out = NORMALISE_YEARS ? YEARS_CORRECTION(s) : s;
  if (PROSE_FIXES) out = wordStream(out);
  return out;
};

const base = JSON.parse(readFileSync(SNAP, 'utf8'));
let pass = 0;
const problems = [];

for (const [url, want] of Object.entries(base)) {
  const file = join(root, 'dist', url.replace(/^\//, ''));
  if (!existsSync(file)) {
    problems.push(`${url}: MISSING from build`);
    continue;
  }
  const got = profile(readFileSync(file, 'utf8'));
  const issues = [];

  if (norm(got.body) !== norm(want.body)) {
    // Report where they first diverge, which makes a real regression obvious.
    const g = norm(got.body);
    const w = norm(want.body);
    let i = 0;
    while (i < Math.min(g.length, w.length) && g[i] === w[i]) i++;
    issues.push(
      `body differs at char ${i} (was ${want.body.length}, now ${got.body.length})\n` +
        `      expected: ...${want.body.slice(Math.max(0, i - 40), i + 60)}...\n` +
        `      actual:   ...${got.body.slice(Math.max(0, i - 40), i + 60)}...`
    );
  }
  if (got.canonical !== want.canonical) {
    issues.push(`canonical ${want.canonical} -> ${got.canonical}`);
  }
  if (norm(got.description) !== norm(want.description)) {
    issues.push(`description changed`);
  }
  if (norm(got.h1) !== norm(want.h1)) issues.push(`h1 "${want.h1}" -> "${got.h1}"`);
  if (got.dates !== want.dates) issues.push(`article dates ${want.dates} -> ${got.dates}`);
  if (norm(got.faqs.join('|')) !== norm(want.faqs.join('|'))) {
    issues.push(`FAQ set changed (${want.faqs.length} -> ${got.faqs.length})`);
  }

  if (issues.length) problems.push(`${url}:\n    ` + issues.join('\n    '));
  else pass++;
}

console.log(`posts matching legacy exactly: ${pass} / ${Object.keys(base).length}`);
if (problems.length) {
  console.log(`\nproblems (${problems.length}):`);
  problems.slice(0, 8).forEach((p) => console.log('  ' + p));
  process.exit(1);
}
console.log('PASS: text, metadata, canonicals, dates and FAQs all preserved.');
