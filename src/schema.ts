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
