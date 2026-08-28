import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://127.0.0.1:4322';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(BASE + '/contact.html', { waitUntil: 'networkidle' });

const ok = (label, cond) => console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}`);

// The redirect target must be set, or formsubmit keeps the visitor off site.
const next = await page.locator('input[name="_next"]').getAttribute('value');
ok(`_next points at the thank-you page (${next})`, next === 'https://nisarth.github.io/thank-you.html');

// Submitting empty must be blocked, announced, and focused.
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(150);
ok('stayed on the contact page', page.url().includes('/contact'));
const nameErr = await page.locator('#name-error').textContent();
ok(`name error is announced ("${nameErr}")`, (nameErr || '').length > 0);
ok('invalid field is marked aria-invalid',
  (await page.locator('#name').getAttribute('aria-invalid')) === 'true');
ok('focus moved to the first bad field',
  await page.evaluate(() => document.activeElement?.id === 'name'));

// A bad email must be caught by type, not just by emptiness.
await page.fill('#name', 'Test Person');
await page.fill('#email', 'not-an-email');
await page.fill('#message', 'Hello');
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(150);
const emailErr = await page.locator('#email-error').textContent();
ok(`bad email is caught ("${emailErr}")`, (emailErr || '').includes('valid email'));

// Correcting it must clear the error live.
await page.fill('#email', 'real@example.com');
await page.waitForTimeout(150);
ok('error clears once corrected',
  (await page.locator('#email-error').textContent()) === '');

// Focus ring must survive on form controls.
await page.locator('#name').focus();
const outline = await page.evaluate(() => {
  const el = document.getElementById('name');
  return el ? getComputedStyle(el).outlineWidth : '';
});
ok(`focus ring present on inputs (outline ${outline})`, outline !== '0px' && outline !== '');

await browser.close();
