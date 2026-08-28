// Connects the service and location pages to the blog.
//
// Before this, not one of the 232 service, location, and combo pages linked to
// any of the 55 articles, so the blog passed no internal link equity and the
// service pages got no topical support in return. This mapping is the join.
import type { CollectionEntry } from 'astro:content';

// Service page slug -> blog category slug.
export const SERVICE_TO_CATEGORY: Record<string, string> = {
  seo: 'seo',
  aeo: 'aeo',
  geo: 'geo',
  'ai-automation': 'ai-automation',
  'web-development': 'web-development',
  'local-seo': 'local-business',
};

// The reverse, used to point an article back at the service it supports.
export const CATEGORY_TO_SERVICE: Record<string, string> = Object.fromEntries(
  Object.entries(SERVICE_TO_CATEGORY).map(([service, category]) => [category, service])
);

// Categories with no matching service page. They still deserve links, so the
// services index surfaces them.
export const UNMAPPED_CATEGORIES = ['digital-marketing', 'ecommerce-saas'];

type Post = CollectionEntry<'blog'>;

const byNewest = (a: Post, b: Post) => {
  const diff = b.data.published.getTime() - a.data.published.getTime();
  return diff !== 0 ? diff : a.data.title.localeCompare(b.data.title);
};

/** Newest articles filed under the category that matches a service. */
export function postsForService(posts: Post[], serviceSlug: string, limit = 6): Post[] {
  const category = SERVICE_TO_CATEGORY[serviceSlug];
  if (!category) return [];
  return posts
    .filter((p) => p.data.categorySlug === category)
    .sort(byNewest)
    .slice(0, limit);
}
