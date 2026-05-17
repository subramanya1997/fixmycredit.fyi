import type { Metadata } from "next";
import { DisputeLetterGenerator } from "@/components/tools/dispute-letter-generator";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Dispute Letter Generator - ${siteConfig.branding.name}`,
  description:
    "Generate a credit report dispute letter template with placeholders, evidence reminders, and FCRA-oriented wording.",
  alternates: {
    canonical: `${siteConfig.domain.url}/tools/dispute-letter-generator`,
  },
  openGraph: {
    title: "Dispute Letter Generator",
    description:
      "Generate a credit report dispute template with placeholders and evidence reminders.",
    url: `${siteConfig.domain.url}/tools/dispute-letter-generator`,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Dispute Letter Generator')}&category=${encodeURIComponent('Tool')}`,
        width: 1200,
        height: 630,
        alt: "Dispute letter generator",
      },
    ],
  },
};

export default function DisputeLetterGeneratorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Dispute Letter Generator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    url: `${siteConfig.domain.url}/tools/dispute-letter-generator`,
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
          <p className="text-sm font-semibold uppercase text-emerald-700 dark:text-emerald-400">Free template</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dispute Letter Generator
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
            Create a starting template for a credit report dispute. Replace placeholders with your
            accurate account details and include supporting documentation before sending.
          </p>
        </div>
        <DisputeLetterGenerator />
        <p className="mt-8 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          This template is educational and is not legal advice. Do not dispute accurate information
          or submit statements you cannot support with records.
        </p>
      </main>
      <Footer />
    </div>
  );
}
