import type { Metadata } from "next";
import { CreditUtilizationCalculator } from "@/components/tools/credit-utilization-calculator";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Credit Utilization Calculator - ${siteConfig.branding.name}`,
  description:
    "Calculate your credit utilization ratio and estimate how much to pay to reach 30% or 10% utilization.",
  alternates: {
    canonical: `${siteConfig.domain.url}/tools/credit-utilization-calculator`,
  },
  openGraph: {
    title: "Credit Utilization Calculator",
    description:
      "Calculate your credit utilization ratio and payoff targets for healthier reported balances.",
    url: `${siteConfig.domain.url}/tools/credit-utilization-calculator`,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Credit Utilization Calculator')}&category=${encodeURIComponent('Tool')}`,
        width: 1200,
        height: 630,
        alt: "Credit utilization calculator",
      },
    ],
  },
};

export default function CreditUtilizationCalculatorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Credit Utilization Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${siteConfig.domain.url}/tools/credit-utilization-calculator`,
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
          <p className="text-sm font-semibold uppercase text-emerald-700 dark:text-emerald-400">Free tool</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Credit Utilization Calculator
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
            Estimate your revolving utilization ratio and see how far your current balance is from
            common 30% and 10% utilization targets.
          </p>
        </div>
        <CreditUtilizationCalculator />
      </main>
      <Footer />
    </div>
  );
}
