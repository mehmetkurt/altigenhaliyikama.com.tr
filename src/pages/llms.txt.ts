import type { APIRoute } from 'astro';
import { SITE } from '@config/site';
import { getAllRegions, getAllServices } from '@services/content';

/**
 * Standart /llms.txt uç noktası (GEO / AI Arama Optimizasyonu)
 *
 * İçerik servisi (src/services/content.ts) üzerinden dinamik olarak üretilir;
 * ileride Yönetim Paneli devreye alındığında da otomatik güncel kalır.
 */
export const GET: APIRoute = async () => {
  const [services, regions] = await Promise.all([
    getAllServices(),
    getAllRegions(),
  ]);

  const lines: string[] = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    '## İletişim ve Çalışma Saatleri',
    `- Web Sitesi: ${SITE.url}`,
    `- Telefon: ${SITE.contact.phoneDisplay}`,
    `- E-posta: ${SITE.contact.email}`,
    `- Çalışma Saatleri: ${SITE.contact.workingHours.display}`,
    `- Bölge: ${SITE.contact.address.district}, ${SITE.contact.address.city}`,
    '',
    '## Hizmetler',
    ...services.map(
      (service) =>
        `- [${service.title}](${SITE.url}/hizmetler/${service.slug}): ${service.shortDescription}`
    ),
    '',
    '## Hizmet Bölgeleri',
    ...regions.map(
      (region) =>
        `- [${region.name} (${region.city})](${SITE.url}/bolgeler/${region.slug}): ${region.summary}`
    ),
    '',
    '## Ek Kaynaklar',
    `- [Detaylı LLM Dokümanı](${SITE.url}/llms-full.txt): Tüm hizmet adımları, bölgeler ve sıkça sorulan sorular`,
    `- [Site Haritası](${SITE.url}/sitemap-index.xml)`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
