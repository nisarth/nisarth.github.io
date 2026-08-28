// Content collection for the blog. The posts were migrated out of the legacy
// hand-written HTML in public/blog/ by tools/migrate-blog.mjs. Their bodies are
// kept as HTML inside the Markdown so no wording shifted during the move; new
// posts can be written in plain Markdown.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // The on-page h1, which sometimes differs from the <title>.
    heading: z.string(),
    // Human label shown on the post, e.g. "Local Business".
    category: z.string(),
    // Category page the post is filed under, e.g. "local-business".
    categorySlug: z.string(),
    published: z.date(),
    modified: z.date(),
    readingTime: z.string(),
    // Hand-written card copy and thumbnail glyph from the old index page.
    excerpt: z.string(),
    emoji: z.string().default(''),
    displayDate: z.string(),
    related: z.array(z.string()).default([]),
    speakable: z.array(z.string()).default([]),
    toc: z.array(z.object({ id: z.string(), text: z.string() })).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});


// Case studies. Each entry stays draft until the client facts and any
// permission to name them are confirmed, so an unfinished study cannot
// reach the live site. Results are optional in the schema but a study
// without them is a description, not a case study.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    // How the client is described publicly. Anonymised is fine.
    client: z.string(),
    clientUrl: z.string().optional(),
    summary: z.string(),
    // Slug of the service page this work belongs to, for cross-linking.
    service: z.string().optional(),
    started: z.date().optional(),
    finished: z.date().optional(),
    results: z
      .array(
        z.object({
          metric: z.string(),
          change: z.string(),
          over: z.string().optional(),
        })
      )
      .default([]),
    stack: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, projects };
