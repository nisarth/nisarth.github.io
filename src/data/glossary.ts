// Glossary of SEO, AEO, and GEO terms. One or two plain sentences each,
// definition first, so a term can be quoted on its own.

export type GlossaryTopic = 'SEO' | 'AEO' | 'GEO' | 'Technical' | 'Local' | 'Analytics';

export interface GlossaryTerm {
  id: string;
  term: string;
  topic: GlossaryTopic;
  def: string;
  /** A page on this site that goes deeper. */
  href?: string;
  more?: string;
}

export const TOPICS: GlossaryTopic[] = ['SEO', 'AEO', 'GEO', 'Technical', 'Local', 'Analytics'];

const terms: GlossaryTerm[] = [
  // SEO
  { id: 'seo', term: 'SEO (search engine optimization)', topic: 'SEO', def: 'SEO is the work of making a website easy for search engines to find, understand, and rank for the searches that matter to it.', href: '/guides/seo.html', more: 'SEO guide' },
  { id: 'technical-seo', term: 'Technical SEO', topic: 'SEO', def: 'Technical SEO is the part of SEO that makes sure search engines can crawl, load, and index a site. It covers speed, mobile layout, sitemaps, redirects, and structured data.', href: '/services/seo.html', more: 'SEO services' },
  { id: 'on-page-seo', term: 'On-page SEO', topic: 'SEO', def: 'On-page SEO is everything done on a page itself to match it to a search: the title, headings, copy, images, and internal links.', href: '/blog/on-page-seo-guide.html', more: 'On-page SEO article' },
  { id: 'off-page-seo', term: 'Off-page SEO', topic: 'SEO', def: 'Off-page SEO is the work done outside your own site to build trust, mainly earning links and mentions from other sites.' },
  { id: 'serp', term: 'SERP (search engine results page)', topic: 'SEO', def: 'A SERP is the page a search engine shows after a search. It can hold links, ads, maps, featured snippets, and AI answers.' },
  { id: 'keyword', term: 'Keyword', topic: 'SEO', def: 'A keyword is the word or phrase someone types into a search engine. Pages are written to match the keywords their buyers use.', href: '/blog/keyword-research-strategy.html', more: 'Keyword research article' },
  { id: 'long-tail-keyword', term: 'Long-tail keyword', topic: 'SEO', def: 'A long-tail keyword is a longer, more specific search phrase. Each one gets fewer searches, but the intent is clearer and the competition is usually lower.' },
  { id: 'search-intent', term: 'Search intent', topic: 'SEO', def: 'Search intent is the reason behind a search: to learn something, to find a site, to compare options, or to buy. A page ranks best when it matches the intent.', href: '/blog/search-intent-optimization.html', more: 'Search intent article' },
  { id: 'title-tag', term: 'Title tag', topic: 'SEO', def: 'The title tag is the page title set in the HTML. It appears as the headline in search results and in the browser tab.' },
  { id: 'meta-description', term: 'Meta description', topic: 'SEO', def: 'A meta description is a short summary of a page set in the HTML. Search engines often show it under the title. It does not affect ranking, but a clear one earns more clicks.' },
  { id: 'internal-link', term: 'Internal link', topic: 'SEO', def: 'An internal link is a link from one page of a site to another page of the same site. Internal links help visitors move around and show search engines which pages matter.' },
  { id: 'backlink', term: 'Backlink', topic: 'SEO', def: 'A backlink is a link from another website to yours. Search engines treat links from relevant, trusted sites as a sign that a page is worth showing.', href: '/blog/link-building-strategies.html', more: 'Link building article' },
  { id: 'anchor-text', term: 'Anchor text', topic: 'SEO', def: 'Anchor text is the visible, clickable words of a link. It tells people and search engines what the linked page is about.' },
  { id: 'topical-authority', term: 'Topical authority', topic: 'SEO', def: 'Topical authority is how fully and reliably a site covers one subject. A site with many connected, useful pages on a topic is seen as a stronger source for it.', href: '/blog/content-silo-structure.html', more: 'Site structure article' },
  { id: 'topic-cluster', term: 'Topic cluster', topic: 'SEO', def: 'A topic cluster is a group of pages on one subject: a main page that covers the whole topic and smaller pages that each answer one narrower question, all linked together.' },
  { id: 'e-e-a-t', term: 'E-E-A-T', topic: 'SEO', def: 'E-E-A-T stands for experience, expertise, authoritativeness, and trustworthiness. Google uses these ideas in its quality guidelines to describe content that deserves to rank.' },
  { id: 'duplicate-content', term: 'Duplicate content', topic: 'SEO', def: 'Duplicate content is the same or nearly the same text on more than one URL. Search engines pick one version to show, which may not be the one you want.' },
  { id: 'thin-content', term: 'Thin content', topic: 'SEO', def: 'Thin content is a page with too little useful information to help a reader. Many thin pages can lower how a whole site is judged.' },
  { id: 'organic-traffic', term: 'Organic traffic', topic: 'SEO', def: 'Organic traffic is visits that come from unpaid search results, as opposed to ads.' },

  // AEO
  { id: 'aeo', term: 'AEO (answer engine optimization)', topic: 'AEO', def: 'AEO is the work of shaping content so a search engine can lift it out and show it as the direct answer to a question.', href: '/guides/aeo.html', more: 'AEO guide' },
  { id: 'answer-engine', term: 'Answer engine', topic: 'AEO', def: 'An answer engine is a search tool that gives one direct answer instead of a list of links. Featured snippets, voice assistants, and AI answers all work this way.' },
  { id: 'featured-snippet', term: 'Featured snippet', topic: 'AEO', def: 'A featured snippet is the boxed answer Google shows at the top of some results, taken from a web page. It can be a paragraph, a list, or a table.', href: '/blog/featured-snippets-guide.html', more: 'Featured snippets article' },
  { id: 'people-also-ask', term: 'People Also Ask', topic: 'AEO', def: 'People Also Ask is the box of related questions in Google results. Each question opens to show a short answer taken from a web page.' },
  { id: 'zero-click-search', term: 'Zero-click search', topic: 'AEO', def: 'A zero-click search is a search that ends on the results page because the answer was shown there, so no site gets a visit.', href: '/blog/zero-click-search-strategy.html', more: 'Zero-click article' },
  { id: 'voice-search', term: 'Voice search', topic: 'AEO', def: 'Voice search is searching by speaking to a phone or smart speaker. The assistant usually reads out a single answer.', href: '/blog/voice-search-optimization.html', more: 'Voice search article' },
  { id: 'faq-schema', term: 'FAQ schema', topic: 'AEO', def: 'FAQ schema, or FAQPage markup, is structured data that labels a set of questions and answers on a page so machines can read them as pairs.', href: '/blog/faq-schema-optimization.html', more: 'FAQ schema article' },
  { id: 'rich-result', term: 'Rich result', topic: 'AEO', def: 'A rich result is a search result with extra detail beyond the title and description, such as star ratings, prices, or breadcrumbs. It is driven by structured data.' },

  // GEO
  { id: 'geo', term: 'GEO (generative engine optimization)', topic: 'GEO', def: 'GEO is the work of making a business easy for AI tools to find, trust, and cite when they write an answer.', href: '/guides/geo.html', more: 'GEO guide' },
  { id: 'generative-engine', term: 'Generative engine', topic: 'GEO', def: 'A generative engine is an AI tool that writes an answer in its own words instead of listing links. ChatGPT, Perplexity, Gemini, and Google AI Overviews are examples.' },
  { id: 'ai-overviews', term: 'AI Overviews', topic: 'GEO', def: 'AI Overviews are the AI-written summaries Google shows at the top of some search results, with links to the pages they drew from.', href: '/blog/ai-overview-optimization.html', more: 'AI Overviews article' },
  { id: 'large-language-model', term: 'Large language model (LLM)', topic: 'GEO', def: 'A large language model is the kind of AI behind tools like ChatGPT. It is trained on large amounts of text and produces answers one word at a time.' },
  { id: 'citation', term: 'Citation (AI)', topic: 'GEO', def: 'In an AI answer, a citation is a link or named source the tool gives for a statement. Being cited is the main goal of GEO.', href: '/blog/get-mentioned-by-chatgpt.html', more: 'Getting cited article' },
  { id: 'retrieval', term: 'Retrieval', topic: 'GEO', def: 'Retrieval is when an AI tool looks up pages at the moment of the question and builds its answer from them, instead of relying only on what it learned in training.' },
  { id: 'entity', term: 'Entity', topic: 'GEO', def: 'An entity is a thing a search engine or AI tool knows as one item: a person, a business, a place, or a product. Consistent facts make an entity clear.', href: '/blog/entity-seo-knowledge-graph.html', more: 'Entity SEO article' },
  { id: 'knowledge-graph', term: 'Knowledge Graph', topic: 'GEO', def: 'The Knowledge Graph is Google\'s store of facts about entities and how they relate. It powers the information panels shown beside some results.' },
  { id: 'llms-txt', term: 'llms.txt', topic: 'GEO', def: 'llms.txt is a proposed text file that gives AI tools a short map of a site. It is a proposal, not a standard the major AI tools have committed to.', href: '/blog/llms-txt-ai-optimization.html', more: 'llms.txt article' },
  { id: 'ai-crawler', term: 'AI crawler', topic: 'GEO', def: 'An AI crawler is a program an AI company uses to read web pages. GPTBot and PerplexityBot are examples. They can be allowed or blocked in robots.txt.' },

  // Technical
  { id: 'crawling', term: 'Crawling', topic: 'Technical', def: 'Crawling is when a search engine program follows links and reads pages. A page has to be crawled before it can be indexed.' },
  { id: 'indexing', term: 'Indexing', topic: 'Technical', def: 'Indexing is when a search engine stores a page it has crawled so the page can appear in results. Not every crawled page is indexed.' },
  { id: 'crawl-budget', term: 'Crawl budget', topic: 'Technical', def: 'Crawl budget is how many pages a search engine will crawl on a site in a given time. It mostly matters for very large sites.' },
  { id: 'robots-txt', term: 'robots.txt', topic: 'Technical', def: 'robots.txt is a text file at the root of a site that tells crawlers which parts they may or may not read.' },
  { id: 'xml-sitemap', term: 'XML sitemap', topic: 'Technical', def: 'An XML sitemap is a file that lists the pages you want search engines to find. It is submitted through Google Search Console.' },
  { id: 'noindex', term: 'noindex', topic: 'Technical', def: 'noindex is a tag that tells search engines not to show a page in results. It is useful for thank-you pages and harmful when left on by mistake.' },
  { id: 'canonical-tag', term: 'Canonical tag', topic: 'Technical', def: 'A canonical tag tells search engines which URL is the main version when the same content can be reached at more than one address.' },
  { id: 'redirect-301', term: '301 redirect', topic: 'Technical', def: 'A 301 redirect sends visitors and search engines from an old URL to a new one for good, and passes on the value of the old page.' },
  { id: 'structured-data', term: 'Structured data', topic: 'Technical', def: 'Structured data is code added to a page that labels its content in a standard way, so machines can read what the page is about without guessing.', href: '/blog/schema-markup-guide.html', more: 'Schema markup article' },
  { id: 'schema-markup', term: 'Schema markup', topic: 'Technical', def: 'Schema markup is structured data written with the Schema.org vocabulary. Common types are Organization, Article, Product, and FAQPage.', href: '/blog/schema-markup-guide.html', more: 'Schema markup article' },
  { id: 'json-ld', term: 'JSON-LD', topic: 'Technical', def: 'JSON-LD is the format Google recommends for structured data. It is a small block of code in the page that sits apart from the visible content.' },
  { id: 'core-web-vitals', term: 'Core Web Vitals', topic: 'Technical', def: 'Core Web Vitals are three Google measures of page experience: LCP for loading, INP for responsiveness, and CLS for visual stability.', href: '/blog/core-web-vitals-guide.html', more: 'Core Web Vitals article' },
  { id: 'lcp', term: 'LCP (Largest Contentful Paint)', topic: 'Technical', def: 'LCP is the time it takes for the largest piece of content on the screen to load. Google counts 2.5 seconds or less as good.' },
  { id: 'inp', term: 'INP (Interaction to Next Paint)', topic: 'Technical', def: 'INP is how quickly a page responds after a tap, click, or key press. Google counts 200 milliseconds or less as good.' },
  { id: 'cls', term: 'CLS (Cumulative Layout Shift)', topic: 'Technical', def: 'CLS measures how much the layout jumps while a page loads. Google counts a score of 0.1 or less as good.' },
  { id: 'mobile-first-indexing', term: 'Mobile-first indexing', topic: 'Technical', def: 'Mobile-first indexing means Google uses the mobile version of a page to index and rank it.' },
  { id: 'alt-text', term: 'Alt text', topic: 'Technical', def: 'Alt text is a short written description of an image in the HTML. Screen readers read it aloud and search engines use it to understand the image.' },

  // Local
  { id: 'local-seo', term: 'Local SEO', topic: 'Local', def: 'Local SEO is the work of getting a business found on Google Maps and in local search results by nearby customers.', href: '/services/local-seo.html', more: 'Local SEO services' },
  { id: 'google-business-profile', term: 'Google Business Profile', topic: 'Local', def: 'A Google Business Profile is the free listing that shows a business on Google Maps and in local results, with its address, hours, photos, and reviews.', href: '/blog/google-my-business-optimization.html', more: 'Business Profile article' },
  { id: 'map-pack', term: 'Map pack', topic: 'Local', def: 'The map pack is the box of three local businesses with a map that Google shows for local searches.' },
  { id: 'nap', term: 'NAP', topic: 'Local', def: 'NAP stands for name, address, and phone number. These should be exactly the same everywhere a business is listed.' },
  { id: 'local-citation', term: 'Local citation', topic: 'Local', def: 'A local citation is any listing of a business name, address, and phone number on another site, such as a directory.', href: '/blog/local-citation-building.html', more: 'Citation building article' },

  // Analytics
  { id: 'google-search-console', term: 'Google Search Console', topic: 'Analytics', def: 'Google Search Console is a free Google tool that shows how a site performs in search: which searches it appears for, which pages are indexed, and what problems Google found.' },
  { id: 'ga4', term: 'Google Analytics 4 (GA4)', topic: 'Analytics', def: 'Google Analytics 4 is Google\'s free tool for measuring what visitors do on a site, including where they came from and whether they got in touch.' },
  { id: 'impressions', term: 'Impressions', topic: 'Analytics', def: 'Impressions are the number of times a page appeared in search results, whether or not anyone clicked.' },
  { id: 'ctr', term: 'CTR (click-through rate)', topic: 'Analytics', def: 'CTR is the share of impressions that turned into clicks. Ten clicks from two hundred impressions is a CTR of 5 percent.' },
  { id: 'average-position', term: 'Average position', topic: 'Analytics', def: 'Average position is the average place a page held in search results across all the searches it appeared for.' },
  { id: 'key-event', term: 'Key event', topic: 'Analytics', def: 'A key event is an action in Google Analytics 4 that you mark as important, such as a form sent or a call started. It was called a conversion in older versions.' },
];

export const glossary = [...terms].sort((a, b) =>
  a.term.localeCompare(b.term, 'en', { sensitivity: 'base' })
);

export const termById = (id: string) => terms.find((t) => t.id === id);
