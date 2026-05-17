import { siteConfig } from '@/lib/config/site';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.branding.name,
    description: siteConfig.branding.description,
    url: siteConfig.domain.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.domain.url}/icon.svg`,
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
