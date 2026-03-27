import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    heroImage: z.object({
      path: z.string(),
      alt: z.string(),
    }),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    ogImage: z.object({
      path: z.string(),
      alt: z.string(),
    }),
    lead: z.string().optional(),
    isDraft: z.boolean().default(false),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    heroImage: z.object({
      path: z.string(),
      alt: z.string(),
    }),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    ogImage: z.object({
      path: z.string(),
      alt: z.string(),
    }),
    lead: z.string().optional(),
    isDraft: z.boolean().default(false),
  }),
});

export const collections = { blog, journal };
