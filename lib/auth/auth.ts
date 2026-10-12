import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../db/prisma";
import { sendEmail } from "../email/sendEmail";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({
      user,
      url,
    }: {
      user: { email: string };
      url: string;
    }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your ReverseBid password",
        text: `Click here to reset your password: ${url}`,
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your ReverseBid email",
        text: `Welcome to ReverseBid! Click here to verify your email: ${url}`,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  user: {
    validateUserInfo: ({ user, source }) => {
      const isGoogle = source.oauth?.providerId === "google";

      // Fallback check against raw provider profile if mapped boolean is missing
      const isVerified =
        user.emailVerified || source.oauth?.profile?.email_verified === true;

      if (isGoogle && !isVerified) {
        return {
          error: "unverified_email",
          errorDescription: "A verified Google email is required to sign in.",
        };
      }
    },
  },
});
