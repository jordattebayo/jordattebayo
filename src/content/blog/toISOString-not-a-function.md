---
title: 'Astro Error: date.toISOString() is not a function'
excerpt: ''
heroImage:
  path: '/posts/astro-error/astro-error.jpg'
  alt: 'A screenshot of a browser that displays the astro error page'
pubDate: 'Dec 28 2024'
ogImage:
  path: ''
  alt: Another image text
description: How to solve the toISOString() is not a function error in Astro with MDX. 
isDraft: false
---
This solution is for anyone using Astro. This pesky error may be misleading because you're using the FormattedDate component, which comes with the Astro Blog starter template. But now when you reference it in a new page you're getting an error.

The error is technically correct, you are not instantiating the `Date` object meaning you cannot call any method on it including `.toISOString()`. But the fix lies outside of your date component and outside the page you created. The fix is actually located in your content folder, namely the config.ts file. Which is to say you're most likely running into a configuration error.

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

This works great if you only want one collection, but if you wanted to add another collection such as "journal" then you're going to need to define it. And if you weren't before, and trying to consume it then when it comes to format the date, there is none. Causing the error. So just go ahead and make a new collection and export it like below:

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