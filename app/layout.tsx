import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/lib/config/site";
import { Analytics } from "@vercel/analytics/react";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
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
  alternates: {
    canonical: siteConfig.domain.url,
  },
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
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title.default,
    description: siteConfig.seo.description,
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
        <LocalBusinessSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
