"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LogoTextOnly from "../ui/LogoTextOnly";
import GoogleSignInButton from "./GoogleSignInButton";
import Logo from "../ui/Logo";

// 1. Reinforced Zod Schema
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange", // Validates as the user types
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    const { error: signUpError } = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL: "/verify-email",
    });

    if (signUpError) {
      setError(
        signUpError.message ||
          "An error occurred during registration. Please try again.",
      );
      return;
    }
    router.push("/onboarding");
    router.refresh();
  };

  // Watch field values for real-time checklist updates
  const watchName = form.watch("name") || "";
  const watchEmail = form.watch("email") || "";
  const watchPassword = form.watch("password") || "";

  // Validation Checkers
  const isNameValid = watchName.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchEmail);

  const passwordCriteria = [
    { label: "At least 8 characters", met: watchPassword.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(watchPassword) },
    { label: "One lowercase letter", met: /[a-z]/.test(watchPassword) },
    { label: "One number", met: /[0-9]/.test(watchPassword) },
    { label: "One special character", met: /[^a-zA-Z0-9]/.test(watchPassword) },
  ];

  const metPasswordCriteriaCount = passwordCriteria.filter((c) => c.met).length;

  // Calculate Strength Bar Width & Color
  const strengthPercentage =
    (metPasswordCriteriaCount / passwordCriteria.length) * 100;
  let strengthColor = "bg-slate-200";
  if (metPasswordCriteriaCount > 0 && metPasswordCriteriaCount <= 2)
    strengthColor = "bg-red-500";
  else if (metPasswordCriteriaCount === 3 || metPasswordCriteriaCount === 4)
    strengthColor = "bg-yellow-500";
  else if (metPasswordCriteriaCount === 5) strengthColor = "bg-emerald-500";

  // Reusable Checklist Item Component
  const ChecklistItem = ({ met, label }: { met: boolean; label: string }) => (
    <div
      className={`flex items-center gap-2 text-xs transition-colors ${met ? "text-emerald-600" : "text-slate-400"}`}
    >
      {met ? (
        <CheckCircle2 className="w-3.5 h-3.5" />
      ) : (
        <Circle className="w-3.5 h-3.5" />
      )}
      <span>{label}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Logo />
        <h1 className="text-2xl font-bold text-slate-900">
          Create your <LogoTextOnly /> account
        </h1>
      </div>

      <GoogleSignInButton callbackURL="/dashboard" text="Sign up with Google" />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500">OR</span>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
            {error}
          </div>
        )}

        {/* Name Field */}
        <div>
          <Input
            placeholder="Full Name"
            {...form.register("name")}
            disabled={form.formState.isSubmitting}
            className="mb-2"
          />
          <ChecklistItem met={isNameValid} label="At least 2 characters" />
        </div>

        {/* Email Field */}
        <div>
          <Input
            type="email"
            placeholder="Email"
            {...form.register("email")}
            disabled={form.formState.isSubmitting}
            className="mb-2"
          />
          <ChecklistItem met={isEmailValid} label="Valid email format" />
        </div>

        {/* Password Field */}
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...form.register("password")}
            disabled={form.formState.isSubmitting}
            className="mb-2"
          />

          {/* Password Strength Indicator */}
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full transition-all duration-300 ${strengthColor}`}
              style={{ width: `${strengthPercentage}%` }}
            />
          </div>

          {/* Password Criteria Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2">
            {passwordCriteria.map((criteria, idx) => (
              <ChecklistItem
                key={idx}
                met={criteria.met}
                label={criteria.label}
              />
            ))}
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...form.register("confirmPassword")}
            disabled={form.formState.isSubmitting}
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {form.formState.isSubmitting
            ? "Creating Account..."
            : "Create Account"}
        </Button>
      </form>

      <div className="text-center text-sm text-slate-600 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
