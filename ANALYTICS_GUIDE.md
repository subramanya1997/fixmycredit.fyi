# Google Analytics 4 Integration Guide

## Overview

Your website now has comprehensive Google Analytics 4 tracking integrated with automatic page view tracking and custom event tracking for conversions.

## Configuration

### Environment Variable

Add your Google Analytics Measurement ID to `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-3C0J76528J
```

### How It Works

The integration uses Next.js's `Script` component with `afterInteractive` strategy for optimal performance:

1. **Google Analytics loads only in production** (not in development)
2. **Scripts load after page becomes interactive** (doesn't block initial render)
3. **Automatic page view tracking** on route changes
4. **Custom event tracking** for conversions

## Components

### 1. GoogleAnalytics Component
**Location**: `components/analytics/google-analytics.tsx`

Loads the gtag.js script and initializes Google Analytics.

### 2. AnalyticsWrapper Component
**Location**: `components/analytics/analytics-wrapper.tsx`

Client component that tracks page views on route changes.

### 3. Analytics Utilities
**Location**: `lib/analytics/gtag.ts`

Helper functions for tracking custom events.

## Tracking Events

### Available Event Functions

```typescript
import {
  trackWaitlistFormStart,
  trackWaitlistSubmit,
  trackWaitlistSignup,
  trackWaitlistError,
  trackBlogView,
  trackShare,
  trackScrollDepth,
  trackEngagementTime,
  trackNavigationClick,
  trackOutboundLink,
  trackDownload,
  trackSearch,
  trackConversion,
  trackNewsletterSignup,
  trackToolUsage,
  trackWebVital,
} from '@/lib/analytics/gtag';
```

### Examples

#### 1. Track Waitlist Signup
```typescript
trackWaitlistSignup();
```

#### 2. Track Blog Post Views
```typescript
trackBlogView('How to Fix Your Credit', 'how-to-fix-your-credit');
```

#### 3. Track Social Shares
```typescript
trackShare('reddit', 'https://fixmycredit.fyi/blog/post-slug');
```

#### 4. Track Downloads
```typescript
trackDownload('dispute-letter-template.pdf');
```

#### 5. Track Tool Usage
```typescript
trackToolUsage('credit-utilization-calculator', 'calculate');
```

#### 6. Track Custom Events
```typescript
import { event } from '@/lib/analytics/gtag';

event('custom_action', {
  event_category: 'engagement',
  event_label: 'Button Click',
  value: 1,
});
```

## Currently Tracked Events

### 1. Waitlist Signups ✅
**Location**: `components/marketing/waitlist-form.tsx`
- Triggers when user successfully joins waitlist
- Tracked as conversion event
- Also tracks form start, submit attempt, validation errors, duplicate email, and request errors

### 2. Social Shares ✅
**Location**: `components/blog/social-share.tsx`
- Tracks shares on Twitter, Reddit, Facebook, LinkedIn
- Includes native mobile share

### 3. Page Views ✅
**Location**: `components/analytics/analytics-wrapper.tsx`
- Automatically tracks all page navigation
- Includes query parameters
- Avoids duplicate initial page views by setting `send_page_view: false` in the GA bootstrap script

### 4. Web Vitals ✅
**Location**: `components/analytics/analytics-wrapper.tsx`
- Tracks supported Next.js web vitals through `useReportWebVitals`
- Sends metric name, rounded value, and rating

### 5. Scroll Depth ✅
**Location**: `lib/analytics/use-analytics.ts`
- Tracks 25%, 50%, 75%, 90%, and 100% scroll milestones per page

### 6. Engagement Time ✅
**Location**: `lib/analytics/use-analytics.ts`
- Tracks 15, 30, 60, 120, and 300 second engagement milestones

### 7. Navigation and CTA Clicks ✅
**Location**: `lib/analytics/use-analytics.ts`
- Tracks internal links, outbound links, ordinary button clicks, and CTA clicks
- CTA clicks use `data-analytics-event="cta_click"`

### 8. Search ✅
**Location**: `app/search/page.tsx`
- Tracks internal site search terms and result count

### 9. Tool Usage ✅
**Location**: `components/tools/*`
- Tracks utilization calculations, dispute template generation/copying, and score factor exploration

## Viewing Data in Google Analytics

### 1. Real-Time Reports
- Go to **Reports** → **Realtime**
- See current active users
- View pages being viewed now

### 2. Events
- Go to **Reports** → **Engagement** → **Events**
- See all tracked events:
  - `page_view` - Page views
  - `waitlist_signup` - Waitlist conversions
  - `form_start` - Waitlist form started
  - `form_submit_attempt` - Waitlist form submitted
  - `form_error` - Waitlist validation/request issue
  - `share` - Social shares
  - `web_vital` - Performance metrics
  - `scroll_depth` - Scroll milestones
  - `engaged_time` - Engagement milestones
  - `internal_link` - Internal navigation clicks
  - `outbound_link` - External link clicks
  - `button` - Button clicks
  - `cta` - CTA clicks
  - `search` - Internal search
  - `tool_usage` - Tool interactions
  - Custom events you create

### 3. Conversions
- Go to **Admin** → **Events**
- Mark `waitlist_signup` as a conversion
- Track conversion rate in reports

### 4. User Acquisition
- **Reports** → **Acquisition** → **Traffic acquisition**
- See where users come from:
  - Google search
  - Reddit
  - Direct traffic
  - Social media

## Setting Up Conversions in GA4

1. **Go to Admin** → Events
2. **Find** `waitlist_signup` event
3. **Toggle** "Mark as conversion"
4. **Repeat** for other important events:
   - `newsletter_signup`
   - `tool_usage`
   - `download`
   - `form_error` if you want to monitor signup friction

## Custom Dimensions (Optional)

To track additional data, create custom dimensions in GA4:

1. **Admin** → **Custom definitions**
2. **Create custom dimension**:
   - **User properties**: User type, subscription status
   - **Event properties**: Blog category, tool name, etc.

## Privacy & Compliance

The analytics helper intentionally blocks common PII keys. Do not send names, emails, phone
numbers, full dispute letters, free-form messages, or account details into GA events.

### Cookie Consent

If you need cookie consent (GDPR, CCPA), you can conditionally load GA:

```typescript
// In google-analytics.tsx
const [consent, setConsent] = useState(false);

// Only load GA if consent is true
if (!consent || !measurementId) return null;
```

### IP Anonymization

Google Analytics 4 automatically anonymizes IP addresses.

### Data Retention

Configure in **Admin** → **Data Settings** → **Data Retention**:
- Recommended: 14 months
- Helps with GDPR compliance

## Debugging

### 1. Check if GA is Loading

Open browser console and type:
```javascript
dataLayer
```

Should see an array with events.

### 2. GA Debug View

1. Install **Google Analytics Debugger** Chrome extension
2. Enable it
3. Go to GA4 → **Admin** → **DebugView**
4. Navigate your site
5. See events in real-time

### 3. Check Environment

GA only loads in production:
```bash
NODE_ENV=production npm run build
npm run start
```

## Performance Impact

✅ **Minimal impact** thanks to:
- `afterInteractive` loading strategy
- Loads after page becomes interactive
- Doesn't block critical rendering path
- Async script loading

## Best Practices

### 1. Event Naming
- Use snake_case: `waitlist_signup` ✅
- Be descriptive: `credit_calculator_used` ✅
- Avoid generic names: `click` ❌

### 2. Event Parameters
Always include:
- `event_category` - Group similar events
- `event_label` - Specific action
- `value` (optional) - Numeric value

### 3. Track What Matters
Focus on:
- ✅ Conversions (waitlist, purchases)
- ✅ Engagement (time on page, shares)
- ✅ User flow (navigation patterns)
- ❌ Don't track everything (creates noise)

## Integration with Other Tools

### Google Search Console
1. Link GA4 to Search Console
2. See which queries bring traffic
3. Optimize content based on data

### Google Tag Manager (Optional)
For more complex tracking, migrate to GTM:
- Easier event management
- No code changes needed
- A/B testing integration

## Troubleshooting

### Events Not Showing Up

**Check:**
1. ✅ Environment is production
2. ✅ `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` is set
3. ✅ Ad blockers are disabled
4. ✅ Wait 24-48 hours (GA4 has delay)

### Page Views Not Tracking

**Check:**
1. ✅ `AnalyticsWrapper` is in layout
2. ✅ Using App Router (not Pages Router)
3. ✅ Client component rendered

### Build Errors

If you get TypeScript errors:
```bash
npm run build
```

## Roadmap

Future analytics features:

- [ ] Heatmaps (Hotjar integration)
- [ ] Session recordings
- [ ] A/B testing with Google Optimize
- [ ] Enhanced ecommerce tracking
- [ ] Custom dashboards
- [ ] Automated reports via email

## Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [gtag.js Reference](https://developers.google.com/tag-platform/gtagjs/reference)

## Support

For questions about analytics:
- Check GA4 documentation
- Contact: support@fixmycredit.fyi

---

**Last Updated**: October 2025
**Measurement ID**: G-3C0J76528J
**Status**: ✅ Active
