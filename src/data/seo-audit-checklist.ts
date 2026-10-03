// The SEO audit checklist. General good practice, written in plain words.
// Each check has a short reason so the list teaches as well as tests.

export interface Check {
  id: string;
  label: string;
  why: string;
}

export interface CheckGroup {
  id: string;
  name: string;
  intro: string;
  // Shown beside the group name when a group does not apply to every site.
  note?: string;
  checks: Check[];
}

export const checklist: CheckGroup[] = [
  {
    id: 'crawl',
    name: 'Crawling and indexing',
    intro: 'If search engines cannot reach and store a page, nothing else on this list matters. Start here.',
    checks: [
      { id: 'robots', label: 'robots.txt does not block pages that should rank', why: 'One wrong line can hide a whole section of the site.' },
      { id: 'sitemap', label: 'An XML sitemap lists only live, indexable pages and is sent to Google Search Console', why: 'It tells search engines which pages you want found.' },
      { id: 'indexed', label: 'The important pages show as indexed in Search Console', why: 'The Page indexing report shows which pages are in and why others are out.' },
      { id: 'noindex', label: 'No important page carries a noindex tag by mistake', why: 'A leftover noindex from a test site is a common cause of missing pages.' },
      { id: 'one-version', label: 'The site loads on one address only (https, and either www or not), with the others redirecting', why: 'Two live versions split links and confuse search engines.' },
      { id: 'canonical', label: 'Canonical tags point to the right URL', why: 'They tell search engines which copy of a page is the main one.' },
      { id: 'broken-links', label: 'There are no broken internal links or long redirect chains', why: 'Both waste crawl time and send visitors to dead ends.' },
      { id: 'removed-pages', label: 'Removed pages redirect to the closest live page', why: 'This keeps the value of links that pointed to the old page.' },
    ],
  },
  {
    id: 'structure',
    name: 'Site structure and internal links',
    intro: 'Links inside your own site show search engines which pages matter and how topics connect.',
    checks: [
      { id: 'three-clicks', label: 'Every important page can be reached within three clicks from the home page', why: 'Pages buried deep get crawled less and rank less.' },
      { id: 'orphans', label: 'No page is left without a link pointing to it', why: 'A page with no internal links is hard to find for both people and crawlers.' },
      { id: 'anchor-text', label: 'Link text says what the linked page is about', why: '"SEO services" tells more than "click here".' },
      { id: 'urls', label: 'URLs are short, readable, and do not change', why: 'A stable URL keeps its history and its links.' },
      { id: 'breadcrumbs', label: 'Breadcrumbs show where each page sits', why: 'They help visitors and can appear in search results.' },
    ],
  },
  {
    id: 'on-page',
    name: 'On-page basics',
    intro: 'Each page should match one search, and say so clearly in the places search engines read first.',
    checks: [
      { id: 'title', label: 'Every page has its own title with the main search term in it', why: 'The title is the headline people see in search results.' },
      { id: 'description', label: 'Every page has its own meta description', why: 'It does not change ranking, but a clear one earns more clicks.' },
      { id: 'h1', label: 'Each page has one main heading (H1)', why: 'It states the single topic of the page.' },
      { id: 'heading-order', label: 'Headings go in order: H1, then H2, then H3', why: 'A clean outline is easier to read and easier to quote.' },
      { id: 'one-intent', label: 'Each page targets one search need, and no two pages compete for the same one', why: 'Two pages on the same search weaken each other.' },
      { id: 'alt-text', label: 'Images have a short text description', why: 'It helps people using screen readers and helps image search.' },
      { id: 'answer-first', label: 'The page answers its main question in the first lines', why: 'Readers stay, and search engines can lift the answer.' },
    ],
  },
  {
    id: 'content',
    name: 'Content quality and trust',
    intro: 'Search engines look for signs that real, accountable people stand behind the content.',
    checks: [
      { id: 'thin', label: 'There are no thin pages with only a few lines of real content', why: 'Many weak pages can pull down how the whole site is judged.' },
      { id: 'duplicate', label: 'No two pages say the same thing in different words', why: 'Merge them into one stronger page.' },
      { id: 'fresh', label: 'Old content has been reviewed and shows when it was last updated', why: 'Out-of-date facts cost trust and rankings.' },
      { id: 'author', label: 'It is clear who wrote the content and who runs the site', why: 'A named author and a real About page are basic trust signals.' },
      { id: 'sources', label: 'Numbers and claims link to a source', why: 'Sourced facts are more likely to be trusted and cited.' },
      { id: 'contact', label: 'Contact details are easy to find', why: 'A business that can be reached reads as a real business.' },
    ],
  },
  {
    id: 'speed',
    name: 'Speed and mobile',
    intro: 'Google measures page experience with Core Web Vitals. PageSpeed Insights reports all three for free.',
    checks: [
      { id: 'lcp', label: 'Main content loads within 2.5 seconds (LCP)', why: 'This is how fast the page feels to load.' },
      { id: 'inp', label: 'The page reacts to a tap or click within 200 milliseconds (INP)', why: 'This is how fast the page feels to use.' },
      { id: 'cls', label: 'The layout shift score is under 0.1 (CLS)', why: 'Content that jumps while loading causes wrong taps.' },
      { id: 'images', label: 'Images are compressed, sized for their slot, and in a modern format', why: 'Heavy images are the most common cause of slow pages.' },
      { id: 'mobile', label: 'On a phone, text is readable without zooming and buttons are easy to tap', why: 'Google indexes the mobile version of the site first.' },
      { id: 'popups', label: 'No popup covers the content as soon as the page opens', why: 'It blocks readers and can count against the page.' },
    ],
  },
  {
    id: 'schema',
    name: 'Structured data',
    intro: 'Structured data labels the parts of a page so machines do not have to guess.',
    checks: [
      { id: 'org-schema', label: 'The site has Organization or LocalBusiness schema', why: 'It states who the business is, in a form machines read directly.' },
      { id: 'page-schema', label: 'Pages use the schema type that fits: Article, Product, Service, or FAQPage', why: 'The right type says what kind of page it is.' },
      { id: 'breadcrumb-schema', label: 'Breadcrumb schema matches the visible breadcrumbs', why: 'It can replace the plain URL in search results.' },
      { id: 'schema-valid', label: 'The Rich Results Test shows no errors', why: 'Broken markup is ignored.' },
    ],
  },
  {
    id: 'ai',
    name: 'AI answers (AEO and GEO)',
    intro: 'AI tools build answers from pages they can read and trust. These checks make your pages easy to use as a source.',
    checks: [
      { id: 'question-headings', label: 'Key questions appear as headings, with a short direct answer right below', why: 'A self-contained answer is easy to lift and quote.' },
      { id: 'ai-crawlers', label: 'robots.txt does not block AI crawlers such as GPTBot and PerplexityBot (if you want to be cited)', why: 'A blocked crawler cannot read or cite the page.' },
      { id: 'entity', label: 'The business name, address, and description are the same on the site and on every profile', why: 'Matching details help tools see one clear business.' },
      { id: 'html-content', label: 'The main content is in the page itself, not loaded later by scripts', why: 'Many crawlers do not run scripts.' },
      { id: 'ai-test', label: 'You have asked ChatGPT, Perplexity, and Google the questions your buyers ask, and noted who gets named', why: 'This is the starting point you measure against.' },
    ],
  },
  {
    id: 'local',
    name: 'Local search',
    note: 'Skip this group if you do not serve a local area',
    intro: 'For businesses with nearby customers, the Google Business Profile matters as much as the website.',
    checks: [
      { id: 'gbp', label: 'The Google Business Profile is claimed and fully filled in', why: 'It is what shows on Google Maps and in the map pack.' },
      { id: 'nap', label: 'Name, address, and phone number match everywhere they are listed', why: 'Mismatched details weaken trust in the listing.' },
      { id: 'reviews', label: 'There are recent reviews, and every review has a reply', why: 'Reviews affect both ranking and whether people choose you.' },
      { id: 'location-page', label: 'The site has a page for each location with the address and a map', why: 'It backs up the profile with the same facts.' },
    ],
  },
  {
    id: 'tracking',
    name: 'Tracking',
    intro: 'Without a starting point there is no way to tell whether the work is helping.',
    checks: [
      { id: 'gsc', label: 'Google Search Console is set up and verified', why: 'It is the only direct view of how Google sees the site.' },
      { id: 'ga4', label: 'Google Analytics 4 is installed and counts enquiries as key events', why: 'Traffic only matters if it turns into leads.' },
      { id: 'baseline', label: 'Current clicks, impressions, and enquiries are written down', why: 'This is what later numbers are compared with.' },
      { id: 'monthly', label: 'Someone checks these numbers every month', why: 'Problems are cheaper to fix when caught early.' },
    ],
  },
];

export const totalChecks = checklist.reduce((sum, g) => sum + g.checks.length, 0);
