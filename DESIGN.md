# DESIGN.md

The visual language of this site, in one place. Read this before adding a page
or a component so new work matches what is already here. Tokens live in
`src/styles/global.css`. If this file and the code disagree, the code wins and
this file needs a fix.

## Feel

Light, minimal, studio. Warm paper, ink text, one accent colour. Illustration
and motion explain how search works. They are never decoration for its own sake.

## Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#f7f5f0` | Page background (warm paper) |
| `--bg-elev` | `#ffffff` | Cards and raised surfaces |
| `--text` | `#17181a` | Body and headings |
| `--text-muted` | `#5d6168` | Secondary text |
| `--border` / `--border-strong` | `#e6e2d9` / `#d2cdc2` | Rules and card edges |
| `--accent` | `#2f4bff` | The one accent: buttons, eyebrows, active states |
| `--accent-ink` | `#ffffff` | Text on the accent |
| `--tint-blue` / `green` / `amber` / `rose` | soft tints | Card backgrounds, to tell a row of cards apart |

Rules:
- One accent only. Do not add a second strong colour.
- Tints are for card backgrounds. Text on a tint stays ink, never tinted.
- Body text must pass WCAG AA on its background.

## Type

- Headings: Space Grotesk, weight 700, tight tracking.
- Body: the system font stack.
- Labels and eyebrows: the system mono stack, small, uppercase, wide tracking,
  accent colour.
- One `<h1>` per page. Headings go in order with no skipped levels.
- Keep lines readable: cap text blocks at about 60 to 68 characters.

## Layout

- Containers: `--container` (1120px) and `--container-narrow` (760px).
- Section rhythm: `--section-y`, with `-sm` and `-lg` variants.
- Radius: `--radius` (14px) for cards, `--radius-sm` (8px) for controls.
- Do not put a card inside a card.
- One clear main action per section. A primary button and a ghost button may
  sit together. Two primary buttons may not.

## Motion

- Motion explains or confirms. If it does neither, leave it out.
- Scroll reveal: add class `reveal`. It is CSS only and scroll driven.
- Reading progress bar: global, CSS only, scroll driven.
- Hover: cards lift 3px. Buttons lift 2px. Timing 150 to 200ms, ease.
- Press: buttons move down 1px.
- Animated drawings: use `src/components/SearchLab.astro`. Pass `only` to show
  a single drawing on an inner page.
- Every animation must respect `prefers-reduced-motion`. The finished state must
  be the default state, so the page reads correctly with motion off or with
  JavaScript off.
- No looping attention grabbers such as pulsing dots.

## Illustration

- Drawings are built from HTML and CSS in the site's own tokens, not images.
- They show an idea (a result climbing, an answer citing a source). They never
  show client names or numbers, and they are labelled as drawings.
- Icons are simple line icons at 1.8 stroke, in the current text colour.

## Writing

See the hard rules in `CLAUDE.md`. In short: no em dashes, plain words, no
invented facts, definition-first openings.

## Constraints

- The Content Security Policy forbids inline `style=""` attributes. Use classes.
  Scripts may set styles through the CSSOM.
- No client JavaScript unless a feature needs it. Prefer CSS.
- Fonts are self-hosted. No external font or script CDNs.
