// One-off content pass over the migrated blog.
//
//   node tools/fix-blog-prose.mjs [--dry]
//
// Two fixes:
//
// 1. Dash substitutes. The legacy copy used " -- " everywhere an em dash would
//    have gone. CLAUDE.md bans em dashes, so these become commas, colons or
//    parentheses depending on what the sentence is doing, never an em dash.
//
// 2. Spelling. The posts mix British and American forms while the rest of the
//    site is American ("optimization"). Only genuinely British spellings are
//    converted: words like "expertise", "enterprise", "advertising" and
//    "compromise" are -ise in both dialects and are left alone.
//
// Heading anchor ids and link targets are never touched, so no in-page anchor
// or URL changes.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DRY = process.argv.includes('--dry');
const dir = join(process.cwd(), 'src', 'content', 'blog');

// ---------------------------------------------------------------- spelling --

// British -> American. Base forms only; inflections are listed where they occur.
import { SPELLING, ANALYSES_NOUNS } from './lib/spelling.mjs';

function fixSpelling(text) {
  let n = 0;
  const out = text.replace(/\b[A-Za-z]+\b/g, (word) => {
    const lower = word.toLowerCase();
    const to = SPELLING[lower];
    if (!to) return word;
    n++;
    // Preserve the original capitalisation pattern.
    if (word === lower) return to;
    if (word === word.toUpperCase()) return to.toUpperCase();
    return to[0].toUpperCase() + to.slice(1);
  });
  return [out, n];
}

function fixAnalyses(text) {
  const guards = new Map();
  let i = 0;
  let guarded = text;
  for (const phrase of ANALYSES_NOUNS) {
    guarded = guarded.split(phrase).join(`@@N${i}@@`);
    guards.set(`@@N${i}@@`, phrase);
    i++;
  }
  const before = guarded;
  guarded = guarded.replace(/\banalyses\b/g, 'analyzes').replace(/\bAnalyses\b/g, 'Analyzes');
  const n = before === guarded ? 0 : (before.match(/\banalyses\b/gi) || []).length;
  for (const [key, phrase] of guards) guarded = guarded.split(key).join(phrase);
  return [guarded, n];
}

// -------------------------------------------------------------------- dashes --

// After one of these, the clause continues the sentence, so a comma is right.
// Anything else is an explanation or expansion, which takes a colon.
const COMMA_STARTERS = new Set([
  'and', 'or', 'but', 'so', 'yet', 'nor', 'not', 'if', 'when', 'while', 'where',
  'which', 'who', 'whom', 'whose', 'because', 'though', 'although', 'since',
  'unless', 'until', 'plus', 'including', 'especially', 'particularly',
  'perhaps', 'typically', 'usually', 'sometimes', 'often', 'generally',
  'ideally', 'roughly', 'about', 'around', 'within', 'from', 'to', 'at', 'for',
  'with', 'without', 'like', 'even', 'in', 'on', 'by', 'as', 'after', 'before',
  'both', 'either', 'neither', 'rather', 'instead', 'that', 'than', 'then',
  'whether', 'via', 'per', 'across', 'during', 'through',
]);

const SUBORDINATORS = /^(If|When|While|Because|Although|Since|Unless|After|Before|Where|Whenever)\b/;

// Split after sentence-ending punctuation when the next character is either
// whitespace or a tag. Splitting only on whitespace missed boundaries like
// "Live regions.</strong> When ...", which let a segment run past the end of a
// paragraph and pair two unrelated dashes together.
function sentences(text) {
  return text.split(/(?<=[.!?])(?=\s|<)/);
}

function firstWordsAfter(rest) {
  const stripped = rest.replace(/^\s*(?:<[^>]+>\s*)*/, '');
  const m = stripped.match(/^([A-Za-z']+)(?:\s+([A-Za-z']+))?/);
  return m ? [m[1].toLowerCase(), (m[2] || '').toLowerCase()] : ['', ''];
}

