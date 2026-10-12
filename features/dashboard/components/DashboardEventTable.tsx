import Link from "next/link";
import { DashboardEvent } from "../types/dashboard";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";

export function DashboardEventTable({
  title,
  events,
  emptyMessage,
}: {
  title: string;
  events: DashboardEvent[];
  emptyMessage?: string;
}) {
  if (events.length === 0 && !emptyMessage) return null;

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">{title}</h2>

      {events.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-sm text-slate-500">
          {emptyMessage}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Suppliers
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {event.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {event.currency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {event.type.replace("_", " ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={event.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 tabular-nums">
                      {event.supplierCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm">
                        <Link href={`/events/${event.id}`}>View</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
