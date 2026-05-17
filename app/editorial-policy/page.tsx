import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Editorial Policy - ${siteConfig.branding.name}`,
  description:
    "How FixMyCredit writes, sources, reviews, and updates credit repair education and tools.",
  alternates: {
    canonical: `${siteConfig.domain.url}/editorial-policy`,
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Editorial Policy
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Last updated: May 16, 2026
          </p>

          <h2>Purpose</h2>
          <p>
            {siteConfig.branding.name} publishes educational credit repair content to help readers
            understand credit reports, scoring factors, dispute documentation, and credit-building
            tradeoffs. We aim to make complicated credit topics easier to evaluate without
            overstating likely outcomes.
          </p>

          <h2>Sourcing</h2>
          <p>
            Priority sources include official credit bureau documentation, consumer protection
            agencies, federal law and agency guidance, lender or score-provider documentation, and
            clearly labeled expert analysis. Articles should link to sources when a claim depends on
            a rule, law, statistic, or provider policy.
          </p>

          <h2>Review Standard</h2>
          <p>
            Credit repair guidance is reviewed for factual accuracy, realistic expectations, and
            consumer safety. Content should explain uncertainty, avoid guaranteed outcomes, and
            distinguish education from legal, financial, tax, or credit counseling advice.
          </p>

          <h2>Updates</h2>
          <p>
            Articles should be refreshed when score models, bureau policies, consumer protection
            rules, or product workflows change. Material updates should include an updated date or
            an editor note explaining what changed.
          </p>

          <h2>Corrections</h2>
          <p>
            Readers can send corrections or source suggestions to{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>. We review
            correction requests against primary sources when available.
          </p>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <Link
            href="/about"
            className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            About {siteConfig.branding.name}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
