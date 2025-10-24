import { PortableTextBlock } from '@portabletext/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: SanityImageSource & {
    alt: string;
  };
  content: PortableTextBlock[];
  author: Author;
  categories: Category[];
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  featured: boolean;
  redditOptimized: boolean;
  structuredDataType: 'Article' | 'HowTo' | 'FAQPage';
}

export interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  avatar?: SanityImageSource;
  bio?: string;
  role?: string;
  credentials?: string[];
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  postCount?: number;
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  color?: string;
  icon?: string;
  postCount?: number;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category?: Category;
  order?: number;
  featured: boolean;
}

export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
  avatar?: SanityImageSource;
  creditScoreImprovement?: {
    before: number;
    after: number;
  };
  featured: boolean;
  publishedAt: string;
}

export interface CreditTool {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  icon?: string;
  category: 'calculator' | 'generator' | 'simulator' | 'tracker';
  featured: boolean;
}

