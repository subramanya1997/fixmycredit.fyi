# RepairMyCredit - Landing Page

A modern, simplistic landing page for the credit repair platform with early user registration.

## Features

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

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Lucide React
- **Form Handling**: React Hook Form + Zod validation
- **Database**: PostgreSQL with Prisma ORM
- **Email**: Resend

## Getting Started

### Prerequisites

- Node.js 20+ installed
- PostgreSQL database (local or hosted)
- Resend API key (get one at [resend.com](https://resend.com))

### Installation

1. **Clone the repository** (if applicable)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   Create a `.env` file in the root directory:
   ```bash
   # App Configuration
   NEXT_PUBLIC_DOMAIN="fixmycredit.fyi"
   NEXT_PUBLIC_SITE_NAME="RepairMyCredit"
   NODE_ENV="development"

   # Database - Replace with your actual PostgreSQL URL
   DATABASE_URL="postgresql://user:password@localhost:5432/creditrepair?schema=public"

   # Email - Get your API key from resend.com
   RESEND_API_KEY="re_your_actual_api_key_here"
   ADMIN_EMAIL="your-email@example.com"

   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
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
   
   Navigate to [http://localhost:3000](http://localhost:3000)

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

## Project Structure

```
fixmycredit.fyi/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # API endpoint for waitlist
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/
│   └── marketing/
│       ├── hero-section.tsx      # Hero section
│       ├── features-section.tsx  # Features grid
│       ├── pricing-section.tsx   # Pricing cards
│       ├── testimonials-section.tsx # Testimonials
│       ├── waitlist-form.tsx     # Registration form
│       └── footer.tsx            # Footer
├── lib/
│   ├── config/
│   │   └── site.ts               # Site configuration
│   ├── db.ts                     # Prisma client
│   ├── email.ts                  # Email service (Resend)
│   ├── validations.ts            # Zod schemas
│   └── utils.ts                  # Utility functions
├── prisma/
│   └── schema.prisma             # Database schema
└── .env                          # Environment variables
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

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `DATABASE_URL` - Your production database URL
- `RESEND_API_KEY` - Your Resend API key
- `ADMIN_EMAIL` - Email to receive signup notifications
- `NEXT_PUBLIC_DOMAIN` - Your production domain
- `NEXT_PUBLIC_APP_URL` - Your production URL

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npx prisma studio        # Open Prisma Studio (database GUI)
npx prisma migrate dev   # Create and apply migration
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema changes (development)
```

## Viewing Waitlist Signups

Use Prisma Studio to view waitlist signups:

```bash
npx prisma studio
```

This will open a GUI at `http://localhost:5555` where you can view and manage your database records.

## Troubleshooting

### "Missing DATABASE_URL" Error

Make sure you've created a `.env` file with a valid `DATABASE_URL`.

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

## Contributing

This is a private project. For internal development only.

## License

Proprietary - All rights reserved

## Support

For questions or issues, contact: support@fixmycredit.fyi

---

**Built with ❤️ using Next.js, Tailwind CSS, and Prisma**
