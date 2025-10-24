import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export function BlogCTA() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-500 p-3">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">
                Learn How to Fix Your Credit
              </h2>
              <p className="mt-2 text-lg text-blue-100">
                Expert tips, guides, and strategies to improve your credit score
              </p>
            </div>
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-semibold text-blue-600 hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            Read the Blog
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

