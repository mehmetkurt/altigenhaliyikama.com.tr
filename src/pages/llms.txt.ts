import type { APIRoute } from 'astro';
import { SITE } from '@config/site';
import {
  getAllBlogPosts,
  getAllRegions,
  getAllServices,
} from '@services/content';

/**
 * Standart /llms.txt uç noktası (GEO / AI Arama Optimizasyonu)
 */
export const GET: APIRoute = async () => {
  const [services, regions, posts] = await Promise.all([
    getAllServices(),
    getAllRegions(),
    getAllBlogPosts(),
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
    '## Temel Sayfalar',
    `- [Hizmetler](${SITE.url}/hizmetler): Tüm halı, koltuk, stor perde ve yorgan yıkama hizmetleri`,
    `- [Fiyat Listesi ve Hesaplayıcı](${SITE.url}/fiyatlar): Şeffaf m² / adet fiyatları ve anlık tahmini tutar hesaplama`,
    `- [Hizmet Bölgeleri](${SITE.url}/bolgeler): Ücretsiz adres servisi verilen bölgeler`,
    `- [Hakkımızda](${SITE.url}/hakkimizda): Tesis standartları, bitkisel şampuan ve kapalı kurutma yaklaşımı`,
    `- [İletişim ve Randevu](${SITE.url}/iletisim): Servis talep formu, telefon ve WhatsApp iletişimi`,
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
    '## Halı Bakım Rehberi (Blog)',
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${SITE.url}/blog/${post.data.slug}): ${post.data.excerpt}`
    ),
    '',
    '## Ek Kaynaklar',
    `- [Detaylı LLM Dokümanı](${SITE.url}/llms-full.txt): Tüm hizmet adımları, fiyat listesi, bölgeler, rehberler ve sıkça sorulan sorular`,
    `- [Site Haritası](${SITE.url}/sitemap-index.xml)`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
