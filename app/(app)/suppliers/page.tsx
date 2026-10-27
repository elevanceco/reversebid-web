import { resolveOrganizationContext } from "@/features/organizations/server/resolveOrganization";
import { listSuppliers } from "@/features/suppliers/server/listSuppliers";
import { SupplierHeader } from "@/features/suppliers/components/SupplierHeader";
import { SupplierTable } from "@/features/suppliers/components/SupplierTable";
import { EmptySupplierState } from "@/features/suppliers/components/EmptySupplierState";
import { redirect } from "next/navigation";

export default async function SuppliersPage() {
  const context = await resolveOrganizationContext();

  // Guard check (layout already redirects, but TS needs this check)
  if (context.state !== "RESOLVED" || !context.organization) {
    redirect("/login");
  }

  // Load the data using the trusted tenant ID
  const suppliers = await listSuppliers();

  return (
    <div className="py-2 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <SupplierHeader />

      {suppliers.length > 0 ? (
        <SupplierTable suppliers={suppliers} />
      ) : (
        <EmptySupplierState />
      )}
    </div>
  );
}
