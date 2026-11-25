import { SITE } from '@config/site';
import type {
  BlogEntry,
  FaqItem,
  PricingItem,
  RegionItem,
  ServiceItem,
} from '@services/content';

export type SchemaObject = Record<string, unknown>;

export function buildLocalBusinessSchema(regions: RegionItem[] = []): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'DryCleaningOrLaundry',
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    description: SITE.description,
    telephone: SITE.contact.phoneHref.replace('tel:', ''),
    email: SITE.contact.email,
    openingHours: SITE.contact.workingHours.schema,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.contact.address.street,
      addressLocality: SITE.contact.address.district,
      addressRegion: SITE.contact.address.city,
      postalCode: SITE.contact.address.postalCode,
      addressCountry: SITE.contact.address.country,
    },
    areaServed:
      regions.length > 0
        ? regions.map((region) => ({
            '@type': 'AdministrativeArea',
            name: `${region.name}, ${region.city}`,
          }))
        : [
            {
              '@type': 'City',
              name: SITE.contact.address.city,
            },
          ],
    sameAs: [SITE.social.instagram, SITE.social.facebook],
  };
}

export function buildWebSiteSchema(): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'tr-TR',
    publisher: {
      '@id': `${SITE.url}/#business`,
    },
  };
}

export function buildServiceSchema(service: ServiceItem): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.fullDescription,
    url: `${SITE.url}/hizmetler/${service.slug}`,
    serviceType: service.title,
    provider: {
      '@id': `${SITE.url}/#business`,
    },
    areaServed: {
      '@type': 'City',
      name: SITE.contact.address.city,
    },
  };
}

export function buildOfferCatalogSchema(pricing: PricingItem[]): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `${SITE.name} Hizmet Fiyat Listesi`,
    url: `${SITE.url}/fiyatlar`,
    itemListElement: pricing.map((item, index) => ({
      '@type': 'Offer',
      position: index + 1,
      name: `${item.name} (${item.unitLabel})`,
      description: item.note,
      price: item.price,
      priceCurrency: 'TRY',
      offeredBy: {
        '@id': `${SITE.url}/#business`,
      },
    })),
  };
}

export function buildArticleSchema(post: BlogEntry['data']): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: 'tr-TR',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/blog/${post.slug}`,
    },
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      '@id': `${SITE.url}/#business`,
    },
  };
}

export function buildFaqSchema(faqs: FaqItem[]): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  readonly name: string;
  readonly path: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path === '/' ? SITE.url : `${SITE.url}${item.path}`,
    })),
  };
}
