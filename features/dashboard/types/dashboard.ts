export type DashboardEvent = {
  id: string;
  title: string;
  type: string;
  status: "DRAFT" | "SCHEDULED" | "OPEN" | "CLOSED" | "AWARDED" | "CANCELLED";
  currency: string;
  startsAt: Date | null;
  endsAt: Date | null;
  updatedAt: Date;
  supplierCount: number;
};

export type DashboardData = {
  stats: {
    activeEvents: number;
    upcomingEvents: number;
    completedEvents: number;
    suppliers: number;
  };
  activeEvents: DashboardEvent[];
  upcomingEvents: DashboardEvent[];
  recentEvents: DashboardEvent[];
  draftEvents: DashboardEvent[];
};
