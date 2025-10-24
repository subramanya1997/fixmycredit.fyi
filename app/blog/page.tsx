import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts, getAllCategories, getFeaturedPosts } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import { BlogPost, Category } from '@/lib/sanity/types';
import { siteConfig } from '@/lib/config/site';
import { formatDate, calculateReadingTime } from '@/lib/utils/blog-helpers';
import { Header } from '@/components/marketing/header';

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
      <Header />

      {/* Hero Section with Featured Posts */}
      <section className="border-b border-slate-200 py-16 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left: Hero Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Expert Credit Repair Insights & Strategies
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                Deep dives into credit repair strategies, dispute letter templates, and real-world success stories. 
                Subscribe to get notified when we publish new guides.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Get notified when we publish
                </h3>
                <form className="mt-3 flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-white dark:focus:ring-white/10"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Join readers getting updates on credit repair best practices
                </p>
              </div>
            </div>

            {/* Right: Featured Posts */}
            <div className="space-y-4">
              {featuredPosts.slice(0, 3).map((post: BlogPost, index: number) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group block rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-white">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-300">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 line-clamp-2 dark:text-slate-400">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto">
            <Link
              href="/blog"
              className="border-b-2 border-slate-900 py-4 text-sm font-medium text-slate-900 dark:border-white dark:text-white"
            >
              All
            </Link>
            {categories.map((category: Category) => (
              <Link
                key={category._id}
                href={`/blog/category/${category.slug.current}`}
                className="border-b-2 border-transparent py-4 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-8">
            {posts.map((post: BlogPost) => (
              <article key={post._id} className="group flex gap-6 pb-8 border-b border-slate-200 last:border-0 dark:border-slate-800">
                <div className="flex-1">
                  <Link href={`/blog/${post.slug.current}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-300">
                          {post.title}
                        </h3>
                        {post.categories && post.categories.length > 0 && (
                          <div className="mt-2 flex items-center gap-3">
                            <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                              {post.categories[0].title}
                            </span>
                            <time className="text-xs text-slate-500 dark:text-slate-400" dateTime={post.publishedAt}>
                              {formatDate(post.publishedAt)}
                            </time>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

