// Derives a page's "last updated" date from git at build time.
//
// These dates were hardcoded as "June 2026" on five pages, which was stale the
// moment anything changed and simply wrong by the time anyone read it. Reading
// the last commit that touched a page's own sources keeps the claim true
// without anyone having to remember to edit it.
//
// Runs during the static build only, never in the browser.
import { execFileSync } from 'node:child_process';
import { statSync, existsSync } from 'node:fs';

const cache = new Map<string, string>();

// Sources every page depends on, so a layout or token change is reflected too.
const SHARED = ['src/layouts/BaseLayout.astro', 'src/consts.ts'];

function commitDate(file: string): string {
  if (cache.has(file)) return cache.get(file)!;
  let date = '';
  try {
    date = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    date = '';
  }
  // A file not yet committed, or a shallow clone with no history for it.
  if (!date && existsSync(file)) date = statSync(file).mtime.toISOString().slice(0, 10);
  cache.set(file, date);
  return date;
}

/**
 * Newest commit date across the given sources plus the shared layout,
 * formatted as "August 2026". Returns an empty string if git tells us nothing,
 * so a caller can omit the line rather than print a wrong date.
 */
export function lastUpdated(...files: string[]): string {
  const newest = [...files, ...SHARED]
    .map(commitDate)
    .filter(Boolean)
    .sort()
    .pop();
  if (!newest) return '';
  const [year, month] = newest.split('-');
  const name = new Date(Number(year), Number(month) - 1, 1).toLocaleString('en-GB', {
    month: 'long',
  });
  return `${name} ${year}`;
}
