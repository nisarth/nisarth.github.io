// Loads the built pages in a real browser and fails on any Content Security
// Policy violation. A CSP that silently blocks analytics, the map, or a form
// is worse than no CSP, so this has to run against dist, not the dev server.
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://127.0.0.1:4322';
const pages = [
  '/',
  '/contact.html',
  '/about.html',
  '/blog.html',
  '/blog/aeo-vs-seo.html',
  '/blog/category/seo.html',
  '/services/seo.html',
];

const browser = await chromium.launch();
let violations = 0;

for (const path of pages) {
  const page = await browser.newPage();
  const hits = [];
  page.on('console', (m) => {
    const t = m.text();
    if (/Content Security Policy|Refused to/i.test(t)) hits.push(t);
  });
  page.on('pageerror', (e) => hits.push('pageerror: ' + e.message));

  await page.goto(BASE + path, { waitUntil: 'networkidle' });

  // Exercise the inline scripts the CSP has to allow by hash.
  if (path === '/') {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.locator('.nav-toggle').click();
    await page.waitForTimeout(150);
  }
  if (path === '/contact.html') {
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(150);
    // Click-to-load map facade must be able to insert the Google iframe.
    await page.locator('.map-facade').click();
    await page.waitForTimeout(600);
    const frame = await page.locator('iframe').count();
    if (frame === 0) hits.push('map iframe did not load');
  }
  if (path === '/blog.html') {
    await page.fill('#blog-search', 'automation');
    await page.waitForTimeout(200);
    const shown = await page.locator('.post-card:visible').count();
    if (shown === 0 || shown === 55) hits.push(`blog search filter broken (${shown} shown)`);
  }

  // Accepting consent must actually be able to load the GA script.
  await page.evaluate(() => localStorage.setItem('analytics-consent', 'allow'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  if (hits.length) {
    violations += hits.length;
    console.log(`FAIL ${path}`);
    [...new Set(hits)].slice(0, 4).forEach((h) => console.log('       ' + h.slice(0, 160)));
  } else {
    console.log(`PASS ${path}`);
  }
  await page.close();
}

await browser.close();
console.log(violations === 0 ? '\nNo CSP violations.' : `\n${violations} violation(s).`);
process.exit(violations === 0 ? 0 : 1);
