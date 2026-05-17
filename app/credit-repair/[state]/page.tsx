import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { getStateGuide, stateGuides } from "@/lib/data/state-guides";
import { siteConfig } from "@/lib/config/site";

type StateGuidePageProps = {
  params: Promise<{
    state: string;
  }>;
};

export function generateStaticParams() {
  return stateGuides.map((guide) => ({
    state: guide.slug,
  }));
}

export async function generateMetadata({ params }: StateGuidePageProps): Promise<Metadata> {
  const { state } = await params;
  const guide = getStateGuide(state);

  if (!guide) {
    return {
      title: "State Credit Repair Guide Not Found",
    };
  }

  const title = `Credit Repair in ${guide.state}: Resources and Dispute Checklist`;
  const description = `A ${guide.state} credit repair resource hub with dispute planning steps, documentation reminders, and official consumer protection links.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain.url}/credit-repair/${guide.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.domain.url}/credit-repair/${guide.slug}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&category=${encodeURIComponent(guide.abbreviation)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function StateGuidePage({ params }: StateGuidePageProps) {
  const { state } = await params;
  const guide = getStateGuide(state);

  if (!guide) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Credit Repair in ${guide.state}`,
    url: `${siteConfig.domain.url}/credit-repair/${guide.slug}`,
    about: [
      "credit repair",
      "credit report disputes",
      `${guide.state} consumer protection`,
    ],
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.branding.name,
      url: siteConfig.domain.url,
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main>
        <section className="border-b border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase text-emerald-700 dark:text-emerald-400">
              {guide.abbreviation} resource guide
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Credit Repair in {guide.state}
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
              Use this page to organize credit report disputes, supporting documents, and official
              consumer protection resources for {guide.state}. This is educational content, not legal
              or credit counseling advice.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Before You Dispute
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                {guide.creditFocus.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-2xl font-bold text-slate-900 dark:text-white">
                Useful Next Steps
              </h2>
              <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                <li>Download current reports from Experian, Equifax, and TransUnion.</li>
                <li>Mark each item as accurate, inaccurate, incomplete, outdated, or unfamiliar.</li>
                <li>Gather documents before sending a dispute.</li>
                <li>Use bureau-specific dispute channels and save proof of submission.</li>
                <li>Track each response date and update your records before sending follow-ups.</li>
              </ol>
            </div>

            <aside className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Official Resource
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Start with the state consumer protection resource when the issue involves fraud,
                scams, debt collection, or broader consumer complaints.
              </p>
              <a
                href={guide.attorneyGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                {guide.attorneyGeneralName}
              </a>
            </aside>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
            <Link
              href="/tools/dispute-letter-generator"
              data-analytics-event="cta_click"
              data-analytics-label={`${guide.state} dispute letter tool`}
              className="text-sm font-semibold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
            >
              Generate a dispute letter template
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
