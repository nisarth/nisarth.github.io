// Topic hubs: one long guide per core topic. Each section explains a part of
// the topic in plain words, then points to the articles that go deeper. This is
// what ties the blog into clear topic clusters.
//
// General knowledge only. Nothing here is a claim about a client or a result.

export interface HubSection {
  id: string;
  heading: string;
  body: string[];
  /** Blog post slugs that go deeper on this section. Missing slugs are skipped. */
  posts?: string[];
}

export interface Hub {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  // Definition-first opening line.
  definition: string;
  intro: string;
  sections: HubSection[];
  faqs: { q: string; a: string }[];
  /** Ids from src/data/glossary.ts. */
  terms: string[];
  /** Matching service page slug. */
  service: string;
}

export const hubs: Hub[] = [
  {
    slug: 'seo',
    name: 'SEO',
    title: 'SEO Guide: How Search Engine Optimization Works | Nisarth Patel',
    description:
      'A plain-language SEO guide. How search engines crawl, index, and rank pages, and what to do about keywords, on-page SEO, site structure, links, and local search.',
    h1: 'SEO guide: how search engine optimization works',
    definition:
      'SEO (search engine optimization) is the work of making a website easy for search engines to find, understand, and rank for the searches that matter to it.',
    intro:
      'This guide walks through SEO from the ground up. Each part explains one idea in plain words and links to a longer article if you want the detail. Read it top to bottom, or jump to the part you need.',
    sections: [
      {
        id: 'how-search-works',
        heading: 'How search engines work',
        body: [
          'A search engine does three jobs. It crawls: programs follow links from page to page and read what they find. It indexes: the pages it read are stored and sorted by what they are about. It ranks: when someone searches, it picks pages from the index and puts them in order.',
          'Each job can fail on its own. A page that is blocked or never linked is not crawled. A page that is thin or a copy of another may be crawled but left out of the index. A page that is indexed can still rank on page five. Good SEO checks all three, in that order.',
        ],
        posts: ['technical-seo-audit-checklist-2026', 'core-web-vitals-guide', 'website-speed-optimization'],
      },
      {
        id: 'keywords-and-intent',
        heading: 'Keywords and search intent',
        body: [
          'A keyword is the word or phrase someone types into a search engine. Keyword research finds which phrases your buyers use, how often, and how hard each one is to rank for.',
          'Search intent is the reason behind the search. Someone typing "what is a root canal" wants to learn. Someone typing "dentist near me open now" wants to book. The same page cannot serve both. Matching the page to the intent matters more than repeating the phrase.',
        ],
        posts: ['keyword-research-strategy', 'search-intent-optimization'],
      },
      {
        id: 'on-page',
        heading: 'On-page SEO',
        body: [
          'On-page SEO is everything you control on the page itself. The title tag and main heading say what the page is about. Subheadings break it into parts. The copy answers the search clearly. Images carry a text description. Structured data labels the page for machines.',
          'The aim is simple: a person and a search engine should both be able to tell, within a few seconds, what the page offers and whether it answers the search.',
        ],
        posts: ['on-page-seo-guide', 'image-seo-optimization', 'schema-markup-guide'],
      },
      {
        id: 'structure',
        heading: 'Site structure and topical authority',
        body: [
          'Search engines judge sites by topic, not only page by page. A site that covers one subject well, with pages that link to each other in a clear order, is seen as a stronger source on that subject. This is often called topical authority.',
          'The usual structure is a cluster. One main page covers the whole topic, like this guide. Smaller pages each answer one narrower question. The main page links down to them, and they link back up. Nothing is left on its own.',
        ],
        posts: ['content-silo-structure'],
      },
      {
        id: 'links',
        heading: 'Links and authority',
        body: [
          'A link from another site works like a recommendation. Links from relevant, trusted sites tell search engines that your page is worth showing. This is called off-page SEO.',
          'Quality matters far more than count. A few links from real sites in your field help. Bought links and link schemes break Google rules and can lead to a penalty. The safest way to earn links is to publish something worth pointing to.',
        ],
        posts: ['link-building-strategies'],
      },
      {
        id: 'local',
        heading: 'Local SEO',
        body: [
          'Local SEO helps a business show up for nearby searches, on Google Maps and in the map pack. Google ranks local results by relevance, distance, and prominence.',
          'The base is a complete Google Business Profile, the same name, address, and phone number everywhere the business is listed, and a steady flow of real reviews.',
        ],
        posts: [
          'local-seo-guide',
          'google-my-business-optimization',
          'local-citation-building',
          'review-management-strategy',
        ],
      },
      {
        id: 'by-business',
        heading: 'SEO for different kinds of business',
        body: [
          'The basics stay the same, but the weight shifts. A new business has to get indexed and win a few narrow searches first. An online shop has thousands of product and category pages to keep clean. A software company sells through content that answers questions long before a buyer is ready.',
        ],
        posts: ['seo-for-startups', 'ecommerce-seo-guide', 'saas-seo-strategy'],
      },
      {
        id: 'measuring',
        heading: 'Measuring SEO',
        body: [
          'Google Search Console shows impressions, clicks, and average position for each search and page. Google Analytics 4 shows what those visitors do next. Together they answer the only question that matters: is search bringing the right people, and do they get in touch?',
          'SEO takes time. Most sites see early movement in 2 to 3 months and stronger results by 6 months. Google itself says four months to a year is typical for the full benefit.',
        ],
        posts: ['seo-roi-measurement', 'seo-mistakes-businesses-make'],
      },
    ],
    faqs: [
      {
        q: 'What are the main types of SEO?',
        a: 'There are three: technical SEO, which makes the site crawlable and fast; on-page SEO, which matches each page to a search; and off-page SEO, which earns links and mentions from other sites. Local SEO is a fourth area for businesses that serve a nearby area.',
      },
      {
        q: 'Can I do SEO myself?',
        a: 'Yes, for the basics. Setting up Google Search Console, fixing titles and headings, and writing clear pages that answer real questions go a long way. Technical problems and competitive searches are where outside help usually pays off.',
      },
      {
        q: 'Is SEO a one-time job?',
        a: 'No. The first round of fixes is the biggest, but search engines, competitors, and your own site keep changing. A monthly check and steady new content keep the gains.',
      },
    ],
    terms: [
      'crawling', 'indexing', 'serp', 'keyword', 'search-intent', 'title-tag', 'meta-description',
      'canonical-tag', 'internal-link', 'backlink', 'topical-authority', 'core-web-vitals', 'e-e-a-t',
    ],
    service: 'seo',
  },
  {
    slug: 'aeo',
    name: 'AEO',
    title: 'AEO Guide: How Answer Engine Optimization Works | Nisarth Patel',
    description:
      'A plain-language AEO guide. How featured snippets, People Also Ask, and voice answers pick their source, and how to write and mark up content so yours is chosen.',
    h1: 'AEO guide: how answer engine optimization works',
    definition:
      'AEO (answer engine optimization) is the work of shaping content so a search engine can lift it out and show it as the direct answer to a question.',
    intro:
      'Search results are no longer just a list of links. For many questions the answer is shown right on the results page. This guide explains where those answers come from and how a page earns the spot.',
    sections: [
      {
        id: 'what-is-aeo',
        heading: 'What AEO is, and how it differs from SEO',
        body: [
          'SEO aims to rank a page in the list of results. AEO aims to be the answer shown above that list, or read aloud by a voice assistant. The two are not rivals. A page almost always has to rank well before it is picked as an answer, so AEO builds on SEO.',
          'The difference is in the writing. SEO asks whether the page covers the topic. AEO asks whether one short passage on that page answers one question fully, without the rest of the page around it.',
        ],
        posts: ['what-is-aeo', 'aeo-vs-seo'],
      },
      {
        id: 'snippets',
        heading: 'Featured snippets and People Also Ask',
        body: [
          'A featured snippet is the boxed answer at the top of some results. People Also Ask is the list of related questions that open to show short answers. Both are taken from ordinary web pages.',
          'Snippets come in three shapes: a paragraph for "what is" questions, a list for steps or rankings, and a table for comparisons. To win one, put the question in a heading, answer it straight away in the matching shape, and add the detail afterwards.',
        ],
        posts: ['featured-snippets-guide'],
      },
      {
        id: 'schema',
        heading: 'Schema for answers',
        body: [
          'Schema markup is code that labels what is on a page. FAQPage marks a set of questions and answers. Article marks the author and date. Organization marks who runs the site.',
          'Markup does not force a search engine to show anything. Since 2023 Google shows FAQ rich results for only a small group of sites. It is still worth adding, because it removes guesswork about what the page contains, for search engines and AI tools alike.',
        ],
        posts: ['faq-schema-optimization', 'schema-markup-guide'],
      },
      {
        id: 'voice',
        heading: 'Voice search',
        body: [
          'A voice assistant gives one answer, not ten links. That answer usually comes from the featured snippet or from business listing data. Spoken searches are longer and phrased as full questions, so content written in a natural question and answer form fits them well.',
          'For local businesses, voice answers lean on the Google Business Profile: opening hours, address, and phone number need to be correct there.',
        ],
        posts: ['voice-search-optimization'],
      },
      {
        id: 'zero-click',
        heading: 'Zero-click searches',
        body: [
          'A zero-click search ends on the results page, because the answer was shown there. These are common for simple facts and definitions.',
          'That changes the goal. For those searches the win is being the named source, so people see your business at the moment they are looking. Searches that need depth, a quote, or a booking still bring clicks, and those are the ones worth building pages for.',
        ],
        posts: ['zero-click-search-strategy'],
      },
      {
        id: 'measuring',
        heading: 'Measuring AEO',
        body: [
          'There is no single AEO report. Progress is read from a few places: which featured snippets the site holds, which People Also Ask questions it appears in, and how impressions for question searches move in Google Search Console.',
          'Impressions often rise before clicks do. That is normal for answer features, and it is the reason to track both.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is AEO replacing SEO?',
        a: 'No. AEO depends on SEO. A page that cannot be crawled or does not rank is very unlikely to be chosen as an answer. AEO is a layer on top that changes how the content is written and structured.',
      },
      {
        q: 'How long should an answer be to win a snippet?',
        a: 'Short. One or two sentences that fully answer the question, placed right under the question heading. Longer explanation goes below. There is no exact word count that guarantees a snippet.',
      },
      {
        q: 'Does every page need an FAQ section?',
        a: 'No. Add questions only where real buyers ask them and the page can answer them well. Padding a page with invented questions helps nobody.',
      },
    ],
    terms: [
      'answer-engine', 'featured-snippet', 'people-also-ask', 'zero-click-search', 'schema-markup',
      'faq-schema', 'rich-result', 'voice-search', 'serp',
    ],
    service: 'aeo',
  },
  {
    slug: 'geo',
    name: 'GEO',
    title: 'GEO Guide: How Generative Engine Optimization Works | Nisarth Patel',
    description:
      'A plain-language GEO guide. How ChatGPT, Perplexity, and Google AI Overviews choose and cite sources, and what makes a business easy for AI tools to find and name.',
    h1: 'GEO guide: how generative engine optimization works',
    definition:
      'GEO (generative engine optimization) is the work of making a business easy for AI tools to find, trust, and cite when they write an answer.',
    intro:
      'More people now ask an AI tool instead of typing a search. The tool writes one answer and names a few sources. This guide explains how those sources are chosen and what you can do to be one of them.',
    sections: [
      {
        id: 'what-is-geo',
        heading: 'What GEO is',
        body: [
          'A generative engine is an AI tool that writes an answer instead of listing links. ChatGPT, Perplexity, Gemini, and Google AI Overviews are the main ones. GEO is the work of being named or linked in those answers.',
          'It overlaps with SEO and AEO but is not the same. SEO earns a place in a list. AEO earns the answer box in a search engine. GEO earns a mention inside an answer the AI writes in its own words.',
        ],
        posts: ['what-is-geo', 'geo-strategy-guide'],
      },
      {
        id: 'sources',
        heading: 'How AI tools pick their sources',
        body: [
          'An AI answer comes from two places. One is what the model learned in training, which is fixed at a point in time. The other is a live search: the tool looks up pages, reads them, and builds the answer from what it finds. Tools that cite sources are using the second.',
          'For the live route, three things have to go right. The tool has to find the page, so it needs to rank or be linked. It has to read the page, so the content must be in plain HTML. And it has to find a passage it can use, so the facts must be stated clearly.',
        ],
        posts: ['get-mentioned-by-chatgpt', 'ai-overview-optimization'],
      },
      {
        id: 'citable',
        heading: 'Writing content that can be cited',
        body: [
          'AI tools lift passages, not whole pages. A passage is easy to use when it makes sense alone, states a fact plainly, and says who or what it is about by name instead of "we" or "it".',
          'Dates, numbers with sources, and clear definitions all help. Vague marketing lines do not, because there is nothing in them to quote.',
        ],
      },
      {
        id: 'entities',
        heading: 'Entities: being one clear business',
        body: [
          'An entity is a thing a search engine or AI tool knows as a single item: a person, a business, a place. The clearer the entity, the more confidently a tool can name it.',
          'That means the same name, address, and description on your website, your Google Business Profile, LinkedIn, and any directory. Organization and Person schema, with links to those profiles, connects them.',
        ],
        posts: ['entity-seo-knowledge-graph'],
      },
      {
        id: 'crawlers',
        heading: 'AI crawlers and llms.txt',
        body: [
          'AI companies run their own crawlers, such as GPTBot for OpenAI and PerplexityBot for Perplexity. If robots.txt blocks them, their tools cannot read the site. Allowing them is the first step.',
          'llms.txt is a proposed file that gives AI tools a short, readable map of a site. It is a proposal. The large AI tools have not promised to use it. It costs little to add, but it does not replace clear, crawlable content.',
        ],
        posts: ['llms-txt-ai-optimization'],
      },
      {
        id: 'local',
        heading: 'GEO for local businesses',
        body: [
          'When someone asks an AI tool for a nearby service, the answer leans on the same data local search uses: business profiles, reviews, and consistent listings. A local business with a complete profile and matching details is easier for the tool to recommend.',
        ],
        posts: ['geo-for-local-business'],
      },
      {
        id: 'measuring',
        heading: 'Measuring GEO',
        body: [
          'Measuring GEO is still rough. No tool gives a full, reliable picture, and answers change from one day to the next.',
          'The practical method is to write down the questions your buyers ask, put them to the main AI tools on a fixed schedule, and note whether your business is named or linked. Google Analytics 4 also shows visits that arrive from AI tools, which gives a second signal.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is GEO different from AEO?',
        a: 'Yes. AEO targets answer features inside a search engine, such as featured snippets and voice replies. GEO targets AI tools that write their own answer and cite sources. The groundwork is shared, so they are usually done together.',
      },
      {
        q: 'Can I control what an AI tool says about my business?',
        a: 'No. You can only make the right facts easy to find and consistent everywhere. That raises the odds the tool repeats them correctly.',
      },
      {
        q: 'Should I block AI crawlers?',
        a: 'That is a business choice. Blocking them keeps your content out of AI answers, which also means your business cannot be cited there. If visibility in AI answers is the goal, allow them.',
      },
    ],
    terms: [
      'generative-engine', 'ai-overviews', 'large-language-model', 'citation', 'entity', 'knowledge-graph',
      'llms-txt', 'ai-crawler', 'structured-data', 'e-e-a-t',
    ],
    service: 'geo',
  },
];

export const hubBySlug = (slug: string) => hubs.find((h) => h.slug === slug);
