// Generates the PWA and browser icons from one brand definition.
// Run with: node tools/gen-icons.mjs
// Output is committed, so this only needs running when the brand changes.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ACCENT = '#2f4bff';
const INK = '#ffffff';
const pub = join(process.cwd(), 'public');
mkdirSync(join(pub, 'icons'), { recursive: true });

// Standard icon: rounded accent tile with white initials, matching .brand-mark.
const tile = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="14" fill="${ACCENT}"/>
  <text x="32" y="43" font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="27" fill="${INK}" text-anchor="middle" letter-spacing="-1">NP</text>
</svg>`;

// Maskable icon: full bleed accent, initials kept inside the 80% safe zone so
// Android can crop it to any shape without clipping the letters.
const maskable = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" fill="${ACCENT}"/>
  <text x="32" y="40" font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="21" fill="${INK}" text-anchor="middle" letter-spacing="-1">NP</text>
</svg>`;

const jobs = [
  ['icons/favicon-32.png', tile(32), 32],
  ['icons/icon-192.png', tile(192), 192],
  ['icons/icon-512.png', tile(512), 512],
  ['icons/icon-maskable-512.png', maskable(512), 512],
  ['apple-touch-icon.png', tile(180), 180],
];

for (const [out, svg, size] of jobs) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(pub, out));
  console.log('wrote public/' + out);
}
