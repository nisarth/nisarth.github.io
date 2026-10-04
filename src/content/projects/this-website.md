---
title: 'Rebuilding my own site for search and AI answers'
client: 'This website'
clientUrl: 'https://nisarth.github.io'
summary: 'A thin portfolio site rebuilt as a fast static site with guides, a glossary, and checklists. It now scores 97 for performance and 100 for SEO in Lighthouse on mobile.'
service: 'web-development'
finished: 2026-10-04
results:
  - metric: 'Lighthouse performance, mobile'
    change: '97'
  - metric: 'Lighthouse SEO, mobile'
    change: '100'
  - metric: 'Largest Contentful Paint, mobile'
    change: '1.6 s'
  - metric: 'Home page total size'
    change: '50 KB'
  - metric: 'Words on the home page'
    change: '396 to 1,140'
stack:
  - 'Astro'
  - 'Structured data'
  - 'Core Web Vitals'
  - 'AEO'
  - 'GEO'
---

## The problem

This is the one project where every number can be checked by anyone, because
the client is the site you are reading.

Before the rebuild the site had three problems.

- **Thin pages.** The home page had 396 words. The About page had 246 and the
  Work page 219. Each service page had under 400. There was little for a search
  engine or an AI tool to quote.
- **Only the home page was showing in search.** In Google Search Console, over
  the three months to 3 October 2026, the home page had 193 impressions and 4
  clicks. Six other pages had one impression each. The blog posts and service
  pages had none.
- **Loose structure.** There were 55 blog posts, and 46 of them carried the same
  publish date. They were grouped by category, but nothing tied them into clear
  topics or explained how they fit together.

The look was also hard on the eyes: a near-black background with a bright lime
accent.

## What I did

The rebuild used AI coding tools under my direction, the same way I use AI in
client work: the tool does the repeat work, and I decide what the site should
say and check the result.

1. **Checked the base first.** robots.txt, the sitemap, canonical tags, and
   index tags were all correct. Nothing in the code was blocking Google, so the
   work moved to content and structure.
2. **Made every page worth reading.** The home page went from 396 to 1,140
   words. Each service page went from under 400 to between 1,220 and 1,320.
   About, Process, Services, and Work each went to about 1,000. The new text
   explains how search works and what each service can and cannot do.
3. **Built topic guides.** Three long guides, for SEO, AEO, and GEO, each link
   down to the blog posts on that topic. Every one of those posts links back up
   to its guide. That turns 55 loose posts into three clear clusters.
4. **Added a glossary.** 65 search terms, each defined in one or two plain
   sentences, with DefinedTermSet schema so each definition can be read by
   machines on its own.
5. **Added tools people can use.** Three interactive checklists: an SEO audit
   checklist with 49 checks, and AEO and GEO checklists with 30 checks each.
6. **Wrote answer-first.** Pages open with a plain definition. Questions are
   headings, and the answer sits in the first lines under each one, with FAQ
   schema to match.
7. **Kept it light.** The site is a static build. The home page loads 50 KB in
   total, with about 2.5 KB of its own JavaScript. The animated drawings are built from
   HTML and CSS, not images or video.
8. **Kept every URL.** No published address changed, so nothing that Google
   already knew was lost.
9. **Changed the look.** Warm paper background, dark text, one blue accent, and
   drawings that explain an idea instead of decorating the page.

## The result

Measured on the live home page with Lighthouse 12.8 on 4 October 2026.

| Measure | Mobile | Desktop |
|---|---|---|
| Performance | 97 | 99 |
| SEO | 100 | 100 |
| Best practices | 100 | 100 |
| Accessibility | 97 | 97 |
| Largest Contentful Paint | 1.6 s | 0.4 s |
| Cumulative Layout Shift | 0 | 0 |

Google counts a Largest Contentful Paint of 2.5 seconds or less as good, and a
layout shift score of 0.1 or less as good. The site clears both.

What the site holds now:

- 88 pages, up from 78
- 243 blocks of structured data, with none invalid
- no broken internal links
- 86 URLs in the sitemap

The accessibility score of 97 came from one contrast problem on three small
labels. It was found by this same test and has since been fixed.

## What is not known yet

The search result is not in. These changes went live on 3 and 4 October 2026,
and search engines need weeks to crawl, index, and re-rank a site. Speed and
structure can be measured the same day. Rankings and clicks cannot.

So this case study has a second part still to come. The starting point is
written down above: 193 impressions and 4 clicks on the home page over three
months, and almost nothing on any other page. When there is enough data to
compare, the numbers will be added here, whichever way they go.
