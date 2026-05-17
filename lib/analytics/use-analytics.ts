'use client';

import { useEffect, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  pageview,
  trackEngagementTime,
  trackNavigationClick,
  trackOutboundLink,
  trackScrollDepth,
} from './gtag';

const SCROLL_THRESHOLDS = [25, 50, 75, 90, 100];
const ENGAGEMENT_SECONDS = [15, 30, 60, 120, 300];

function getElementLabel(element: Element): string {
  const explicitLabel = element.getAttribute('data-analytics-label');
  if (explicitLabel) return explicitLabel;

  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  const text = element.textContent?.replace(/\s+/g, ' ').trim();
  return text ? text.slice(0, 80) : element.tagName.toLowerCase();
}

function isModifiedClick(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

/**
 * Hook to track page views automatically on route changes
 * Add this to your root layout or a client component wrapper
 */
export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pagePath = useMemo(() => {
    if (!pathname) return '';
    const queryString = searchParams?.toString();
    return pathname + (queryString ? `?${queryString}` : '');
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!pagePath) return;
    pageview(pagePath, document.title);
  }, [pagePath]);

  useEffect(() => {
    if (!pagePath) return;

    const trackedDepths = new Set<number>();

    const trackCurrentDepth = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const depth = Math.min(100, Math.round((scrollTop / scrollHeight) * 100));
      for (const threshold of SCROLL_THRESHOLDS) {
        if (depth >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);
          trackScrollDepth(threshold, pagePath);
        }
      }
    };

    trackCurrentDepth();
    window.addEventListener('scroll', trackCurrentDepth, { passive: true });
    window.addEventListener('resize', trackCurrentDepth);

    return () => {
      window.removeEventListener('scroll', trackCurrentDepth);
      window.removeEventListener('resize', trackCurrentDepth);
    };
  }, [pagePath]);

  useEffect(() => {
    if (!pagePath) return;

    const timers = ENGAGEMENT_SECONDS.map((seconds) =>
      window.setTimeout(() => {
        trackEngagementTime(seconds, pagePath);
      }, seconds * 1000)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [pagePath]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (isModifiedClick(event)) return;
      if (!(event.target instanceof Element)) return;

      const analyticsElement = event.target.closest<HTMLElement>(
        '[data-analytics-event], a[href], button'
      );
      if (!analyticsElement) return;

      const customEvent = analyticsElement.getAttribute('data-analytics-event');
      const label = getElementLabel(analyticsElement);

      if (customEvent === 'cta_click') {
        trackNavigationClick('cta', label);
        return;
      }

      if (analyticsElement instanceof HTMLAnchorElement) {
        const href = analyticsElement.href;
        if (!href) return;

        const linkUrl = new URL(href, window.location.href);
        if (linkUrl.origin === window.location.origin) {
          trackNavigationClick('internal_link', label, linkUrl.pathname + linkUrl.search + linkUrl.hash);
        } else {
          trackOutboundLink(linkUrl.href, label);
        }
        return;
      }

      if (analyticsElement instanceof HTMLButtonElement) {
        trackNavigationClick('button', label);
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);
}
