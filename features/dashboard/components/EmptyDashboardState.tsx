import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyDashboardState() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-6 py-16 text-center">
      <div className="mx-auto h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
        <FileText className="h-8 w-8" />
      </div>
      <h2 className="text-xl font-bold text-slate-900">
        Run your first sourcing event
      </h2>
      <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
        Create an RFQ, invite your existing suppliers, and manage the entire
        quotation process in one place.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/events/new">Create Your First Event</Link>
        </Button>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
        <div className="text-sm">
          <span className="font-semibold text-slate-900 block mb-1">
            1. Create an RFQ
          </span>
          <span className="text-slate-500">
            Define your requirements and schedule.
          </span>
        </div>
        <div className="text-sm">
          <span className="font-semibold text-slate-900 block mb-1">
            2. Add items
          </span>
          <span className="text-slate-500">
            List the products or lots you are sourcing.
          </span>
        </div>
        <div className="text-sm">
          <span className="font-semibold text-slate-900 block mb-1">
            3. Select suppliers
          </span>
          <span className="text-slate-500">
            Invite your trusted vendors via email.
          </span>
        </div>
        <div className="text-sm">
          <span className="font-semibold text-slate-900 block mb-1">
            4. Launch
          </span>
          <span className="text-slate-500">
            Collect bids and track the results live.
          </span>
        </div>
      </div>
    </div>
  );
}
