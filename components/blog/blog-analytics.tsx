"use client";

import { useEffect } from "react";
import { trackBlogView } from "@/lib/analytics/gtag";

type BlogAnalyticsProps = {
  title: string;
  slug: string;
};

export function BlogAnalytics({ title, slug }: BlogAnalyticsProps) {
  useEffect(() => {
    trackBlogView(title, slug);
  }, [slug, title]);

  return null;
}
