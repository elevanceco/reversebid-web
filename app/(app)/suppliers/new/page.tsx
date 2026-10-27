import { resolveOrganizationContext } from "@/features/organizations/server/resolveOrganization";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SupplierForm } from "@/features/suppliers/components/SupplierForm";
import { createSupplier } from "@/features/suppliers/server/createSupplier";

export default async function NewSupplierPage() {
  const context = await resolveOrganizationContext();

  if (context.state !== "RESOLVED" || !context.organization) {
    redirect("/login");
  }

  return (
    <div className="py-2 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <Link
          href="/suppliers"
          className="hover:text-slate-900 transition-colors"
        >
          Suppliers
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-slate-400" />
        <span className="text-slate-900 font-medium">Add Supplier</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">New Supplier</h1>
      </div>

      <SupplierForm action={createSupplier} />
    </div>
  );
}
