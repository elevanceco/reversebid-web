import { prisma } from "@/lib/db/prisma";
import { resolveOrganizationContext } from "@/features/organizations/server/resolveOrganization";

export async function getSupplier(id: string) {
  const context = await resolveOrganizationContext();

  if (context.state !== "RESOLVED" || !context.organization) {
    throw new Error("Unauthorized access");
  }

  const supplier = await prisma.supplier.findFirst({
    where: {
      id,
      organizationId: context.organization.id, // Enforce tenant isolation
    },
  });

  if (!supplier) throw new Error("Supplier not found");

  return supplier;
}
