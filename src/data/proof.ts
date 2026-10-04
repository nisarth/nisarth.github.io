// Numbers and industries Nisarth confirmed on 2026-10-03. Nothing here is
// estimated or rounded up by anyone else. The numbers combine his own work and
// work done with his team in his current full-time role, which the note says
// wherever they are shown.

export const numbers: { value: number; suffix: string; label: string }[] = [
  { value: 100, suffix: '+', label: 'client projects worked on' },
  { value: 50, suffix: '+', label: 'website audits' },
  { value: 500, suffix: '+', label: 'keywords on page one' },
  { value: 100, suffix: '+', label: 'keywords in positions 1 to 3' },
  { value: 1000, suffix: '+', label: 'queries in Google AI Overviews' },
];

export const numbersNote =
  'Figures combine my own work and work done with the team in my current full-time role, since January 2026.';

// What usually matters most for search in each field. The notes are general
// guidance, not results from a named client.
export const industries: { name: string; note: string }[] = [
  {
    name: 'Hospitals and clinics',
    note: 'People search for a treatment, a doctor, or a clinic near them. Clear pages for each service and each doctor, correct details on the Business Profile, and content checked by qualified staff matter most, because health topics are held to a higher standard of trust.',
  },
  {
    name: 'Plumbing',
    note: 'Most searches are urgent and local. A complete Business Profile, pages for each area served, fast pages on a phone, and a phone number that is easy to tap do most of the work.',
  },
  {
    name: 'Pest control',
    note: 'Searches are local and often seasonal. Pages for each pest and each area, plus recent reviews, help a business show up when the need is urgent.',
  },
  {
    name: 'HVAC',
    note: 'Demand follows the weather. Separate pages for installation, repair, and servicing, published before the season starts, give search engines time to rank them.',
  },
  {
    name: 'Law firms',
    note: 'People search by problem and by city. One clear page per practice area, lawyer profiles with real credentials, and plain answers to common legal questions build the trust this field needs.',
  },
  {
    name: 'E-commerce',
    note: 'The work is mostly on category and product pages: clean URLs, no duplicate pages created by filters, product schema, and fast loading on phones.',
  },
  {
    name: 'Marketing agencies',
    note: 'Agencies compete in a crowded field. Clear positioning, a page for each service, and published work that shows what was done are what set one apart in search.',
  },
];
