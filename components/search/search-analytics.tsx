"use client";

import { useEffect } from "react";
import { trackSearch } from "@/lib/analytics/gtag";

type SearchAnalyticsProps = {
  query: string;
  resultCount: number;
};

export function SearchAnalytics({ query, resultCount }: SearchAnalyticsProps) {
  useEffect(() => {
    if (!query) return;
    trackSearch(query, resultCount);
  }, [query, resultCount]);

  return null;
}
