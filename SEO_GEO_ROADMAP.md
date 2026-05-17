# SEO and GEO Optimization Roadmap

Date: 2026-05-16

Scope: `fixmycredit.fyi` Next.js app, with GEO treated as generative engine optimization. Google now frames AEO/GEO as part of search optimization for AI search experiences, so the roadmap focuses on crawlable, trustworthy, original, well-structured pages that can be indexed, cited, and summarized.

## Current Audit Snapshot

- Production build passes: `npm run build` generated 19 routes, including the home page, blog index, 2 blog posts, 5 category pages, 1 author page, legal pages, sitemap, and robots.
- Lint fails: `npm run lint` reported 479 errors and 1686 warnings, heavily inflated by generated Prisma files being linted, plus real app-level errors.
- Indexable editorial inventory is thin: only 2 blog posts are generated.
- `/blog`, `/blog/category/*`, and `/blog/author/*` render canonical URLs pointing to `https://fixmycredit.fyi/`, which consolidates those pages into the home page.
- `robots.txt` allows standard crawlers but blocks `GPTBot` and `ChatGPT-User`, which conflicts with a broad AI-answer visibility goal.
- Home page and blog pages have basic metadata and JSON-LD, but no page-specific answer surfaces, no OG image fallback, no `WebSite` schema, no `SearchAction`, and no reusable trust/evidence system for finance-adjacent content.

## Roadmap

### Phase 0: Indexability and Release Hygiene

Goal: stop technical issues from hiding or diluting the few pages that already exist.

- Fix canonical URLs for every indexable route.
- Fix lint configuration so generated Prisma artifacts are excluded, then clean app-level lint errors.
- Add Search Console and sitemap validation checks to deployment QA.
- Decide AI crawler policy for `robots.txt` before adding AI-specific surfaces.

### Phase 1: Trust, Schema, and AI-Readable Page Structure

Goal: make the site credible enough for credit repair, which is finance/legal-adjacent YMYL content.

- Add author/reviewer trust fields, review dates, sources, citations, and editorial policy.
- Upgrade JSON-LD from generic site-wide schema to page-specific schema.
- Add answer-first content blocks: key takeaways, direct answers, FAQ, definitions, steps, caveats, and source lists.
- Add `llms.txt` and `llms-full.txt` only after crawler policy is settled.

### Phase 2: Content Moats and Topical Authority

Goal: move from two generic articles to a defensible credit repair knowledge graph.

- Build topic clusters for disputes, collections, charge-offs, utilization, late payments, credit score models, and state laws.
- Ship free tools that earn links and AI citations: utilization calculator, dispute letter generator, credit score factor explorer, debt payoff/credit impact simulator.
- Convert category pages into hub pages with original summaries, internal links, FAQs, and recommended reading paths.

### Phase 3: Distribution, Measurement, and Iteration

Goal: measure search and AI-answer visibility, then improve based on real queries.

- Wire Search Console, GA4 events, and Vercel analytics into a weekly content dashboard.
- Track query clusters, page indexing, rich result eligibility, conversions, backlinks, and citations.
- Create a refresh cadence for legal/credit bureau changes and outdated posts.

## Tickets

### Ticket 1: Fix Canonical URLs for Blog, Category, Author, and Static Routes

Priority: P0

Problem: Rendered `/blog`, category, and author pages currently inherit the root canonical URL from `app/layout.tsx`, pointing search engines to `https://fixmycredit.fyi/` instead of their own URL.

Evidence:
- `/blog` rendered canonical: `https://fixmycredit.fyi/`
- `/blog/category/credit-scores` rendered canonical: `https://fixmycredit.fyi/`
- `/blog/author/subramanya-n` rendered canonical: `https://fixmycredit.fyi/`
- Blog post pages correctly set canonical to their own URL.

Files:
- `app/layout.tsx`
- `app/blog/page.tsx`
- `app/blog/category/[category]/page.tsx`
- `app/blog/author/[author]/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/disclaimer/page.tsx`

Scope:
- Remove global `alternates.canonical` from root layout or ensure every indexable child route overrides it.
- Add explicit canonical URLs to `/blog`, category, author, and legal metadata.
- Keep blog post canonical behavior unchanged.

Acceptance Criteria:
- `/blog` canonical is `https://fixmycredit.fyi/blog`.
- Every category canonical is `https://fixmycredit.fyi/blog/category/{slug}`.
- Every author canonical is `https://fixmycredit.fyi/blog/author/{slug}`.
- Legal pages either self-canonicalize or are intentionally `noindex`.
- Local `/browse` checks confirm the rendered canonical values.

### Ticket 2: Repair Lint Scope and App-Level Lint Errors

Priority: P0

