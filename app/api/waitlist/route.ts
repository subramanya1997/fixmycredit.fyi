import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { waitlistSchema } from "@/lib/validations";
import { sendWaitlistConfirmation, sendWaitlistNotification } from "@/lib/email";

/**
 * POST /api/waitlist
 * 
 * Register a new user to the waitlist
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = waitlistSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input data",
            details: validationResult.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const { name, email } = validationResult.data;

    // Check if email already exists
    const existingUser = await db.waitlistUser.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "EMAIL_EXISTS",
            message: "This email is already on our waitlist!",
          },
        },
        { status: 409 }
      );
    }

    // Create waitlist user
    const waitlistUser = await db.waitlistUser.create({
      data: {
        name,
        email,
      },
    });

    // Send confirmation email to user
    const confirmationResult = await sendWaitlistConfirmation(name, email);
    
    if (!confirmationResult.success) {
      console.error("Failed to send confirmation email:", confirmationResult.error);
      // Don't fail the request if email fails, just log it
    }

    // Send notification to admin
    const notificationResult = await sendWaitlistNotification(name, email);
    
    if (!notificationResult.success) {
      console.error("Failed to send admin notification:", notificationResult.error);
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: waitlistUser.id,
          message: "Successfully joined the waitlist!",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in waitlist registration:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred. Please try again later.",
        },
      },
      { status: 500 }
    );
  }
}

