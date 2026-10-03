// Builders for JSON-LD structured data. Keeping these here means every page
// emits consistent, valid schema and the same Person entity.
import { SITE, SAME_AS } from './consts';

const abs = (path: string) => new URL(path, SITE.url).href;

export const personId = abs('/#person');
export const siteId = abs('/#website');

export function person(extra: Record<string, unknown> = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: SITE.name,
    url: SITE.url + '/',
    jobTitle: SITE.role,
    description: `${SITE.name} is a freelance ${SITE.role.toLowerCase()} in ${SITE.location} who helps businesses get found through SEO, AEO, GEO, and AI automation.`,
    email: `mailto:${SITE.email}`,
    telephone: SITE.tel,
    // Stable URL, not an Astro-processed asset: those carry content hashes
    // that change on every rebuild, which would break the entity over time.
    image: abs('/nisarth-patel.jpg'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    knowsAbout: [
      'Search Engine Optimization',
      'Answer Engine Optimization',
      'Generative Engine Optimization',
      'AI automation',
      'Web development',
      'Digital marketing',
    ],
    sameAs: SAME_AS,
    ...extra,
  };
}

export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': siteId,
    url: SITE.url + '/',
    name: SITE.name,
    description: SITE.tagline,
    publisher: { '@id': personId },
    inLanguage: 'en',
  };
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function professionalService(services: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: abs('/services.html'),
    description: SITE.tagline,
    provider: { '@id': personId },
    areaServed: 'Worldwide',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s },
      })),
    },
  };
}

export function service(item: {
  name: string;
  serviceType: string;
  description: string;
  url: string;
  areaServed?: string | Record<string, unknown>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: item.name,
    serviceType: item.serviceType,
    description: item.description,
    url: abs(item.url),
    provider: { '@id': personId },
    areaServed: item.areaServed || 'Worldwide',
  };
}

export function creativeWork(item: {
  name: string;
  description: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.name,
    description: item.description,
    about: item.category,
    creator: { '@id': personId },
  };
}

export function article(item: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  speakable?: string[];
}) {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.headline,
    description: item.description,
    image: abs(SITE.ogImage),
    author: { '@type': 'Person', name: SITE.name, url: abs('/about.html') },
    publisher: { '@type': 'Person', name: SITE.name },
    datePublished: item.datePublished,
    dateModified: item.dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(item.url) },
  };
  // Marks the passage a voice assistant should read aloud. The legacy pages
  // carried this and it is worth keeping for AEO.
  if (item.speakable && item.speakable.length) {
    node.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: item.speakable,
    };
  }
  return node;
}

export function blogIndex(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': abs('/blog.html'),
    name: `${SITE.name} blog`,
    description:
      'Practical articles on SEO, AEO, GEO, AI automation, and web development.',
    publisher: { '@id': personId },
    blogPost: items.map((i) => ({
      '@type': 'BlogPosting',
      headline: i.name,
      url: abs(i.url),
    })),
  };
}

export function caseStudy(item: {
  name: string;
  description: string;
  url: string;
  client: string;
  started?: string;
  finished?: string;
  keywords?: string[];
}) {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.name,
    description: item.description,
    url: abs(item.url),
    creator: { '@id': personId },
    author: { '@id': personId },
    about: item.client,
    inLanguage: 'en',
  };
  if (item.started) node.dateCreated = item.started;
  if (item.finished) node.datePublished = item.finished;
  if (item.keywords && item.keywords.length) node.keywords = item.keywords.join(', ');
  return node;
}

/**
 * Review nodes for the ProfessionalService. Only ever called with testimonials
 * a client actually wrote and gave permission to publish, and reviewRating is
 * omitted unless they gave a real rating.
 */
export function reviews(
  items: {
    quote: string;
    name: string;
    role?: string;
    company?: string;
    date?: string;
    rating?: number;
  }[],
  aggregate: { value: number; count: number } | null
) {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': abs('/#service'),
    name: SITE.name,
    url: abs('/services.html'),
    provider: { '@id': personId },
    review: items.map((t) => {
      const r: Record<string, unknown> = {
        '@type': 'Review',
        reviewBody: t.quote,
        author: {
          '@type': 'Person',
          name: t.name,
          ...(t.role ? { jobTitle: t.role } : {}),
          ...(t.company ? { worksFor: { '@type': 'Organization', name: t.company } } : {}),
        },
        itemReviewed: { '@id': abs('/#service') },
      };
      if (t.date) r.datePublished = t.date;
      if (typeof t.rating === 'number') {
        r.reviewRating = { '@type': 'Rating', ratingValue: t.rating, bestRating: 5 };
      }
      return r;
    }),
  };
  if (aggregate) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregate.value,
      reviewCount: aggregate.count,
      bestRating: 5,
    };
  }
  return node;
}

/**
 * Occupation, employment and credential facts folded into the Person entity.
 * Pass only confirmed records; anything empty is left out entirely rather than
 * emitted as a hollow node.
 */
export function personCareer(input: {
  roles?: { title: string; company?: string; companyUrl?: string; start: string; end?: string }[];
  education?: { qualification: string; institution: string; institutionUrl?: string }[];
  credentials?: { name: string; issuer: string; year: string; url?: string }[];
}) {
  const extra: Record<string, unknown> = {};
  const roles = input.roles || [];
  const education = input.education || [];
  const credentials = input.credentials || [];

  if (roles.length) {
    extra.hasOccupation = roles.map((r) => ({
      '@type': 'Occupation',
      name: r.title,
      occupationLocation: { '@type': 'City', name: 'Ahmedabad' },
    }));
    // The current role is the one with no end date.
    const current = roles.find((r) => !r.end) || roles[0];
    // Employer names are optional: a role can be published without one.
    if (current.company) {
      extra.worksFor = {
        '@type': 'Organization',
        name: current.company,
        ...(current.companyUrl ? { url: current.companyUrl } : {}),
      };
    }
  }
  if (education.length) {
    extra.alumniOf = education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.institution,
      ...(e.institutionUrl ? { url: e.institutionUrl } : {}),
    }));
  }
  if (credentials.length) {
    extra.hasCredential = credentials.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.name,
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: c.issuer },
      dateCreated: c.year,
      ...(c.url ? { url: c.url } : {}),
    }));
  }
  return extra;
}
