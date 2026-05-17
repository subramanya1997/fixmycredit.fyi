import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `About ${siteConfig.branding.name}`,
  description:
    "Learn how FixMyCredit explains credit reports, disputes, score factors, and credit repair tools for US consumers.",
  alternates: {
    canonical: `${siteConfig.domain.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            About {siteConfig.branding.name}
          </h1>
          <p>
            {siteConfig.branding.name} is a credit repair education and tooling project for people
            who want clearer guidance on credit reports, credit scores, disputes, utilization, and
            score improvement planning.
          </p>
          <p>
            The site focuses on practical explanations, calculators, templates, and plain-English
            caveats. Credit reporting and debt disputes can have legal and financial consequences,
            so the content is designed as a starting point for research rather than a substitute for
            a qualified professional.
          </p>

          <h2>What We Publish</h2>
          <ul>
            <li>Credit score factor explainers.</li>
            <li>Credit report dispute and documentation guidance.</li>
            <li>Credit utilization and payoff planning tools.</li>
            <li>Consumer credit terminology and bureau process education.</li>
          </ul>

          <h2>What We Do Not Do</h2>
          <ul>
            <li>We do not guarantee credit score increases.</li>
            <li>We do not provide legal, tax, financial, or credit counseling advice.</li>
            <li>We do not ask users to send inaccurate or misleading disputes.</li>
            <li>We do not publish official social profiles at this time.</li>
          </ul>

          <h2>Contact</h2>
          <p>
            Questions, corrections, or source suggestions can be sent to{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
          </p>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <Link
            href="/editorial-policy"
            className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Read the editorial policy
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
