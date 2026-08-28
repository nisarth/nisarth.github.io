// Generates the social preview image (1200x630) and the stable portrait URL
// used by Person schema.
//
// Run with: npm run gen:og
// Output is committed, so this only needs running when the brand or photo
// changes.
import sharp from 'sharp';
import { join } from 'node:path';

const root = process.cwd();
const source = join(root, 'src', 'assets', 'nisarth.jpg');

const BG = '#0b0c0e';
const PANEL = '#15171a';
const ACCENT = '#c8ff4d';
const TEXT = '#f3f4f6';
const MUTED = '#a6acb5';

const W = 1200;
const H = 630;
const PHOTO = 380;
const PHOTO_X = W - PHOTO - 70;
const PHOTO_Y = (H - PHOTO) / 2;

// Backdrop and copy. Arial is used because it renders identically under sharp
// on every machine this is run from.
const backdrop = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="0" y="0" width="${W}" height="10" fill="${ACCENT}"/>
  <circle cx="${PHOTO_X + PHOTO / 2}" cy="${H / 2}" r="270" fill="${PANEL}"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <rect x="70" y="118" width="86" height="86" rx="18" fill="${ACCENT}"/>
    <text x="113" y="176" font-size="44" font-weight="700" fill="${BG}" text-anchor="middle">NP</text>
    <text x="70" y="330" font-size="82" font-weight="700" fill="${TEXT}">Nisarth Patel</text>
    <text x="70" y="396" font-size="36" font-weight="500" fill="${ACCENT}">Digital Growth Specialist</text>
    <text x="70" y="456" font-size="27" font-weight="400" fill="${MUTED}">SEO, AEO, GEO, and AI automation</text>
    <text x="70" y="524" font-size="24" font-weight="400" fill="${MUTED}">nisarth.github.io</text>
  </g>
</svg>`;

// Rounded-corner mask for the photo.
const mask = `
<svg width="${PHOTO}" height="${PHOTO}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${PHOTO}" height="${PHOTO}" rx="34" fill="#fff"/>
</svg>`;

const photo = await sharp(source)
  .resize(PHOTO, PHOTO, { fit: 'cover', position: 'top' })
  .composite([{ input: Buffer.from(mask), blend: 'dest-in' }])
  .png()
  .toBuffer();

const og = await sharp(Buffer.from(backdrop))
  .composite([{ input: photo, left: PHOTO_X, top: Math.round(PHOTO_Y) }])
  .png()
  .toBuffer();

const ogPath = join(root, 'public', 'og-image.png');
await sharp(og).toFile(ogPath);
console.log('wrote public/og-image.png');

// Square portrait at a stable URL, referenced by Person.image in schema.ts.
// Astro's processed images carry content hashes, so they cannot be used here.
const portraitPath = join(root, 'public', 'nisarth-patel.jpg');
await sharp(source)
  .resize(800, 800, { fit: 'cover' })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(portraitPath);
console.log('wrote public/nisarth-patel.jpg');
