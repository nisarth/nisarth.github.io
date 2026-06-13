// Data for service-area (city) pages. Each city record is hand-written with its
// own local context so no two pages read alike. This keeps the pages unique and
// useful, which is what separates real service-area pages from doorway spam.

export interface CityFaq {
  q: string;
  a: string;
}

export interface CityRecord {
  slug: string;
  name: string;
  region: string; // state or emirate or country region
  country: string;
  primaryKeyword: string;
  title: string;
  description: string;
  h1: string;
  definition: string;
  // Two short unique paragraphs about the local market.
  context: string[];
  faqs: CityFaq[];
  nearby: string[];
}

export const cities: CityRecord[] = [
  {
    slug: 'mumbai',
    name: 'Mumbai',
    region: 'Maharashtra',
    country: 'India',
    primaryKeyword: 'SEO and digital marketing in Mumbai',
    title: 'SEO & Digital Marketing in Mumbai | Nisarth Patel',
    description:
      'SEO and digital marketing in Mumbai for businesses that want to be found. Search, AEO, AI automation, and web development for India’s most competitive market.',
    h1: 'SEO and digital marketing in Mumbai',
    definition:
      'I provide SEO and digital marketing in Mumbai, helping local businesses get found in search and AI answers and turn that into leads.',
    context: [
      'Mumbai is India’s financial and commercial capital, home to banking and finance, media and entertainment, real estate, and a fast-growing startup scene. That density makes it one of the most competitive digital markets in the country, so generic tactics rarely move the needle here.',
      'Winning search in Mumbai means sharp keyword targeting, genuinely useful content, and technical SEO that beats well-funded competitors. I focus on the searches that lead to revenue for your specific niche, whether you serve South Mumbai, the suburbs, or the wider MMR region.',
    ],
    faqs: [
      {
        q: 'Do you work with Mumbai businesses remotely?',
        a: 'Yes. I work remote-first with Mumbai businesses across calls, email, and shared dashboards, so location is never a barrier to the work.',
      },
      {
        q: 'Is SEO worth it in a market as competitive as Mumbai?',
        a: 'Yes, with the right focus. Rather than chasing the most contested head terms, I target the specific, high-intent searches in your niche where you can realistically rank and win leads.',
      },
      {
        q: 'Can you help a Mumbai startup with both growth and automation?',
        a: 'Yes. Many Mumbai startups need leads and lean operations. I combine SEO and AEO for visibility with AI automation to handle follow-up and reporting without extra headcount.',
      },
    ],
    nearby: ['pune', 'surat', 'ahmedabad'],
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    region: 'Delhi NCR',
    country: 'India',
    primaryKeyword: 'SEO and digital marketing in Delhi',
    title: 'SEO & Digital Marketing in Delhi NCR | Nisarth Patel',
    description:
      'SEO and digital marketing in Delhi NCR for businesses across the capital region. Search, AEO, AI automation, and web development for retail, services, and SMEs.',
    h1: 'SEO and digital marketing in Delhi NCR',
    definition:
      'I provide SEO and digital marketing in Delhi NCR, helping businesses across the capital region rank in search and AI answers and win more enquiries.',
    context: [
      'Delhi and the wider NCR (Gurugram, Noida, Faridabad, Ghaziabad) hold one of India’s largest concentrations of small and mid-sized businesses, alongside retail, education, professional services, and a strong tech corridor. Buyers here research hard online before they choose.',
      'For Delhi businesses I focus on local intent across the NCR, clean technical SEO, and content that answers the questions buyers ask before purchase. That mix wins both classic search and the AI answers more NCR buyers now rely on.',
    ],
    faqs: [
      {
        q: 'Do you cover all of Delhi NCR, including Gurugram and Noida?',
        a: 'Yes. I treat Delhi NCR as one market and can target Gurugram, Noida, Faridabad, and Ghaziabad with location-specific pages and Google Business Profile work where it fits.',
      },
      {
        q: 'My Delhi business relies on walk-ins. Can you help?',
        a: 'Yes. Local SEO and a strong Google Business Profile put you in the map pack so nearby customers find and call you first.',
      },
      {
        q: 'Do you offer ongoing SEO or one-off projects for Delhi clients?',
        a: 'Both. Some Delhi clients need a single audit or fix, others prefer a monthly retainer. I am happy to do either.',
      },
    ],
    nearby: ['jaipur', 'indore', 'mumbai'],
  },
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    region: 'Karnataka',
    country: 'India',
    primaryKeyword: 'SEO and digital marketing in Bengaluru',
    title: 'SEO & Digital Marketing in Bengaluru | Nisarth Patel',
    description:
      'SEO and digital marketing in Bengaluru for tech, SaaS, and growing brands. Search, AEO and GEO, AI automation, and fast web development for India’s startup capital.',
    h1: 'SEO and digital marketing in Bengaluru',
    definition:
      'I provide SEO and digital marketing in Bengaluru, helping tech companies and growing brands rank in search and get cited in AI answers.',
    context: [
      'Bengaluru is India’s technology and startup capital, dense with SaaS companies, IT firms, and deep-tech founders. Audiences here are digitally savvy and compare options closely, so content has to be genuinely expert, not surface level.',
      'For Bengaluru businesses I lean into technical and content SEO plus AEO and GEO, because a tech-literate market increasingly searches through AI tools. Getting cited by ChatGPT, Perplexity, and AI Overviews is a real edge in this city.',
    ],
    faqs: [
      {
        q: 'Do you work with SaaS and tech startups in Bengaluru?',
        a: 'Yes. SaaS and tech is a strong fit. I focus on product-led content, technical SEO, and AEO and GEO so your product shows up when buyers and AI tools research solutions.',
      },
      {
        q: 'Can you help us get cited by AI tools like ChatGPT?',
        a: 'Yes. That is what GEO does: factual, well-structured, consistent content that AI tools trust and quote when answering buyer questions in your space.',
      },
      {
        q: 'We have a developer team already. What do you add?',
        a: 'I bring the search and AEO and GEO strategy, content structure, and structured data that developers often do not have time to own, and I work alongside your team.',
      },
    ],
    nearby: ['hyderabad', 'chennai', 'pune'],
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    region: 'Telangana',
    country: 'India',
    primaryKeyword: 'SEO and digital marketing in Hyderabad',
    title: 'SEO & Digital Marketing in Hyderabad | Nisarth Patel',
    description:
      'SEO and digital marketing in Hyderabad for IT, pharma, and local businesses. Search, AEO, AI automation, and web development across HITEC City and the wider metro.',
    h1: 'SEO and digital marketing in Hyderabad',
    definition:
      'I provide SEO and digital marketing in Hyderabad, helping IT, pharma, and local businesses get found in search and AI answers.',
    context: [
      'Hyderabad pairs a major IT hub in HITEC City and Gachibowli with strong pharma and biotech industries and a steady local business base. The city has grown fast, and so has the online competition for attention.',
      'For Hyderabad businesses I match the approach to the audience: technical and content SEO for IT and B2B, and local SEO with Google Business Profile work for clinics, stores, and service firms across the metro.',
    ],
    faqs: [
      {
        q: 'Do you serve businesses in HITEC City and Gachibowli?',
        a: 'Yes. I work with B2B and IT firms in the tech corridor as well as local businesses across greater Hyderabad, remote-first.',
      },
      {
        q: 'Can you help a Hyderabad pharma or B2B company with SEO?',
        a: 'Yes. B2B and pharma need precise, trustworthy content and technical SEO. I target the specific buyer searches in your niche and build content that earns rankings and citations.',
      },
      {
        q: 'Do you do local SEO for Hyderabad clinics and stores?',
        a: 'Yes. I optimize your Google Business Profile, build local citations, and set up a review system so nearby customers find you in the map pack.',
      },
    ],
    nearby: ['bengaluru', 'chennai', 'mumbai'],
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    region: 'Tamil Nadu',
    country: 'India',
    primaryKeyword: 'SEO and digital marketing in Chennai',
    title: 'SEO & Digital Marketing in Chennai | Nisarth Patel',
    description:
      'SEO and digital marketing in Chennai for manufacturing, IT, and healthcare businesses. Search, AEO, AI automation, and web development across the metro.',
    h1: 'SEO and digital marketing in Chennai',
    definition:
      'I provide SEO and digital marketing in Chennai, helping manufacturing, IT, and healthcare businesses get found online and win more leads.',
    context: [
      'Chennai is a manufacturing and automotive powerhouse, often called the Detroit of India, with strong IT, healthcare, and a growing SaaS scene. Many businesses here are export-facing or serve niche B2B markets.',
      'For Chennai businesses I focus on intent-rich B2B and industrial keywords, clear technical SEO, and content that builds trust with buyers who research thoroughly. For local services, I add Google Business Profile and local SEO to capture nearby demand.',
    ],
    faqs: [
      {
        q: 'Do you work with manufacturing and B2B firms in Chennai?',
        a: 'Yes. Industrial and B2B is a strong fit. I target the specific product and service searches your buyers use and build content that earns their trust and their enquiry.',
      },
      {
        q: 'Can you help a Chennai business reach export or national buyers?',
        a: 'Yes. Beyond local search, I target national and international buyer keywords and use AEO and GEO so your business appears in the answers buyers get from AI tools.',
      },
      {
        q: 'Do you build websites for Chennai businesses too?',
        a: 'Yes. I build fast, SEO-ready sites, which matters for B2B buyers who judge credibility by how quickly and clearly your site loads.',
      },
    ],
    nearby: ['bengaluru', 'hyderabad', 'mumbai'],
  },
  {
    slug: 'pune',
    name: 'Pune',
    region: 'Maharashtra',
    country: 'India',
    primaryKeyword: 'SEO and digital marketing in Pune',
    title: 'SEO & Digital Marketing in Pune | Nisarth Patel',
    description:
      'SEO and digital marketing in Pune for IT, automotive, and education businesses. Search, AEO, AI automation, and web development across the city.',
    h1: 'SEO and digital marketing in Pune',
    definition:
      'I provide SEO and digital marketing in Pune, helping IT, automotive, and education businesses get found in search and AI answers.',
    context: [
      'Pune blends a strong IT and automotive industry with one of India’s largest student populations, which gives it a young, digitally active audience and a busy education and services market.',
      'For Pune businesses I target the searches that matter for your sector, from B2B IT and manufacturing to local education and consumer services, and pair SEO with AEO so you show up in both classic and AI-driven search.',
    ],
    faqs: [
      {
        q: 'Do you work with education and coaching businesses in Pune?',
        a: 'Yes. Pune’s large student base makes education a strong niche. I target course and admission-related searches and build content that answers what students and parents ask.',
      },
      {
        q: 'Can you help a Pune IT or automotive B2B company?',
        a: 'Yes. I focus on precise B2B keywords, technical SEO, and credibility content that wins enquiries from buyers who compare carefully.',
      },
      {
        q: 'Do you offer automation for Pune businesses?',
        a: 'Yes. I build n8n, Make, and Zapier workflows and AI chatbots so lead follow-up and routine tasks run on their own.',
      },
    ],
    nearby: ['mumbai', 'bengaluru', 'surat'],
  },
  {
    slug: 'ahmedabad',
    name: 'Ahmedabad',
    region: 'Gujarat',
    country: 'India',
    primaryKeyword: 'SEO and digital marketing in Ahmedabad',
    title: 'SEO & Digital Marketing in Ahmedabad | Nisarth Patel',
    description:
      'SEO and digital marketing in Ahmedabad from a local specialist. Search, AEO, AI automation, and web development for textiles, pharma, and growing local brands.',
    h1: 'SEO and digital marketing in Ahmedabad',
    definition:
      'I am an Ahmedabad-based specialist providing SEO and digital marketing in Ahmedabad, helping local businesses get found in search and AI answers.',
    context: [
      'Ahmedabad is my home city and Gujarat’s commercial heart, strong in textiles, pharma, chemicals, and manufacturing, with a fast-growing startup and services scene. Being based here means I understand the local market first-hand.',
      'For Ahmedabad businesses I combine local SEO and a strong Google Business Profile for nearby demand with broader SEO and AEO for those selling across Gujarat, India, or for export. Local knowledge plus modern search tactics is the edge.',
    ],
    faqs: [
      {
        q: 'Are you actually based in Ahmedabad?',
        a: 'Yes. Ahmedabad is my home city, so I know the local market directly and can meet where it makes sense, while most of the work runs efficiently online.',
      },
      {
        q: 'Do you work with textile, pharma, and manufacturing firms?',
        a: 'Yes. These are core Ahmedabad industries. I target the specific B2B and export searches your buyers use and build content that wins their trust.',
      },
      {
        q: 'Can you help a small local Ahmedabad business get more customers?',
        a: 'Yes. Local SEO, a strong Google Business Profile, and reviews put you in front of nearby customers searching for what you offer.',
      },
    ],
    nearby: ['surat', 'mumbai', 'indore'],
  },
  {
    slug: 'surat',
    name: 'Surat',
    region: 'Gujarat',
    country: 'India',
    primaryKeyword: 'SEO and digital marketing in Surat',
    title: 'SEO & Digital Marketing in Surat | Nisarth Patel',
    description:
      'SEO and digital marketing in Surat for diamond, textile, and trading businesses. Search, AEO, AI automation, and web development for one of India’s fastest-growing cities.',
    h1: 'SEO and digital marketing in Surat',
    definition:
      'I provide SEO and digital marketing in Surat, helping diamond, textile, and trading businesses get found online and reach buyers worldwide.',
    context: [
      'Surat is the world’s diamond-cutting hub and a textile giant, and one of India’s fastest-growing cities. Many businesses here sell far beyond the city, to national and international buyers, which makes online visibility crucial.',
      'For Surat businesses I focus on the export and B2B searches that bring real buyers, strong product and catalog content, and AEO and GEO so your business appears when buyers research suppliers through AI tools.',
    ],
    faqs: [
      {
        q: 'Do you work with diamond and textile exporters in Surat?',
        a: 'Yes. These are core Surat industries. I target the buyer and product searches used by national and international clients, and build content that wins trust.',
      },
      {
        q: 'My Surat business sells across India and abroad. Can SEO reach them?',
        a: 'Yes. I target non-local, buyer-intent keywords and use AEO and GEO so your business shows up in search and AI answers wherever your buyers are.',
      },
      {
        q: 'Do you build websites for Surat exporters?',
        a: 'Yes. A fast, clear, SEO-ready site builds credibility with overseas buyers and helps you rank for the products you sell.',
      },
    ],
    nearby: ['ahmedabad', 'mumbai', 'pune'],
  },
  {
    slug: 'jaipur',
    name: 'Jaipur',
    region: 'Rajasthan',
    country: 'India',
    primaryKeyword: 'SEO and digital marketing in Jaipur',
    title: 'SEO & Digital Marketing in Jaipur | Nisarth Patel',
    description:
      'SEO and digital marketing in Jaipur for tourism, handicrafts, jewellery, and education businesses. Search, AEO, AI automation, and web development across the Pink City.',
    h1: 'SEO and digital marketing in Jaipur',
    definition:
      'I provide SEO and digital marketing in Jaipur, helping tourism, handicraft, and education businesses get found in search and AI answers.',
    context: [
      'Jaipur, the Pink City, runs on tourism, handicrafts, gems and jewellery, and a growing education and IT base. Many businesses here sell to visitors and to buyers across India and abroad, so search visibility reaches well beyond the city.',
      'For Jaipur businesses I focus on tourism and product searches, strong visual and descriptive content, and local SEO for hotels, stores, and services, plus AEO so travelers who ask AI tools find your business.',
    ],
    faqs: [
      {
        q: 'Do you work with tourism and hospitality businesses in Jaipur?',
        a: 'Yes. Tourism is central to Jaipur. I target travel and booking-related searches and optimize your Google Business Profile so visitors find you when planning their trip.',
      },
      {
        q: 'Can you help a Jaipur handicraft or jewellery brand sell online?',
        a: 'Yes. I target product and buyer searches, improve product content, and use AEO and GEO so your brand appears in search and AI answers for shoppers nationwide.',
      },
      {
        q: 'Do you serve education businesses in Jaipur?',
        a: 'Yes. I target course and admission searches and build content that answers what students and parents look for before they enrol.',
      },
    ],
    nearby: ['delhi', 'indore', 'ahmedabad'],
  },
  {
    slug: 'indore',
    name: 'Indore',
    region: 'Madhya Pradesh',
    country: 'India',
    primaryKeyword: 'SEO and digital marketing in Indore',
    title: 'SEO & Digital Marketing in Indore | Nisarth Patel',
    description:
      'SEO and digital marketing in Indore for trading, food, education, and IT businesses. Search, AEO, AI automation, and web development for the commercial hub of Madhya Pradesh.',
    h1: 'SEO and digital marketing in Indore',
    definition:
      'I provide SEO and digital marketing in Indore, helping trading, food, and education businesses get found online and grow their reach.',
    context: [
      'Indore is the commercial capital of Madhya Pradesh, known for trading, a famous food industry, education, and a fast-growing IT and startup scene. Competition online is lighter than in the metros, which makes good SEO especially rewarding here.',
      'For Indore businesses I target the searches your buyers actually use, build genuinely useful content, and add local SEO for stores and services. Lower competition means well-executed SEO can win rankings faster than in saturated metro markets.',
    ],
    faqs: [
      {
        q: 'Is SEO easier to win in Indore than in metro cities?',
        a: 'Often yes. Competition is lighter than in Mumbai or Bengaluru, so focused, well-executed SEO can rank a business faster and at lower cost.',
      },
      {
        q: 'Do you work with Indore food and trading businesses?',
        a: 'Yes. These are strong local industries. I target the product and buyer searches that bring real enquiries and build content that stands out.',
      },
      {
        q: 'Can you help an Indore startup with automation too?',
        a: 'Yes. I build n8n, Make, and Zapier workflows and AI chatbots so lean Indore teams can handle more without extra staff.',
      },
    ],
    nearby: ['ahmedabad', 'jaipur', 'mumbai'],
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    region: 'Dubai',
    country: 'United Arab Emirates',
    primaryKeyword: 'SEO and digital marketing in Dubai',
    title: 'SEO & Digital Marketing in Dubai | Nisarth Patel',
    description:
      'SEO and digital marketing in Dubai for trade, real estate, and retail businesses. Remote-first search, AEO, AI automation, and web development for a competitive global market.',
    h1: 'SEO and digital marketing in Dubai',
    definition:
      'I provide remote SEO and digital marketing in Dubai, helping trade, real estate, and retail businesses get found in search and AI answers.',
    context: [
      'Dubai is a global hub for trade, tourism, real estate, and luxury retail, with a multilingual, international audience and some of the highest digital ad spend in the region. Buyers expect polished, fast, credible online experiences.',
      'For Dubai businesses I focus on high-intent English-language search, fast SEO-ready websites, and AEO and GEO, because a digitally mature, AI-curious market rewards businesses that show up in modern answer engines as well as classic search.',
    ],
    faqs: [
      {
        q: 'Do you work with Dubai businesses from India?',
        a: 'Yes. I work remote-first, and the time zones overlap well. Many Dubai businesses prefer this for quality work at competitive rates.',
      },
      {
        q: 'Is the Dubai market very competitive for SEO?',
        a: 'Yes, especially in real estate, retail, and services. I focus on specific, high-intent searches where you can realistically rank, rather than the most contested terms.',
      },
      {
        q: 'Can you build a fast website for my Dubai business?',
        a: 'Yes. I build fast, SEO-ready sites that load quickly and read well, which matters for the polished experience Dubai buyers expect.',
      },
    ],
    nearby: ['mumbai', 'london', 'ahmedabad'],
  },
  {
    slug: 'london',
    name: 'London',
    region: 'England',
    country: 'United Kingdom',
    primaryKeyword: 'SEO and digital marketing in London',
    title: 'SEO & Digital Marketing in London | Nisarth Patel',
    description:
      'Remote SEO and digital marketing in London for finance, professional services, and tech businesses. Search, AEO, AI automation, and fast web development at competitive rates.',
    h1: 'SEO and digital marketing in London',
    definition:
      'I provide remote SEO and digital marketing in London, helping finance, professional services, and tech businesses get found in search and AI answers.',
    context: [
      'London is a global centre for finance, professional services, technology, and creative industries, with one of the most competitive and mature search markets in the world. Buyers research deeply and expect expertise.',
      'For London businesses I focus on precise, high-intent search, genuinely expert content, and AEO and GEO, since a sophisticated market increasingly checks AI answers before deciding. Remote work keeps the quality high and the rates competitive.',
    ],
    faqs: [
      {
        q: 'Can you handle SEO for a London business remotely from India?',
        a: 'Yes. I work remote-first with clear reporting and regular calls. London clients get experienced search work at competitive rates, with good working-hours overlap.',
      },
      {
        q: 'London search is very competitive. How do you compete?',
        a: 'By targeting specific, high-intent searches and niches where you can win, building genuinely expert content, and using AEO and GEO to appear in AI answers ahead of slower rivals.',
      },
      {
        q: 'Do you work with London professional services and finance firms?',
        a: 'Yes. These sectors need precise, trustworthy content and strong technical SEO. I target the exact searches your clients use and build credibility content that converts.',
      },
    ],
    nearby: ['dubai', 'mumbai', 'bengaluru'],
  },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
