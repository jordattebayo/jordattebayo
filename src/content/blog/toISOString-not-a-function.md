---
title: 'Astro Error: date.toISOString() is not a function'
excerpt: ''
heroImage:
  path: ' '
  alt: Man under box
pubDate: 'Dec 28 2024'
ogImage:
  path: ''
  alt: Another image text
description: How to solve the toISOString() is not a function error in Astro with MDX. 
isDraft: false
---
This solution is for anyone using Astro. This pesky error is misleading because you may be using your FormattedDate, which comes with the starter template successfully in another page in your application. But now when you reference it in a new page you're getting an error.

The error is technically correct, you are not instantiating the proper `Date` object meaning you cannot call any method on the object including `.toISOString()`. But the fix lies outside of your date component and outside the page you created. The fix is actually located in your content folder, namely the config.ts file. You're most likely running into a configuration error.

In your config you are likely exporting a collection. Mine looks like this:

```javascript
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

export const collections = { blog }
```


```javascript
const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    // ... more schema stuff
    isDraft: z.boolean().default(false),
  }),
});

const journal = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    // ... more schema stuff
    isDraft: z.boolean().default(false),
  }),
});

export const collections = { blog, journal };

```

Hope this helps anyone who was getting a little stumped in a misleading error using Astro. Which I love by the way. 

Until next time!