Problem: `npm run lint` fails, which blocks reliable CI and makes SEO regressions harder to catch. Most noise comes from `lib/generated/prisma/**`, but there are also real app errors.

Evidence:
- `npm run lint` failed with 479 errors and 1686 warnings.
- Generated Prisma files are being linted.
- App-level failures include `no-explicit-any`, unescaped text, a `next/link` issue in the footer, and `react-hooks/set-state-in-effect` in `components/blog/social-share.tsx`.

Files:
- `eslint.config.mjs`
- `app/blog/[slug]/page.tsx`
- `app/blog/category/[category]/page.tsx`
- `app/blog/author/[author]/page.tsx`
- `app/sitemap.ts`
- `components/blog/portable-text-components.tsx`
- `components/blog/social-share.tsx`
- `components/marketing/footer.tsx`
- `components/marketing/waitlist-form.tsx`
- `lib/analytics/gtag.ts`
- `lib/utils/blog-helpers.ts`

Scope:
- Exclude generated Prisma artifacts from lint.
- Replace local `any` usage with targeted types.
- Fix React and Next lint violations.
- Preserve build output.

Acceptance Criteria:
- `npm run lint` exits successfully.
- `npm run build` still exits successfully.
- Generated files are not linted.

### Ticket 3: Decide and Implement AI Crawler Policy

Priority: P0

Problem: `robots.txt` blocks `GPTBot` and `ChatGPT-User`, which conflicts with a broad GEO goal. Google generative AI visibility depends on pages being crawlable and indexable in Google Search, but other AI systems may use their own crawlers or user agents.

Evidence:
- Rendered `robots.txt` contains:
  - `User-Agent: GPTBot`
  - `Disallow: /`
  - `User-Agent: ChatGPT-User`
  - `Disallow: /`

Files:
- `app/robots.ts`

Scope:
- Decide whether the site wants broad AI crawler access, Google-only AI visibility, or a conservative licensing posture.
- If broad GEO is desired, allow relevant AI crawlers to public content while continuing to block private/admin/API routes.
- Document the policy in the repo.

Acceptance Criteria:
- `robots.txt` reflects the chosen policy.
- Public content remains crawlable by Googlebot.
- Admin, Studio, API, and private routes remain blocked.
- The policy explicitly separates search indexing from AI training/citation access.

### Ticket 4: Add AI-Readable Content Surfaces

Priority: P1

Problem: The site has ordinary web pages but no AI-agent summary surfaces. That makes it harder for non-Google assistants and retrieval systems to understand what pages are authoritative.

Files:
- `app/llms.txt/route.ts` or `public/llms.txt`
- `app/llms-full.txt/route.ts` or `public/llms-full.txt`
- `lib/seo/llms.ts`
- `app/sitemap.ts`

Scope:
- Add `llms.txt` with site purpose, canonical URLs, priority guides, tools, contact, and policy notes.
- Add `llms-full.txt` with expanded summaries of evergreen pages and posts.
- Generate these from existing route/content data where possible.
- Link to sitemap and high-value hub pages.

Acceptance Criteria:
- `/llms.txt` and `/llms-full.txt` return 200.
- They contain canonical absolute URLs.
- They do not expose private, admin, Studio, API, or token-bearing data.
- They are updated when new posts or tools are added.

### Ticket 5: Upgrade Site-Wide and Page-Specific Structured Data

Priority: P1

Problem: The site emits `Organization`, `FinancialService`, `Article`, and `BreadcrumbList`, but schema is incomplete and sometimes generic. `FAQSchema` exists but is unused. The Sanity schema allows `HowTo` and `FAQPage`, but the renderer does not output valid `HowTo` steps or FAQ entities.

Files:
- `components/seo/organization-schema.tsx`
- `components/seo/local-business-schema.tsx`
- `components/seo/structured-data.tsx`
- `components/seo/faq-schema.tsx`
- `app/layout.tsx`
- `app/blog/[slug]/page.tsx`
- `sanity/schemas/blogPost.ts`

Scope:
- Add `WebSite` schema with `SearchAction` if site search is implemented.
- Add `ProfilePage` or author schema for author pages.
- Add page-specific breadcrumb schema to blog index, category, and author pages.
- Add valid `FAQPage` schema when visible FAQs are present.
- Add valid `HowTo` schema only for posts with explicit steps, tools, materials, and caveats.
- Avoid declaring `LocalBusiness` fields that are not true for a purely online service.

Acceptance Criteria:
- JSON-LD validates in Rich Results Test where eligible.
- Schema content matches visible page content.
- How-to and FAQ schema are never emitted from generic article fields alone.
- Author pages expose credentials, bio, and social profiles consistently.

### Ticket 6: Build Trust and E-E-A-T for Credit Repair Content

Priority: P1

