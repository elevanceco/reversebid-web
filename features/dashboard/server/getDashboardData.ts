import { prisma } from "@/lib/db/prisma";
import { DashboardData, DashboardEvent } from "../types/dashboard";

export async function getDashboardData(
  organizationId: string,
): Promise<DashboardData> {
  try {
    // Fetch what we actually have in the database right now
    const rawEvents = await prisma.sourcingEvent.findMany({
      where: { organizationId },
      orderBy: { updatedAt: "desc" },
      take: 20,
    });

    // Safely map the events, providing fallback UI data for the missing Prisma fields
    const mappedEvents: DashboardEvent[] = rawEvents.map((e, index) => ({
      id: e.id,
      title: e.title,
      // Mocking missing fields until we update the Prisma schema in the next phase
      type: "REVERSE_AUCTION",
      status: index === 0 ? "OPEN" : "DRAFT", // Make the first event 'OPEN' so you can see the active UI
      currency: "USD",
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 86400000),
      updatedAt: e.updatedAt,
      supplierCount: 0,
    }));

    return {
      stats: {
        activeEvents: mappedEvents.filter((e) => e.status === "OPEN").length,
        upcomingEvents: 0,
        completedEvents: 0,
        suppliers: 0, // Safely returning 0 until SUPPLIER_ADMIN roles are added to the DB
      },
      activeEvents: mappedEvents.filter((e) => e.status === "OPEN"),
      upcomingEvents: [],
      recentEvents: [],
      draftEvents: mappedEvents.filter((e) => e.status === "DRAFT"),
    };
  } catch (error) {
    console.error("Dashboard Data Fetch Error:", error);
    return {
      stats: {
        activeEvents: 0,
        upcomingEvents: 0,
        completedEvents: 0,
        suppliers: 0,
      },
      activeEvents: [],
      upcomingEvents: [],
      recentEvents: [],
      draftEvents: [],
    };
  }
}
