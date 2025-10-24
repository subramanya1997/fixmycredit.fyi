# FixMyCredit.fyi - Credit Repair Platform

A comprehensive credit repair platform with modern landing page, SEO-optimized blog, and headless CMS integration.

## 🚀 Features

### Landing Page
- ✅ Modern, responsive landing page design
- ✅ Hero section with gradient backgrounds
- ✅ Features showcase (6 key features)
- ✅ Pricing section (Monthly & Annual plans)
- ✅ Testimonials with before/after credit scores
- ✅ Waitlist registration form with validation
- ✅ Email confirmation via Resend
- ✅ Database storage with Prisma
- ✅ Dark mode support
- ✅ Smooth scroll animations
- ✅ Mobile-first responsive design

### Blog & SEO (NEW! 🎉)
- ✅ **Sanity CMS Integration** - Headless CMS for content management
- ✅ **Blog System** - Full-featured blog with categories, authors, and tags
- ✅ **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- ✅ **Structured Data** - JSON-LD schema for Articles, Organization, FAQs, LocalBusiness
- ✅ **Dynamic Sitemap** - Auto-generated sitemap.xml with blog posts
- ✅ **Robots.txt** - Configured for optimal crawling
- ✅ **Social Sharing** - Reddit, Twitter, Facebook, LinkedIn integration
- ✅ **ISR (Incremental Static Regeneration)** - Fast performance with fresh content
- ✅ **Related Posts** - AI-powered content recommendations
- ✅ **Reading Time** - Automatic calculation
- ✅ **Author Profiles** - Detailed author pages with bios
- ✅ **Category Pages** - Organized content by topic
- ✅ **Search Intent Optimization** - Target keywords for Google & Reddit

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Lucide React
- **CMS**: Sanity.io (Headless CMS)
- **Content**: Portable Text with React
- **Form Handling**: React Hook Form + Zod validation
- **Database**: PostgreSQL with Prisma ORM
- **Email**: Resend
- **Analytics**: Vercel Analytics
- **Image Optimization**: Next.js Image with WebP/AVIF

## Getting Started

### Prerequisites

