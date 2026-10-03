// Work history, education and credentials.
//
// Nothing here is invented. Entries come from Nisarth's resume and his answers
// on 2026-10-03. He asked for roles and education to show without employer
// names, so `company` is left out on purpose. Anything unconfirmed stays
// `draft: true` and is excluded from the build.
//
// One rule to hold: the roles here must agree with SITE.experienceYears in
// consts.ts (2.5 years). If the timeline changes, change both.

export interface Role {
  draft?: boolean;
  title: string;
  /** Left out when the employer should not be named. */
  company?: string;
  /** Company website, used for Organization.sameAs in schema. */
  companyUrl?: string;
  /** YYYY-MM. */
  start: string;
  /** YYYY-MM, or omitted if this is the current role. */
  end?: string;
  employmentType?: 'Freelance' | 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  location?: string;
  summary: string;
  highlights?: string[];
}

export interface Education {
  draft?: boolean;
  qualification: string;
  institution: string;
  institutionUrl?: string;
  /** YYYY, or YYYY-YYYY. */
  years: string;
  summary?: string;
}

export interface Credential {
  draft?: boolean;
  name: string;
  issuer: string;
  /** YYYY. */
  year: string;
  /** Public verification link, if the issuer provides one. */
  url?: string;
}

export const roles: Role[] = [
  {
    title: 'SEO and Digital Marketing Specialist',
    start: '2026-01',
    employmentType: 'Full-time',
    summary:
      'Full SEO and content audits for client websites, content planning built on search intent, AEO and GEO work, and technical SEO. The figures below combine my own work and work done with the team.',
    highlights: [
      'Worked on 100+ client projects and 50+ website audits',
      '1,000+ keywords optimised, with 500+ on page one and 100+ in positions 1 to 3',
      '1,000+ queries showing client content in Google AI Overviews and citations',
      '500+ pages and 1,000+ blogs and articles created and added to client sites',
    ],
  },
  {
    title: 'SEO Analyst',
    start: '2025-07',
    end: '2025-12',
    summary:
      'In-house role as the only person handling SEO and site maintenance for the company portfolio of 80+ websites.',
    highlights: ['On-page optimisation, Google Search Console monitoring, and website updates'],
  },
  {
    title: 'React.js Frontend Developer',
    start: '2025-03',
    end: '2025-05',
    employmentType: 'Internship',
    summary: 'Built responsive UI screens in React.js and integrated REST APIs with the backend team.',
  },
  {
    title: 'React and React Native Developer',
    start: '2024-07',
    end: '2024-12',
    employmentType: 'Internship',
    summary:
      'Built reusable UI components, Redux app state, and React Native mobile UI on production projects.',
  },
  {
    title: 'SEO Executive',
    start: '2023-09',
    end: '2024-06',
    employmentType: 'Part-time',
    summary:
      'Part-time alongside the B.Tech. Learned SEO from the basics and handled off-page work: link building and keyword research, plus email marketing and social media posting.',
  },
];

export const education: Education[] = [
  {
    qualification: 'B.Tech, Computer Engineering',
    institution: 'Silver Oak University, Ahmedabad',
    years: '2021-2025',
  },
];

export const credentials: Credential[] = [
  {
    // Year to confirm with Nisarth: he said it was earned "recently".
    name: 'Google Analytics 4 (GA4)',
    issuer: 'Udemy',
    year: '2026',
    url: 'https://www.udemy.com/certificate/UC-6c2f4f5c-d234-4a93-bb6d-091259937bac/',
  },
];

const live = <T extends { draft?: boolean }>(items: T[]) => items.filter((i) => !i.draft);

/** Confirmed roles, newest first. */
export const publishedRoles = live(roles).sort((a, b) => b.start.localeCompare(a.start));
export const publishedEducation = live(education);
export const publishedCredentials = live(credentials).sort((a, b) =>
  b.year.localeCompare(a.year)
);

/** True once there is anything worth showing an Experience section for. */
export const hasExperience =
  publishedRoles.length > 0 ||
  publishedEducation.length > 0 ||
  publishedCredentials.length > 0;
