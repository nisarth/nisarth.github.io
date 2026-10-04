// Resume content for the /resume.html page. Roles, education and certificates
// come from src/data/experience.ts, so they are written once. Everything here
// was confirmed by Nisarth on 2026-10-03. Employer names are left out on
// purpose, here and in the public PDF.

export const resumeSummary =
  'SEO specialist with 2.5 years of experience. In my current role I have worked on 100+ client projects and 50+ website audits, on my own and with the team. My work covers technical SEO, content built on search intent, and answer engine optimization (AEO) and generative engine optimization (GEO). I hold a B.Tech in Computer Engineering and have worked as a React.js developer, which helps when working with developers on technical fixes.';

export const resumeStatus = 'Open to remote roles and freelance projects.';

export const resumeSkills: { group: string; items: string[] }[] = [
  {
    group: 'SEO',
    items: [
      'Technical SEO', 'On-page SEO', 'Off-page SEO', 'SEO audits', 'Content audits', 'Keyword research',
      'Link building', 'Internal linking', 'Core Web Vitals', 'Structured data', 'Local SEO', 'E-E-A-T',
    ],
  },
  {
    group: 'AI search',
    items: [
      'Answer engine optimization (AEO)', 'Generative engine optimization (GEO)', 'Google AI Overviews',
      'LLM visibility', 'AI content automation', 'Prompt writing', 'Claude AI', 'ChatGPT',
    ],
  },
  {
    group: 'Tools',
    items: [
      'Google Analytics 4', 'Google Search Console', 'SEMrush', 'Ahrefs', 'Screaming Frog',
      'PageSpeed Insights', 'Google Tag Manager', 'WordPress',
    ],
  },
  {
    group: 'Content and marketing',
    items: ['Content planning', 'Competitor analysis', 'Blogging', 'Email marketing', 'Social media marketing'],
  },
  {
    group: 'Development',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'React Native', 'Node.js', 'REST APIs', 'Git', 'Figma'],
  },
];

export const resumeDownloads = [
  {
    label: 'Resume (PDF)',
    note: 'Two pages, plain layout that job application systems can read.',
    href: '/downloads/nisarth-patel-resume.pdf',
    file: 'Nisarth-Patel-Resume.pdf',
    primary: true,
  },
  {
    label: 'Client profile, India (PDF)',
    note: 'One page for local businesses. Local SEO first.',
    href: '/downloads/nisarth-patel-profile-india.pdf',
    file: 'Nisarth-Patel-Profile-India.pdf',
    primary: false,
  },
  {
    label: 'Client profile, international (PDF)',
    note: 'One page for remote clients. AEO and GEO first.',
    href: '/downloads/nisarth-patel-profile-international.pdf',
    file: 'Nisarth-Patel-Profile-International.pdf',
    primary: false,
  },
];
