import { prisma } from "@/lib/db/prisma"; // Adjust import to your Prisma client
import { resolveOrganizationContext } from "@/features/organizations/server/resolveOrganization";

export async function listSuppliers() {
  const context = await resolveOrganizationContext();

  // Guard check to ensure cross-tenant boundaries
  if (context.state !== "RESOLVED" || !context.organization) {
    throw new Error("Unauthorized access to suppliers");
  }

  // Fetch only unarchived suppliers for this specific buyer organization
  return prisma.supplier.findMany({
    where: {
      organizationId: context.organization.id,
      isArchived: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
