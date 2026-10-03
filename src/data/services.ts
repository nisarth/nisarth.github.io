// Data for the dedicated service pages. Each record is written individually so
// every generated page has unique, useful content (not a template swap).
// Primary keyword belongs in title, description, h1, first paragraph, and one h2.

export interface ServiceFaq {
  q: string;
  a: string;
}

// A longer explainer section. General knowledge about how the work is done,
// never a claim about a client or a result.
export interface ServiceGuide {
  heading: string;
  body?: string[];
  points?: string[];
}

export interface ServiceRecord {
  guide?: ServiceGuide[];
  slug: string;
  name: string;
  primaryKeyword: string;
  // Short phrase used to compose unique city combo intros.
  outcome: string;
  title: string;
  description: string;
  h1: string;
  // Definition-first opening line in the form "X is a Y that does Z".
  definition: string;
  intro: string;
  included: string[];
  whoFor: string;
  faqs: ServiceFaq[];
  related: string[];
}

export const services: ServiceRecord[] = [
  {
    slug: 'seo',
    name: 'SEO',
    primaryKeyword: 'SEO services',
    outcome: 'rank in Google for the searches that bring real leads',
    title: 'SEO Services for Businesses | Nisarth Patel',
    description:
      'SEO services that help your business rank in Google for the searches your buyers actually type. Technical audits, content, and on-page work that drives organic leads.',
    h1: 'SEO services that bring in organic leads',
    definition:
      'SEO is the work of making a website rank in Google for the searches its buyers actually type.',
    intro:
      'My SEO services start with the searches that lead to sales, not vanity keywords. I find where your site is held back, fix it, and build content that earns rankings and keeps them. The goal is steady organic traffic that turns into real enquiries, tracked in plain language you can follow.',
    included: [
      'Technical SEO audit and fixes (crawling, indexing, speed, structured data)',
      'Keyword research mapped to buyer intent',
      'On-page optimization for titles, headings, and content',
      'Content strategy and briefs built to rank',
      'Internal linking and site structure',
      'Monthly tracking of rankings, traffic, and leads',
    ],
    whoFor:
      'Good for businesses that get little or no traffic from Google and want a clear, honest path to more organic leads.',
    faqs: [
      {
        q: 'How long does SEO take to show results?',
        a: 'Most sites see early movement in 2 to 3 months and stronger results by 6 months. Google itself says it usually takes four months to a year to see the full benefit. Technical fixes can help faster, while content and authority build over time. I give you a realistic timeline up front.',
      },
      {
        q: 'Do you guarantee a number one ranking?',
        a: 'No honest SEO can guarantee a specific position, because Google decides rankings. What I guarantee is sound, white-hat work, clear reporting, and steady progress on the metrics that matter.',
      },
      {
        q: 'Is SEO better than paid ads?',
        a: 'They do different jobs. Ads bring traffic the moment you pay and stop when you stop. SEO takes longer but keeps working without ongoing ad spend. Many businesses use both.',
      },
    ],
    guide: [
      {
        heading: 'How SEO works',
        body: [
          'Google finds pages by following links, a step called crawling. It stores what it reads in a huge list called the index. When someone searches, it picks pages from that index and puts them in order. A page that was never crawled or indexed cannot rank at all, however good it is.',
          'SEO work makes each of those steps go well for your site. It falls into three parts, and a site needs all three.',
        ],
        points: [
          'Technical SEO makes sure search engines can crawl, load, and index the site. It covers speed, mobile layout, sitemaps, robots.txt, canonical tags, and structured data.',
          'On-page SEO matches each page to one search need. It covers titles, headings, the copy itself, images, and internal links.',
          'Off-page SEO earns trust from outside the site, mainly through links and mentions from other relevant sites.',
        ],
      },
      {
        heading: 'What an SEO audit checks',
        body: [
          'An audit is a full health check of the site. It shows what is holding the site back and what to fix first.',
        ],
        points: [
          'Can Google crawl and index the pages that matter?',
          'Are there duplicate pages or wrong canonical tags?',
          'Do titles and headings match what people search for?',
          'Is any content thin, out of date, or competing with another page on the same site?',
          'How fast do pages load, measured by Core Web Vitals?',
          'Do internal links point to the important pages?',
          'Is the structured data valid?',
          'Which searches already show the site in Google Search Console?',
        ],
      },
      {
        heading: 'Topics, not single keywords',
        body: [
          'Search engines now judge whether a site covers a topic well, not whether one page repeats a phrase. So the plan starts with topics. Related searches are grouped together, one strong main page covers the topic, and smaller pages answer the narrower questions around it.',
          'Those pages link to each other, so both readers and search engines can see how they connect. This is often called a topic cluster, and it is how a small site builds authority in its field.',
        ],
      },
      {
        heading: 'How SEO progress is measured',
        body: [
          'Google Search Console shows how often the site appears in search, how many people click, and the average position. Google Analytics 4 shows what those visitors do next, including enquiries.',
          'Rankings alone are not the goal. A report should tie search visibility to visits and to leads, in words you can follow.',
        ],
      },
    ],
    related: ['local-seo', 'aeo', 'web-development'],
  },
  {
    slug: 'aeo',
    name: 'AEO',
    primaryKeyword: 'AEO services',
    outcome: 'get quoted in featured snippets and AI answers',
    title: 'AEO Services: Get Cited by AI Answers | Nisarth Patel',
    description:
      'AEO services (answer engine optimization) that get your business quoted in featured snippets, voice search, and AI answers. Direct-answer content and FAQ schema that win the answer.',
    h1: 'AEO services to win the answer, not just the click',
    definition:
      'AEO (answer engine optimization) is the work of structuring content so search engines and AI tools quote your business as the answer.',
    intro:
      'Search is shifting from a list of links to a single answer. My AEO services make your content the one that gets read aloud, shown in a featured snippet, or pulled into an AI answer. That means clear, direct answers, the right schema, and pages built the way answer engines read them.',
    included: [
      'Direct-answer content written in a definition-first style',
      'FAQ and HowTo schema markup',
      'Featured snippet and People Also Ask targeting',
      'Voice search optimization',
      'Content structure and formatting for extraction',
      'Tracking of snippet and answer wins',
    ],
    whoFor:
      'Good for businesses that rank but get few clicks because Google answers the query on the results page, and those who want a head start on AI search.',
    faqs: [
      {
        q: 'What is the difference between AEO and SEO?',
        a: 'SEO aims to rank a page in the list of results. AEO aims to be the direct answer shown above or instead of that list, such as a featured snippet or a voice result. AEO builds on solid SEO.',
      },
      {
        q: 'How do you get content into a featured snippet?',
        a: 'By answering the exact question clearly in the first lines, using the right format (paragraph, list, or table), adding FAQ schema, and matching the wording people actually search. There is no trick, just structure and clarity.',
      },
      {
        q: 'Does AEO help with voice search?',
        a: 'Yes. Voice assistants read out a single answer, usually the featured snippet. The same direct-answer structure that wins snippets is what wins voice results.',
      },
    ],
    guide: [
      {
        heading: 'How answer engines pick an answer',
        body: [
          'When a search is a question, Google often shows one answer above the normal results. This can be a featured snippet, a People Also Ask box, or a spoken reply from a voice assistant. The engine looks for a page that states the answer clearly, close to the question, in a short passage that makes sense on its own.',
          'Snippets come in three main shapes: a short paragraph, a list, or a table. Which one shows depends on the question. A "what is" question usually gets a paragraph, a "how to" question gets a list, and a comparison gets a table.',
        ],
      },
      {
        heading: 'How content is written for answers',
        points: [
          'Put the question in a heading, worded the way people ask it.',
          'Answer it in the first one or two sentences under that heading.',
          'Define terms in a plain "X is Y" form.',
          'Use numbered lists for steps and tables for comparisons.',
          'Give the short answer first, then add the detail below it.',
          'Keep each answer complete on its own, so it still makes sense when lifted out of the page.',
        ],
      },
      {
        heading: 'Schema that supports AEO',
        body: [
          'Schema markup labels the parts of a page for machines. FAQPage marks questions and answers, Article marks who wrote a piece and when, and Organization or LocalBusiness marks who is behind the site.',
          'One honest note: since 2023 Google shows FAQ rich results for only a small set of sites. Schema is still worth adding because it makes the page easier for search engines and AI tools to understand, but it does not promise a special look in the results.',
        ],
      },
      {
        heading: 'Zero-click searches',
        body: [
          'Many searches now end on the results page, because the answer is shown right there. That can mean fewer clicks even when the site ranks well.',
          'AEO accepts this and aims to make your business the named source of the answer. People see your name at the moment they are looking, and the ones who need more than a short answer still click through.',
        ],
      },
      {
        heading: 'How AEO progress is measured',
        body: [
          'Progress shows up as featured snippets won, questions in People Also Ask where the site appears, and impressions for question searches in Google Search Console.',
        ],
      },
    ],
    related: ['geo', 'seo', 'local-seo'],
  },
  {
    slug: 'geo',
    name: 'GEO',
    primaryKeyword: 'GEO services',
    outcome: 'get cited by AI tools like ChatGPT and Perplexity',
    title: 'GEO Services: Get Cited by ChatGPT and AI Search | Nisarth Patel',
    description:
      'GEO services (generative engine optimization) that get your business mentioned and cited by ChatGPT, Perplexity, Gemini, and Google AI Overviews. Content built for AI retrieval.',
    h1: 'GEO services to get your business cited by AI',
    definition:
      'GEO (generative engine optimization) is the work of getting a business mentioned and cited by AI tools like ChatGPT, Perplexity, and Google AI Overviews.',
    intro:
      'More buyers now ask an AI tool before they ever open Google. My GEO services make your business one of the sources those tools trust and cite. That means clear factual content, a consistent entity across the web, and the structure AI models use to decide who to quote.',
    included: [
      'Content written to be quoted by AI answer engines',
      'Entity consistency across your site and the web',
      'Structured data and an llms.txt file for AI crawlers',
      'Factual, self-contained answers that survive without context',
      'Citations and source signals that build trust',
      'Monitoring of AI mentions where it can be measured',
    ],
    whoFor:
      'Good for businesses that want to be visible in AI answers from ChatGPT, Perplexity, Gemini, and Google AI Overviews, ahead of slower competitors.',
    faqs: [
      {
        q: 'What is the difference between GEO and AEO?',
        a: 'AEO targets answer features inside search engines, like snippets and voice. GEO targets generative AI tools such as ChatGPT and Perplexity that write an answer and cite sources. They overlap, and I usually do them together.',
      },
      {
        q: 'Can you really influence what ChatGPT says?',
        a: 'You cannot control it, but you can strongly influence it. AI tools pull from the open web and cite sources they find clear and trustworthy. Well-structured, factual, consistent content makes your business far more likely to be that source.',
      },
      {
        q: 'How do you measure GEO results?',
        a: 'By prompting the major AI tools with buyer questions and tracking whether your business is mentioned or cited over time, alongside referral traffic from AI tools where it is reported.',
      },
    ],
    guide: [
      {
        heading: 'How AI tools choose their sources',
        body: [
          'AI tools answer in two ways. Some answers come from what the model learned when it was trained. Others come from a live search: the tool looks up pages, reads them, writes an answer, and lists the pages it used. Perplexity, ChatGPT with search, and Google AI Overviews work the second way.',
          'For those live answers, the tool needs to find your page, read it without trouble, and pull out a passage it can trust. GEO is the work of making all three easy.',
        ],
      },
      {
        heading: 'What makes a page easy to cite',
        points: [
          'Statements that make sense on their own, without the rest of the page.',
          'Plain facts: who, what, where, how much, and when.',
          'Dates on content, so the tool can tell it is current.',
          'Sources for any numbers.',
          'Clear headings that say what each section answers.',
          'Text in the page itself, not hidden behind scripts or inside images.',
        ],
      },
      {
        heading: 'Entities: being one clear business',
        body: [
          'Search engines and AI tools treat a business as an entity: one thing with a name, a place, and a set of facts. If your name, address, and description differ from site to site, the tool is less sure they are the same business.',
          'So the same details should appear on your website, your Google Business Profile, LinkedIn, and any directory that lists you. Organization and Person schema with links to those profiles ties them together.',
        ],
      },
      {
        heading: 'AI crawlers and llms.txt',
        body: [
          'AI companies use their own crawlers, such as GPTBot and PerplexityBot. If robots.txt blocks them, their tools cannot read the site. The first check is simply that the crawlers you want are allowed in.',
          'llms.txt is a proposed file that gives AI tools a short map of a site. It is a proposal, not a rule the big AI tools have promised to follow. It costs little to add, but it does not replace clear content.',
        ],
      },
      {
        heading: 'How GEO progress is measured',
        body: [
          'Measuring GEO is still rough, and it is better to say so. The practical method is to ask the main AI tools the questions your buyers ask, on a fixed schedule, and note whether your business is named or cited. Google Analytics 4 also shows visits that arrive from AI tools.',
        ],
      },
    ],
    related: ['aeo', 'seo', 'web-development'],
  },
  {
    slug: 'ai-automation',
    name: 'AI automation',
    primaryKeyword: 'AI automation services',
    outcome: 'automate routine work and follow-up to save hours each week',
    title: 'AI Automation Services (n8n, Make, Zapier) | Nisarth Patel',
    description:
      'AI automation services that connect your apps so routine work runs on its own. Custom n8n, Make, and Zapier workflows, AI chatbots, and lead pipelines that save hours each week.',
    h1: 'AI automation services that save you hours every week',
    definition:
      'AI automation is connecting your business tools and adding AI so repetitive work runs without you.',
    intro:
      'If your team copies data between apps, chases leads by hand, or sends the same messages over and over, that work can run on its own. My AI automation services design workflows in n8n, Make, and Zapier, add AI where it helps, and free your time for the work that needs a human.',
    included: [
      'Custom n8n, Make, and Zapier workflow builds',
      'AI chatbots for websites and WhatsApp',
      'Lead capture, routing, and CRM sync',
      'Automated follow-up and email sequences',
      'AI-assisted data entry, tagging, and reporting',
      'Self-hosted or cloud setup with documentation',
    ],
    whoFor:
      'Good for small teams and solo owners who lose hours to manual, repetitive tasks and want reliable automation without hiring more staff.',
    faqs: [
      {
        q: 'Which automation tool do you use, n8n or Zapier?',
        a: 'It depends on the job. Zapier and Make are quick for simple app-to-app tasks. n8n is better for complex logic, self-hosting, and lower long-term cost. I recommend the right fit for your case, not a one-size answer.',
      },
      {
        q: 'Do I need technical knowledge to use the automations?',
        a: 'No. I build and document the workflow so it runs in the background. You get a simple guide, and I am available if anything needs a change.',
      },
      {
        q: 'Can you add AI to my existing workflows?',
        a: 'Yes. I can plug AI into tools you already use for tasks like replying to enquiries, summarizing data, sorting leads, or drafting content, using the major LLM APIs.',
      },
    ],
    guide: [
      {
        heading: 'How an automation works',
        body: [
          'Every automation has the same three parts. A trigger starts it, such as a form being sent or a new row in a sheet. Steps then run in order, such as saving the details, sending an email, or posting a message. The result is the finished job, done the same way every time.',
          'A simple example: someone fills in the contact form, their details are saved to the CRM, they get a reply by email, and the owner gets a message on their phone. Nobody copies anything by hand.',
        ],
      },
      {
        heading: 'What is worth automating',
        body: ['Not every task should be automated. The good candidates share a few traits.'],
        points: [
          'The task repeats often.',
          'It follows the same rules each time.',
          'It moves data from one tool to another.',
          'A delay or a missed step costs you a lead or a customer.',
          'It does not need a judgment call or a sensitive conversation.',
        ],
      },
      {
        heading: 'Where AI fits in',
        body: [
          'Plain automation follows fixed rules. AI adds the ability to read and write text. It can sum up a long enquiry, sort leads by what they ask for, or draft a reply.',
          'AI also makes mistakes. So anything that goes out to a customer should either be checked by a person first or be limited to simple, low-risk messages.',
        ],
      },
      {
        heading: 'Keeping an automation reliable',
        points: [
          'An alert when a step fails, so a broken workflow is noticed the same day.',
          'A log of what ran and when.',
          'A test with real cases before it goes live.',
          'Passwords and API keys stored safely, never inside the workflow text.',
          'A short written guide, so someone else can fix or change it later.',
        ],
      },
    ],
    related: ['web-development', 'seo', 'aeo'],
  },
  {
    slug: 'web-development',
    name: 'Web development',
    primaryKeyword: 'web development services',
    outcome: 'launch a fast, search-ready website that converts',
    title: 'Web Development Services: Fast, SEO-Ready Sites | Nisarth Patel',
    description:
      'Web development services for fast, accessible, SEO-ready websites that load in under a second. Clean static builds, strong Core Web Vitals, and structured data search engines can read.',
    h1: 'Web development services built for speed and search',
    definition:
      'Web development here is the work of building fast, accessible websites that search engines and AI tools can read easily.',
    intro:
      'A slow, hard-to-read site quietly costs you rankings and customers. My web development services build sites that load in under a second, work on every screen, and ship with the structured data and clean URLs search engines need. Speed and SEO are built in from the first line, not bolted on later.',
    included: [
      'Fast static and modern site builds',
      'Core Web Vitals and page speed optimization',
      'Structured data, clean URLs, and on-page SEO',
      'Mobile-first, accessible design (WCAG AA)',
      'Contact forms, lead capture, and basic analytics',
      'A simple way for you to update content',
    ],
    whoFor:
      'Good for businesses whose current site is slow, dated, or hard to update, and who want a site that helps them rank rather than holding them back.',
    faqs: [
      {
        q: 'What do you build websites with?',
        a: 'I favor fast static frameworks like Astro for content and marketing sites, because they load quickly and score well on Core Web Vitals. For heavier apps I use the right modern stack for the job.',
      },
      {
        q: 'Will my new site be good for SEO?',
        a: 'Yes. Every build ships with clean code, fast load times, semantic HTML, structured data, correct meta tags, and a sitemap, so it is ready to rank from day one.',
      },
      {
        q: 'Can I update the site myself afterward?',
        a: 'Yes. I set up a simple way for you to edit content and hand over clear instructions, so you are not locked into paying for every small change.',
      },
    ],
    guide: [
      {
        heading: 'Why speed matters',
        body: [
          'People leave slow pages, and Google measures speed as part of page experience. It uses three numbers called Core Web Vitals. Google counts a page as good when the main content loads within 2.5 seconds (LCP), the page reacts to a tap or click within 200 milliseconds (INP), and the layout shift score stays under 0.1 (CLS).',
          'Most slow sites share the same causes: heavy images, too much JavaScript, slow fonts, and too many third-party scripts. Fixing those is usually where the work starts.',
        ],
      },
      {
        heading: 'What makes a site easy for search engines to read',
        points: [
          'Real HTML headings in the right order, with one main heading per page.',
          'Content that is in the page itself, not loaded later by scripts.',
          'Short, clear URLs that do not change.',
          'A unique title and description on every page.',
          'A sitemap, a robots.txt file, and canonical tags.',
          'Structured data that says what the page and the business are.',
          'Links between related pages, so nothing is left on its own.',
        ],
      },
      {
        heading: 'What a static site is',
        body: [
          'A static site is built ahead of time into plain files. When someone visits, the server just sends the file. There is no database to wait for, so pages load fast and there is less to break or hack.',
          'Static builds suit business sites, portfolios, and blogs. They are not the right pick for an app where every user sees their own private data. This site is a static build made with Astro.',
        ],
      },
      {
        heading: 'Accessibility',
        body: [
          'An accessible site works for people who use a keyboard, a screen reader, or a small screen in bright light. The usual standard is WCAG level AA.',
        ],
        points: [
          'Text with enough contrast against its background.',
          'Every button and link reachable by keyboard, with a visible focus outline.',
          'Images with a text description.',
          'Form fields with clear labels and clear error messages.',
          'Motion that switches off for people who ask for reduced motion.',
        ],
      },
      {
        heading: 'What gets checked before launch',
        points: [
          'Old URLs redirect to the new ones, so existing rankings are not lost.',
          'Titles, descriptions, and structured data are in place on every page.',
          'The sitemap is sent to Google Search Console.',
          'Forms are tested from start to finish.',
          'The site is tested on a real phone.',
          'Speed is measured with PageSpeed Insights.',
          'Analytics only loads after the visitor agrees.',
        ],
      },
    ],
    related: ['seo', 'ai-automation', 'local-seo'],
  },
  {
    slug: 'local-seo',
    name: 'Local SEO',
    primaryKeyword: 'local SEO services',
    outcome: 'show up in the Google map pack for nearby searches',
    title: 'Local SEO Services: Rank on Google Maps | Nisarth Patel',
    description:
      'Local SEO services that get your business found on Google Maps and in local search. Google Business Profile optimization, local citations, and reviews that bring nearby customers.',
    h1: 'Local SEO services that bring nearby customers',
    definition:
      'Local SEO is the work of getting a business found on Google Maps and in local search results for nearby customers.',
    intro:
      'When someone nearby searches for what you offer, you want to be in the map pack at the top. My local SEO services optimize your Google Business Profile, build accurate local citations, and put a simple review system in place, so your business shows up first when local buyers are ready to act.',
    included: [
      'Google Business Profile setup and optimization',
      'Local keyword and category research',
      'Local citation building and cleanup (NAP consistency)',
      'Review strategy and response system',
      'Location and service-area page content',
      'Local rank tracking in the map pack',
    ],
    whoFor:
      'Good for shops, clinics, studios, and service businesses that serve a local area and need more calls, visits, and bookings from nearby searches.',
    faqs: [
      {
        q: 'What is the Google map pack?',
        a: 'The map pack is the box of three local businesses with a map that Google shows for local searches. Ranking there is one of the strongest ways to get calls and visits from nearby customers.',
      },
      {
        q: 'How important are reviews for local SEO?',
        a: 'Very. Review count, rating, and recency are major local ranking factors, and they directly affect whether someone chooses you. I set up a simple way to earn and respond to reviews.',
      },
      {
        q: 'I serve clients remotely, does local SEO still apply?',
        a: 'If you serve specific areas, yes, through service-area settings and location pages. If you serve everywhere with no local angle, broader SEO and AEO usually fit better.',
      },
    ],
    guide: [
      {
        heading: 'How local search works',
        body: [
          'When a search has local intent, such as "dentist near me", Google shows a map with three businesses above the normal results. Google says it ranks local results on three things.',
        ],
        points: [
          'Relevance: how well the business matches what the person searched for.',
          'Distance: how far the business is from the person or the place they named.',
          'Prominence: how well known the business is, based on reviews, links, and mentions across the web.',
        ],
      },
      {
        heading: 'What a Google Business Profile needs',
        body: [
          'The Business Profile is the listing that appears on Google Maps and in the map pack. A complete and correct profile is the base of all local SEO.',
        ],
        points: [
          'The real business name, address, phone number, and opening hours.',
          'The right main category, plus any extra ones that fit.',
          'A clear description and a full list of services.',
          'Recent photos of the place, the team, and the work.',
          'Regular updates, so the listing looks active.',
        ],
      },
      {
        heading: 'Citations and matching details',
        body: [
          'A citation is any listing of your business on another site, such as a directory or a review site. The name, address, and phone number should be the same everywhere. When they differ, Google is less sure which details are right, and customers can end up calling an old number.',
        ],
      },
      {
        heading: 'Reviews',
        body: [
          'Reviews affect both ranking and whether someone picks you. The honest way to earn them is to ask real customers soon after the job and make it easy with a direct link. Reply to every review, good or bad.',
          'Buying reviews or writing fake ones breaks Google rules and can get a listing removed.',
        ],
      },
      {
        heading: 'Local pages on your website',
        body: [
          'Your site should back up the profile. That means a page for each location or service area with real details: the address, the areas served, the services offered there, and a map. LocalBusiness schema repeats those facts in a form machines can read.',
        ],
      },
      {
        heading: 'How local SEO progress is measured',
        body: [
          'The Business Profile reports how many people called, asked for directions, or clicked through to the website. Together with map pack rankings for the main searches, those numbers show whether local visibility is turning into customers.',
        ],
      },
    ],
    related: ['seo', 'aeo', 'web-development'],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
