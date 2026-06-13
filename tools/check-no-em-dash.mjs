#!/usr/bin/env node
// Fails the build if an em dash (U+2014) appears anywhere in source.
// This enforces the project's hard "no em dashes" rule automatically.
// The character is referenced by code point so this file stays clean.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const EM_DASH = String.fromCharCode(0x2014);
const ROOT = process.cwd();

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const TEXT_EXTS = new Set([
  '.astro', '.html', '.css', '.js', '.mjs', '.cjs', '.ts',
  '.json', '.txt', '.md', '.yml', '.yaml', '.xml', '.svg',
]);

let hits = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (!SKIP_DIRS.has(entry)) walk(full);
      continue;
    }
    if (!TEXT_EXTS.has(extname(entry))) continue;
    const text = readFileSync(full, 'utf8');
    if (!text.includes(EM_DASH)) continue;
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      if (line.includes(EM_DASH)) {
        hits.push(`${full.replace(ROOT, '.')}:${i + 1}: ${line.trim()}`);
      }
    });
  }
}

walk(ROOT);

if (hits.length > 0) {
  console.error(`Found ${hits.length} em dash (U+2014) occurrence(s). Remove them:\n`);
  for (const h of hits) console.error('  ' + h);
  process.exit(1);
}

console.log('No em dashes found. Clean.');
