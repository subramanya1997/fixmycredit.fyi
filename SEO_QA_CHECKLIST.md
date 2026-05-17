# SEO, GEO, and Analytics QA Checklist

Run this checklist before publishing SEO, GEO, analytics, or public route changes.

## Build Gates

- `npm run lint`
- `npm run build`
- Confirm route output includes expected public pages.
- Confirm generated/internal files are not being linted.

## Rendered Metadata

Use production mode locally:

```bash
npm run build
npm run start -- -p 3000
```

Check with gstack `/browse`:

- Home canonical: `https://fixmycredit.fyi/`
- Blog canonical: `https://fixmycredit.fyi/blog`
- Category canonical: `https://fixmycredit.fyi/blog/category/{slug}`
- Author canonical: `https://fixmycredit.fyi/blog/author/{slug}`
- Tool canonical: `https://fixmycredit.fyi/tools/{slug}`
- Search route: `noindex, follow`
- Every indexable page has one H1.
- Every indexable page has `og:title`, `og:description`, and `og:image`.

## Structured Data

Representative pages should include:

- Home: `Organization`, `WebSite`, `FinancialService`, `FAQPage`
- Blog post: `Article`, `BreadcrumbList`, optional `FAQPage`
- Tool: `WebApplication`
- Website schema includes `SearchAction` pointing to `/search?q={search_term_string}`.
- Organization schema must not include placeholder social profiles.

## Crawl Surfaces

- `/robots.txt` returns 200 and blocks only private/admin/API/build routes.
- `/sitemap.xml` returns 200 and includes indexable pages.
- `/llms.txt` returns 200 and lists canonical public URLs.
- `/llms-full.txt` returns 200 and includes expanded site context.
- No private routes, admin routes, API routes, or token-bearing URLs appear in `llms` files.

## Analytics Events

Google Analytics should load only in production mode.

Expected GA4 events:

- `page_view`: emitted once per initial page load and route change.
- `web_vital`: FCP, TTFB, and other supported web vitals.
- `scroll_depth`: 25, 50, 75, 90, 100 percent.
- `engaged_time`: 15, 30, 60, 120, 300 seconds.
- `internal_link`: internal anchor clicks.
- `outbound_link`: external anchor clicks.
- `button`: non-CTA button clicks.
- `cta`: CTA clicks marked with `data-analytics-event="cta_click"`.
- `form_start`: first waitlist form interaction.
- `form_submit_attempt`: waitlist submit attempt.
- `waitlist_signup`: successful waitlist signup.
- `form_error`: validation, duplicate email, or request errors.
- `blog_view`: blog post page view.
- `share`: article share click.
- `tool_usage`: calculator, generator, and explorer use.
- `search`: internal search query and result count.

Do not send names, emails, phone numbers, full dispute letters, or free-form personal details to GA.

## Production Verification

- Confirm `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` is present in the production hosting environment.
- Open production in a browser and verify `gtag.js` loads.
- Confirm a GA request includes `tid=G-3C0J76528J`.
- Confirm initial page load creates only one `page_view`.
- In GA4, mark `waitlist_signup` as a key event.
- Verify waitlist signup, search, and tool usage in GA4 Realtime or DebugView.

## Content QA

- Credit repair claims are sourced or softened.
- No page promises guaranteed score increases.
- Finance/legal-adjacent posts include disclaimers.
- Articles show author, publish date, and update date when available.
- Priority articles include key takeaways, sources, and FAQs when available.
- Category pages include helpful hub copy, not only article listings.
