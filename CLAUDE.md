# CLAUDE.md

Project guidance for this repository. These rules override default behavior.

## What this is

The personal portfolio site for Nisarth Patel, a freelance digital growth
specialist in Ahmedabad (SEO, AEO, GEO, AI automation, web development).
Hosted free on GitHub Pages at https://nisarth.github.io.

## Stack

- Astro (static output). Ships zero client JavaScript by default.
- Plain scoped CSS with design tokens in `src/styles/global.css`. No CSS framework.
- Self-hosted fonts in `public/fonts/`. No render-blocking font CDN.
- Deploys via GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages.

## Hard rules (apply to code, comments, content, and commit messages)

1. Never use em dashes anywhere. Use commas, periods, colons, or parentheses
   instead. This is enforced by `tools/check-no-em-dash.mjs`, which runs on
   build, in CI, and as a git pre-commit hook.
2. Use plain, simple words. No filler, no fancy vocabulary.
3. Never invent facts about Nisarth, his skills, or his projects. If a fact is
   missing, leave a clearly marked placeholder and ask. Do not guess.
4. Experience is 2.5 years. Do not write "4+ years" or any other number.
5. If execution starts to drift from the agreed plan, stop and say so before
   continuing.

## URL rule (protect search rankings)

Keep every existing URL exactly. Astro `build.format: 'file'` outputs
`/about.html`, `/services.html`, and so on, matching the old paths. The legacy
blog lives untouched in `public/blog/` and `public/blog.html` and must keep its
current URLs. Do not rename or remove these paths.

## Conventions

- One `<h1>` per page, correct heading order.
- Semantic HTML, descriptive `alt` text, visible focus states, WCAG AA contrast.
- Unique title, meta description, canonical, Open Graph, and Twitter tags per page.
- JSON-LD on every page (Person, ProfessionalService, FAQPage, BreadcrumbList,
  WebSite, CreativeWork as relevant).
- Reusable Astro components for layout, head, header, footer, and schema.
- Google Analytics (`G-372JGPFET7`) loads only after consent.

## Local setup

```
npm install
git config core.hooksPath .githooks   # enable the em-dash pre-commit hook
npm run dev
npm run build                          # runs the em-dash check, then builds
```
