// Writes src/data/last-updated.json before the build.
//
// The dates used to be hardcoded, then were read from git inside a src/ module,
// which pulled node:child_process into the type-checked app code. Generating a
// plain JSON map here keeps src/ free of Node APIs, needs no extra dependency,
// and makes the dates inspectable in the diff.
import { execFileSync } from 'node:child_process';
import { statSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

// Which sources decide each page's date. Shared files are appended to all.
const SHARED = ['src/layouts/BaseLayout.astro', 'src/consts.ts'];
const PAGES = {
  about: ['src/pages/about.astro'],
  process: ['src/pages/process.astro'],
  work: ['src/pages/work.astro'],
  services: ['src/pages/services.astro'],
  service: ['src/pages/services/[service].astro', 'src/data/services.ts'],
};

const cache = new Map();
function commitDate(file) {
  if (cache.has(file)) return cache.get(file);
  let date = '';
  try {
    date = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    date = '';
  }
  // Not committed yet, or a shallow clone with no history for this file.
  if (!date && existsSync(join(root, file))) {
    date = statSync(join(root, file)).mtime.toISOString().slice(0, 10);
  }
  cache.set(file, date);
  return date;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const out = {};
for (const [key, files] of Object.entries(PAGES)) {
  const newest = [...files, ...SHARED].map(commitDate).filter(Boolean).sort().pop();
  // Empty rather than a guess, so the page can omit the line entirely.
  out[key] = newest ? `${MONTHS[Number(newest.slice(5, 7)) - 1]} ${newest.slice(0, 4)}` : '';
}

mkdirSync(join(root, 'src', 'data'), { recursive: true });
writeFileSync(join(root, 'src', 'data', 'last-updated.json'), JSON.stringify(out, null, 2) + '\n');
console.log('gen-last-updated: ' + Object.entries(out).map(([k, v]) => `${k}=${v || 'none'}`).join(' '));
