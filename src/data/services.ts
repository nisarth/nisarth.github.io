// Data for the dedicated service pages. Each record is written individually so
// every generated page has unique, useful content (not a template swap).
// Primary keyword belongs in title, description, h1, first paragraph, and one h2.

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceRecord {
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
        a: 'Most sites see early movement in 2 to 3 months and stronger results by 6 months. Technical fixes can help faster, while content and authority build over time. I give you a realistic timeline up front.',
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
    related: ['seo', 'aeo', 'web-development'],
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
