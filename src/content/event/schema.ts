import { z } from 'astro:content';

export default ({ image }: any) => z.object({
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
  available: z.boolean(),
  termsAndConditions: z.string(),
  order: z.number().default(0)
})