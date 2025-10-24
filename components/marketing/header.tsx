"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-slate-900 dark:text-white">
            {siteConfig.branding.name}
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Blog
            </Link>
            <Link
              href="/#waitlist"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Join Waitlist
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

