import { BlogPost } from '@/lib/sanity/types';
import { siteConfig } from '@/lib/config/site';
import { urlFor } from '@/lib/sanity/client';

interface StructuredDataProps {
  post: BlogPost;
}

export function StructuredData({ post }: StructuredDataProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': post.structuredDataType || 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      ...(post.author.bio && { description: post.author.bio }),
      ...(post.author.social?.website && { url: post.author.social.website }),
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.branding.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.domain.url}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.domain.url}/blog/${post.slug.current}`,
    },
    keywords: post.seoKeywords?.join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.domain.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteConfig.domain.url}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteConfig.domain.url}/blog/${post.slug.current}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

