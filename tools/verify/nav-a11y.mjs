import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:4321';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
await page.goto(BASE + '/', { waitUntil: 'networkidle' });

const navLink = page.locator('#primary-nav a.nav-link').first();
const toggle = page.locator('.nav-toggle');

// 1. Closed panel must be out of the accessibility tree / tab order.
const hiddenWhenClosed = await navLink.isVisible();
console.log('closed: nav link visible to a11y/tab order =', hiddenWhenClosed, hiddenWhenClosed ? 'FAIL' : 'PASS');

// 2. Tabbing from the top must never land inside the closed panel.
await page.keyboard.press('Tab'); // skip link
let landedInNav = false;
for (let i = 0; i < 12; i++) {
  await page.keyboard.press('Tab');
  const inNav = await page.evaluate(() =>
    !!document.activeElement?.closest('#primary-nav'));
  if (inNav) { landedInNav = true; break; }
}
console.log('closed: keyboard reached a hidden nav link =', landedInNav, landedInNav ? 'FAIL' : 'PASS');

// 3. Open it.
await toggle.click();
await page.waitForTimeout(350);
const openVisible = await navLink.isVisible();
const expanded = await toggle.getAttribute('aria-expanded');
const locked = await page.evaluate(() => document.body.classList.contains('nav-open'));
console.log('open: nav link visible =', openVisible, openVisible ? 'PASS' : 'FAIL');
console.log('open: aria-expanded =', expanded, expanded === 'true' ? 'PASS' : 'FAIL');
console.log('open: body scroll locked =', locked, locked ? 'PASS' : 'FAIL');

// 4. Escape closes and returns focus to the toggle.
await page.keyboard.press('Escape');
await page.waitForTimeout(350);
const afterEsc = await toggle.getAttribute('aria-expanded');
const focusOnToggle = await page.evaluate(() =>
  document.activeElement?.classList.contains('nav-toggle'));
const unlocked = await page.evaluate(() => !document.body.classList.contains('nav-open'));
console.log('escape: aria-expanded =', afterEsc, afterEsc === 'false' ? 'PASS' : 'FAIL');
console.log('escape: focus returned to toggle =', focusOnToggle, focusOnToggle ? 'PASS' : 'FAIL');
console.log('escape: scroll unlocked =', unlocked, unlocked ? 'PASS' : 'FAIL');

// 5. Desktop must be unaffected.
await page.setViewportSize({ width: 1440, height: 900 });
await page.reload({ waitUntil: 'networkidle' });
const desktopVisible = await navLink.isVisible();
console.log('desktop: nav link visible =', desktopVisible, desktopVisible ? 'PASS' : 'FAIL');

await browser.close();
