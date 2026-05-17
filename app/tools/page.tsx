import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { siteConfig } from "@/lib/config/site";

const tools = [
  {
    title: "Credit Utilization Calculator",
    href: "/tools/credit-utilization-calculator",
    description: "Estimate your revolving utilization ratio and payoff targets for 30% and 10% utilization.",
  },
  {
    title: "Dispute Letter Generator",
    href: "/tools/dispute-letter-generator",
    description: "Create a plain-English credit report dispute template with placeholders and evidence reminders.",
  },
  {
    title: "Credit Score Factors Explorer",
    href: "/tools/credit-score-factors",
    description: "Understand the major FICO score categories and which actions usually matter most.",
  },
];

export const metadata: Metadata = {
  title: `Free Credit Repair Tools - ${siteConfig.branding.name}`,
  description:
    "Free credit repair tools for utilization planning, dispute letter templates, and credit score factor education.",
  alternates: {
    canonical: `${siteConfig.domain.url}/tools`,
  },
  openGraph: {
    title: `Free Credit Repair Tools - ${siteConfig.branding.name}`,
    description:
      "Free credit repair tools for utilization planning, dispute letter templates, and credit score factor education.",
    url: `${siteConfig.domain.url}/tools`,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Free Credit Repair Tools')}`,
        width: 1200,
        height: 630,
        alt: "Free credit repair tools",
      },
    ],
  },
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      <main>
        <section className="border-b border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Free Credit Repair Tools
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
              Use these calculators and templates to understand your credit report, plan balance
              changes, and prepare better documentation before taking action.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-3 lg:px-8">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                data-analytics-event="cta_click"
                data-analytics-label={tool.title}
                className="rounded-lg border border-slate-200 bg-white p-6 transition-colors hover:border-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-600"
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{tool.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
