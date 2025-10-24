import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Disclaimer - " + siteConfig.branding.name,
  description: "Disclaimer for " + siteConfig.branding.name,
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Disclaimer</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Last updated: October 24, 2025</p>

          <h2>General Disclaimer</h2>
          <p>
            The information provided by {siteConfig.branding.name} is for general informational and educational
            purposes only. All information on the site is provided in good faith, however we make no representation or
            warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability,
            availability, or completeness of any information on the site.
          </p>

          <h2>Not Financial or Legal Advice</h2>
          <p>
            The content on {siteConfig.branding.name} does not constitute financial, legal, or professional advice.
            Before taking any actions related to credit repair, you should consult with a qualified professional in
            the relevant field.
          </p>

          <h2>Credit Score Simulations</h2>
          <p>
            Our Monte Carlo credit score simulations are statistical models based on historical data and industry
            practices. These simulations are estimates only and do not guarantee actual results. Actual credit score
            changes may vary significantly based on numerous factors including:
          </p>
          <ul>
            <li>Individual credit history and behavior</li>
            <li>Credit bureau algorithms and scoring models</li>
            <li>Economic conditions and lending practices</li>
            <li>Actions taken by creditors and credit bureaus</li>
          </ul>

          <h2>No Guaranteed Results</h2>
          <p>
            While we provide tools and guidance to help improve credit scores, we cannot and do not guarantee any
            specific results or outcomes. Credit repair is a complex process that depends on many individual factors
            beyond our control.
          </p>

          <h2>Credit Bureau Relationships</h2>
          <p>
            {siteConfig.branding.name} is not affiliated with, endorsed by, or sponsored by Experian, TransUnion,
            Equifax, or any other credit bureau or financial institution. Any integration with credit bureaus is done
            through authorized APIs and third-party services.
          </p>

          <h2>Fair Credit Reporting Act (FCRA)</h2>
          <p>
            Our dispute letter templates and guidance are designed to help you exercise your rights under the Fair
            Credit Reporting Act. However, we are not law firm and do not provide legal representation. If you
            need legal assistance, please consult with a qualified attorney.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or services that are not owned or controlled by
            {siteConfig.branding.name}. We have no control over, and assume no responsibility for, the content,
            privacy policies, or practices of any third-party websites or services.
          </p>

          <h2>User Responsibility</h2>
          <p>
            You are solely responsible for:
          </p>
          <ul>
            <li>Verifying the accuracy of your credit information</li>
            <li>Ensuring all dispute letters and communications are truthful and accurate</li>
            <li>Complying with all applicable laws and regulations</li>
            <li>Making informed decisions about your credit and financial matters</li>
          </ul>

          <h2>Changes to This Disclaimer</h2>
          <p>
            We may update this Disclaimer from time to time. We will notify you of any changes by posting the new
            Disclaimer on this page and updating the "Last updated" date.
          </p>

          <h2>Professional Advice</h2>
          <p>
            The information on this site is intended as a starting point for your own research and is not a substitute
            for professional financial or legal advice. Always seek the advice of qualified professionals for your
            specific situation.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Disclaimer, please contact us at{" "}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

