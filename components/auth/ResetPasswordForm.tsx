"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const resetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: z.infer<typeof resetSchema>) => {
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }
    setError(null);
    const { error: resetError } = await authClient.resetPassword({
      newPassword: data.password,
      token,
    });
    if (resetError) {
      setError(
        resetError.message ||
          "An error occurred while resetting the password. Please try again.",
      );
      return;
    }
    router.push("/login?reset=success");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create New Password</h1>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
            {error}
          </div>
        )}
        <div>
          <Input
            type="password"
            placeholder="New Password"
            {...form.register("password")}
            disabled={form.formState.isSubmitting}
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
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
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
