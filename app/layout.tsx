import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/lib/config/site";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.seo.title.default,
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.branding.name }],
  creator: siteConfig.branding.name,
  metadataBase: new URL(siteConfig.domain.url),
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
