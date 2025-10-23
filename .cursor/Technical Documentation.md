# Technical Documentation
# Credit Repair Platform - fixmycredit

**Version:** 1.0  
**Date:** October 23, 2025  
**Tech Stack:** Next.js 14, shadcn/ui, Vercel, PostgreSQL

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Configuration Management](#configuration-management)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [Screen Specifications](#screen-specifications)
8. [Component Library](#component-library)
9. [Authentication & Authorization](#authentication--authorization)
10. [Payment Integration](#payment-integration)
11. [Credit Bureau Integration](#credit-bureau-integration)
12. [Monte Carlo Simulation](#monte-carlo-simulation)
13. [Deployment](#deployment)
14. [Testing Strategy](#testing-strategy)
15. [Security](#security)
16. [Performance Optimization](#performance-optimization)
17. [Monitoring & Logging](#monitoring--logging)

---

## Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│                    (React/Next.js Frontend)                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├─── HTTPS ───┐
                              │             │
┌─────────────────────────────▼─────────────▼─────────────────┐
│                      Vercel Edge Network                      │
│                    (CDN + Edge Functions)                     │
└─────────────────────────────┬─────────────────────────────────┘
                              │
                              ├─── API Routes ───┐
                              │                  │
┌─────────────────────────────▼──────────────────▼─────────────┐
│                    Next.js App Router                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Pages      │  │  API Routes  │  │  Server      │       │
│  │  (RSC/SSR)   │  │  (Endpoints) │  │  Actions     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└───────────────────────────┬──────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼───────┐  ┌────────▼────────┐  ┌──────▼──────┐
│   PostgreSQL  │  │     Stripe      │  │   Credit    │
│   (Vercel)    │  │   (Payments)    │  │   Bureau    │
│               │  │                 │  │   APIs      │
└───────────────┘  └─────────────────┘  └─────────────┘
        │
┌───────▼───────┐
│  Vercel Blob  │
│ (File Storage)│
└───────────────┘
```

### Key Architectural Decisions

1. **Next.js App Router:** Modern routing with React Server Components for optimal performance
2. **Vercel Platform:** Serverless deployment with edge functions for global low-latency
3. **PostgreSQL:** Relational database for structured credit data
4. **Prisma ORM:** Type-safe database access with migrations
5. **NextAuth.js:** Flexible authentication with multiple providers
6. **Stripe:** PCI-compliant payment processing
7. **shadcn/ui:** Accessible, customizable component library

---

## Technology Stack

### Frontend
- **Framework:** Next.js 14.2+ (App Router)
- **Language:** TypeScript 5.3+
- **UI Library:** React 18.3+
- **Styling:** Tailwind CSS 4.0+
- **Component Library:** shadcn/ui (Radix UI primitives)
- **Forms:** React Hook Form + Zod validation
- **State Management:** React Context + Zustand (for complex state)
- **Data Fetching:** TanStack Query (React Query)
- **Charts:** Recharts or Chart.js
- **Date Handling:** date-fns
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js 20+ (Vercel serverless)
- **API:** Next.js API Routes + Server Actions
- **Database:** PostgreSQL 15+
- **ORM:** Prisma 5.0+
- **Authentication:** NextAuth.js v5 (Auth.js)
- **File Storage:** Vercel Blob Storage
- **Email:** Resend or SendGrid
- **PDF Generation:** react-pdf or jsPDF
- **Background Jobs:** Vercel Cron or Inngest

### Infrastructure
- **Hosting:** Vercel
- **Database:** Vercel Postgres (or Supabase)
- **CDN:** Vercel Edge Network
- **Monitoring:** Vercel Analytics + Sentry
- **Logging:** Vercel Logs + Axiom
- **CI/CD:** Vercel Git Integration

### Third-Party Services
- **Payments:** Stripe
- **Credit Data:** Plaid Credit or direct bureau APIs
- **Email:** Resend or SendGrid
- **Analytics:** Vercel Analytics + PostHog
- **Error Tracking:** Sentry
- **Uptime Monitoring:** Better Uptime

### Development Tools
- **Package Manager:** pnpm
- **Linting:** ESLint + TypeScript ESLint
- **Formatting:** Prettier
- **Git Hooks:** Husky + lint-staged
- **Testing:** Vitest + React Testing Library + Playwright
- **API Testing:** Postman or Insomnia
- **Database GUI:** Prisma Studio or TablePlus

---

## Project Structure

```
credit-repair-platform/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Continuous integration
│       └── deploy.yml                # Deployment workflow
├── .husky/                           # Git hooks
├── prisma/
│   ├── schema.prisma                 # Database schema
│   ├── migrations/                   # Database migrations
│   └── seed.ts                       # Database seeding
├── public/
│   ├── images/                       # Static images
│   ├── fonts/                        # Custom fonts
│   └── favicon.ico                   # Favicon
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth layout group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/              # Dashboard layout group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── simulator/
│   │   │   │   └── page.tsx
│   │   │   ├── disputes/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── action-plan/
│   │   │   │   └── page.tsx
│   │   │   ├── monitoring/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (marketing)/              # Marketing layout group
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── users/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── simulations/
│   │   │   │   └── route.ts
│   │   │   ├── disputes/
│   │   │   │   └── route.ts
│   │   │   ├── credit-reports/
│   │   │   │   └── route.ts
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/
│   │   │   │   │   └── route.ts
│   │   │   │   └── plaid/
│   │   │   │       └── route.ts
│   │   │   └── cron/
│   │   │       └── daily-updates/
│   │   │           └── route.ts
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   └── providers.tsx             # Client providers
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...
│   │   ├── auth/
│   │   │   ├── login-form.tsx
│   │   │   ├── register-form.tsx
│   │   │   └── oauth-buttons.tsx
│   │   ├── dashboard/
│   │   │   ├── credit-score-card.tsx
│   │   │   ├── score-history-chart.tsx
│   │   │   ├── action-items-list.tsx
│   │   │   └── progress-tracker.tsx
│   │   ├── simulator/
│   │   │   ├── credit-profile-form.tsx
│   │   │   ├── action-plan-form.tsx
│   │   │   ├── simulation-results.tsx
│   │   │   └── confidence-chart.tsx
│   │   ├── disputes/
│   │   │   ├── template-selector.tsx
│   │   │   ├── letter-editor.tsx
│   │   │   ├── dispute-tracker.tsx
│   │   │   └── pdf-preview.tsx
│   │   ├── monitoring/
│   │   │   ├── accounts-list.tsx
│   │   │   ├── utilization-chart.tsx
│   │   │   └── alerts-panel.tsx
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── mobile-nav.tsx
│   │   └── shared/
│   │       ├── loading-spinner.tsx
│   │       ├── error-boundary.tsx
│   │       └── empty-state.tsx
│   ├── lib/
│   │   ├── auth.ts                   # Auth configuration
│   │   ├── db.ts                     # Prisma client
│   │   ├── stripe.ts                 # Stripe client
│   │   ├── plaid.ts                  # Plaid client
│   │   ├── email.ts                  # Email utilities
│   │   ├── pdf.ts                    # PDF generation
│   │   ├── monte-carlo.ts            # Simulation engine
│   │   ├── credit-score.ts           # Score calculations
│   │   ├── validations.ts            # Zod schemas
│   │   └── utils.ts                  # Utility functions
│   ├── hooks/
│   │   ├── use-user.ts
│   │   ├── use-credit-score.ts
│   │   ├── use-simulations.ts
│   │   ├── use-disputes.ts
│   │   └── use-subscription.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── credit.ts
│   │   ├── simulation.ts
│   │   └── dispute.ts
│   ├── config/
│   │   ├── site.ts                   # Site configuration
│   │   ├── navigation.ts             # Navigation config
│   │   └── constants.ts              # App constants
│   └── middleware.ts                 # Next.js middleware
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example                      # Environment variables template
├── .env.local                        # Local environment (gitignored)
├── .eslintrc.json                    # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
├── pnpm-lock.yaml                    # Lock file
└── README.md                         # Project documentation
```

---

## Configuration Management

### Site Configuration (`src/config/site.ts`)

This is the **central configuration file** where you can customize the domain, branding, and site-wide settings.

```typescript
/**
 * Site Configuration
 * 
 * This file contains all configurable site-wide settings including
 * domain, branding, SEO, and feature flags.
 * 
 * IMPORTANT: Update this file to customize your deployment.
 */

export const siteConfig = {
  // Domain Configuration
  domain: {
    // Production domain (e.g., "fixmycredit.fyi")
    production: process.env.NEXT_PUBLIC_DOMAIN || "fixmycredit.fyi",
    
    // Development domain
    development: "localhost:3000",
    
    // Full URL (automatically constructed)
    get url() {
      const domain = process.env.NODE_ENV === "production" 
        ? this.production 
        : this.development;
      const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
      return `${protocol}://${domain}`;
    },
  },

  // Branding
  branding: {
    name: process.env.NEXT_PUBLIC_SITE_NAME || "fixmycredit",
    tagline: "Fix Your Credit Score The Smart Way",
    description: "Take control of your financial future with our intelligent credit repair platform. Get personalized guidance, dispute templates, and real-time score tracking.",
    logo: {
      light: "/images/logo-light.svg",
      dark: "/images/logo-dark.svg",
      icon: "/images/icon.svg",
    },
    colors: {
      primary: "#2563eb", // Blue
      secondary: "#8b5cf6", // Purple
      accent: "#10b981", // Green
    },
  },

  // SEO
  seo: {
    title: {
      default: "fixmycredit - Credit Score Repair Platform",
      template: "%s | fixmycredit",
    },
    description: "Improve your credit score with data-driven insights, professional dispute templates, and personalized action plans. Start your credit repair journey today.",
    keywords: [
      "credit repair",
      "credit score",
      "FICO score",
      "credit improvement",
      "dispute letters",
      "credit monitoring",
      "credit simulator",
    ],
    authors: [{ name: "fixmycredit Team" }],
    creator: "fixmycredit",
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "fixmycredit",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "fixmycredit - Credit Score Repair Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@fixmycredit",
      creator: "@fixmycredit",
    },
  },

  // Contact Information
  contact: {
    email: "support@fixmycredit.fyi",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Credit Lane",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "USA",
    },
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/fixmycredit",
    facebook: "https://facebook.com/fixmycredit",
    instagram: "https://instagram.com/fixmycredit",
    linkedin: "https://linkedin.com/company/fixmycredit",
    youtube: "https://youtube.com/@fixmycredit",
  },

  // Legal
  legal: {
    privacyPolicy: "/legal/privacy",
    termsOfService: "/legal/terms",
    disclaimer: "/legal/disclaimer",
    cookiePolicy: "/legal/cookies",
  },

  // Features (Feature Flags)
  features: {
    authentication: true,
    creditBureauIntegration: false, // Enable in Phase 3
    monteCarlo: true,
    disputeLetters: true,
    actionPlan: true,
    creditMonitoring: true,
    referralProgram: false, // Enable in Phase 4
    communityForum: false, // Enable in Phase 4
    mobileApp: false, // Enable in Phase 4
    whiteLabel: false, // Enable in Phase 5
  },

  // Pricing
  pricing: {
    monthly: {
      amount: 1500, // in cents
      currency: "USD",
      interval: "month",
      priceId: process.env.STRIPE_MONTHLY_PRICE_ID,
    },
    annual: {
      amount: 14400, // in cents (20% discount)
      currency: "USD",
      interval: "year",
      priceId: process.env.STRIPE_ANNUAL_PRICE_ID,
    },
  },

  // Analytics
  analytics: {
    vercel: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
    posthog: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
  },

  // API Configuration
  api: {
    timeout: 30000, // 30 seconds
    retries: 3,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    },
  },

  // Email Configuration
  email: {
    from: {
      name: "fixmycredit",
      address: "noreply@fixmycredit.fyi",
    },
    support: "support@fixmycredit.fyi",
  },

  // Limits
  limits: {
    maxSimulationsPerDay: 10,
    maxDisputeLetters: 50,
    maxFileUploadSize: 10 * 1024 * 1024, // 10MB
    maxCreditAccounts: 50,
  },
} as const;

export type SiteConfig = typeof siteConfig;
```

### Environment Variables (`.env.example`)

```bash
# App Configuration
NEXT_PUBLIC_DOMAIN="fixmycredit.fyi"
NEXT_PUBLIC_SITE_NAME="fixmycredit"
NODE_ENV="production"

# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# Authentication (NextAuth.js)
NEXTAUTH_URL="https://fixmycredit.fyi"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"

# Stripe
STRIPE_PUBLIC_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_MONTHLY_PRICE_ID="price_..."
STRIPE_ANNUAL_PRICE_ID="price_..."

# Credit Bureau APIs (Phase 3)
PLAID_CLIENT_ID="your-plaid-client-id"
PLAID_SECRET="your-plaid-secret"
PLAID_ENV="production" # or "sandbox"

# Email
RESEND_API_KEY="re_..."
# or
SENDGRID_API_KEY="SG...."

# File Storage
BLOB_READ_WRITE_TOKEN="vercel_blob_..."

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="..."
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_GA_ID="G-..."

# Monitoring
SENTRY_DSN="https://...@sentry.io/..."
SENTRY_AUTH_TOKEN="..."

# Feature Flags (optional, defaults in site.ts)
NEXT_PUBLIC_ENABLE_CREDIT_BUREAU="false"
NEXT_PUBLIC_ENABLE_REFERRAL="false"
NEXT_PUBLIC_ENABLE_FORUM="false"
```

### How to Configure Domain

**Option 1: Environment Variable (Recommended)**
```bash
# In Vercel dashboard or .env.local
NEXT_PUBLIC_DOMAIN="yourcustomdomain.com"
```

**Option 2: Direct Configuration**
```typescript
// src/config/site.ts
export const siteConfig = {
  domain: {
    production: "yourcustomdomain.com", // Change this
    // ...
  },
  // ...
};
```

**Option 3: Multi-Tenant (White-Label)**
```typescript
// src/config/site.ts
export const siteConfig = {
  domain: {
    production: process.env.NEXT_PUBLIC_DOMAIN || getTenantDomain(),
    // ...
  },
  // ...
};

function getTenantDomain() {
  // Logic to determine domain based on tenant
  // Could read from database, headers, etc.
  return "default.com";
}
```

---

## Database Schema

### Prisma Schema (`prisma/schema.prisma`)

```prisma
// This is your Prisma schema file
// Learn more: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// User Management
// ============================================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  image         String?
  password      String?   // Hashed, null for OAuth users
  
  // Profile
  phone         String?
  dateOfBirth   DateTime?
  address       Json?     // {street, city, state, zip, country}
  
  // Subscription
  stripeCustomerId       String?   @unique
  stripeSubscriptionId   String?   @unique
  stripePriceId          String?
  stripeCurrentPeriodEnd DateTime?
  
  // Metadata
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  lastLoginAt   DateTime?
  
  // Relations
  accounts      Account[]
  sessions      Session[]
  creditProfile CreditProfile?
  simulations   Simulation[]
  disputes      Dispute[]
  actionPlans   ActionPlan[]
  creditReports CreditReport[]
  notifications Notification[]
  referrals     Referral[]     @relation("Referrer")
  referredBy    Referral?      @relation("Referee")
  
  @@index([email])
  @@index([stripeCustomerId])
  @@index([stripeSubscriptionId])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ============================================
// Credit Profile
// ============================================

model CreditProfile {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Current Credit Information
  currentScore      Int      @default(650)
  scoreDate         DateTime @default(now())
  
  // FICO Factors
  paymentHistory    Float    @default(85.0)  // Percentage
  creditUtilization Float    @default(45.0)  // Percentage
  creditAge         Int      @default(36)    // Months
  newAccounts       Int      @default(2)
  creditMix         Int      @default(3)     // 1-5 scale
  
  // Financial Details
  totalDebt         Int      @default(15000) // Cents
  monthlyIncome     Int      @default(400000) // Cents
  totalAccounts     Int      @default(5)
  negativeMarks     Int      @default(2)
  
  // Metadata
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relations
  scoreHistory      ScoreHistory[]
  creditAccounts    CreditAccount[]
  
  @@index([userId])
}

model ScoreHistory {
  id              String        @id @default(cuid())
  creditProfileId String
  creditProfile   CreditProfile @relation(fields: [creditProfileId], references: [id], onDelete: Cascade)
  
  score           Int
  source          String        // "manual", "bureau", "simulation"
  date            DateTime      @default(now())
  
  @@index([creditProfileId, date])
}

model CreditAccount {
  id              String        @id @default(cuid())
  creditProfileId String
  creditProfile   CreditProfile @relation(fields: [creditProfileId], references: [id], onDelete: Cascade)
  
  // Account Details
  accountName     String
  accountType     String        // "credit_card", "mortgage", "auto_loan", "student_loan", "personal_loan"
  accountNumber   String?       // Last 4 digits
  
  // Balances
  currentBalance  Int           // Cents
  creditLimit     Int?          // Cents (for revolving accounts)
  
  // Status
  status          String        // "open", "closed", "charged_off", "collection"
  openedDate      DateTime
  closedDate      DateTime?
  
  // Payment
  paymentStatus   String        // "current", "30_days_late", "60_days_late", "90_days_late"
  lastPaymentDate DateTime?
  lastPaymentAmount Int?        // Cents
  
  // Metadata
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  
  @@index([creditProfileId])
}

// ============================================
// Monte Carlo Simulations
// ============================================

model Simulation {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Input: Credit Profile
  inputProfile      Json // CreditProfile snapshot
  
  // Input: Action Plan
  inputActionPlan   Json // ActionPlan snapshot
  
  // Parameters
  months            Int      @default(12)
  iterations        Int      @default(10000)
  
  // Results
  projectedScore    Int
  confidenceInterval Json   // {lower, median, upper}
  timeline          Json    // Array of {month, score, lower, upper}
  probabilityOfReaching Json // Array of {score, probability}
  recommendations   Json    // Array of strings
  
  // Metadata
  createdAt         DateTime @default(now())
  
  @@index([userId, createdAt])
}

// ============================================
// Dispute Letters
// ============================================

model DisputeTemplate {
  id          String   @id @default(cuid())
  
  name        String
  category    String   // "inaccurate_info", "identity_theft", "late_payment", etc.
  description String
  content     String   @db.Text
  variables   Json     // Array of variable names to fill in
  
  // Metadata
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  disputes    Dispute[]
  
  @@index([category])
}

model Dispute {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  templateId String?
  template   DisputeTemplate? @relation(fields: [templateId], references: [id])
  
  // Dispute Details
  title      String
  category   String
  bureau     String   // "experian", "transunion", "equifax", "all"
  content    String   @db.Text
  
  // Status
  status     String   @default("draft") // "draft", "sent", "pending", "resolved", "rejected"
  sentDate   DateTime?
  responseDate DateTime?
  resolution String?  @db.Text
  
  // Files
  letterUrl  String?  // PDF URL
  responseUrl String? // Response document URL
  
  // Metadata
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  @@index([userId, status])
  @@index([userId, createdAt])
}

// ============================================
// Action Plans
// ============================================

model ActionPlan {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Plan Details
  name        String
  targetScore Int
  timeline    Int      // Months
  
  // Status
  status      String   @default("active") // "active", "completed", "abandoned"
  progress    Float    @default(0.0) // Percentage
  
  // Metadata
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  completedAt DateTime?
  
  // Relations
  actionItems ActionItem[]
  
  @@index([userId, status])
}

model ActionItem {
  id           String     @id @default(cuid())
  actionPlanId String
  actionPlan   ActionPlan @relation(fields: [actionPlanId], references: [id], onDelete: Cascade)
  
  // Item Details
  title        String
  description  String     @db.Text
  category     String     // "payment_history", "utilization", "negative_marks", etc.
  priority     Int        @default(0) // Higher = more important
  
  // Impact
  estimatedImpact Int     // Points
  difficulty   String     @default("medium") // "easy", "medium", "hard"
  timeframe    Int        // Days
  
  // Status
  status       String     @default("pending") // "pending", "in_progress", "completed", "skipped"
  completedAt  DateTime?
  
  // Instructions
  instructions Json       // Array of step-by-step instructions
  
  // Metadata
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  
  @@index([actionPlanId, status])
}

// ============================================
// Credit Reports (Phase 3)
// ============================================

model CreditReport {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  bureau    String   // "experian", "transunion", "equifax"
  reportDate DateTime @default(now())
  
  // Report Data (JSON)
  data      Json     // Full credit report data
  
  // Analysis
  issues    Json     // Array of identified issues
  
  // Metadata
  createdAt DateTime @default(now())
  
  @@index([userId, bureau, reportDate])
}

// ============================================
// Notifications
// ============================================

model Notification {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  type      String   // "score_change", "dispute_update", "payment_reminder", etc.
  title     String
  message   String   @db.Text
  link      String?
  
  read      Boolean  @default(false)
  readAt    DateTime?
  
  createdAt DateTime @default(now())
  
  @@index([userId, read, createdAt])
}

// ============================================
// Referrals (Phase 4)
// ============================================

model Referral {
  id         String   @id @default(cuid())
  
  referrerId String
  referrer   User     @relation("Referrer", fields: [referrerId], references: [id], onDelete: Cascade)
  
  refereeId  String?  @unique
  referee    User?    @relation("Referee", fields: [refereeId], references: [id])
  
  code       String   @unique
  status     String   @default("pending") // "pending", "completed", "rewarded"
  
  rewardAmount Int?   // Cents
  rewardedAt DateTime?
  
  createdAt  DateTime @default(now())
  
  @@index([referrerId])
  @@index([code])
}
```

### Database Migrations

```bash
# Create a new migration
pnpm prisma migrate dev --name init

# Apply migrations to production
pnpm prisma migrate deploy

# Generate Prisma Client
pnpm prisma generate

# Open Prisma Studio (GUI)
pnpm prisma studio

# Seed database
pnpm prisma db seed
```

---

## API Documentation

### API Routes Structure

All API routes follow RESTful conventions and return JSON responses.

### Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": { ... }
  }
}
```

### API Endpoints

#### Authentication

**POST /api/auth/register**
- Register a new user
- Body: `{ email, password, name }`
- Response: `{ user, token }`

**POST /api/auth/login**
- Login existing user
- Body: `{ email, password }`
- Response: `{ user, token }`

**POST /api/auth/logout**
- Logout current user
- Headers: `Authorization: Bearer <token>`
- Response: `{ success: true }`

**GET /api/auth/session**
- Get current session
- Headers: `Authorization: Bearer <token>`
- Response: `{ user, session }`

#### Users

**GET /api/users/me**
- Get current user profile
- Headers: `Authorization: Bearer <token>`
- Response: `{ user }`

**PATCH /api/users/me**
- Update current user profile
- Headers: `Authorization: Bearer <token>`
- Body: `{ name?, email?, phone?, ... }`
- Response: `{ user }`

**DELETE /api/users/me**
- Delete current user account
- Headers: `Authorization: Bearer <token>`
- Response: `{ success: true }`

#### Credit Profile

**GET /api/credit-profile**
- Get user's credit profile
- Headers: `Authorization: Bearer <token>`
- Response: `{ creditProfile }`

**PUT /api/credit-profile**
- Update credit profile
- Headers: `Authorization: Bearer <token>`
- Body: `{ currentScore?, paymentHistory?, ... }`
- Response: `{ creditProfile }`

**GET /api/credit-profile/history**
- Get score history
- Headers: `Authorization: Bearer <token>`
- Query: `?from=2024-01-01&to=2024-12-31`
- Response: `{ history: [...] }`

#### Simulations

**POST /api/simulations**
- Run Monte Carlo simulation
- Headers: `Authorization: Bearer <token>`
- Body: `{ profile, actionPlan, months?, iterations? }`
- Response: `{ simulation }`

**GET /api/simulations**
- Get user's simulation history
- Headers: `Authorization: Bearer <token>`
- Query: `?page=1&limit=10`
- Response: `{ simulations: [...], total, page, limit }`

**GET /api/simulations/[id]**
- Get specific simulation
- Headers: `Authorization: Bearer <token>`
- Response: `{ simulation }`

#### Disputes

**GET /api/disputes/templates**
- Get dispute letter templates
- Headers: `Authorization: Bearer <token>`
- Query: `?category=inaccurate_info`
- Response: `{ templates: [...] }`

**GET /api/disputes/templates/[id]**
- Get specific template
- Headers: `Authorization: Bearer <token>`
- Response: `{ template }`

**POST /api/disputes**
- Create new dispute
- Headers: `Authorization: Bearer <token>`
- Body: `{ templateId?, title, category, bureau, content }`
- Response: `{ dispute }`

**GET /api/disputes**
- Get user's disputes
- Headers: `Authorization: Bearer <token>`
- Query: `?status=pending&page=1&limit=10`
- Response: `{ disputes: [...], total, page, limit }`

**GET /api/disputes/[id]**
- Get specific dispute
- Headers: `Authorization: Bearer <token>`
- Response: `{ dispute }`

**PATCH /api/disputes/[id]**
- Update dispute
- Headers: `Authorization: Bearer <token>`
- Body: `{ status?, resolution?, ... }`
- Response: `{ dispute }`

**POST /api/disputes/[id]/generate-pdf**
- Generate PDF for dispute letter
- Headers: `Authorization: Bearer <token>`
- Response: `{ pdfUrl }`

#### Action Plans

**POST /api/action-plans**
- Create action plan
- Headers: `Authorization: Bearer <token>`
- Body: `{ name, targetScore, timeline }`
- Response: `{ actionPlan }`

**GET /api/action-plans**
- Get user's action plans
- Headers: `Authorization: Bearer <token>`
- Query: `?status=active`
- Response: `{ actionPlans: [...] }`

**GET /api/action-plans/[id]**
- Get specific action plan
- Headers: `Authorization: Bearer <token>`
- Response: `{ actionPlan, actionItems: [...] }`

**PATCH /api/action-plans/[id]/items/[itemId]**
- Update action item status
- Headers: `Authorization: Bearer <token>`
- Body: `{ status: "completed" }`
- Response: `{ actionItem }`

#### Subscriptions

**POST /api/subscriptions/checkout**
- Create Stripe checkout session
- Headers: `Authorization: Bearer <token>`
- Body: `{ priceId }`
- Response: `{ sessionId, url }`

**POST /api/subscriptions/portal**
- Create Stripe customer portal session
- Headers: `Authorization: Bearer <token>`
- Response: `{ url }`

**GET /api/subscriptions/status**
- Get subscription status
- Headers: `Authorization: Bearer <token>`
- Response: `{ subscription }`

#### Webhooks

**POST /api/webhooks/stripe**
- Handle Stripe webhooks
- Headers: `stripe-signature`
- Body: Stripe event payload
- Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

**POST /api/webhooks/plaid**
- Handle Plaid webhooks (Phase 3)
- Headers: `plaid-signature`
- Body: Plaid event payload

#### Cron Jobs

**GET /api/cron/daily-updates**
- Daily credit score updates (Phase 3)
- Headers: `Authorization: Bearer <cron-secret>`
- Triggers: Daily at 2 AM UTC

---

## Screen Specifications

### 1. Landing Page (`/`)

**Purpose:** Convert visitors to users

**Sections:**
1. **Hero**
   - Headline: "Fix Your Credit Score The Smart Way"
   - Subheadline: Value proposition
   - CTA buttons: "Get Started Free", "Try Simulator"
   - Social proof: User count, ratings
   - Hero image/animation

2. **Features** (#features)
   - 6 feature cards with icons
   - Credit Score Simulator
   - Dispute Templates
   - Bureau Integration
   - Progress Tracking
   - Action Plans
   - Expert Support

3. **How It Works**
   - 3-4 step process
   - Visual timeline
   - Screenshots/mockups

4. **Simulator Preview** (#simulator)
   - Interactive mini-simulator
   - Score slider
   - Quick calculation
   - CTA to full simulator

5. **Pricing** (#pricing)
   - Monthly vs Annual toggle
   - Feature comparison table
   - FAQ

6. **Testimonials**
   - User success stories
   - Before/after scores
   - Photos and quotes

7. **CTA Section**
   - Final conversion push
   - "Start Your Free Trial"

8. **Footer**
   - Links: About, Blog, Pricing, Support
   - Legal: Privacy, Terms, Disclaimer
   - Social media icons

**Components:**
- `<Header />` - Navigation
- `<HeroSection />` - Hero content
- `<FeaturesSection />` - Feature grid
- `<HowItWorksSection />` - Process steps
- `<SimulatorPreview />` - Mini simulator
- `<PricingSection />` - Pricing cards
- `<TestimonialsSection />` - Testimonial carousel
- `<CTASection />` - Final CTA
- `<Footer />` - Footer links

**Interactions:**
- Smooth scroll to sections
- Animated counters
- Hover effects on cards
- Pricing toggle animation

---

### 2. Authentication Pages

#### Login Page (`/login`)

**Components:**
- `<LoginForm />` - Email/password form
- `<OAuthButtons />` - Google, Facebook buttons
- Link to register
- Link to forgot password

**Fields:**
- Email (required, validated)
- Password (required, min 8 chars)
- Remember me (checkbox)

**Interactions:**
- Form validation
- Loading state
- Error messages
- Success redirect to dashboard

#### Register Page (`/register`)

**Components:**
- `<RegisterForm />` - Registration form
- `<OAuthButtons />` - Social registration
- Link to login

**Fields:**
- Name (required)
- Email (required, validated)
- Password (required, min 8 chars, strength indicator)
- Confirm password (required, must match)
- Terms acceptance (checkbox, required)

**Interactions:**
- Real-time validation
- Password strength meter
- Loading state
- Email verification sent message

---

### 3. Dashboard (`/dashboard`)

**Purpose:** Central hub for user activity

**Layout:**
- Sidebar navigation (desktop)
- Top bar with user menu
- Main content area

**Sections:**

1. **Credit Score Card**
   - Large score display
   - Score tier badge
   - Change indicator (+/- points)
   - Last updated date
   - Link to update score

2. **Score History Chart**
   - Line chart (last 12 months)
   - Hover tooltips
   - Date range selector

3. **Quick Stats**
   - Payment history %
   - Credit utilization %
   - Negative marks count
   - Active disputes count

4. **Action Items**
   - Top 5 priority actions
   - Progress indicators
   - Quick complete buttons
   - Link to full action plan

5. **Recent Activity**
   - Timeline of recent actions
   - Simulations run
   - Disputes filed
   - Score updates

6. **Quick Actions**
   - Run Simulation button
   - Create Dispute button
   - Update Score button
   - View Reports button

**Components:**
- `<DashboardLayout />` - Layout wrapper
- `<Sidebar />` - Navigation sidebar
- `<TopBar />` - Top navigation
- `<CreditScoreCard />` - Score display
- `<ScoreHistoryChart />` - Chart component
- `<QuickStatsGrid />` - Stats cards
- `<ActionItemsList />` - Action items
- `<RecentActivityTimeline />` - Activity feed
- `<QuickActionsPanel />` - Action buttons

---

### 4. Monte Carlo Simulator (`/simulator`)

**Purpose:** Run probabilistic credit score forecasts

**Layout:**
- Two-column layout (desktop)
- Left: Input forms (2/3 width)
- Right: Results (1/3 width)
- Single column (mobile)

**Sections:**

1. **Introduction Card**
   - Explanation of Monte Carlo method
   - What to expect
   - How to use

2. **Input Tabs**
   - Tab 1: Credit Profile
   - Tab 2: Action Plan

3. **Credit Profile Form** (Tab 1)
   - Current score (slider)
   - Payment history % (slider)
   - Credit utilization % (slider)
   - Credit age (input, months)
   - Negative marks (input, number)
   - Total debt (input, currency)
   - Monthly income (input, currency)
   - New accounts (input, number)
   - Credit mix (input, 1-5)

4. **Action Plan Form** (Tab 2)
   - Debt to pay off (input, currency)
   - Target utilization % (slider)
   - Negative marks to dispute (input, number)
   - Make on-time payments (checkbox)
   - Avoid new accounts (checkbox)
   - Diversify credit mix (checkbox)

5. **Run Simulation Button**
   - Large, prominent button
   - Loading state with progress
   - "Running 10,000 simulations..."

6. **Results Panel**
   - Projected score (large display)
   - Score tier badge
   - Score change (+/- points)
   - Confidence interval (range)
   - Timeline chart (12 months)
   - Probability table (target scores)
   - Recommendations list

7. **Methodology Card**
   - Explanation of algorithm
   - FICO weights
   - Disclaimer

**Components:**
- `<SimulatorLayout />` - Layout wrapper
- `<IntroCard />` - Introduction
- `<InputTabs />` - Tab navigation
- `<CreditProfileForm />` - Profile inputs
- `<ActionPlanForm />` - Action inputs
- `<RunSimulationButton />` - CTA button
- `<SimulationResults />` - Results display
- `<ConfidenceChart />` - Timeline chart
- `<ProbabilityTable />` - Probability bars
- `<RecommendationsList />` - Action recommendations
- `<MethodologyCard />` - Explanation

**Interactions:**
- Real-time form validation
- Slider updates
- Tab switching
- Simulation loading animation
- Chart hover tooltips
- Expandable recommendations

---

### 5. Dispute Letters (`/disputes`)

**Purpose:** Create and manage dispute letters

**Layout:**
- List view with filters (default)
- Detail view (when selecting dispute)

**List View:**

1. **Header**
   - Page title
   - "Create New Dispute" button
   - Search bar
   - Filter dropdowns (status, bureau, category)

2. **Disputes Table**
   - Columns: Title, Bureau, Category, Status, Date, Actions
   - Status badges (color-coded)
   - Action buttons: View, Edit, Delete
   - Pagination

3. **Empty State**
   - Illustration
   - "No disputes yet"
   - CTA to create first dispute

**Detail View (`/disputes/[id]`):**

1. **Dispute Header**
   - Title
   - Status badge
   - Bureau
   - Category
   - Dates (sent, response)
   - Action buttons: Edit, Download PDF, Delete

2. **Letter Content**
   - Full letter text
   - Editable (if draft)
   - Preview mode

3. **Status Timeline**
   - Draft → Sent → Pending → Resolved
   - Dates for each stage
   - Notes/comments

4. **Attachments**
   - Letter PDF
   - Response documents
   - Upload button

**Create/Edit View (`/disputes/new`, `/disputes/[id]/edit`):**

1. **Template Selector**
   - Grid of template cards
   - Category filters
   - Search
   - Preview on hover

2. **Letter Editor**
   - Template content
   - Fill-in-the-blank fields
   - Rich text editor
   - Variable placeholders
   - Preview pane (side-by-side)

3. **Dispute Details Form**
   - Title (input)
   - Bureau (select: Experian, TransUnion, Equifax, All)
   - Category (select)
   - Additional notes (textarea)

4. **Actions**
   - Save as draft
   - Generate PDF
   - Mark as sent
   - Cancel

**Components:**
- `<DisputesLayout />` - Layout wrapper
- `<DisputesHeader />` - Header with actions
- `<DisputesTable />` - Data table
- `<DisputeCard />` - List item card
- `<DisputeDetail />` - Detail view
- `<TemplateSelector />` - Template grid
- `<LetterEditor />` - Editor component
- `<DisputeForm />` - Form fields
- `<StatusTimeline />` - Progress timeline
- `<PDFPreview />` - PDF viewer
- `<AttachmentUploader />` - File upload

---

### 6. Action Plan (`/action-plan`)

**Purpose:** View and manage personalized action plan

**Layout:**
- Single column with cards

**Sections:**

1. **Plan Overview Card**
   - Plan name
   - Target score
   - Timeline (months)
   - Progress bar (% complete)
   - Status badge
   - Edit button

2. **Progress Stats**
   - Actions completed / total
   - Estimated score gain
   - Days remaining
   - Current vs target score

3. **Action Items List**
   - Grouped by category:
     - Payment History (35%)
     - Credit Utilization (30%)
     - Negative Marks
     - Credit Age (15%)
     - Credit Mix (10%)
     - New Credit (10%)
   - Each item shows:
     - Title
     - Description
     - Priority badge
     - Estimated impact (+X points)
     - Difficulty badge
     - Timeframe
     - Status (pending, in progress, completed)
     - Checkbox to mark complete
     - Expand for instructions

4. **Instructions Panel** (expandable)
   - Step-by-step instructions
   - Numbered list
   - Links to resources
   - Related dispute templates

5. **Recommendations**
   - AI-generated suggestions
   - Based on current progress
   - Quick actions

**Components:**
- `<ActionPlanLayout />` - Layout wrapper
- `<PlanOverviewCard />` - Plan summary
- `<ProgressStatsGrid />` - Stats cards
- `<ActionItemsGroup />` - Grouped items
- `<ActionItemCard />` - Individual item
- `<InstructionsPanel />` - Expandable instructions
- `<RecommendationsPanel />` - Suggestions

**Interactions:**
- Check/uncheck action items
- Expand/collapse instructions
- Drag-and-drop to reorder (optional)
- Filter by status
- Sort by priority/impact

---

### 7. Credit Monitoring (`/monitoring`)

**Purpose:** Track credit accounts and changes

**Layout:**
- Dashboard-style with multiple panels

**Sections:**

1. **Credit Score Overview**
   - Current score (large)
   - Score tier
   - Change from last month
   - Chart (last 6 months)

2. **Credit Utilization**
   - Overall utilization %
   - Utilization by account (bar chart)
   - Recommendations

3. **Accounts List**
   - Table of all credit accounts
   - Columns: Name, Type, Balance, Limit, Utilization, Status, Payment
   - Sort and filter
   - Add account button

4. **Payment History**
   - Calendar view or timeline
   - On-time vs late payments
   - Upcoming due dates

5. **Alerts Panel**
   - Recent alerts
   - Score changes
   - New accounts
   - Hard inquiries
   - Negative marks
   - Mark as read

6. **Reports**
   - Monthly progress report
   - Download PDF
   - Email report

**Components:**
- `<MonitoringLayout />` - Layout wrapper
- `<ScoreOverviewCard />` - Score display
- `<UtilizationChart />` - Utilization visualization
- `<AccountsTable />` - Accounts data table
- `<PaymentHistoryCalendar />` - Payment calendar
- `<AlertsPanel />` - Alerts list
- `<ReportsSection />` - Report downloads

---

### 8. Settings (`/settings`)

**Purpose:** Manage account and preferences

**Layout:**
- Tabbed interface

**Tabs:**

1. **Profile**
   - Name, email, phone
   - Date of birth
   - Address
   - Profile photo upload
   - Save button

2. **Security**
   - Change password
   - Two-factor authentication
   - Active sessions
   - Login history

3. **Subscription**
   - Current plan
   - Billing cycle
   - Next billing date
   - Payment method
   - Manage subscription (Stripe portal)
   - Cancel subscription

4. **Notifications**
   - Email notifications (toggles)
   - Push notifications (toggles)
   - Notification preferences by type

5. **Preferences**
   - Language
   - Timezone
   - Date format
   - Currency

6. **Privacy**
   - Data sharing preferences
   - Export data
   - Delete account

**Components:**
- `<SettingsLayout />` - Layout wrapper
- `<SettingsTabs />` - Tab navigation
- `<ProfileForm />` - Profile fields
- `<SecuritySettings />` - Security options
- `<SubscriptionPanel />` - Subscription info
- `<NotificationSettings />` - Notification toggles
- `<PreferencesForm />` - Preferences
- `<PrivacySettings />` - Privacy options

---

## Component Library

### shadcn/ui Components Used

All components are from [ui.shadcn.com](https://ui.shadcn.com) and customized with Tailwind CSS.

**Installation:**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input form select slider tabs dialog alert badge
```

**Core Components:**
- `Button` - All CTAs and actions
- `Card` - Content containers
- `Input` - Text inputs
- `Form` - Form wrapper with validation
- `Select` - Dropdowns
- `Slider` - Range inputs
- `Tabs` - Tabbed interfaces
- `Dialog` - Modals
- `Alert` - Notifications
- `Badge` - Status indicators
- `Table` - Data tables
- `Chart` - Data visualization (via Recharts)
- `Calendar` - Date picker
- `Checkbox` - Checkboxes
- `Radio Group` - Radio buttons
- `Switch` - Toggle switches
- `Textarea` - Multi-line text
- `Tooltip` - Hover tooltips
- `Popover` - Popovers
- `Dropdown Menu` - Context menus
- `Sheet` - Slide-out panels
- `Toast` - Toast notifications
- `Progress` - Progress bars
- `Skeleton` - Loading placeholders

### Custom Components

**Layout Components:**
- `<AppLayout />` - Root layout with providers
- `<MarketingLayout />` - Landing page layout
- `<DashboardLayout />` - Dashboard layout with sidebar
- `<AuthLayout />` - Authentication pages layout

**Navigation Components:**
- `<Header />` - Top navigation
- `<Footer />` - Footer
- `<Sidebar />` - Dashboard sidebar
- `<MobileNav />` - Mobile navigation drawer
- `<Breadcrumbs />` - Breadcrumb navigation

**Credit Components:**
- `<CreditScoreCard />` - Score display card
- `<ScoreHistoryChart />` - Line chart
- `<ScoreTierBadge />` - Tier indicator
- `<UtilizationChart />` - Bar chart
- `<PaymentHistoryCalendar />` - Calendar view

**Form Components:**
- `<CreditProfileForm />` - Profile input form
- `<ActionPlanForm />` - Action plan form
- `<DisputeForm />` - Dispute creation form
- `<LetterEditor />` - Rich text editor

**Utility Components:**
- `<LoadingSpinner />` - Loading indicator
- `<ErrorBoundary />` - Error handling
- `<EmptyState />` - Empty state placeholder
- `<ConfirmDialog />` - Confirmation modal
- `<FileUploader />` - File upload
- `<PDFViewer />` - PDF preview

---

## Authentication & Authorization

### NextAuth.js Configuration

**File:** `src/lib/auth.ts`

```typescript
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    verifyRequest: "/verify",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
```

### Protected Routes

**Middleware:** `src/middleware.ts`

```typescript
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Check subscription status for premium features
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Premium routes require active subscription
    const premiumRoutes = ["/simulator", "/disputes", "/monitoring"];
    
    if (premiumRoutes.some(route => path.startsWith(route))) {
      if (!token?.subscriptionStatus || token.subscriptionStatus !== "active") {
        return NextResponse.redirect(new URL("/pricing", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/simulator/:path*",
    "/disputes/:path*",
    "/action-plan/:path*",
    "/monitoring/:path*",
    "/settings/:path*",
  ],
};
```

---

## Payment Integration

### Stripe Setup

**File:** `src/lib/stripe.ts`

```typescript
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export async function createCheckoutSession(
  userId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    metadata: {
      userId,
    },
  });

  return session;
}

export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}
```

### Webhook Handler

**File:** `src/app/api/webhooks/stripe/route.ts`

```typescript
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id!;

      await db.user.update({
        where: { id: userId },
        data: {
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
        },
      });
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;

      await db.user.update({
        where: { stripeCustomerId: subscription.customer as string },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      });
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      await db.user.update({
        where: { stripeCustomerId: subscription.customer as string },
        data: {
          stripeSubscriptionId: null,
          stripePriceId: null,
          stripeCurrentPeriodEnd: null,
        },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
```

---

## Monte Carlo Simulation

### Algorithm Implementation

The Monte Carlo simulation is already implemented in the current prototype. Key files:

- `src/lib/monteCarlo.ts` - Core simulation engine
- `src/app/simulator/page.tsx` - UI component

**Algorithm Overview:**

1. **Input:** Credit profile + Action plan
2. **Process:** Run 10,000 iterations
3. **Each Iteration:**
   - Start with current profile
   - Simulate 12 months month-by-month
   - Apply action plan effects with randomness
   - Calculate score each month using FICO weights
4. **Output:** Statistical analysis of all iterations

**FICO Weights:**
- Payment History: 35%
- Credit Utilization: 30%
- Credit Age: 15%
- Credit Mix: 10%
- New Credit: 10%

**Randomness:**
- Normal distribution (Box-Muller transform)
- Variance in payment behavior
- Dispute success rate (~30%)
- Score calculation variance (±5 points)

---

## Deployment

### Vercel Deployment

**Prerequisites:**
1. Vercel account
2. GitHub repository
3. Domain configured (optional)

**Steps:**

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login
   vercel login

   # Deploy
   vercel
   ```

2. **Environment Variables**
   - Go to Vercel dashboard
   - Project → Settings → Environment Variables
   - Add all variables from `.env.example`

3. **Database Setup**
   ```bash
   # Create Vercel Postgres database
   vercel postgres create

   # Get connection string
   vercel env pull

   # Run migrations
   pnpm prisma migrate deploy
   ```

4. **Domain Configuration**
   - Go to Project → Settings → Domains
   - Add your custom domain
   - Update DNS records (provided by Vercel)
   - Update `NEXT_PUBLIC_DOMAIN` environment variable

5. **Deploy**
   ```bash
   # Production deployment
   vercel --prod
   ```

### CI/CD Pipeline

**GitHub Actions:** `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm test
      - run: pnpm build
```

---

## Testing Strategy

### Unit Tests (Vitest)

```bash
# Run tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage
```

**Example Test:** `tests/unit/monte-carlo.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import { runMonteCarloSimulation } from "@/lib/monteCarlo";

describe("Monte Carlo Simulation", () => {
  it("should return valid simulation results", () => {
    const profile = {
      currentScore: 650,
      paymentHistory: 85,
      creditUtilization: 45,
      creditAge: 36,
      newAccounts: 2,
      creditMix: 3,
      negativeMarks: 2,
      totalAccounts: 5,
      totalDebt: 15000,
      monthlyIncome: 4000,
    };

    const actionPlan = {
      payOffDebt: 5000,
      disputeNegativeMarks: 2,
      reduceUtilization: 30,
      avoidNewAccounts: true,
      makeOnTimePayments: true,
      diversifyCredit: false,
    };

    const result = runMonteCarloSimulation(profile, actionPlan, 12, 1000);

    expect(result.projectedScore).toBeGreaterThan(profile.currentScore);
    expect(result.confidenceInterval.lower).toBeLessThan(result.confidenceInterval.median);
    expect(result.confidenceInterval.median).toBeLessThan(result.confidenceInterval.upper);
    expect(result.timeline).toHaveLength(13); // 0-12 months
    expect(result.recommendations).toBeInstanceOf(Array);
  });
});
```

### Integration Tests

**Example:** `tests/integration/api/simulations.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/simulations/route";

describe("POST /api/simulations", () => {
  it("should create a simulation", async () => {
    const request = new Request("http://localhost:3000/api/simulations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer test-token",
      },
      body: JSON.stringify({
        profile: { /* ... */ },
        actionPlan: { /* ... */ },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.simulation).toBeDefined();
  });
});
```

### E2E Tests (Playwright)

```bash
# Run E2E tests
pnpm test:e2e

# Run in UI mode
pnpm test:e2e:ui
```

**Example:** `tests/e2e/simulator.spec.ts`

```typescript
import { test, expect } from "@playwright/test";

test("should run Monte Carlo simulation", async ({ page }) => {
  await page.goto("/simulator");

  // Fill in credit profile
  await page.fill('input[name="currentScore"]', "650");
  await page.fill('input[name="paymentHistory"]', "85");
  await page.fill('input[name="creditUtilization"]', "45");

  // Switch to action plan tab
  await page.click('button:has-text("Action Plan")');

  // Fill in action plan
  await page.fill('input[name="payOffDebt"]', "5000");
  await page.fill('input[name="reduceUtilization"]', "30");

  // Run simulation
  await page.click('button:has-text("Run Monte Carlo Simulation")');

  // Wait for results
  await page.waitForSelector('text=Projected Score');

  // Verify results
  const projectedScore = await page.textContent('[data-testid="projected-score"]');
  expect(parseInt(projectedScore!)).toBeGreaterThan(650);
});
```

---

## Security

### Security Checklist

- [x] HTTPS only (enforced by Vercel)
- [x] Password hashing (bcrypt, 12 rounds)
- [x] JWT authentication
- [x] CSRF protection (Next.js built-in)
- [x] XSS protection (React escaping)
- [x] SQL injection prevention (Prisma parameterized queries)
- [x] Rate limiting (API routes)
- [x] Input validation (Zod schemas)
- [x] Secure headers (Next.js security headers)
- [x] Environment variables (not committed)
- [x] Sensitive data encryption (database)
- [x] PCI DSS compliance (via Stripe)
- [ ] Security audit (before production)
- [ ] Penetration testing (annual)
- [ ] Bug bounty program (Phase 5)

### Security Headers

**File:** `next.config.js`

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
```

---

## Performance Optimization

### Performance Targets

- **Lighthouse Score:** > 90
- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms

### Optimization Techniques

1. **Image Optimization**
   - Use Next.js `<Image />` component
   - WebP format
   - Lazy loading
   - Responsive images

2. **Code Splitting**
   - Dynamic imports
   - Route-based splitting (automatic in Next.js)
   - Component lazy loading

3. **Caching**
   - Static page generation (SSG)
   - Incremental Static Regeneration (ISR)
   - API route caching
   - Browser caching (Cache-Control headers)

4. **Database Optimization**
   - Indexes on frequently queried fields
   - Connection pooling
   - Query optimization
   - Pagination

5. **Bundle Optimization**
   - Tree shaking
   - Minification
   - Compression (gzip/brotli)
   - Remove unused dependencies

---

## Monitoring & Logging

### Monitoring Tools

1. **Vercel Analytics**
   - Page views
   - User sessions
   - Performance metrics
   - Real User Monitoring (RUM)

2. **Sentry**
   - Error tracking
   - Performance monitoring
   - Release tracking
   - User feedback

3. **PostHog** (optional)
   - Product analytics
   - Feature flags
   - Session replay
   - A/B testing

### Logging

**File:** `src/lib/logger.ts`

```typescript
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        }
      : undefined,
});

export function logError(error: Error, context?: Record<string, any>) {
  logger.error({
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    ...context,
  });
}

export function logInfo(message: string, context?: Record<string, any>) {
  logger.info({ message, ...context });
}
```

---

## Appendix

### Useful Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm lint                   # Run ESLint
pnpm format                 # Format with Prettier
pnpm type-check             # TypeScript type checking

# Database
pnpm prisma studio          # Open Prisma Studio
pnpm prisma generate        # Generate Prisma Client
pnpm prisma migrate dev     # Create and apply migration
pnpm prisma migrate deploy  # Apply migrations (production)
pnpm prisma db seed         # Seed database

# Testing
pnpm test                   # Run unit tests
pnpm test:watch             # Run tests in watch mode
pnpm test:coverage          # Generate coverage report
pnpm test:e2e               # Run E2E tests

# Deployment
vercel                      # Deploy to Vercel (preview)
vercel --prod               # Deploy to production
```

### Resources

- **Next.js Docs:** https://nextjs.org/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Prisma Docs:** https://www.prisma.io/docs
- **Vercel Docs:** https://vercel.com/docs
- **Stripe Docs:** https://stripe.com/docs
- **NextAuth.js:** https://next-auth.js.org

---

**Document Status:** Complete  
**Last Updated:** October 23, 2025  
**Version:** 1.0

