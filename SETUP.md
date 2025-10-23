# Quick Setup Guide

Follow these steps to get the landing page running locally.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```bash
# App Configuration
NEXT_PUBLIC_DOMAIN="fixmycredit.fyi"
NEXT_PUBLIC_SITE_NAME="RepairMyCredit"
NODE_ENV="development"

# Database URL - You'll need to replace this with your actual database
DATABASE_URL="postgresql://user:password@localhost:5432/creditrepair?schema=public"

# Resend API Key - Get one from https://resend.com
RESEND_API_KEY="re_your_api_key_here"
ADMIN_EMAIL="your-email@example.com"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Step 3: Set Up Database

### Option A: Use a Hosted Database (Easiest)

1. Sign up for a free database at:
   - [Vercel Postgres](https://vercel.com/storage/postgres)
   - [Supabase](https://supabase.com)
   - [Neon](https://neon.tech)
   - [Railway](https://railway.app)

2. Copy the connection string they provide

3. Update `DATABASE_URL` in your `.env` file

4. Run the migration:
   ```bash
   npx prisma migrate dev --name init
   ```

### Option B: Use Local PostgreSQL

1. Install PostgreSQL on your machine

2. Create a database:
   ```sql
   createdb creditrepair
   ```

3. Update `DATABASE_URL` in `.env` with your local credentials

4. Run the migration:
   ```bash
   npx prisma migrate dev --name init
   ```

## Step 4: Set Up Email (Resend)

1. Go to [resend.com](https://resend.com) and sign up

2. Verify your email address

3. For development, you can use their test domain (`onboarding@resend.dev`)

4. For production, add and verify your own domain

5. Create an API key in the Resend dashboard

6. Copy the API key to your `.env` file as `RESEND_API_KEY`

7. **IMPORTANT**: Update the email addresses in `lib/email.ts`:
   ```typescript
   from: `${siteConfig.branding.name} <noreply@yourdomain.com>`,
   ```
   Replace `fixmycredit.fyi` with your verified domain or use `onboarding@resend.dev` for testing.

## Step 5: Generate Prisma Client

```bash
npx prisma generate
```

## Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Step 7: Test the Waitlist Form

1. Scroll to the bottom of the page
2. Fill in your name and email
3. Click "Join Waitlist"
4. You should see a success message
5. Check your email for the confirmation
6. Check your admin email for the notification

## Viewing Waitlist Signups

To view who has signed up:

```bash
npx prisma studio
```

This opens a database GUI at http://localhost:5555

## Common Issues

### Issue: "Missing DATABASE_URL"

**Solution**: Make sure you created a `.env` file in the root directory with the `DATABASE_URL` variable.

### Issue: "Relation WaitlistUser does not exist"

**Solution**: Run the migration:
```bash
npx prisma migrate dev --name init
```

### Issue: Emails not sending

**Solution**: 
1. Check your `RESEND_API_KEY` is correct
2. Make sure you've updated the email addresses in `lib/email.ts`
3. For development, you can use `onboarding@resend.dev` as the from address

### Issue: TypeScript errors

**Solution**: Make sure Prisma Client is generated:
```bash
npx prisma generate
```

## Next Steps

1. **Customize the content**: Edit the components in `components/marketing/`
2. **Update branding**: Edit `lib/config/site.ts`
3. **Change colors**: Update Tailwind classes in components
4. **Add more sections**: Create new components and add to `app/page.tsx`

## Production Deployment

When you're ready to deploy:

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add all environment variables in Vercel dashboard
4. Make sure to use production database URL
5. Verify your domain in Resend
6. Deploy!

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review the [Product Requirements Document](./.cursor/Product%20Requirements%20Document%20(PRD).md)
- Review the [Technical Documentation](./.cursor/Technical%20Documentation.md)