function fixDashesInSentence(s) {
  const count = (s.match(/ -- /g) || []).length;
  if (count === 0) return s;

  if (count >= 2) {
    // Treat the first two as a matched parenthetical pair.
    const first = s.indexOf(' -- ');
    const second = s.indexOf(' -- ', first + 4);
    const head = s.slice(0, first);
    const inner = s.slice(first + 4, second);
    const tail = s.slice(second + 4);

    // A parenthetical is an aside, not half the sentence. Anything longer is
    // two unrelated single dashes that happen to share a sentence.
    if (inner.length > 220) {
      return fixDashesInSentence(fixSingleDash(s));
    }

    let rebuilt;
    if (inner.includes(',')) {
      // Commas inside would blur the aside, so bracket it instead.
      // The subordinator that matters governs the clause the aside sits in,
      // which may start well after an opening tag or an earlier sentence.
      const lastClause = head.replace(/<[^>]+>/g, ' ').split(/[.!?]\s/).pop().trim();
      // "content (a, b) that updates ..." keeps the relative clause attached to
      // the noun, so no comma belongs after the bracket.
      const relativeFollows = /^\s*(that|which|who|whose)\b/i.test(tail);
      const needsComma = SUBORDINATORS.test(lastClause) && !relativeFollows;
      rebuilt = `${head} (${inner})${needsComma ? ',' : ''} ${tail}`;
    } else {
      rebuilt = `${head}, ${inner}, ${tail}`;
    }
    // Any further dashes in the same sentence fall through to the single rule.
    return fixDashesInSentence(rebuilt);
  }

  return fixSingleDash(s);
}

function fixSingleDash(s) {
  const at = s.indexOf(' -- ');
  if (at === -1) return s;
  const head = s.slice(0, at);
  const tail = s.slice(at + 4);
  const [word, next] = firstWordsAfter(tail);

  // "for example" and "for instance" introduce an illustration, so they take a
  // colon even though a bare "for" continues the sentence.
  const introduces = word === 'for' && (next === 'example' || next === 'instance');

  // A second colon in one sentence reads badly. The leading "q: '" / "a: '" of
  // a front matter entry is a YAML key, not sentence punctuation, so it must
  // not count.
  const sentenceHead = head.replace(/^\s*-?\s*[qa]:\s*'/, '');
  const hasColon = sentenceHead.includes(':') || tail.includes(':');

  if (hasColon && !introduces && !COMMA_STARTERS.has(word)) {
    // A comma here would splice two independent clauses together, so split the
    // sentence when a new clause follows and bracket the aside when it does not.
    if (PRONOUN_CLAUSE.test(tail.replace(/^\s*(?:<[^>]+>\s*)*/, ''))) {
      return `${head}. ${capitaliseFirstWord(tail)}`;
    }
    const m = tail.match(/^([\s\S]*?)([.!?]['"]?[\s\S]*)$/);
    if (m) return `${head} (${m[1]})${m[2]}`;
  }

  const punct = !introduces && (COMMA_STARTERS.has(word) || hasColon) ? ',' : ':';
  return `${head}${punct} ${tail}`;
}

// A clause opening with one of these pronouns stands on its own, so the
// sentence is split rather than spliced with a comma.
const PRONOUN_CLAUSE = /^(it|they|this|these|there|we|you|i|he|she)\b/i;

function capitaliseFirstWord(text) {
  return text.replace(/^(\s*(?:<[^>]+>\s*)*)([a-z])/, (_, lead, ch) => lead + ch.toUpperCase());
}

function fixDashes(text) {
  const before = (text.match(/ -- /g) || []).length;
  if (!before) return [text, 0];
  // Line by line as well, so a dash can never pair across two paragraphs.
  const NL = String.fromCharCode(10);
  const out = text
    .split(NL)
    .map((line) => sentences(line).map(fixDashesInSentence).join(''))
    .join(NL);
  return [out, before];
}

// ---------------------------------------------------------------------- run --

// Anchor ids and link targets must survive untouched or in-page anchors and
// URLs would change.
function protectAttributes(text) {
  const store = [];
  const masked = text.replace(/(id|href)="[^"]*"/g, (m) => {
    store.push(m);
    return `@@A${store.length - 1}@@`;
  }).replace(/^(\s*-?\s*id:).*$/gm, (m) => {
    store.push(m);
    return `@@A${store.length - 1}@@`;
  });
  return [masked, store];
}
const restore = (text, store) => text.replace(/@@A(\d+)@@/g, (_, i) => store[Number(i)]);

let files = 0, dashes = 0, spellings = 0;
for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const path = join(dir, file);
  const original = readFileSync(path, 'utf8');
  const [masked, store] = protectAttributes(original);

  let text = masked;
  let n;
  [text, n] = fixDashes(text);
  dashes += n;
  [text, n] = fixSpelling(text);
  spellings += n;
  [text, n] = fixAnalyses(text);
  spellings += n;

  const out = restore(text, store);
  if (out !== original) {
    files++;
    if (!DRY) writeFileSync(path, out);
  }
}

console.log(`files changed:      ${files}`);
console.log(`dash substitutes:   ${dashes}`);
console.log(`spellings corrected:${spellings}`);
if (DRY) console.log('(dry run, nothing written)');
