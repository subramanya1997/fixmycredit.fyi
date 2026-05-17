import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostsByCategory, getCategoryBySlug, getAllCategories } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import { siteConfig } from '@/lib/config/site';
import { formatDate, calculateReadingTime } from '@/lib/utils/blog-helpers';
import { BlogPost } from '@/lib/sanity/types';
import { Header } from '@/components/marketing/header';

export const revalidate = 3600;

type CategoryParam = {
  slug: {
    current: string;
  };
};

const categoryHubCopy: Record<string, { intro: string; questions: string[] }> = {
  'credit-scores': {
    intro:
      'Credit score articles explain how scoring factors work, why different models can show different numbers, and which habits tend to matter most across FICO and VantageScore.',
    questions: [
      'Which score factor is likely causing the largest drag?',
      'Did the balance, inquiry, or account age change recently?',
      'Is the score being used for a mortgage, card, auto loan, or general monitoring?',
    ],
  },
  'credit-education': {
    intro:
      'Credit education guides focus on the mechanics behind credit reports, bureau data, dispute rights, and common myths that can lead people into risky credit repair decisions.',
    questions: [
      'Is the information inaccurate, incomplete, outdated, or unverifiable?',
      'What documents support the correction request?',
      'Which bureau is reporting the issue?',
    ],
  },
  'personal-finance': {
    intro:
      'Personal finance content connects credit scores to budgeting, debt payoff, borrowing readiness, and financial decisions that can affect a credit file over time.',
    questions: [
      'Will the action reduce risk or only move a score temporarily?',
      'Does the decision improve cash flow as well as credit profile?',
      'Could the action create new fees, inquiries, or account closures?',
    ],
  },
};

export async function generateStaticParams() {
  const categories = (await getAllCategories()) as CategoryParam[];
  return categories.map((category) => ({
    category: category.slug.current,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.title} - Credit Repair Blog`,
    description: category.description || `Articles about ${category.title.toLowerCase()} and credit repair`,
    alternates: {
      canonical: `${siteConfig.domain.url}/blog/category/${categorySlug}`,
    },
    openGraph: {
      title: `${category.title} - Credit Repair Blog`,
      description: category.description,
      url: `${siteConfig.domain.url}/blog/category/${categorySlug}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(category.title)}&category=${encodeURIComponent('Credit Repair')}`,
          width: 1200,
          height: 630,
          alt: `${category.title} credit repair articles`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.title} - Credit Repair Blog`,
      description: category.description || `Articles about ${category.title.toLowerCase()} and credit repair`,
      images: [`/api/og?title=${encodeURIComponent(category.title)}&category=${encodeURIComponent('Credit Repair')}`],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const [category, posts] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getBlogPostsByCategory(categorySlug),
  ]);
  
  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      {/* Category Header */}
      <section className="border-b border-slate-200 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="mb-6 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
              Home
            </Link>
            {' / '}
            <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white">
              Blog
            </Link>
            {' / '}
            <span className="text-slate-900 dark:text-white">{category.title}</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              {category.title}
            </h1>
            {category.description && (
              <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                {category.description}
              </p>
            )}
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-500">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
        </div>
      </section>

      {categoryHubCopy[categorySlug] && (
        <section className="border-b border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
              {categoryHubCopy[categorySlug].intro}
            </p>
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-sm font-semibold uppercase text-slate-500 dark:text-slate-400">
                Questions to answer first
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {categoryHubCopy[categorySlug].questions.map((question) => (
                  <li key={question}>- {question}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Posts */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">
                No articles found in this category yet.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-block text-blue-600 hover:text-blue-700"
              >
                View all articles →
              </Link>
            </div>
          ) : (
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
          )}
        </div>
      </section>
    </div>
  );
}
