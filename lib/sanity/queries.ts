import { sanityClient } from './client';

// Blog Post Queries
export async function getAllBlogPosts(limit?: number) {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ''} {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    "author": author->{name, slug, avatar},
    "categories": categories[]->{title, slug, color},
    tags,
    publishedAt,
    updatedAt,
    featured,
    redditOptimized
  }`;
  
  return await sanityClient.fetch(query);
}

export async function getBlogPostBySlug(slug: string) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    content,
    "author": author->{
      name,
      slug,
      avatar,
      bio,
      role,
      credentials,
      social
    },
    "categories": categories[]->{title, slug, color, icon},
    tags,
    publishedAt,
    updatedAt,
    seoTitle,
    seoDescription,
    seoKeywords,
    featured,
    redditOptimized,
    structuredDataType
  }`;
  
  return await sanityClient.fetch(query, { slug });
}

export async function getRelatedPosts(postId: string, tags: string[], limit = 3) {
  const query = `*[_type == "blogPost" && _id != $postId && count((tags[])[@ in $tags]) > 0] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    "author": author->{name, slug},
    publishedAt
  }`;
  
  return await sanityClient.fetch(query, { postId, tags });
}

export async function getBlogPostsByCategory(categorySlug: string) {
  const query = `*[_type == "blogPost" && references(*[_type=="category" && slug.current == $categorySlug]._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    "author": author->{name, slug},
    "categories": categories[]->{title, slug, color},
    publishedAt
  }`;
  
  return await sanityClient.fetch(query, { categorySlug });
}

export async function getBlogPostsByAuthor(authorSlug: string) {
  const query = `*[_type == "blogPost" && author->slug.current == $authorSlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    "author": author->{name, slug, avatar},
    "categories": categories[]->{title, slug, color},
    publishedAt
  }`;
  
  return await sanityClient.fetch(query, { authorSlug });
}

export async function getFeaturedPosts(limit = 3) {
  const query = `*[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...${limit}] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    "author": author->{name, slug},
    publishedAt
  }`;
  
  return await sanityClient.fetch(query);
}

// Category Queries
export async function getAllCategories() {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    icon,
    "postCount": count(*[_type == "blogPost" && references(^._id)])
  }`;
  
  return await sanityClient.fetch(query);
}

export async function getCategoryBySlug(slug: string) {
  const query = `*[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    color,
    icon
  }`;
  
  return await sanityClient.fetch(query, { slug });
}

// Author Queries
export async function getAllAuthors() {
  const query = `*[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    avatar,
    bio,
    role,
    "postCount": count(*[_type == "blogPost" && references(^._id)])
  }`;
  
  return await sanityClient.fetch(query);
}

export async function getAuthorBySlug(slug: string) {
  const query = `*[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    avatar,
    bio,
    role,
    credentials,
    social
  }`;
  
  return await sanityClient.fetch(query, { slug });
}

// FAQ Queries
export async function getAllFAQs() {
  const query = `*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    "category": category->{title, slug},
    order,
    featured
  }`;
  
  return await sanityClient.fetch(query);
}

export async function getFeaturedFAQs(limit = 5) {
  const query = `*[_type == "faq" && featured == true] | order(order asc) [0...${limit}] {
    _id,
    question,
    answer
  }`;
  
  return await sanityClient.fetch(query);
}

// Testimonial Queries
export async function getAllTestimonials() {
  const query = `*[_type == "testimonial"] | order(publishedAt desc) {
    _id,
    name,
    role,
    content,
    rating,
    avatar,
    creditScoreImprovement,
    featured,
    publishedAt
  }`;
  
  return await sanityClient.fetch(query);
}

export async function getFeaturedTestimonials(limit = 6) {
  const query = `*[_type == "testimonial" && featured == true] | order(publishedAt desc) [0...${limit}] {
    _id,
    name,
    role,
    content,
    rating,
    avatar,
    creditScoreImprovement
  }`;
  
  return await sanityClient.fetch(query);
}

// Credit Tools Queries
export async function getAllCreditTools() {
  const query = `*[_type == "creditTool"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    icon,
    category,
    featured
  }`;
  
  return await sanityClient.fetch(query);
}

export async function getFeaturedCreditTools(limit = 4) {
  const query = `*[_type == "creditTool" && featured == true] [0...${limit}] {
    _id,
    name,
    slug,
    description,
    icon,
    category
  }`;
  
  return await sanityClient.fetch(query);
}

// Sitemap Query
export async function getAllPostsForSitemap() {
  const query = `*[_type == "blogPost"] {
    "slug": slug.current,
    publishedAt,
    updatedAt
  }`;
  
  return await sanityClient.fetch(query);
}

