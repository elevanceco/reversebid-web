"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  MailCheck,
  XCircle,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoTextOnly from "@/components/ui/LogoTextOnly";
import { authClient } from "@/lib/auth/auth-client";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  const { data: session, isPending } = authClient.useSession();
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Auto-redirect if they land here and are already verified
  useEffect(() => {
    if (session?.user?.emailVerified && !error) {
      const timer = setTimeout(() => {
        router.push("/onboarding");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [session, error, router]);

  const handleResend = async () => {
    if (!session?.user?.email) return;
    setIsResending(true);
    const { error: resendError } = await authClient.sendVerificationEmail({
      email: session.user.email,
      callbackURL: "/verify-email",
    });
    setIsResending(false);
    if (resendError) setResendStatus("error");
    else setResendStatus("success");
  };

  // 1. Loading State
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. Success State (Verified)
  if (session?.user?.emailVerified && !error) {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Email Verified!</h1>
        <p className="text-slate-600 text-sm">
          Thank you for verifying your email. We are redirecting you to your
          workspace setup...
        </p>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/onboarding">Continue to Workspace</Link>
        </Button>
      </div>
    );
  }

  // 3. Error States (Token Expired / Invalid)
  if (error) {
    let title = "Verification Failed";
    let message =
      "We couldn't verify your email address. The link may be invalid or corrupted.";
    let Icon = AlertCircle;

    if (error === "TOKEN_EXPIRED") {
      title = "Verification Link Expired";
      message =
        "For your security, verification links expire after a short period. Please request a new one.";
      Icon = XCircle;
    }

    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center">
            <Icon className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-600 text-sm">{message}</p>

        <div className="pt-4 space-y-3">
          {session?.user ? (
            <Button
              onClick={handleResend}
              disabled={isResending || resendStatus === "success"}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isResending
                ? "Sending..."
                : resendStatus === "success"
                  ? "New Link Sent!"
                  : "Resend Verification Email"}
            </Button>
          ) : (
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/login">Sign in to request a new link</Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  // 4. Default "Check Your Inbox" State
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center">
          <MailCheck className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-slate-900">Check your inbox</h1>

      <p className="text-slate-600 text-sm">
        We just sent a verification link to{" "}
        <strong>{session?.user?.email || "your email"}</strong>. Please click
        the link to verify your account and continue setting up your{" "}
        <LogoTextOnly /> workspace.
      </p>

      <div className="pt-4 space-y-4">
        <Button
          onClick={handleResend}
          variant="outline"
          disabled={isResending || resendStatus === "success"}
          className="w-full text-slate-700 border-slate-300 hover:bg-slate-50"
        >
          {isResending
            ? "Sending..."
            : resendStatus === "success"
              ? "New Link Sent!"
              : "Resend Email"}
        </Button>

        <p className="text-xs text-slate-500">
          Didn't receive the email? Check your spam folder or request a new link
          above.
        </p>
      </div>
    </div>
  );
}

// Next.js requires Client Components that use useSearchParams to be wrapped in a Suspense boundary
export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
