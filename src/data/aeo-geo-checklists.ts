// The AEO and GEO checklists. Same shape as the SEO audit checklist, so all
// three share one page component. General good practice in plain words.
import type { CheckGroup } from './seo-audit-checklist';

export const aeoChecklist: CheckGroup[] = [
  {
    id: 'base',
    name: 'The base',
    intro: 'A page is rarely picked as an answer unless it already ranks. These come first.',
    checks: [
      { id: 'indexed', label: 'The page is indexed and already appears for its main question', why: 'Answer features are almost always drawn from pages that rank on the first page.' },
      { id: 'one-question', label: 'The page has one clear main question it sets out to answer', why: 'A page that tries to answer everything is hard to quote for anything.' },
      { id: 'fast-mobile', label: 'The page loads fast and reads well on a phone', why: 'Most question searches, and nearly all voice searches, happen on phones.' },
      { id: 'researched', label: 'You have a list of the real questions your buyers ask', why: 'People Also Ask, Search Console queries, and your own inbox are the best sources.' },
    ],
  },
  {
    id: 'questions',
    name: 'Questions as headings',
    intro: 'Search engines match a question in a search to a question on a page.',
    checks: [
      { id: 'question-heading', label: 'Each key question is a heading, worded the way people ask it', why: '"How long does a root canal take?" matches a search better than "Duration".' },
      { id: 'one-per-heading', label: 'Each heading holds one question, not two joined together', why: 'One question gets one clean answer.' },
      { id: 'heading-order', label: 'Headings go in order with no skipped levels', why: 'A clear outline helps the engine find where each answer starts and ends.' },
      { id: 'natural-wording', label: 'Questions use plain, spoken wording', why: 'Voice searches are full sentences, not keyword strings.' },
    ],
  },
  {
    id: 'answers',
    name: 'The answer itself',
    intro: 'The first lines under a question decide whether the passage can be lifted out.',
    checks: [
      { id: 'answer-first', label: 'The answer comes in the first one or two sentences under the question', why: 'Engines lift the opening lines. Background can follow.' },
      { id: 'self-contained', label: 'The answer makes sense when read on its own', why: 'It will be shown without the rest of your page around it.' },
      { id: 'definition-form', label: 'Definitions use a plain "X is Y" form', why: 'This is the shape most "what is" snippets take.' },
      { id: 'named-subject', label: 'The answer names its subject instead of saying "it" or "this"', why: 'A quoted line with no subject means nothing.' },
      { id: 'no-fluff', label: 'There is no lead-in before the answer', why: 'Lines like "Great question" push the real answer out of the lifted passage.' },
      { id: 'detail-after', label: 'Detail, examples, and exceptions come after the short answer', why: 'Readers who need more keep reading, and nothing is lost.' },
    ],
  },
  {
    id: 'format',
    name: 'The right format',
    intro: 'Featured snippets come as paragraphs, lists, or tables. Match the shape to the question.',
    checks: [
      { id: 'steps-list', label: 'Steps and how-to answers use a numbered list', why: 'List snippets are built from real list markup.' },
      { id: 'compare-table', label: 'Comparisons use a real HTML table', why: 'Table snippets come from tables, not from text laid out to look like one.' },
      { id: 'options-bullets', label: 'Sets of options or types use a bulleted list', why: 'It is easier to scan and easier to lift.' },
      { id: 'not-image', label: 'Answers are text, not text inside an image', why: 'Engines cannot quote what they cannot read.' },
    ],
  },
  {
    id: 'schema',
    name: 'Schema',
    intro: 'Markup removes guesswork about what is on the page. It supports the content. It does not replace it.',
    checks: [
      { id: 'faq-schema', label: 'Question and answer sections carry FAQPage schema', why: 'It labels each question and its answer as a pair.' },
      { id: 'schema-matches', label: 'The schema text matches the visible text exactly', why: 'Markup for content that is not on the page breaks Google rules.' },
      { id: 'article-schema', label: 'Articles carry Article schema with author and dates', why: 'It shows who wrote the piece and how current it is.' },
      { id: 'org-schema', label: 'The site has Organization or LocalBusiness schema', why: 'It ties the answers to a named, real business.' },
      { id: 'validated', label: 'The Rich Results Test shows no errors', why: 'Broken markup is ignored.' },
    ],
  },
  {
    id: 'voice-local',
    name: 'Voice and local answers',
    note: 'The last two checks only apply if you serve a local area',
    intro: 'Voice assistants give one answer, often taken from business listing data.',
    checks: [
      { id: 'spoken', label: 'Key answers read well when spoken aloud', why: 'Read them out. Long, tangled sentences fail this test at once.' },
      { id: 'gbp-hours', label: 'Opening hours, address, and phone are correct on the Google Business Profile', why: 'These are the facts voice assistants read out for local questions.' },
      { id: 'near-me', label: 'The site states clearly where the business is and which areas it serves', why: 'It backs up "near me" answers with facts on your own pages.' },
    ],
  },
  {
    id: 'tracking',
    name: 'Tracking',
    intro: 'AEO has no single report, so progress is read from a few places.',
    checks: [
      { id: 'snippets-noted', label: 'You know which featured snippets the site holds today', why: 'This is the starting point to compare against.' },
      { id: 'paa-noted', label: 'You have noted which People Also Ask questions show your pages', why: 'They show which answers engines already trust you for.' },
      { id: 'question-queries', label: 'You watch impressions for question searches in Search Console', why: 'Impressions often rise before clicks do.' },
      { id: 'recheck', label: 'The same questions are re-checked every month', why: 'Answer features change hands often.' },
    ],
  },
];

