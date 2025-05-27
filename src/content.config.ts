
// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Import schemas
import EventSchema from '@/content/events/schema'

// 2. Import loader(s)

// 3. Define your collection(s)
const events = defineCollection({
  type: "content",
  schema: EventSchema,
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { events };