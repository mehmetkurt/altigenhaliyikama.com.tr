import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * İçerik Veri Soyutlama Katmanı (Content Repository)
 *
 * Tüm sayfalar ve LLM uç noktaları veriyi doğrudan dosyalardan değil,
 * bu servis üzerinden okur. Yarın Yönetim Paneli (Headless CMS veya
 * .NET API) eklendiğinde yalnızca bu katmandaki veri kaynağı değişir.
 */

export type ServiceItem = CollectionEntry<'services'>['data'];
export type RegionItem = CollectionEntry<'regions'>['data'];
export type FaqItem = CollectionEntry<'faqs'>['data'];

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
