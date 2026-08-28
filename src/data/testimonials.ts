// Client testimonials.
//
// Two rules that are not negotiable, because getting them wrong costs more than
// having no testimonials at all:
//
//   1. Nothing here is written by anyone but the client. No paraphrasing a
//      compliment into a quote, no composing something a client "would say".
//   2. Nothing is published without permission. `permission` records how it was
//      given, and an entry stays `draft: true` until it has been.
//
// Review markup on words a client never said is fabricated structured data and
// a manual action risk. The same goes for an AggregateRating averaged from
// ratings nobody gave, which is why `rating` is optional and the aggregate is
// only emitted when real ratings exist.
//
// LinkedIn recommendations are the easiest starting point: already written by
// the client, already public, and `source` can link to the original.

export interface Testimonial {
  draft?: boolean;
  /** The client's own words, unedited apart from trimming. */
  quote: string;
  name: string;
  role: string;
  company: string;
  companyUrl?: string;
  /** Link to the public original, e.g. a LinkedIn recommendation. */
  source?: string;
  /** YYYY-MM, used for Review.datePublished. */
  date?: string;
  /** Only if the client actually gave a rating. Out of 5. */
  rating?: number;
  /** How permission was given, e.g. "email 2026-08-14" or "public LinkedIn recommendation". */
  permission?: string;
}

export const testimonials: Testimonial[] = [
  {
    draft: true,
    quote: 'The client’s own words, exactly as they wrote them.',
    name: 'Client name',
    role: 'Their job title',
    company: 'Their company',
    companyUrl: 'https://example.com',
    source: 'https://www.linkedin.com/in/nisarthpatel/details/recommendations/',
    date: '2026-06',
    permission: 'How and when permission was given',
  },
];

export const publishedTestimonials = testimonials.filter((t) => !t.draft);

/** Ratings only count when a client actually gave one. */
const rated = publishedTestimonials.filter(
  (t) => typeof t.rating === 'number' && t.rating > 0
);

/**
 * An average of real ratings, or null. Deliberately requires at least two, so
 * a single opinion is never presented as a site-wide score.
 */
export const aggregateRating =
  rated.length >= 2
    ? {
        value: Number(
          (rated.reduce((sum, t) => sum + (t.rating || 0), 0) / rated.length).toFixed(1)
        ),
        count: rated.length,
      }
    : null;
