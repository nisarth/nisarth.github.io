// Work history, education and credentials.
//
// Nothing here is invented. Every entry starts as `draft: true` and is excluded
// from the build until Nisarth confirms it, so a half-filled record can never
// reach the live site. The draft entries below exist to document the shape.
//
// One rule to hold: the roles here must add up to the 2.5 years stated in
// consts.ts and across the site. If the real timeline says otherwise, change
// SITE.experienceYears rather than letting the two contradict each other.

export interface Role {
  draft?: boolean;
  title: string;
  company: string;
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
    draft: true,
    title: 'Job title',
    company: 'Company name',
    companyUrl: 'https://example.com',
    start: '2024-01',
    employmentType: 'Freelance',
    location: 'Ahmedabad, India',
    summary: 'One or two sentences on what the role involved and who it served.',
    highlights: [
      'Something specific that was achieved, with a number where one exists.',
    ],
  },
];

export const education: Education[] = [
  {
    draft: true,
    qualification: 'Degree or diploma',
    institution: 'Institution name',
    years: '2019-2022',
  },
];

export const credentials: Credential[] = [
  {
    draft: true,
    name: 'Certification name',
    issuer: 'Google, HubSpot, or whoever issued it',
    year: '2024',
    url: 'https://example.com/verify',
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
