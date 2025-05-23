
// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Define your collection(s)
const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./events" }),
  schema: ({ image }) => z.object({
    id: z.string(),
    image: z.object({
      blob: image(),
      alt: z.string(),
    }),
    title: z.string(),
    description: z.string(),
    producer: z.string(),
    dates: z.string(),
    location: z.string(),
    price: z.number(),
    commission: z.number(),
    installments: z.number(),
    installmentAmount: z.number(),
    link: z.string(),
    available: z.boolean(),
    termsAndConditions: z.string(),
  }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { events };