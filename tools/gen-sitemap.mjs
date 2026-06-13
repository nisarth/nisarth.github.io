// Generates public/sitemap.xml covering the new core pages plus every preserved
// blog and category URL. Blog lastmod is read from each post's existing JSON-LD.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = 'https://nisarth.github.io';
const TODAY = '2026-06-13';
const pub = join(process.cwd(), 'public');

const core = [
  { loc: '/', pr: '1.0', freq: 'weekly' },
  { loc: '/services.html', pr: '0.9', freq: 'monthly' },
  { loc: '/work.html', pr: '0.8', freq: 'monthly' },
  { loc: '/about.html', pr: '0.8', freq: 'monthly' },
  { loc: '/process.html', pr: '0.7', freq: 'monthly' },
  { loc: '/contact.html', pr: '0.7', freq: 'yearly' },
  { loc: '/blog.html', pr: '0.6', freq: 'weekly' },
];

function lastmodOf(file) {
  const html = readFileSync(file, 'utf8');
  const mod = html.match(/"dateModified"\s*:\s*"([^"]+)"/);
  const pub = html.match(/"datePublished"\s*:\s*"([^"]+)"/);
  return (mod && mod[1]) || (pub && pub[1]) || TODAY;
}

const urls = [];
for (const c of core) {
  urls.push({ loc: BASE + c.loc, lastmod: TODAY, freq: c.freq, pr: c.pr });
}

// Blog posts
for (const f of readdirSync(join(pub, 'blog')).filter((f) => f.endsWith('.html'))) {
  const file = join(pub, 'blog', f);
  urls.push({ loc: `${BASE}/blog/${f}`, lastmod: lastmodOf(file), freq: 'monthly', pr: '0.6' });
}

// Category pages
for (const f of readdirSync(join(pub, 'blog', 'category')).filter((f) => f.endsWith('.html'))) {
  urls.push({ loc: `${BASE}/blog/category/${f}`, lastmod: TODAY, freq: 'monthly', pr: '0.5' });
}

const body = urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pr}</priority>\n  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
writeFileSync(join(pub, 'sitemap.xml'), xml);
console.log('Wrote sitemap with', urls.length, 'URLs');
