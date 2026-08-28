// Measures the internal link graph between the marketing pages and the blog,
// and fails on any internal link that points at a page that does not exist.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const dist = join(process.cwd(), 'dist');
function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const f = join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (e.name.endsWith('.html')) out.push(f);
  }
  return out;
}

const files = walk(dist);
const isBlog = (u) => u.startsWith('/blog/') && !u.startsWith('/blog/category/');
const isMarketing = (u) =>
  u === '/' || u.startsWith('/services') || u.startsWith('/locations') ||
  ['/about.html', '/work.html', '/process.html', '/contact.html'].includes(u);

let marketingPages = 0, marketingLinkingToBlog = 0, blogPosts = 0, blogLinkingToService = 0;
const broken = [];
const inbound = new Map();

for (const file of files) {
  const url = '/' + relative(dist, file).split(sep).join('/');
  const clean = url === '/index.html' ? '/' : url;
  const html = readFileSync(file, 'utf8');
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]);

  for (const h of hrefs) {
    const target = h === '/' ? '/index.html' : h;
    if (!/\.[a-z0-9]+$/i.test(target)) continue;
    if (!existsSync(join(dist, target.replace(/^\//, '')))) {
      broken.push(`${clean} -> ${h}`);
    }
    inbound.set(h, (inbound.get(h) || 0) + 1);
  }

  if (isMarketing(clean)) {
    marketingPages++;
    if (hrefs.some(isBlog)) marketingLinkingToBlog++;
  }
  if (isBlog(clean)) {
    blogPosts++;
    // Either a specific service page, or the services hub for the topics that
    // have no service page of their own.
    if (hrefs.some((h) => h === '/services.html' || /^\/services\/[a-z0-9-]+\.html$/.test(h)))
      blogLinkingToService++;
  }
}

console.log(`marketing pages linking to at least one article: ${marketingLinkingToBlog} / ${marketingPages}`);
console.log(`articles linking to a service page: ${blogLinkingToService} / ${blogPosts}`);

const orphanPosts = files
  .map((f) => '/' + relative(dist, f).split(sep).join('/'))
  .filter(isBlog)
  .filter((u) => (inbound.get(u) || 0) === 0);
console.log(`articles with zero inbound internal links: ${orphanPosts.length}`);
orphanPosts.slice(0, 5).forEach((u) => console.log('  ' + u));

console.log(`broken internal links: ${broken.length}`);
broken.slice(0, 10).forEach((b) => console.log('  ' + b));
process.exit(broken.length === 0 ? 0 : 1);