Problem: Credit repair is finance/legal-adjacent. The current pages have an author name and light bio, but no strong trust system: no reviewed-by field, editorial policy, source policy, update policy, credentials detail, or compliance caveats on articles.

Files:
- `sanity/schemas/author.ts`
- `sanity/schemas/blogPost.ts`
- `app/blog/[slug]/page.tsx`
- `app/blog/author/[author]/page.tsx`
- `app/disclaimer/page.tsx`
- new `app/about/page.tsx`
- new `app/editorial-policy/page.tsx`

Scope:
- Add fields for reviewer, reviewed date, fact-check notes, citations, source URLs, and update reason.
- Add an editorial policy page.
- Add an About page with ownership, mission, and disclaimers.
- Add visible source lists to articles.
- Add stronger disclaimers around legal/financial advice and dispute letter limitations.

Acceptance Criteria:
- Every finance-adjacent article shows author, reviewer or review status, publish/update dates, and sources.
- Author pages include credentials, conflicts, and social/entity links.
- About/editorial/disclaimer pages are linked from footer and article templates.
- Claims about credit score improvement, bureau integration, or legal rights are sourced or softened.

### Ticket 7: Implement Dynamic Open Graph Images and Image SEO

Priority: P1

Problem: The app has `lib/seo/generate-og-image.ts`, but no `/api/og` route. Home and blog pages render no `og:image` or `twitter:image` fallback. Posts only get images when Sanity `mainImage` exists.

Files:
- `lib/seo/generate-og-image.ts`
- new `app/api/og/route.tsx`
- `app/layout.tsx`
- `app/blog/[slug]/page.tsx`
- `app/blog/page.tsx`
- `sanity/schemas/blogPost.ts`

Scope:
- Implement an Edge OG image route.
- Add default OG images for home, blog index, category, author, and legal pages.
- Add post-specific OG image generation when `mainImage` is missing.
- Make Sanity image alt text required and editorially meaningful.

Acceptance Criteria:
- Every indexable route has an `og:image`.
- Images are 1200x630, cacheable, and absolute URLs.
- `twitter:image` is present where `twitter:card` is `summary_large_image`.
- Social sharing preview tests pass for representative pages.

### Ticket 8: Convert Blog Categories Into SEO/GEO Hub Pages

Priority: P1

Problem: Category pages currently function as thin listing pages. They have one H1, optional description, and article cards, but no original hub content, FAQs, related tools, or entity coverage.

Files:
- `sanity/schemas/category.ts`
- `app/blog/category/[category]/page.tsx`
- `lib/sanity/queries.ts`

Scope:
- Add category fields for intro, entity summary, FAQs, primary keywords, related tools, related categories, and recommended reading order.
- Render category pages as hub pages, not just archives.
- Add internal links from home/blog/article templates into hub pages.

Acceptance Criteria:
- Each category has 500 to 1000 words of original hub copy.
- Each hub links to at least 3 relevant articles or planned articles.
- Each hub includes 3 to 5 visible FAQs where appropriate.
- Category canonical URLs are fixed before hubs are indexed.

### Ticket 9: Create Core Topic Clusters

Priority: P1

Problem: Current editorial inventory is too small to compete in credit repair. The strategy doc lists valuable topics, but the app currently builds only 2 posts.

Initial Clusters:
- Credit report disputes
- Collections and charge-offs
- Late payments and goodwill letters
- Credit utilization
- FICO vs VantageScore and score factors
- Identity theft and fraud alerts
- Medical collections
- Bankruptcy recovery
- State-by-state credit repair laws and resources

Scope:
- Build one pillar page per cluster.
- Build 5 to 8 supporting articles per cluster.
- Add answer-first sections, original examples, templates, citations, and FAQs.
- Add internal links from every supporting article to the pillar and adjacent tools.

Acceptance Criteria:
- First 30 pages published across 4 highest-intent clusters.
- Every page has a unique search intent, not only keyword variation.
- Every page has visible citations and update dates.
- No AI-scaled thin pages.

### Ticket 10: Build Linkable Free Tools

Priority: P1

Problem: The repo has a `creditTool` Sanity schema, but no public tool routes. Free calculators and generators are likely stronger link and citation assets than generic articles.

Files:
- `sanity/schemas/creditTool.ts`
- new `app/tools/page.tsx`
- new `app/tools/credit-utilization-calculator/page.tsx`
- new `app/tools/dispute-letter-generator/page.tsx`
- new `app/tools/credit-score-factors/page.tsx`

Scope:
- Add a tools index.
- Build a credit utilization calculator.
- Build a dispute letter generator with compliance disclaimers.
- Build a credit score factor explorer.
- Add tool schema where appropriate, such as `SoftwareApplication` or `WebApplication`.

