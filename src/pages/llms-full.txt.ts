import type { APIRoute } from 'astro';
import { SITE } from '@config/site';
import {
  getAllBlogPosts,
  getAllFaqs,
  getAllPricing,
  getAllRegions,
  getAllServices,
} from '@services/content';

/**
 * Genişletilmiş /llms-full.txt uç noktası
 */
export const GET: APIRoute = async () => {
  const [services, regions, pricing, faqs, posts] = await Promise.all([
    getAllServices(),
    getAllRegions(),
    getAllPricing(),
    getAllFaqs(),
    getAllBlogPosts(),
  ]);

  const sections: string[] = [
    `# ${SITE.name} — Kapsamlı Bilgi Kaynağı`,
    '',
    `> ${SITE.tagline}`,
    '',
    SITE.description,
    '',
    '## Kurumsal Bilgiler',
    `- Resmi Ad: ${SITE.legalName}`,
    `- Alan Adı: ${SITE.url}`,
    `- Telefon: ${SITE.contact.phoneDisplay}`,
    `- E-posta: ${SITE.contact.email}`,
    `- Çalışma Saatleri: ${SITE.contact.workingHours.display}`,
    `- Adres: ${SITE.contact.address.street}, ${SITE.contact.address.district}, ${SITE.contact.address.city}`,
    '',
    '## Hizmet Kataloğu',
    '',
    ...services.flatMap((service) => [
      `### ${service.title}`,
      `- Sayfa: ${SITE.url}/hizmetler/${service.slug}`,
      `- Fiyatlandırma Birimi: ${service.unitLabel}`,
      `- Teslimat Süresi: ${service.turnaroundText}`,
      `- Açıklama: ${service.fullDescription}`,
      '- Öne Çıkan Özellikler:',
      ...service.highlights.map((h) => `  - ${h}`),
      '- Uygulama Adımları:',
      ...service.processSteps.map((step, idx) => `  ${idx + 1}. ${step}`),
      '',
    ]),
    '## Güncel Fiyat Listesi (Tahmini / Başlangıç)',
    '',
    ...pricing.map(
      (item) =>
        `- **${item.name}** (${item.categoryLabel}): ${item.price} TL / ${item.unitLabel} — ${item.note}`
    ),
    '',
    '## Hizmet Bölgeleri',
    '',
    ...regions.flatMap((region) => [
      `### ${region.name} (${region.city})`,
      `- Sayfa: ${SITE.url}/bolgeler/${region.slug}`,
      `- Özet: ${region.summary}`,
      `- Servis Bilgisi: ${region.deliveryInfo}`,
      `- Mahalleler: ${region.neighborhoods.join(', ')}`,
      '',
    ]),
    '## Halı ve Tekstil Bakım Rehberleri',
    '',
    ...posts.flatMap((post) => [
      `### ${post.data.title}`,
      `- URL: ${SITE.url}/blog/${post.data.slug}`,
      `- Kategori: ${post.data.category} | Yayın Tarihi: ${post.data.publishedAt}`,
      `- Özet: ${post.data.excerpt}`,
      '',
    ]),
    '## Sıkça Sorulan Sorular',
    '',
    ...faqs.flatMap((faq) => [`### ${faq.question}`, faq.answer, '']),
  ];

  return new Response(sections.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
