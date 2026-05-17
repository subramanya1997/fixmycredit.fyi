import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { SearchAnalytics } from "@/components/search/search-analytics";
import { searchBlogPosts } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils/blog-helpers";
import { siteConfig } from "@/lib/config/site";
import type { BlogPost } from "@/lib/sanity/types";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

type SearchResult = Pick<BlogPost, "_id" | "title" | "slug" | "excerpt" | "publishedAt">;

export const metadata: Metadata = {
  title: `Search - ${siteConfig.branding.name}`,
  description: "Search FixMyCredit articles and credit repair education.",
  alternates: {
    canonical: `${siteConfig.domain.url}/search`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q || "").trim().slice(0, 80);
  const results = query ? ((await searchBlogPosts(query)) as SearchResult[]) : [];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <SearchAnalytics query={query} resultCount={results.length} />
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Search
        </h1>
        <form action="/search" className="mt-8 flex gap-3">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search credit score, disputes, utilization..."
            className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
          <button
            type="submit"
            data-analytics-event="cta_click"
            data-analytics-label="Site search submit"
            className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            Search
          </button>
        </form>

        <section className="mt-10">
          {query ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {results.length} {results.length === 1 ? "result" : "results"} for &quot;{query}&quot;
            </p>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Search articles, tools, and credit education topics.
            </p>
          )}

          <div className="mt-8 space-y-6">
            {results.map((post) => (
              <article
                key={post._id}
                className="border-b border-slate-200 pb-6 last:border-b-0 dark:border-slate-800"
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  <Link href={`/blog/${post.slug.current}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {post.excerpt}
                </p>
                <time className="mt-3 block text-xs text-slate-500" dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
