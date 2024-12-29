import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    heroImage: z.object({
      path: z.string(),
      alt: z.string(),
    }),
    description: z.string(),
    // Transform string to Date object
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
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    heroImage: z.object({
      path: z.string(),
      alt: z.string(),
    }),
    description: z.string(),
    // Transform string to Date object
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