- Node.js 20+ installed
- PostgreSQL database (local or hosted)
- Resend API key (get one at [resend.com](https://resend.com))
- Sanity account (get one at [sanity.io](https://sanity.io))

### Installation

1. **Clone the repository** (if applicable)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Update the following variables:
   ```bash
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/fixmycredit"

   # Sanity CMS (get from sanity.io/manage)
   NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   SANITY_API_TOKEN="your-api-token"

   # Site Configuration
   NEXT_PUBLIC_DOMAIN="fixmycredit.fyi"
   NEXT_PUBLIC_SITE_NAME="fixmycredit.fyi"

   # Email (Resend)
   RESEND_API_KEY="your-resend-api-key"
   ADMIN_EMAIL="admin@fixmycredit.fyi"

   # SEO (Optional)
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="your-verification-code"
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

   # Environment
   NODE_ENV="development"
   ```

4. **Set up the database**:
   
   Run the Prisma migration to create the database tables:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

6. **Run the development server**:
   ```bash
   npm run dev
   ```

7. **Open your browser**:
   
   Navigate to:
   - **Landing Page**: [http://localhost:3000](http://localhost:3000)
   - **Blog**: [http://localhost:3000/blog](http://localhost:3000/blog)
   - **Sanity Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

## 📝 Blog & CMS Setup

For detailed blog setup instructions, see **[BLOG_SETUP.md](./BLOG_SETUP.md)**

### Quick Start

1. **Access Sanity Studio**:
   Navigate to `/studio` route: [http://localhost:3000/studio](http://localhost:3000/studio)

2. **Create Content**:
   - Add at least one **Author** (required for blog posts)
   - Create **Categories** for organizing content
   - Publish your first **Blog Post**

3. **View Blog**:
   Visit `/blog` to see your published posts

### Content Types

The CMS includes schemas for:
- **Blog Posts** - Main content with SEO optimization
- **Authors** - Writer profiles with credentials
- **Categories** - Content organization
- **FAQs** - Structured Q&A content
- **Testimonials** - Customer success stories
- **Credit Tools** - Interactive calculators and tools

## 🎯 SEO & Content Strategy

See **[SEO_STRATEGY.md](./SEO_STRATEGY.md)** for comprehensive SEO and content marketing strategy including:
- Target keywords and topics
- Content calendar templates
- Reddit optimization strategies
- Link building tactics
- Geographic targeting (US-focused)
- Analytics and KPIs

See **[CONTENT_IDEAS.md](./CONTENT_IDEAS.md)** for 100+ article ideas and templates.

## Database Setup

### Local PostgreSQL

If you want to run PostgreSQL locally:

1. Install PostgreSQL on your machine
2. Create a database:
   ```sql
   CREATE DATABASE creditrepair;
   ```
3. Update the `DATABASE_URL` in your `.env` file

### Hosted Database Options

For production, consider using:
- **Vercel Postgres** - Easy integration with Vercel
- **Supabase** - Free tier available
- **Railway** - PostgreSQL hosting
- **Neon** - Serverless Postgres

## Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (or use the test domain for development)
3. Create an API key
4. Add the API key to your `.env` file as `RESEND_API_KEY`
5. Update the `from` email addresses in `lib/email.ts` to match your verified domain

## 📁 Project Structure

```
fixmycredit.fyi/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # Waitlist API endpoint
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   ├── [slug]/page.tsx       # Individual blog post
│   │   ├── category/[category]/  # Category archives
│   │   └── author/[author]/      # Author profiles
│   ├── studio/[[...index]]/      # Sanity Studio CMS
│   ├── layout.tsx                # Root layout with SEO
│   ├── page.tsx                  # Landing page
│   ├── sitemap.ts                # Dynamic sitemap generator
│   ├── robots.ts                 # Robots.txt configuration
│   └── globals.css               # Global styles
├── components/
│   ├── blog/
│   │   ├── portable-text-components.tsx  # Rich text rendering
│   │   └── social-share.tsx              # Social share buttons
│   ├── marketing/
│   │   ├── hero-section.tsx      # Hero section
│   │   ├── features-section.tsx  # Features grid
│   │   ├── pricing-section.tsx   # Pricing cards
│   │   ├── blog-cta.tsx          # Blog call-to-action
│   │   ├── waitlist-form.tsx     # Registration form
│   │   └── footer.tsx            # Footer
│   └── seo/
│       ├── structured-data.tsx   # JSON-LD schemas
│       ├── organization-schema.tsx
│       ├── local-business-schema.tsx
│       └── faq-schema.tsx
├── lib/
│   ├── config/
│   │   └── site.ts               # Site configuration
│   ├── sanity/
│   │   ├── client.ts             # Sanity client setup
│   │   ├── queries.ts            # Content queries
│   │   └── types.ts              # TypeScript types
│   ├── seo/
│   │   ├── keywords.ts           # Target keywords
│   │   └── generate-og-image.ts  # OG image utilities
│   ├── utils/
│   │   └── blog-helpers.ts       # Blog utility functions
│   ├── db.ts                     # Prisma client
│   ├── email.ts                  # Email service
│   └── validations.ts            # Zod schemas
├── sanity/
│   └── schemas/
│       ├── index.ts              # Schema exports
│       ├── blogPost.ts           # Blog post schema
│       ├── author.ts             # Author schema
│       ├── category.ts           # Category schema
│       ├── faq.ts                # FAQ schema
│       ├── testimonial.ts        # Testimonial schema
│       └── creditTool.ts         # Tool schema
├── prisma/
│   └── schema.prisma             # Database schema
├── sanity.config.ts              # Sanity CMS configuration
├── next.config.ts                # Next.js config with optimizations
├── .env.example                  # Environment variables template
├── SEO_STRATEGY.md               # SEO & content strategy guide
├── BLOG_SETUP.md                 # Blog setup instructions
└── CONTENT_IDEAS.md              # 100+ article ideas
```

## Customization

### Update Branding

Edit `lib/config/site.ts` to customize:
- Site name
- Tagline
- Description
- Domain
- Social media links
- Contact email

### Modify Pricing

Update the pricing in `lib/config/site.ts`:
```typescript
pricing: {
  monthly: {
    amount: 1500, // in cents ($15)
    display: "$15",
  },
  annual: {
    amount: 14400, // in cents ($144)
    display: "$144",
  },
}
```

### Change Colors

The color scheme uses Tailwind CSS. Main colors are in `app/globals.css`:
- Primary: Blue (`blue-600`)
- Secondary: Purple (`purple-600`)
- Gradients: Blue to Purple

## API Endpoints

### POST /api/waitlist

Register a user to the waitlist.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "message": "Successfully joined the waitlist!"
  }
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": ["Please enter a valid email address"]
    }
  }
}
```

## Database Schema

### WaitlistUser Model

```prisma
model WaitlistUser {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**: Commit and push your code
2. **Import to Vercel**: Connect your repository
3. **Configure Environment Variables**: Add all variables from `.env.example`
4. **Deploy**: Vercel will automatically build and deploy

### Environment Variables for Production

Required variables in Vercel dashboard:

**Database & CMS:**
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Usually "production"
- `SANITY_API_TOKEN` - Sanity API token (Editor permissions)

**Site Configuration:**
- `NEXT_PUBLIC_DOMAIN` - Your domain (e.g., "fixmycredit.fyi")
- `NEXT_PUBLIC_SITE_NAME` - Site name

**Email:**
- `RESEND_API_KEY` - Resend API key
- `ADMIN_EMAIL` - Admin email for notifications

**SEO (Optional but Recommended):**
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - Google Search Console verification
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` - GA4 measurement ID

### Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Check `/sitemap.xml` is generated
- [ ] Verify `/robots.txt` is accessible
- [ ] Test blog posts display properly
- [ ] Confirm Sanity Studio works at `/studio`
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics 4
- [ ] Test waitlist form submission
- [ ] Verify email delivery works
- [ ] Check structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)

## 💻 Useful Commands

```bash
# Development
npm run dev              # Start dev server (includes Sanity Studio at /studio)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:studio        # Open Prisma Studio (database GUI)
npm run db:migrate       # Create and apply migration
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema changes (development)
npm run db:reset         # Reset database

# Sanity CMS
npm run sanity:deploy    # Deploy Sanity Studio
npm run sanity:manage    # Open Sanity management dashboard
```

## Viewing Waitlist Signups

Use Prisma Studio to view waitlist signups:

```bash
npx prisma studio
```

This will open a GUI at `http://localhost:5555` where you can view and manage your database records.

## 🔧 Troubleshooting

### "Missing DATABASE_URL" Error
Make sure you've created a `.env.local` file with a valid `DATABASE_URL`.

### Blog Posts Not Showing
1. Check that posts are published in Sanity Studio
2. Verify `publishedAt` date is not in the future
3. Clear Next.js cache: `rm -rf .next`
4. Restart dev server

### Sanity Images Not Loading
1. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
2. Check `next.config.ts` has `cdn.sanity.io` in `remotePatterns`
3. Ensure images are uploaded to Sanity (not just referenced)

### Emails Not Sending
1. Check that `RESEND_API_KEY` is set correctly
2. Verify your domain in Resend dashboard
3. Update email addresses in `lib/email.ts` to match your verified domain
4. Check Resend logs for delivery status

### Build Errors
If you get build errors related to Prisma:
```bash
npx prisma generate
npm run build
```

### Sitemap Not Updating
Sitemaps are cached for performance. In production, they revalidate automatically every hour. In development, restart the server to refresh.

## 📊 SEO Monitoring

### Google Search Console
1. Verify ownership of your domain
2. Submit sitemap: `https://yoursite.com/sitemap.xml`
3. Monitor indexing status and search performance
4. Check for crawl errors

### Google Analytics 4
1. Create a GA4 property
2. Add Measurement ID to environment variables
3. Track key metrics:
   - Page views
   - Blog engagement
   - Waitlist conversions
   - Traffic sources (especially Reddit)

### Structured Data Testing
- Use [Google Rich Results Test](https://search.google.com/test/rich-results)
- Verify Article, Organization, and LocalBusiness schemas
- Check breadcrumb navigation markup

## Contributing

This is a private project. For internal development only.

## License

Proprietary - All rights reserved

## 📚 Additional Resources

- **[BLOG_SETUP.md](./BLOG_SETUP.md)** - Complete blog setup guide
- **[SEO_STRATEGY.md](./SEO_STRATEGY.md)** - Comprehensive SEO strategy
- **[CONTENT_IDEAS.md](./CONTENT_IDEAS.md)** - 100+ article ideas
- **[Next.js Docs](https://nextjs.org/docs)** - Next.js documentation
- **[Sanity Docs](https://www.sanity.io/docs)** - Sanity CMS documentation
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Tailwind documentation

## 🎯 Roadmap

- [x] Landing page with waitlist
- [x] Blog system with Sanity CMS
- [x] SEO optimization (meta tags, structured data, sitemap)
- [x] Social sharing for Reddit, Twitter, Facebook
- [ ] Interactive credit calculators
- [ ] Credit dispute letter generator
- [ ] User dashboard
- [ ] Payment integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

## 🤝 Contributing

This is a private project. For internal development only.

## 📄 License

Proprietary - All rights reserved

## 💬 Support

For questions or issues, contact: support@fixmycredit.fyi

---

**Built with ❤️ using Next.js 16, Sanity CMS, Tailwind CSS, and Prisma**

### Key Technologies
- ⚡ **Next.js 16** - React framework with App Router
- 🎨 **Tailwind CSS 4** - Utility-first CSS
- 📝 **Sanity.io** - Headless CMS
- 🗄️ **Prisma** - Type-safe ORM
- 🔍 **SEO Optimized** - Structured data, sitemaps, meta tags
- 🚀 **Vercel Analytics** - Performance monitoring
- 📧 **Resend** - Email service
