import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: EmailOptions): Promise<void> {
  // Graceful fallback if you forget to add the API key locally
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY is missing. Mock email dispatch:");
    console.warn(`To: ${to} | Subject: ${subject}`);
    console.warn(`Body: ${text}`);
    return;
  }

  const fromEmail =
    process.env.EMAIL_FROM || "ReverseBid <onboarding@resend.dev>";

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      text,
      html: html || text, // Fallback to text if HTML isn't provided
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      throw new Error(error.message);
    }

    console.log("✅ Email sent successfully:", data?.id);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
}
