import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export function BlogCTA() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="flex-shrink-0">
              <div className="inline-flex rounded-lg bg-slate-900 p-3 dark:bg-white">
                <BookOpen className="h-6 w-6 text-white dark:text-slate-900" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
                Learn How to Fix Your Credit
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Expert tips, guides, and strategies to improve your credit score
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Read the Blog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

