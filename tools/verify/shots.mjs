import { chromium } from 'playwright';
const BASE = 'http://127.0.0.1:4321';
const OUT = process.argv[2] || 'shots';
const browser = await chromium.launch();
const shots = [
  ['home-desktop', '/', 1440, 900],
  ['home-mobile', '/', 390, 844],
  ['contact-desktop', '/contact.html', 1440, 900],
  ['thankyou-desktop', '/thank-you.html', 1440, 900],
];
for (const [name, path, w, h] of shots) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
  await page.close();
  console.log('captured', name);
}
await browser.close();
