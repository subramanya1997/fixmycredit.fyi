import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostsByAuthor, getAuthorBySlug, getAllAuthors } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import { siteConfig } from '@/lib/config/site';
import { formatDate, calculateReadingTime } from '@/lib/utils/blog-helpers';
import { BlogPost } from '@/lib/sanity/types';

export const revalidate = 3600;

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author: any) => ({
    author: author.slug.current,
  }));
}

export async function generateMetadata({ params }: { params: { author: string } }): Promise<Metadata> {
  const author = await getAuthorBySlug(params.author);
  
  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }

  return {
    title: `${author.name} - Credit Repair Expert`,
    description: author.bio || `Articles by ${author.name}`,
    openGraph: {
      title: `${author.name} - Credit Repair Expert`,
      description: author.bio,
      url: `${siteConfig.domain.url}/blog/author/${params.author}`,
    },
  };
}

export default async function AuthorPage({ params }: { params: { author: string } }) {
  const [author, posts] = await Promise.all([
    getAuthorBySlug(params.author),
    getBlogPostsByAuthor(params.author),
  ]);
  
  if (!author) {
    notFound();
  }

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

      {/* Author Header */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 py-16">
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
            <span className="text-slate-900 dark:text-white">{author.name}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            {author.avatar && (
              <Image
                src={urlFor(author.avatar).width(150).height(150).url()}
                alt={author.name}
                width={150}
                height={150}
                className="rounded-full"
              />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                {author.name}
              </h1>
              {author.role && (
                <p className="mt-2 text-xl text-slate-600 dark:text-slate-400">
                  {author.role}
                </p>
              )}
              {author.bio && (
                <p className="mt-4 text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
                  {author.bio}
                </p>
              )}
              {author.credentials && author.credentials.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                  {author.credentials.map((credential: string) => (
                    <span
                      key={credential}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              )}
              {author.social && (
                <div className="flex gap-4 mt-6 justify-center md:justify-start">
                  {author.social.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Twitter
                    </a>
                  )}
                  {author.social.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      LinkedIn
                    </a>
                  )}
                  {author.social.website && (
                    <a
                      href={author.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Website
                    </a>
                  )}
                </div>
              )}
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-500">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Articles by {author.name}
          </h2>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">
                No articles published yet.
              </p>
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

