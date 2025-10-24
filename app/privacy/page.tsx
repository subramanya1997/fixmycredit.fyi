import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy - " + siteConfig.branding.name,
  description: "Privacy policy for " + siteConfig.branding.name,
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Last updated: October 24, 2025</p>

          <h2>Information We Collect</h2>
          <p>
            When you join our waitlist, we collect your name and email address. This information is used solely to
            notify you when our service launches and to provide you with relevant updates.
          </p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Notify you when {siteConfig.branding.name} launches</li>
            <li>Send you important updates about our service</li>
            <li>Improve our product and user experience</li>
          </ul>

          <h2>Data Storage and Security</h2>
          <p>
            Your data is stored securely and we implement industry-standard security measures to protect your
            personal information. We will never sell or share your information with third parties without your
            explicit consent.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of your personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Opt-out of our email communications at any time</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain
            information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services such as Google Analytics to understand how our website is used. These
            services may collect information sent by your browser as part of a web page request.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal
            information from children under 18.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
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

