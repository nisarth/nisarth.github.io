// Removes the duplicated FAQ block from the migrated post bodies.
//
//   node tools/strip-inline-faq.mjs [--dry]
//
// The migration kept the legacy "<h2>Frequently Asked Questions</h2>" plus its
// .faq-section markup inside each body, and the blog layout hid it with
// display:none because the Faq component renders the same questions again from
// front matter. Every post therefore shipped both copies. The questions live in
// front matter, so the body copy is pure duplication and comes out.
//
// The "#frequently-asked-questions" anchor that each table of contents links to
// moves onto the visible Faq section, so no in-page anchor breaks.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DRY = process.argv.includes('--dry');
const dir = join(process.cwd(), 'src', 'content', 'blog');

// Divs nest, so find the matching close rather than the first one.
function endOfBlock(text, start) {
  const open = /<div\b/g;
  const close = /<\/div>/g;
  open.lastIndex = start;
  close.lastIndex = start;
  let depth = 0;
  let i = start;
  while (i < text.length) {
    open.lastIndex = i;
    close.lastIndex = i;
    const o = open.exec(text);
    const c = close.exec(text);
    if (!c) return -1;
    if (o && o.index < c.index) {
      depth++;
      i = o.index + 4;
    } else {
      depth--;
      i = c.index + 6;
      if (depth === 0) return i;
    }
  }
  return -1;
}

let files = 0;
let bytes = 0;
for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const path = join(dir, file);
  const text = readFileSync(path, 'utf8');

  const blockStart = text.indexOf('<div class="faq-section">');
  if (blockStart === -1) continue;
  const blockEnd = endOfBlock(text, blockStart);
  if (blockEnd === -1) {
    console.error('unbalanced faq-section in ' + file);
    process.exit(1);
  }

  // Take the heading immediately above it as well.
  const headingMatch = text
    .slice(0, blockStart)
    .match(/\n<h2 id="frequently-asked-questions"[^>]*>[\s\S]*?<\/h2>\s*$/);
  const cutFrom = headingMatch ? blockStart - headingMatch[0].length : blockStart;

  const out = (text.slice(0, cutFrom) + '\n' + text.slice(blockEnd)).replace(/\n{3,}/g, '\n\n');
  bytes += text.length - out.length;
  files++;
  if (!DRY) writeFileSync(path, out);
}

console.log(`posts cleaned:  ${files}`);
console.log(`markup removed: ${Math.round(bytes / 1024)}KB`);
if (DRY) console.log('(dry run, nothing written)');
