import { MetadataRoute } from 'next';
import { getAllPostsForSitemap, getAllCategories, getAllAuthors } from '@/lib/sanity/queries';
import { siteConfig } from '@/lib/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.domain.url;

  // Get all blog posts
  const posts = await getAllPostsForSitemap();
  const postEntries: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Get all categories
  const categories = await getAllCategories();
  const categoryEntries: MetadataRoute.Sitemap = categories.map((category: any) => ({
    url: `${baseUrl}/blog/category/${category.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Get all authors
  const authors = await getAllAuthors();
  const authorEntries: MetadataRoute.Sitemap = authors.map((author: any) => ({
    url: `${baseUrl}/blog/author/${author.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  return [...staticPages, ...postEntries, ...categoryEntries, ...authorEntries];
}