export const geoChecklist: CheckGroup[] = [
  {
    id: 'access',
    name: 'Can AI tools read the site?',
    intro: 'A tool that cannot reach or read a page cannot cite it. Start here.',
    checks: [
      { id: 'crawlers-allowed', label: 'robots.txt allows the AI crawlers you want, such as GPTBot, OAI-SearchBot, and PerplexityBot', why: 'A blocked crawler means that tool cannot read your pages.' },
      { id: 'no-blanket-block', label: 'No firewall or bot rule blocks them by accident', why: 'Security settings sometimes block AI crawlers without anyone choosing to.' },
      { id: 'html-content', label: 'The main content is in the HTML, not loaded later by scripts', why: 'Many AI crawlers do not run JavaScript.' },
      { id: 'no-wall', label: 'Key pages are not behind a login, a popup, or a consent wall', why: 'A crawler stops where a wall starts.' },
      { id: 'fast', label: 'Pages respond quickly', why: 'Live lookups work on short time limits, and slow pages get skipped.' },
    ],
  },
  {
    id: 'findable',
    name: 'Can they find it?',
    intro: 'For live answers, AI tools search first. Pages that rank get read.',
    checks: [
      { id: 'ranks', label: 'The page ranks in normal search for the questions it answers', why: 'Most cited sources are pages that already rank well.' },
      { id: 'sitemap', label: 'The sitemap is up to date and submitted', why: 'It helps every crawler find the pages that matter.' },
      { id: 'linked', label: 'Important pages are linked from other pages on the site', why: 'Crawlers follow links. A page with none is easy to miss.' },
      { id: 'bing', label: 'The site is set up in Bing Webmaster Tools as well as Google', why: 'Some AI tools draw on the Bing index.' },
    ],
  },
  {
    id: 'citable',
    name: 'Is the content easy to cite?',
    intro: 'AI tools lift passages. A passage is usable when it is clear, factual, and complete on its own.',
    checks: [
      { id: 'standalone', label: 'Key statements make sense without the rest of the page', why: 'The tool quotes a line or two, not the whole page.' },
      { id: 'named', label: 'Statements name the business or subject instead of saying "we" or "it"', why: 'A quoted line needs to say who it is about.' },
      { id: 'facts', label: 'Pages state plain facts: what, where, how much, and for whom', why: 'Facts can be quoted. Slogans cannot.' },
      { id: 'numbers-sourced', label: 'Numbers come with a source and a date', why: 'Sourced figures are more likely to be trusted and repeated.' },
      { id: 'dated', label: 'Content shows when it was published and last updated', why: 'Tools favour answers they can tell are current.' },
      { id: 'clear-headings', label: 'Each section has a heading that says what it answers', why: 'Headings help the tool find the right passage.' },
      { id: 'definitions', label: 'Important terms are defined in one plain sentence', why: 'Definitions are among the most quoted passages.' },
    ],
  },
  {
    id: 'entity',
    name: 'Is the business one clear entity?',
    intro: 'The clearer and more consistent the facts about a business, the more confidently a tool can name it.',
    checks: [
      { id: 'about-page', label: 'An About page says who runs the business, where, and what it does', why: 'It is the first place a tool looks for the basic facts.' },
      { id: 'same-details', label: 'The name, address, and description match on the site and on every profile', why: 'Conflicting details make a tool less sure it is one business.' },
      { id: 'org-schema', label: 'Organization or Person schema lists those facts', why: 'It states them in a form machines read directly.' },
      { id: 'same-as', label: 'The schema links to the official profiles with sameAs', why: 'It tells tools which profiles belong to the business.' },
      { id: 'authors', label: 'Articles name their author, with a short bio', why: 'Named authorship is a trust signal.' },
    ],
  },
  {
    id: 'mentions',
    name: 'Is it mentioned elsewhere?',
    intro: 'AI tools lean on what other sites say about a business, not only on its own site.',
    checks: [
      { id: 'profiles', label: 'The business has complete profiles on the platforms that matter in its field', why: 'These are common sources for AI answers.' },
      { id: 'reviews', label: 'There are real, recent reviews on trusted platforms', why: 'Reviews are often used when a tool recommends a business.' },
      { id: 'third-party', label: 'Relevant sites, directories, or news pieces mention the business', why: 'Independent mentions carry more weight than self-description.' },
      { id: 'consistent-claims', label: 'What other sites say matches what your own site says', why: 'Agreement across sources builds confidence.' },
    ],
  },
  {
    id: 'tracking',
    name: 'Tracking',
    intro: 'Measuring GEO is still rough. A simple, repeated test is the most honest method.',
    checks: [
      { id: 'question-list', label: 'You have written down the questions your buyers would ask an AI tool', why: 'The same list is used every time, so results can be compared.' },
      { id: 'baseline', label: 'You have asked ChatGPT, Perplexity, Gemini, and Google, and noted who was named', why: 'This is the starting point.' },
      { id: 'competitors', label: 'You have noted which competitors are named, and for what', why: 'It shows what the tools consider a good source in your field.' },
      { id: 'referrals', label: 'Google Analytics 4 is checked for visits from AI tools', why: 'It is a second signal beside the manual test.' },
      { id: 'schedule', label: 'The test is repeated on a fixed schedule', why: 'Answers change often, so one check tells you little.' },
    ],
  },
];
