import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Tip Güvenli İçerik Koleksiyonları
 *
 * Bugün yerel JSON dosyalarından okunur. İleride Yönetim Paneli
 * (.NET API / Headless CMS) devreye alındığında custom Astro Loader veya
 * src/services/content.ts üzerinden doğrudan uzak API'ye geçirilebilir.
 */

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    shortDescription: z.string(),
    fullDescription: z.string(),
    unitLabel: z.string(),
    startingPrice: z.number().nonnegative().optional(),
    turnaroundText: z.string(),
    highlights: z.array(z.string()).min(1),
    processSteps: z.array(z.string()).min(1),
    order: z.number().int().default(0),
    seoTitle: z.string(),
    seoDescription: z.string(),
  }),
});

const regions = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/regions' }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    city: z.string(),
    summary: z.string(),
    deliveryInfo: z.string(),
    neighborhoods: z.array(z.string()).min(1),
    order: z.number().int().default(0),
    seoTitle: z.string(),
    seoDescription: z.string(),
  }),
});

const faqs = defineCollection({
  loader: file('./src/content/faqs.json'),
  schema: z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    category: z.enum(['genel', 'yikama', 'teslimat', 'fiyat']),
    order: z.number().int().default(0),
  }),
});

export const collections = {
  services,
  regions,
  faqs,
};
