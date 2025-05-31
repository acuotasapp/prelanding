
// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import schemas
import EventSchema from '@/content/event/schema'
import ResellerSchema from '@/content/reseller/schema'


// 2. Import loader(s)

// 3. Define your collection(s)
const event = defineCollection({
  type: "content",
  schema: EventSchema,
});

const reseller = defineCollection({
  type: "content",
  schema: ResellerSchema
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { event, reseller };