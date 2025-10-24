'use client';

import { useAnalytics } from '@/lib/analytics/use-analytics';
import { Suspense } from 'react';

/**
 * Client component wrapper for automatic page view tracking
 * This is needed because useSearchParams requires a Suspense boundary
 */
function AnalyticsContent() {
  useAnalytics();
  return null;
}

export function AnalyticsWrapper() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}

