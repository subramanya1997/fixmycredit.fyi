import { z } from "zod";

/**
 * Validation Schemas
 * 
 * Zod schemas for form validation across the application
 */

// Waitlist Form Validation
export const waitlistSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase(),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;

