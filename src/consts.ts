// Single source of truth for site-wide identity and links.
// Keeping these in one place keeps the name, role, and contact details
// identical on every page, which helps search and AI answer engines treat
// Nisarth as one clear entity.

export const SITE = {
  url: 'https://nisarth.github.io',
  name: 'Nisarth Patel',
  // One consistent role wording sitewide.
  role: 'Digital Growth Specialist',
  tagline: 'SEO, AEO, GEO, and AI automation for businesses that want to be found.',
  location: 'Ahmedabad, Gujarat, India',
  experienceYears: 2.5,
  email: 'pnisarth@gmail.com',
  // Display and tel forms of the same number.
  whatsappDisplay: '+91 7016353896',
  whatsappLink: 'https://wa.me/917016353896',
  tel: '+917016353896',
  ogImage: '/og-image.png',
};

export const SOCIAL = {
  linkedin: 'https://www.linkedin.com/in/nisarthpatel/',
  twitter: 'https://x.com/nisarthpatel_',
  github: 'https://github.com/nisarth',
};

// Used for Person.sameAs in structured data.
export const SAME_AS = [SOCIAL.linkedin, SOCIAL.twitter, SOCIAL.github];

export const NAV = [
  { label: 'Work', href: '/work.html' },
  { label: 'Services', href: '/services.html' },
  { label: 'Process', href: '/process.html' },
  { label: 'About', href: '/about.html' },
  { label: 'Blog', href: '/blog.html' },
  { label: 'Contact', href: '/contact.html' },
];

// Google Analytics 4 measurement id. Loads only after consent.
export const GA_ID = 'G-372JGPFET7';
