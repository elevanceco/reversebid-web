"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ShieldAlert, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<
    string,
    { title: string; message: string; Icon: any }
  > = {
    TOKEN_EXPIRED: {
      title: "Link Expired",
      message:
        "For your security, this authentication link has expired. Please request a new one.",
      Icon: XCircle,
    },
    OAUTH_CALLBACK_ERROR: {
      title: "Sign In Cancelled",
      message:
        "The Google sign-in process was cancelled or failed. Please try again.",
      Icon: AlertTriangle,
    },
    OAUTH_CREATE_USER_ERROR: {
      title: "Account Creation Failed",
      message:
        "We couldn't create your account using this provider. Please try signing up with an email.",
      Icon: ShieldAlert,
    },
    UNVERIFIED_EMAIL: {
      title: "Email Not Verified",
      message: "You must verify your email address before signing in.",
      Icon: ShieldAlert,
    },
    DEFAULT: {
      title: "Authentication Error",
      message: "An unexpected error occurred during sign in. Please try again.",
      Icon: AlertTriangle,
    },
  };

  const { title, message, Icon } =
    errorMessages[error as string] || errorMessages.DEFAULT;

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center">
          <Icon className="h-8 w-8 text-red-600" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>

      <p className="text-slate-600 text-sm">{message}</p>

      {/* Show the raw error code in development to help you debug */}
      {process.env.NODE_ENV === "development" && error && (
        <p className="text-xs font-mono text-slate-400 bg-slate-50 p-2 rounded border border-slate-100">
          Code: {error}
        </p>
      )}

      <div className="pt-4 space-y-3">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/login">Return to Sign In</Link>
        </Button>
        <Button variant="outline" className="w-full">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}

// Suspense boundary is required by Next.js when using useSearchParams in a Client Component
export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
