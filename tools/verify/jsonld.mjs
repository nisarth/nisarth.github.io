// Parses every JSON-LD block in dist/ and reports anything malformed or
// missing the fields search engines need.
import { readdirSync, readFileSync } from 'node:fs';
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

// JsonLd.astro escapes "</" as "<\/" so a string value can never close the
// script tag early. Undo that before parsing. Built without a regex literal
// because the escape sequences are awkward to quote.
const BACKSLASH = String.fromCharCode(92);
const unescape = (raw) => raw.split('<' + BACKSLASH + '/').join('</');

let blocks = 0;
let bad = 0;
const pagesWithout = [];
const types = new Map();

for (const file of walk(dist)) {
  const url = '/' + relative(dist, file).split(sep).join('/');
  const html = readFileSync(file, 'utf8');
  const found = [
    ...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ];
  if (found.length === 0 && !url.includes('googleb')) pagesWithout.push(url);

  for (const match of found) {
    blocks++;
    try {
      const data = JSON.parse(unescape(match[1]));
      for (const node of [].concat(data)) {
        const t = node['@type'];
        types.set(t, (types.get(t) || 0) + 1);
        if (!node['@context']) console.log(`  no @context: ${url} (${t})`);
      }
    } catch (err) {
      bad++;
      console.log(`  INVALID JSON in ${url}: ${err.message}`);
    }
  }
}

console.log(`blocks parsed: ${blocks}`);
console.log(`invalid blocks: ${bad}  ${bad === 0 ? 'PASS' : 'FAIL'}`);
console.log(`pages with no structured data: ${pagesWithout.length}`);
pagesWithout.slice(0, 10).forEach((u) => console.log('  ' + u));
console.log(
  'types:',
  [...types.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([t, n]) => `${t}=${n}`)
    .join(' ')
);
