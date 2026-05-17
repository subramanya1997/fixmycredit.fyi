import type { Metadata } from "next";
import { CreditScoreFactorsExplorer } from "@/components/tools/credit-score-factors-explorer";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Credit Score Factors Explorer - ${siteConfig.branding.name}`,
  description:
    "Explore the major credit score factors, approximate FICO category weights, and what each factor means.",
  alternates: {
    canonical: `${siteConfig.domain.url}/tools/credit-score-factors`,
  },
  openGraph: {
    title: "Credit Score Factors Explorer",
    description:
      "Explore the major FICO score categories and what each factor means.",
    url: `${siteConfig.domain.url}/tools/credit-score-factors`,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Credit Score Factors Explorer')}&category=${encodeURIComponent('Tool')}`,
        width: 1200,
        height: 630,
        alt: "Credit score factors explorer",
      },
    ],
  },
};

export default function CreditScoreFactorsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Credit Score Factors Explorer",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${siteConfig.domain.url}/tools/credit-score-factors`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase text-emerald-700 dark:text-emerald-400">Free explainer</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Credit Score Factors Explorer
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
            Learn the major credit score factor categories and why payment history and revolving
            utilization usually deserve the most attention.
          </p>
        </div>
        <CreditScoreFactorsExplorer />
      </main>
      <Footer />
    </div>
  );
}
