// Generates sitemap.xml from the pages Astro actually built.
//
// The previous version kept its own hardcoded copies of the service and city
// slugs, duplicating src/data/services.ts and src/data/cities.ts, and was never
// run by the build. Reading dist/ instead means the sitemap cannot drift: if a
// page exists it is listed, and if it does not it is not.
//
// Run automatically by `npm run build`, after `astro build`.
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const BASE = 'https://nisarth.github.io';
const root = process.cwd();
const dist = join(root, 'dist');
const pub = join(root, 'public');

if (!existsSync(dist)) {
  console.error('gen-sitemap: dist/ not found. Run astro build first.');
  process.exit(1);
}

// Pages that must never appear in a sitemap.
const EXCLUDE = new Set(['/404.html', '/googleb25ad6b4a5435852.html']);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

// Last commit date for a file, falling back to its mtime for anything not yet
// committed. Returns YYYY-MM-DD.
const gitDateCache = new Map();
function lastChanged(file) {
  if (gitDateCache.has(file)) return gitDateCache.get(file);
  let date;
  try {
    date = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    date = '';
  }
  if (!date && existsSync(file)) date = statSync(file).mtime.toISOString().slice(0, 10);
  gitDateCache.set(file, date);
  return date;
}

const newest = (...dates) => dates.filter(Boolean).sort().pop();

// Which source files decide a given URL's content.
const DATA = [join(root, 'src/data/services.ts'), join(root, 'src/data/cities.ts')];
const LAYOUT = [
  join(root, 'src/layouts/BaseLayout.astro'),
  join(root, 'src/components/Seo.astro'),
];

function sourcesFor(url) {
  const p = join(root, 'src', 'pages');
  if (url === '/') return [join(p, 'index.astro')];
  if (/^\/services\/[^/]+\/[^/]+\.html$/.test(url))
    return [join(p, 'services', '[service]', '[city].astro'), ...DATA];
  if (/^\/services\/[^/]+\.html$/.test(url))
    return [join(p, 'services', '[service].astro'), ...DATA];
  if (/^\/locations\/[^/]+\.html$/.test(url))
    return [join(p, 'locations', '[city].astro'), ...DATA];
  if (url === '/locations.html') return [join(p, 'locations', 'index.astro'), ...DATA];
  return [join(p, url.replace(/^\//, '').replace(/\.html$/, '') + '.astro')];
}

// Legacy blog pages carry their own dates in JSON-LD. Trust those.
function schemaDate(html) {
  const mod = html.match(/"dateModified"\s*:\s*"([^"]+)"/);
  const pub = html.match(/"datePublished"\s*:\s*"([^"]+)"/);
  return ((mod && mod[1]) || (pub && pub[1]) || '').slice(0, 10);
}

function priorityFor(url) {
  if (url === '/') return '1.0';
  if (url === '/services.html') return '0.9';
  if (/^\/services\/[^/]+\.html$/.test(url)) return '0.8';
  if (url === '/about.html' || url === '/work.html') return '0.8';
  if (/^\/services\/[^/]+\/[^/]+\.html$/.test(url)) return '0.6';
  if (/^\/blog\/category\//.test(url)) return '0.5';
  if (/^\/blog\//.test(url)) return '0.6';
  return '0.7';
}

function freqFor(url) {
  if (url === '/' || url === '/blog.html') return 'weekly';
  if (url === '/contact.html') return 'yearly';
  return 'monthly';
}

const urls = [];
let skippedNoindex = 0;

for (const file of walk(dist).sort()) {
  const url = '/' + relative(dist, file).split(sep).join('/');
  const clean = url === '/index.html' ? '/' : url;
  if (EXCLUDE.has(url)) continue;

  const html = readFileSync(file, 'utf8');
  // Never advertise a page that tells crawlers not to index it.
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) {
    skippedNoindex++;
    continue;
  }

  const lastmod =
    schemaDate(html) || newest(...sourcesFor(clean).map(lastChanged), ...LAYOUT.map(lastChanged));

  urls.push({ loc: BASE + clean, lastmod, freq: freqFor(clean), pr: priorityFor(clean) });
}

urls.sort((a, b) => (a.loc === BASE + '/' ? -1 : b.loc === BASE + '/' ? 1 : a.loc.localeCompare(b.loc)));

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((u) =>
    [
      '  <url>',
      `    <loc>${u.loc}</loc>`,
      `    <lastmod>${u.lastmod}</lastmod>`,
      `    <changefreq>${u.freq}</changefreq>`,
      `    <priority>${u.pr}</priority>`,
      '  </url>',
    ].join('\n')
  ),
  '</urlset>',
  '',
].join('\n');

// A running dev server watches public/ and can briefly hold the file open on
// Windows, so retry rather than failing the whole build on a transient lock.
function writeWithRetry(target, contents, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    try {
      writeFileSync(target, contents);
      return true;
    } catch (err) {
      if (i === attempts - 1) throw err;
      const until = Date.now() + 120;
      while (Date.now() < until) { /* brief backoff */ }
    }
  }
  return false;
}

// public/ is the committed source of truth, dist/ is what gets deployed.
writeWithRetry(join(pub, 'sitemap.xml'), xml);
writeWithRetry(join(dist, 'sitemap.xml'), xml);
console.log(`gen-sitemap: ${urls.length} URLs written (${skippedNoindex} noindex pages skipped)`);
