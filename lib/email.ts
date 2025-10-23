import { Resend } from "resend";
import { siteConfig } from "./config/site";

/**
 * Email Service
 * 
 * Handles sending emails via Resend
 */

// Lazy initialization to avoid build-time errors
let resendInstance: Resend | null = null;

function getResendClient() {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

/**
 * Send confirmation email to user who joined the waitlist
 */
export async function sendWaitlistConfirmation(name: string, email: string) {
  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: `${siteConfig.branding.name} <noreply@fixmycredit.fyi>`,
      to: [email],
      subject: `Welcome to ${siteConfig.branding.name} Waitlist!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to ${siteConfig.branding.name}</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">
                ${siteConfig.branding.name}
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">
                ${siteConfig.branding.tagline}
              </p>
            </div>
            
            <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">
                Welcome, ${name}! 🎉
              </h2>
              
              <p style="margin: 0 0 15px 0; font-size: 16px; color: #555;">
                Thank you for joining our exclusive waitlist! You're one step closer to taking control of your credit score and financial future.
              </p>
              
              <p style="margin: 0 0 15px 0; font-size: 16px; color: #555;">
                We're building something special to help you:
              </p>
              
              <ul style="margin: 0 0 25px 0; padding-left: 20px; color: #555;">
                <li style="margin-bottom: 10px;">Understand your credit score with AI-powered insights</li>
                <li style="margin-bottom: 10px;">Get personalized action plans to improve your score</li>
                <li style="margin-bottom: 10px;">Access professional dispute letter templates</li>
                <li style="margin-bottom: 10px;">Track your progress with real-time monitoring</li>
              </ul>
              
              <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #667eea; margin: 25px 0; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px; color: #666;">
                  <strong style="color: #333;">What's Next?</strong><br>
                  We'll keep you updated on our launch progress and notify you as soon as we're ready to welcome you aboard. Stay tuned!
                </p>
              </div>
              
              <p style="margin: 30px 0 0 0; font-size: 14px; color: #888; text-align: center;">
                Questions? Reply to this email or visit our website.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding: 20px; color: #888; font-size: 12px;">
              <p style="margin: 0 0 10px 0;">
                © ${new Date().getFullYear()} ${siteConfig.branding.name}. All rights reserved.
              </p>
              <p style="margin: 0;">
                You received this email because you signed up for our waitlist.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Error sending waitlist confirmation:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending waitlist confirmation:", error);
    return { success: false, error };
  }
}

/**
 * Send notification to admin about new waitlist signup
 */
export async function sendWaitlistNotification(name: string, email: string) {
  try {
    const resend = getResendClient();
    const { data, error } = await resend.emails.send({
      from: `${siteConfig.branding.name} <noreply@fixmycredit.fyi>`,
      to: [siteConfig.contact.adminEmail],
      subject: `New Waitlist Signup: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Waitlist Signup</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin: 0 0 20px 0;">🎉 New Waitlist Signup</h2>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0; color: #666;">
                  <strong style="color: #333;">Name:</strong> ${name}
                </p>
                <p style="margin: 0; color: #666;">
                  <strong style="color: #333;">Email:</strong> ${email}
                </p>
              </div>
              
              <p style="margin: 0; color: #888; font-size: 14px;">
                Signed up at: ${new Date().toLocaleString()}
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Error sending admin notification:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return { success: false, error };
  }
}

