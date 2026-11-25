import type { APIRoute } from 'astro';
import { SITE } from '@config/site';
import { getAllFaqs, getAllRegions, getAllServices } from '@services/content';

/**
 * Genişletilmiş /llms-full.txt uç noktası
 *
 * Yapay zeka arama motorlarının (ChatGPT Search, Perplexity, Claude, Gemini)
 * Altıgen Halı Yıkama hizmetlerini, süreçlerini ve sık sorulan sorularını
 * eksiksiz ve yapılandırılmış Markdown formatında okuması için üretilir.
 */
export const GET: APIRoute = async () => {
  const [services, regions, faqs] = await Promise.all([
    getAllServices(),
    getAllRegions(),
    getAllFaqs(),
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
