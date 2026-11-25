/**
 * Altıgen Halı Yıkama — Merkezi Site Konfigürasyonu
 *
 * Tüm SEO, JSON-LD, LLM (llms.txt), navigasyon ve iletişim bilgileri
 * tek merkezden yönetilir. Gerçek işletme bilgileri geldikçe yalnızca
 * bu dosya güncellenir.
 */

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const SITE = {
  name: 'Altıgen Halı Yıkama',
  legalName: 'Altıgen Halı Yıkama Hizmetleri',
  tagline: 'Bitkisel Şampuanlarla Hijyenik ve Kontrollü Halı Bakımı',
  description:
    'Altıgen Halı Yıkama; tam otomatik yıkama hattı, bitkisel içerikli şampuanlar, kapalı kurutma odaları ve ücretsiz adres servisi ile profesyonel halı, koltuk, stor perde ve yorgan yıkama hizmeti sunar.',
  url: 'https://altigenhaliyikama.com.tr',
  locale: 'tr_TR',
  lang: 'tr',
  themeColor: '#0F2942',

  // TODO: Gerçek işletme telefon, WhatsApp, e-posta ve adres bilgileriyle güncelleyin
  contact: {
    phoneDisplay: '0 (212) 000 00 00',
    phoneHref: 'tel:+902120000000',
    whatsappNumber: '905000000000',
    whatsappMessage:
      'Merhaba, Altıgen Halı Yıkama hizmetleri hakkında bilgi ve randevu almak istiyorum.',
    email: 'info@altigenhaliyikama.com.tr',
    address: {
      street: 'Merkez Tesis Adresi (Güncellenecek)',
      district: 'Merkez',
      city: 'İstanbul',
      postalCode: '34000',
      country: 'TR',
    },
    workingHours: {
      display: 'Pazartesi – Cumartesi: 08:30 – 20:00',
      schema: 'Mo-Sa 08:30-20:00',
    },
  },

  nav: [
    { label: 'Hizmetler', href: '/#hizmetler' },
    { label: 'Yıkama Süreci', href: '/#surec' },
    { label: 'Hizmet Bölgeleri', href: '/#bolgeler' },
    { label: 'Sıkça Sorulanlar', href: '/#sss' },
  ] as readonly NavItem[],

  social: {
    instagram: 'https://instagram.com/altigenhaliyikama',
    facebook: 'https://facebook.com/altigenhaliyikama',
  },
} as const;

export function getWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage ?? SITE.contact.whatsappMessage);
  return `https://wa.me/${SITE.contact.whatsappNumber}?text=${text}`;
}
