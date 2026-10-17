import { Resend } from "resend";

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
  const apiKey = process.env.RESEND_API_KEY;

  // Graceful fallback when the API key is missing.
  if (!apiKey) {
    console.warn("⚠️ RESEND_API_KEY is missing. Mock email dispatch:");
    console.warn(`To: ${to} | Subject: ${subject}`);
    console.warn(`Body: ${text}`);
    return;
  }

  const resend = new Resend(apiKey);
  const fromEmail =
    process.env.EMAIL_FROM || "ReverseBid <onboarding@resend.dev>";

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      text,
      html: html || text,
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
