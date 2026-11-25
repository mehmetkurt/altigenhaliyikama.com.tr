// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * Altıgen Halı Yıkama — Astro Konfigürasyonu
 *
 * Performans, SEO, LLM (GEO) ve görsel/HTML sıkıştırma için optimize edilmiştir.
 *
 * İleride sunucu taraflı API uçları (VentoPOS / Canlı Form / Yönetim Paneli)
 * aktif edildiğinde barındırma ortamına göre ilgili adaptör eklenebilir:
 *  - Cloudflare: @astrojs/cloudflare
 *  - Node / Docker / VPS: @astrojs/node
 *  - Vercel: @astrojs/vercel
 */
export default defineConfig({
  site: 'https://altigenhaliyikama.com.tr',
  trailingSlash: 'never',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'tr',
        locales: {
          tr: 'tr-TR',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
