import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { getBlogPostBySlug, getRelatedPosts, getAllPostsForSitemap } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import { siteConfig } from '@/lib/config/site';
import { formatDate, calculateReadingTime } from '@/lib/utils/blog-helpers';
import { portableTextComponents } from '@/components/blog/portable-text-components';
import { SocialShare } from '@/components/blog/social-share';
import { StructuredData } from '@/components/seo/structured-data';

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getAllPostsForSitemap();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined;

  return {
    title,
    description,
    keywords: post.seoKeywords,
    authors: [{ name: post.author.name }],
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${siteConfig.domain.url}/blog/${params.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      images: imageUrl ? [{ url: imageUrl, alt: post.mainImage.alt }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `${siteConfig.domain.url}/blog/${params.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post._id, post.tags, 3);
  const readingTime = calculateReadingTime(post.content);

  return (
    <>
      {/* Structured Data */}
      <StructuredData post={post} />

      <div className="min-h-screen bg-white dark:bg-slate-900">
        {/* Header */}
        <header className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-slate-900 dark:text-white">
                {siteConfig.branding.name}
              </Link>
              <nav className="flex gap-6">
                <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                  Home
                </Link>
                <Link href="/blog" className="text-slate-900 dark:text-white font-medium">
                  Blog
                </Link>
                <Link href="/#waitlist" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                  Join Waitlist
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Article Header */}
        <article className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
              Home
            </Link>
            {' / '}
            <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white">
              Blog
            </Link>
            {' / '}
            <span className="text-slate-900 dark:text-white">{post.title}</span>
          </nav>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2 mb-6">
              {post.categories.map((category: any) => (
                <Link
                  key={category._id}
                  href={`/blog/category/${category.slug.current}`}
                  className="text-sm font-medium px-3 py-1 rounded"
                  style={{
                    backgroundColor: category.color || '#e2e8f0',
                    color: '#000',
                  }}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
            {post.author.avatar && (
              <Image
                src={urlFor(post.author.avatar).width(48).height(48).url()}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <Link
                href={`/blog/author/${post.author.slug.current}`}
                className="font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
              >
                {post.author.name}
              </Link>
              {post.author.role && (
                <p className="text-sm text-slate-600 dark:text-slate-400">{post.author.role}</p>
              )}
            </div>
            <div className="ml-auto text-sm text-slate-600 dark:text-slate-400">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span className="mx-2">•</span>
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="relative aspect-video overflow-hidden rounded-lg mb-12">
              <Image
                src={urlFor(post.mainImage).width(1200).height(675).url()}
                alt={post.mainImage.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Share */}
          <div className="mt-8">
            <SocialShare
              url={`${siteConfig.domain.url}/blog/${params.slug}`}
              title={post.title}
              description={post.excerpt}
            />
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex gap-4">
              {post.author.avatar && (
                <Image
                  src={urlFor(post.author.avatar).width(80).height(80).url()}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {post.author.name}
                </h3>
                {post.author.role && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {post.author.role}
                  </p>
                )}
                {post.author.bio && (
                  <p className="text-slate-700 dark:text-slate-300">{post.author.bio}</p>
                )}
                {post.author.social && (
                  <div className="flex gap-4 mt-4">
                    {post.author.social.twitter && (
                      <a
                        href={post.author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Twitter
                      </a>
                    )}
                    {post.author.social.linkedin && (
                      <a
                        href={post.author.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-slate-50 dark:bg-slate-950 py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost: any) => (
                  <article key={relatedPost._id} className="group bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <Link href={`/blog/${relatedPost.slug.current}`}>
                      <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800">
                        {relatedPost.mainImage && (
                          <Image
                            src={urlFor(relatedPost.mainImage).width(600).height(400).url()}
                            alt={relatedPost.mainImage.alt}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {relatedPost.title}
                        </h3>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="mt-4 text-sm text-slate-500 dark:text-slate-500">
                          <time dateTime={relatedPost.publishedAt}>
                            {formatDate(relatedPost.publishedAt)}
                          </time>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

