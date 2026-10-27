import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function SupplierHeader() {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-slate-200">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Suppliers</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your private vendor directory.
        </p>
      </div>
      {/* We will wire this to a modal or a /new page in the next step */}
      <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
        <Link href="/suppliers/new">Add Supplier</Link>
      </Button>
    </div>
  );
}