Acceptance Criteria:
- Tools are crawlable without login.
- Calculators work without collecting personal data.
- Each tool has supporting educational content and FAQs.
- Tool pages are linked from home, blog, relevant posts, and sitemap.

### Ticket 11: Add Answer-First Article Template Blocks

Priority: P2

Problem: Articles are readable, but they are not optimized for quick extraction by AI answer systems or featured snippet-style results. The FICO vs VantageScore post is about 857 rendered words and lacks key takeaways, direct answers, FAQ, TOC, and visible citations as links.

Files:
- `sanity/schemas/blogPost.ts`
- `components/blog/portable-text-components.tsx`
- `app/blog/[slug]/page.tsx`

Scope:
- Add optional fields for key takeaways, direct answer, common questions, table of contents, source links, and templates/downloads.
- Render those blocks above or within article content.
- Ensure tables render with semantic headers and captions.

Acceptance Criteria:
- Each priority article starts with a 40 to 70 word direct answer.
- Each article includes 3 to 6 key takeaways.
- Tables use `thead`, `th`, captions, and accessible labels.
- Source references are linked and visible.

### Ticket 12: Implement Internal Search and `WebSite` SearchAction

Priority: P2

Problem: The site has content and categories but no search page. Without search, `WebSite` `SearchAction` schema should not be emitted.

Files:
- new `app/search/page.tsx`
- `lib/sanity/queries.ts`
- `components/seo/website-schema.tsx`

Scope:
- Add a simple server-rendered search page for posts, tools, and categories.
- Add `WebSite` schema with `SearchAction` only after search exists.
- Link search from header or blog page.

Acceptance Criteria:
- `/search?q=fico` returns relevant results.
- Search page is indexable only if useful, otherwise `noindex,follow`.
- `WebSite` schema validates and points to the search route.

### Ticket 13: Add State-Specific Guides Carefully

Priority: P2

Problem: The strategy doc calls for state-specific credit repair content, but no state routes exist. This can help geographic SEO, but it is risky if pages are thin or legally inaccurate.

Files:
- new `app/credit-repair/[state]/page.tsx`
- new `lib/data/states.ts`
- `app/sitemap.ts`

Scope:
- Start with 5 high-population states: California, Texas, Florida, New York, Pennsylvania.
- Include state attorney general resources, consumer protection contacts, statute/resource links, local nonprofit credit counseling links, and state-specific disclaimers.
- Avoid templated pages unless each state has unique verified resources.

Acceptance Criteria:
- First 5 state pages contain materially unique resources.
- Legal references link to official state sources.
- Pages include visible update dates and review workflow.
- Sitemap includes only completed state pages.

### Ticket 14: Add Measurement and SEO QA Workflow

Priority: P2

Problem: GA4 wiring exists, but there is no visible SEO QA workflow covering Search Console, sitemap submission, index coverage, rich results, or AI visibility tracking.

Files:
- `ANALYTICS_GUIDE.md`
- new `SEO_QA_CHECKLIST.md`
- `components/analytics/analytics-wrapper.tsx`
- `lib/analytics/gtag.ts`

Scope:
- Add events for waitlist signup, article scroll depth, tool use, social share, and internal search.
- Add Search Console verification checklist.
- Add weekly dashboard requirements: indexed pages, impressions, clicks, CTR, top queries, rich results, conversions, and backlinks.
- Add a pre-publish checklist for canonical, title, description, schema, OG image, citations, and internal links.

Acceptance Criteria:
- New SEO QA checklist exists and is linked from README or docs.
- GA4 events fire for primary conversions and content interactions.
- Search Console sitemap submission is documented.
- Each publish includes metadata/schema verification.

### Ticket 15: Clean Up Brand, Social, and Entity Consistency

Priority: P2

Problem: The rendered site uses `FixMyCredit`, while config defaults use `fixmycredit.fyi`, comments mention `RepairMyCredit`, and social URLs point to `repairmycredit`. Entity inconsistency weakens brand clarity for search systems and users.

Files:
- `lib/config/site.ts`
- `components/marketing/footer.tsx`
- `components/seo/organization-schema.tsx`
- `README.md`
- `SETUP.md`

Scope:
- Pick one brand name and casing.
- Replace stale `repairmycredit` social/profile URLs or remove them until real profiles exist.
- Add official sameAs profiles only when controlled by the business.
- Ensure organization schema, footer, metadata, and docs match.

Acceptance Criteria:
- Header, footer, metadata, JSON-LD, docs, and social profiles use the same brand entity.
- No placeholder GitHub/social links remain in the footer.
- `sameAs` contains only real controlled profiles.

## Source Guidance Used

- Google Search Central: [Optimizing your website for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- Google Search Central: [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Google Search Central: [Search Essentials](https://developers.google.com/search/docs/essentials)
- Google Search Central: [Structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
