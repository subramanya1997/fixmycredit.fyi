/**
 * Site Configuration
 * 
 * Central configuration for the RepairMyCredit platform
 */

export const siteConfig = {
  // Domain Configuration
  domain: {
    production: process.env.NEXT_PUBLIC_DOMAIN || "fixmycredit.fyi",
    development: "localhost:3000",
    
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
    name: process.env.NEXT_PUBLIC_SITE_NAME || "fixmycredit.fyi",
    tagline: "Fix Your Credit Score The Smart Way",
    description: "Take control of your financial future with our intelligent credit repair platform. Get personalized guidance, dispute templates, and real-time score tracking.",
  },

  // SEO
  seo: {
    title: {
      default: "fixmycredit.fyi - Credit Score Repair Platform",
      template: "%s | fixmycredit.fyi",
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
  },

  // Contact Information
  contact: {
    email: "support@fixmycredit.fyi",
    adminEmail: process.env.ADMIN_EMAIL || "admin@fixmycredit.fyi",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/repairmycredit",
    facebook: "https://facebook.com/repairmycredit",
    linkedin: "https://linkedin.com/company/repairmycredit",
  },

  // Pricing
  pricing: {
    monthly: {
      amount: 1500, // in cents
      currency: "USD",
      display: "$15",
    },
    annual: {
      amount: 14400, // in cents (20% discount)
      currency: "USD",
      display: "$144",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;

