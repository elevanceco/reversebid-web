import { resolveOrganizationContext } from "@/features/organizations/server/resolveOrganization";
import { getDashboardData } from "@/features/dashboard/server/getDashboardData";
import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { DashboardEventTable } from "@/features/dashboard/components/DashboardEventTable";
import { EmptyDashboardState } from "@/features/dashboard/components/EmptyDashboardState";

export default async function DashboardPage() {
  const context = await resolveOrganizationContext();

  // Guard check (layout already redirects, but TS needs this)
  if (context.state !== "RESOLVED" || !context.organization) {
    return null;
  }

  // 1. Load the data using the trusted tenant ID
  const data = await getDashboardData(context.organization.id);
  const hasNoEvents =
    data.stats.activeEvents === 0 &&
    data.stats.upcomingEvents === 0 &&
    data.stats.completedEvents === 0 &&
    data.draftEvents.length === 0;

  // 2. Render Empty State or Dashboard UI
  if (hasNoEvents) {
    return (
      <div className="py-6">
        <EmptyDashboardState />
      </div>
    );
  }

  return (
    <div className="py-2 space-y-6 animate-in fade-in duration-500">
      <DashboardStats stats={data.stats} />

      {data.activeEvents.length > 0 && (
        <DashboardEventTable title="Active Events" events={data.activeEvents} />
      )}

      {data.upcomingEvents.length > 0 && (
        <DashboardEventTable
          title="Upcoming Events"
          events={data.upcomingEvents}
        />
      )}

      {data.draftEvents.length > 0 && (
        <DashboardEventTable
          title="Continue where you left off (Drafts)"
          events={data.draftEvents}
        />
      )}

      <DashboardEventTable
        title="Recent Events"
        events={data.recentEvents}
        emptyMessage="No completed events yet."
      />
    </div>
  );
}
