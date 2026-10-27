import { resolveOrganizationContext } from "@/features/organizations/server/resolveOrganization";
import { getSupplier } from "@/features/suppliers/server/getSupplier";
import { updateSupplier } from "@/features/suppliers/server/updateSupplier";
import { SupplierForm } from "@/features/suppliers/components/SupplierForm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default async function EditSupplierPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await resolveOrganizationContext();
  if (context.state !== "RESOLVED" || !context.organization) redirect("/login");

  const supplier = await getSupplier(params.id);

  // Bind the ID to the server action so the form component remains completely generic
  const updateSupplierWithId = updateSupplier.bind(null, supplier.id);

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
        <Link
          href={`/suppliers/${supplier.id}`}
          className="hover:text-slate-900 transition-colors"
        >
          {supplier.legalName}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-slate-400" />
        <span className="text-slate-900 font-medium">Edit</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit Supplier</h1>
      </div>

      <SupplierForm supplier={supplier} action={updateSupplierWithId} />
    </div>
  );
}
