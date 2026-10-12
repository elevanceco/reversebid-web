import { redirect } from "next/navigation";
import { resolveOrganizationContext } from "@/features/organizations/server/resolveOrganization";
import { OnboardingForm } from "./OnboardingForm";
import LogoTextOnly from "@/components/ui/LogoTextOnly";
import Logo from "@/components/ui/Logo";

export default async function OnboardingPage() {
  const context = await resolveOrganizationContext();

  if (context.state === "UNAUTHENTICATED") {
    redirect("/login");
  }

  if (context.state === "UNVERIFIED") {
    redirect("/verify-email");
  }

  if (context.state === "RESOLVED") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="text-center mb-6">
          <Logo />
          <h1 className="text-2xl font-bold text-slate-900">
            Set up your workspace
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Create your <LogoTextOnly /> organization to get started.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}
