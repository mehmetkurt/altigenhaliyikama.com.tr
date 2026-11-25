# Altıgen Halı Yıkama — Kurumsal Web Sitesi (`altigenhaliyikama.com.tr`)

Yüksek performans, mobil öncelik, ileri düzey SEO ve LLM (GEO) uyumluluğu hedeflenerek **Astro + Tailwind CSS v4** mimarisiyle oluşturulmuş kurumsal web projesi.

## Mimari Özellikler

- **Sıfır Zorunlu JS (Zero-JS by Default):** Ziyaretçiye saf, sıkıştırılmış semantik HTML + CSS sunulur.
- **Otomatik Görsel & HTML Sıkıştırma:** Sharp tabanlı `AVIF` + `WebP` dönüşümü, responsive `srcset`, sıfır CLS ve build-time HTML minification (`compressHTML: true`).
- **Self-Hosted Tipografi:** Dış font isteği olmadan yerel `@fontsource-variable` (Türkçe karakter destekli) fontlar.
- **SEO & LLM (GEO) Altyapısı:**
  - Dinamik JSON-LD (`DryCleaningOrLaundry`, `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`)
  - Otomatik `sitemap-index.xml` ve AI bot dostu `robots.txt`
  - İçerik deposundan otomatik üretilen `/llms.txt` ve `/llms-full.txt`
- **Geleceğe Hazır Modüler Katmanlar:**
  - `src/services/content.ts`: İleride eklenecek Yönetim Paneli / Headless CMS / .NET API için veri soyutlama katmanı.
  - `src/services/ventopos.ts`: İleride eklenecek VentoPOS sipariş ve takip entegrasyonu için adaptör sözleşmeleri.

## Komutlar

```bash
npm run dev       # Yerel geliştirme sunucusunu başlatır
npm run check     # Astro + TypeScript tip denetimi yapar
npm run build     # Üretim (production) derlemesi oluşturur
npm run verify    # Tip denetimi + üretim derlemesini birlikte çalıştırır
npm run preview   # Derlenmiş üretim çıktısını önizler
```

## Klasör Yapısı

```text
├── public/
│   ├── _headers              # Edge CDN güvenlik ve cache başlıkları
│   ├── favicon.svg           # Altıgen marka ikonu
│   └── robots.txt            # SEO + LLM tarayıcı kuralları
└── src/
    ├── assets/images/        # Ham görseller (AVIF/WebP pipeline girişi)
    ├── components/
    │   ├── layout/           # Header, Footer, MobileStickyBar
    │   ├── seo/              # BaseHead, JsonLd
    │   └── ui/               # OptimizedPicture, BrandLogo
    ├── config/site.ts        # Merkezi marka, iletişim ve menü ayarları
    ├── content/              # Tip güvenli JSON içerik koleksiyonları
    ├── layouts/              # BaseLayout
    ├── pages/                # Sayfalar + dinamik llms.txt / llms-full.txt
    ├── services/             # content.ts (CMS/Admin hazır) & ventopos.ts
    ├── styles/global.css     # Tailwind CSS v4 tasarım sistemi
    └── utils/schema.ts       # JSON-LD yapısal veri üreticileri
```
