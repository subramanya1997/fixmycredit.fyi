'use client';

import { useAnalytics } from '@/lib/analytics/use-analytics';
import { trackWebVital } from '@/lib/analytics/gtag';
import { Suspense } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

/**
 * Client component wrapper for automatic page view tracking
 * This is needed because useSearchParams requires a Suspense boundary
 */
function AnalyticsContent() {
  useAnalytics();
  useReportWebVitals((metric) => {
    trackWebVital(metric.name, metric.value, metric.rating);
  });
  return null;
}

export function AnalyticsWrapper() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}
