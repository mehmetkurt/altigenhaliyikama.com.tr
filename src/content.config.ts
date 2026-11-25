import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Tip Güvenli İçerik Koleksiyonları
 *
 * Bugün yerel JSON / Markdown dosyalarından okunur. İleride Yönetim Paneli
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

const pricing = defineCollection({
  loader: file('./src/content/pricing.json'),
  schema: z.object({
    id: z.string(),
    category: z.enum(['hali', 'koltuk', 'perde', 'yorgan']),
    categoryLabel: z.string(),
    name: z.string(),
    unit: z.enum(['m2', 'adet', 'takim']),
    unitLabel: z.string(),
    price: z.number().positive(),
    note: z.string(),
    calculable: z.boolean().default(true),
    order: z.number().int().default(0),
  }),
});

const testimonials = defineCollection({
  loader: file('./src/content/testimonials.json'),
  schema: z.object({
    id: z.string(),
    author: z.string(),
    district: z.string(),
    serviceName: z.string(),
    rating: z.number().int().min(1).max(5),
    comment: z.string(),
    dateText: z.string(),
    order: z.number().int().default(0),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    readingMinutes: z.number().int().positive(),
    relatedServiceSlug: z.string().optional(),
    seoTitle: z.string(),
    seoDescription: z.string(),
  }),
});

export const collections = {
  services,
  regions,
  faqs,
  pricing,
  testimonials,
  blog,
};
