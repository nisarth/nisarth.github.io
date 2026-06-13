// Generates the social preview image (1200x630).
// Writes a PNG for the new site and a JPG at the legacy path the old blog uses.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0b0c0e"/>
  <rect x="0" y="0" width="1200" height="10" fill="#c8ff4d"/>
  <circle cx="1040" cy="150" r="220" fill="#15171a"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <rect x="80" y="120" width="92" height="92" rx="18" fill="#c8ff4d"/>
    <text x="126" y="184" font-size="48" font-weight="700" fill="#0b0c0e" text-anchor="middle">NP</text>
    <text x="80" y="360" font-size="92" font-weight="700" fill="#f3f4f6">Nisarth Patel</text>
    <text x="80" y="430" font-size="40" font-weight="500" fill="#c8ff4d">Digital Growth Specialist</text>
    <text x="80" y="492" font-size="30" font-weight="400" fill="#a6acb5">SEO, AEO, GEO, and AI automation</text>
    <text x="80" y="556" font-size="26" font-weight="400" fill="#a6acb5">nisarth.github.io</text>
  </g>
</svg>`;

const root = process.cwd();
const png = join(root, 'public', 'og-image.png');
const jpgDir = join(root, 'public', 'assets', 'images');
mkdirSync(jpgDir, { recursive: true });
const jpg = join(jpgDir, 'og-image.jpg');

const buf = Buffer.from(svg);
await sharp(buf).png().toFile(png);
await sharp(buf).jpeg({ quality: 86 }).toFile(jpg);
console.log('Wrote', png, 'and', jpg);
