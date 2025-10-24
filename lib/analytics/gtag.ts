/**
 * Google Analytics utility functions for tracking events
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
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

/**
 * Track page views
 */
export const pageview = (url: string): void => {
  if (!isGAEnabled()) return;
  
  window.gtag!('config', GA_MEASUREMENT_ID!, {
    page_path: url,
  });
};

/**
 * Track custom events
 */
export const event = (
  action: string,
  params?: Record<string, any>
): void => {
  if (!isGAEnabled()) return;

  window.gtag!('event', action, params);
};

/**
 * Predefined event types for common actions
 */

// Waitlist signup
export const trackWaitlistSignup = (email: string): void => {
  event('waitlist_signup', {
    event_category: 'engagement',
    event_label: 'Waitlist Form',
    value: 1,
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

// External link click
export const trackOutboundLink = (url: string, label?: string): void => {
  event('click', {
    event_category: 'outbound',
    event_label: label || url,
    value: url,
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
export const trackSearch = (searchTerm: string): void => {
  event('search', {
    event_category: 'engagement',
    search_term: searchTerm,
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
export const trackToolUsage = (toolName: string): void => {
  event('tool_usage', {
    event_category: 'engagement',
    event_label: toolName,
  });
};

