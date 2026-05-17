import { siteConfig } from '@/lib/config/site';

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.branding.name,
    url: siteConfig.domain.url,
    description: siteConfig.branding.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.branding.name,
      url: siteConfig.domain.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.domain.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
