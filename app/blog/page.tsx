import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts, getAllCategories, getFeaturedPosts } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import { BlogPost, Category } from '@/lib/sanity/types';
import { siteConfig } from '@/lib/config/site';
import { formatDate, calculateReadingTime } from '@/lib/utils/blog-helpers';

export const metadata: Metadata = {
  title: 'Credit Repair Blog - Expert Tips & Guides',
  description: 'Learn how to improve your credit score with expert tips, guides, and strategies. Get insights on credit repair, dispute letters, and financial wellness.',
  openGraph: {
    title: 'Credit Repair Blog - Expert Tips & Guides',
    description: 'Learn how to improve your credit score with expert tips, guides, and strategies.',
    url: `${siteConfig.domain.url}/blog`,
    type: 'website',
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const [posts, categories, featuredPosts] = await Promise.all([
    getAllBlogPosts(),
    getAllCategories(),
    getFeaturedPosts(3),
  ]);

  return (
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

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Credit Repair Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              Expert tips, guides, and strategies to improve your credit score
            </p>
          </div>

          {/* Categories */}
          <div className="mt-10 flex flex-wrap gap-2 justify-center">
            <Link
              href="/blog"
              className="rounded-full bg-slate-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-slate-900"
            >
              All Posts
            </Link>
            {categories.map((category: Category) => (
              <Link
                key={category._id}
                href={`/blog/category/${category.slug.current}`}
                className="rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                style={category.color ? { borderLeft: `4px solid ${category.color}` } : {}}
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post: BlogPost) => (
                <article key={post._id} className="group relative">
                  <Link href={`/blog/${post.slug.current}`}>
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                      {post.mainImage && (
                        <Image
                          src={urlFor(post.mainImage).width(600).height(400).url()}
                          alt={post.mainImage.alt}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      )}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
                      <span>{post.author.name}</span>
                      <span>•</span>
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <article key={post._id} className="group bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/blog/${post.slug.current}`}>
                  <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-800">
                    {post.mainImage && (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.mainImage.alt}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {post.categories.slice(0, 2).map((category) => (
                          <span
                            key={category._id}
                            className="text-xs font-medium px-2 py-1 rounded"
                            style={{
                              backgroundColor: category.color || '#e2e8f0',
                              color: '#000',
                            }}
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
                      <span>{post.author.name}</span>
                      <span>•</span>
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      <span>•</span>
                      <span>{calculateReadingTime(post.content)} min read</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

