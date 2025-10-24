import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Terms of Service - " + siteConfig.branding.name,
  description: "Terms of service for " + siteConfig.branding.name,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />
      
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Last updated: October 24, 2025</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using {siteConfig.branding.name}, you accept and agree to be bound by the terms and
            provision of this agreement. If you do not agree to these terms, please do not use our service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            {siteConfig.branding.name} is a credit repair platform that provides tools, resources, and guidance to
            help users improve their credit scores. Our service includes credit score simulation, dispute letter
            templates, and personalized action plans.
          </p>

          <h2>3. User Accounts</h2>
          <p>When our service launches, you may be required to create an account to access certain features. You are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your account information</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>

          <h2>4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any portion of the service</li>
            <li>Interfere with or disrupt the service or servers</li>
            <li>Transmit any viruses, malware, or other harmful code</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            All content, features, and functionality of {siteConfig.branding.name} are owned by us and are protected
            by copyright, trademark, and other intellectual property laws.
          </p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>
            The service is provided "as is" without warranties of any kind, either express or implied. We do not
            guarantee that the service will be uninterrupted, secure, or error-free.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            In no event shall {siteConfig.branding.name}, its officers, directors, employees, or agents be liable for
            any indirect, incidental, special, consequential, or punitive damages resulting from your use of the
            service.
          </p>

          <h2>8. Payment and Refunds</h2>
          <p>
            Subscription fees, when applicable, will be clearly stated. We offer a satisfaction guarantee - if
            you're not satisfied within the first 30 days, contact us for a full refund.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the service immediately, without prior notice, for
            conduct that we believe violates these Terms of Service or is harmful to other users.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any material changes via
            email or through the service.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United States, without
            regard to its conflict of law provisions.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at{" "}
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

