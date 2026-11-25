import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * İçerik Veri Soyutlama Katmanı (Content Repository)
 *
 * Tüm sayfalar, bileşenler ve LLM uç noktaları veriyi doğrudan dosyalardan değil,
 * bu servis üzerinden okur. Yarın Yönetim Paneli (Headless CMS veya .NET API)
 * eklendiğinde yalnızca bu katmandaki veri kaynağı değişir.
 */

export type ServiceItem = CollectionEntry<'services'>['data'];
export type RegionItem = CollectionEntry<'regions'>['data'];
export type FaqItem = CollectionEntry<'faqs'>['data'];
export type PricingItem = CollectionEntry<'pricing'>['data'];
export type TestimonialItem = CollectionEntry<'testimonials'>['data'];
export type BlogEntry = CollectionEntry<'blog'>;

export async function getAllServices(): Promise<ServiceItem[]> {
  const entries = await getCollection('services');
  return entries.map((entry) => entry.data).sort((a, b) => a.order - b.order);
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | undefined> {
  const services = await getAllServices();
  return services.find((item) => item.slug === slug);
}

export async function getAllRegions(): Promise<RegionItem[]> {
  const entries = await getCollection('regions');
  return entries.map((entry) => entry.data).sort((a, b) => a.order - b.order);
}

export async function getRegionBySlug(slug: string): Promise<RegionItem | undefined> {
  const regions = await getAllRegions();
  return regions.find((item) => item.slug === slug);
}

export async function getAllFaqs(): Promise<FaqItem[]> {
  const entries = await getCollection('faqs');
  return entries.map((entry) => entry.data).sort((a, b) => a.order - b.order);
}

export async function getAllPricing(): Promise<PricingItem[]> {
  const entries = await getCollection('pricing');
  return entries.map((entry) => entry.data).sort((a, b) => a.order - b.order);
}

export async function getAllTestimonials(): Promise<TestimonialItem[]> {
  const entries = await getCollection('testimonials');
  return entries.map((entry) => entry.data).sort((a, b) => a.order - b.order);
}

export async function getAllBlogPosts(): Promise<BlogEntry[]> {
  const entries = await getCollection('blog');
  return entries.sort(
    (a, b) =>
      new Date(b.data.publishedAt).getTime() -
      new Date(a.data.publishedAt).getTime()
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogEntry | undefined> {
  const posts = await getAllBlogPosts();
  return posts.find((entry) => entry.data.slug === slug);
}
