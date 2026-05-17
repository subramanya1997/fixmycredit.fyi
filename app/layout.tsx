import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/lib/config/site";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { AnalyticsWrapper } from "@/components/analytics/analytics-wrapper";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { WebsiteSchema } from "@/components/seo/website-schema";
import { ErrorSuppressor } from "@/components/error-suppressor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.seo.title.default,
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.branding.name }],
  creator: siteConfig.branding.name,
  metadataBase: new URL(siteConfig.domain.url),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.domain.url,
    title: siteConfig.seo.title.default,
    description: siteConfig.seo.description,
    siteName: siteConfig.branding.name,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(siteConfig.seo.title.default)}`,
        width: 1200,
        height: 630,
        alt: siteConfig.seo.title.default,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title.default,
    description: siteConfig.seo.description,
    images: [`/api/og?title=${encodeURIComponent(siteConfig.seo.title.default)}`],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
        <LocalBusinessSchema />
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorSuppressor />
        {children}
        <Analytics />
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
