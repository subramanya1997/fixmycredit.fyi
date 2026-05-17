/**
 * Google Analytics utility functions for tracking events.
 * Keep this layer PII-free: do not pass names, emails, phone numbers, or full
 * free-form user text into these helpers.
 */

type AnalyticsPrimitive = string | number | boolean | null | undefined;
export type AnalyticsParams = Record<string, AnalyticsPrimitive>;
type GtagCommand = 'config' | 'event' | 'js' | 'set';

const BLOCKED_PARAM_KEYS = new Set([
  'email',
  'name',
  'phone',
  'message',
  'letter',
  'body',
]);

// Extend Window interface to include gtag.
declare global {
  interface Window {
    gtag?: (
      command: GtagCommand,
      targetId: string | Date,
      config?: AnalyticsParams
    ) => void;
    dataLayer?: [GtagCommand, string | Date, AnalyticsParams?][];
  }
}

// GA Measurement ID from environment
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

// Check if GA is available and in production
export const isGAEnabled = (): boolean => {
  return (
    process.env.NODE_ENV === 'production' &&
    !!GA_MEASUREMENT_ID &&
    typeof window !== 'undefined' &&
    !!window.gtag
  );
};

function cleanParams(params?: AnalyticsParams): AnalyticsParams | undefined {
  if (!params) return undefined;

  const cleaned = Object.entries(params).reduce<AnalyticsParams>((acc, [key, value]) => {
    if (BLOCKED_PARAM_KEYS.has(key.toLowerCase())) return acc;
    if (typeof value === 'string') {
      acc[key] = value.slice(0, 120);
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

/**
 * Track page views
 */
export const pageview = (url: string, title?: string): void => {
  if (!isGAEnabled()) return;
  
  window.gtag!('config', GA_MEASUREMENT_ID!, {
    page_path: url,
    ...(title && { page_title: title }),
  });
};

/**
 * Track custom events
 */
export const event = (
  action: string,
  params?: AnalyticsParams
): void => {
  if (!isGAEnabled()) return;

  window.gtag!('event', action, cleanParams(params));
};

/**
 * Predefined event types for common actions
 */

export const trackWaitlistFormStart = (): void => {
  event('form_start', {
    event_category: 'form',
    event_label: 'Waitlist Form',
  });
};

export const trackWaitlistSubmit = (): void => {
  event('form_submit_attempt', {
    event_category: 'form',
    event_label: 'Waitlist Form',
  });
};

export const trackWaitlistSignup = (): void => {
  event('waitlist_signup', {
    event_category: 'engagement',
    event_label: 'Waitlist Form',
    value: 1,
  });
};

export const trackWaitlistError = (code: string): void => {
  event('form_error', {
    event_category: 'form',
    event_label: 'Waitlist Form',
    error_code: code,
  });
};

// Blog post view
export const trackBlogView = (title: string, slug: string): void => {
  event('blog_view', {
    event_category: 'content',
    event_label: title,
    page_path: `/blog/${slug}`,
  });
};

// Social share
export const trackShare = (platform: string, url: string): void => {
  event('share', {
    event_category: 'social',
    event_label: platform,
    value: url,
  });
};

export const trackScrollDepth = (depth: number, path: string): void => {
  event('scroll_depth', {
    event_category: 'engagement',
    event_label: `${depth}%`,
    percent_scrolled: depth,
    page_path: path,
  });
};

export const trackEngagementTime = (seconds: number, path: string): void => {
  event('engaged_time', {
    event_category: 'engagement',
    event_label: `${seconds}s`,
    engagement_seconds: seconds,
    page_path: path,
  });
};

export const trackNavigationClick = (
  clickType: 'internal_link' | 'outbound_link' | 'button' | 'cta',
  label: string,
  url?: string
): void => {
  event(clickType, {
    event_category: clickType === 'outbound_link' ? 'outbound' : 'navigation',
    event_label: label || clickType,
    ...(url && { link_url: url }),
  });
};

// External link click
export const trackOutboundLink = (url: string, label?: string): void => {
  event('outbound_link', {
    event_category: 'outbound',
    event_label: label || url,
    link_url: url,
  });
};

// Download (e.g., dispute letter templates)
export const trackDownload = (fileName: string): void => {
  event('download', {
    event_category: 'engagement',
    event_label: fileName,
  });
};

// Search
export const trackSearch = (searchTerm: string, resultCount?: number): void => {
  event('search', {
    event_category: 'engagement',
    search_term: searchTerm.slice(0, 80),
    ...(typeof resultCount === 'number' && { result_count: resultCount }),
  });
};

// Conversion events
export const trackConversion = (type: string, value?: number): void => {
  event('conversion', {
    event_category: 'conversion',
    event_label: type,
    value: value || 1,
  });
};

// Newsletter signup
export const trackNewsletterSignup = (): void => {
  event('newsletter_signup', {
    event_category: 'engagement',
    event_label: 'Newsletter Form',
  });
};

// Tool usage (calculators, generators)
export const trackToolUsage = (toolName: string, action = 'use'): void => {
  event('tool_usage', {
    event_category: 'engagement',
    event_label: toolName,
    tool_action: action,
  });
};

export const trackWebVital = (
  name: string,
  value: number,
  rating?: string
): void => {
  event('web_vital', {
    event_category: 'performance',
    event_label: name,
    value: Math.round(value),
    ...(rating && { rating }),
  });
};
