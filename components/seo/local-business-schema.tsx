import { siteConfig } from '@/lib/config/site';

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: siteConfig.branding.name,
    description: siteConfig.branding.description,
    url: siteConfig.domain.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.domain.url}/icon.svg`,
    },
    image: `${siteConfig.domain.url}/icon.svg`,
    priceRange: '$',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: 'Credit Repair Services',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Credit Repair Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Credit Score Analysis',
            description: 'Comprehensive credit score analysis and improvement recommendations',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Credit Dispute Services',
            description: 'Professional credit dispute letter templates and guidance',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Credit Monitoring',
            description: 'Real-time credit score tracking and alerts',
          },
        },
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.contact.email,
      contactType: 'Customer Service',
      areaServed: 'US',
      availableLanguage: 'en',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

