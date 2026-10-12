import { redirect } from "next/navigation";
import { resolveOrganizationContext } from "@/features/organizations/server/resolveOrganization";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = await resolveOrganizationContext();

  if (context.state === "UNAUTHENTICATED") redirect("/login");
  if (context.state === "UNVERIFIED") redirect("/verify-email");
  if (context.state === "ONBOARDING_REQUIRED") redirect("/onboarding");

  if (!context.user || !context.organization || !context.membership) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <AppSidebar
        user={context.user as any}
        organization={context.organization}
        role={context.membership.role}
      />

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* 👇 Passed organization and role to the Header! */}
        <AppHeader
          user={context.user as any}
          organization={context.organization}
          role={context.membership.role}
        />

        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
