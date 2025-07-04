import { z, reference } from 'astro:content';

export default ({ image }: any) => z.object({
  id: z.string(),
  image: z.object({
    blob: image().default('./logo.webp'),
    alt: z.string(),
  }),
  name: z.string(),
  available: z.boolean(),
  events: z.array(reference('event')),
  primaryAction: z.enum(['installment', 'total']).default('installment'),
  openGraphImage: z.object({
    blob: image().default('./logo.webp'),
    alt: z.string(),
  })
})