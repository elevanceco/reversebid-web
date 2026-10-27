import { Button } from "@/components/ui/button";
import { Building2, Plus } from "lucide-react";
import Link from "next/link";

export function EmptySupplierState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-slate-200 rounded-xl shadow-sm mt-6">
      <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <Building2 className="h-6 w-6 text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">
        Your private supplier directory
      </h3>
      <p className="mt-2 text-sm text-slate-500 max-w-sm">
        No suppliers yet. Suppliers you invite to sourcing events will appear
        here.
      </p>
      <div className="mt-6">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/suppliers/new">Add Supplier</Link>
        </Button>
      </div>
    </div>
  );
}
