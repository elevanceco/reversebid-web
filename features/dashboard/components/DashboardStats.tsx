import { DashboardData } from "../types/dashboard";

export function DashboardStats({ stats }: { stats: DashboardData["stats"] }) {
  const cards = [
    {
      label: "Active Events",
      value: stats.activeEvents,
      subtext: "Currently open",
    },
    {
      label: "Upcoming Events",
      value: stats.upcomingEvents,
      subtext: "Scheduled",
    },
    {
      label: "Completed Events",
      value: stats.completedEvents,
      subtext: "Closed or awarded",
    },
    {
      label: "Suppliers",
      value: stats.suppliers,
      subtext: "In your directory",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">{card.label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 tabular-nums">
            {card.value}
          </p>
          <p className="mt-1 text-xs text-slate-400">{card.subtext}</p>
        </div>
      ))}
    </div>
  );
}
