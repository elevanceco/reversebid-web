"use server";

import { prisma } from "@/lib/db/prisma";
import { resolveOrganizationContext } from "@/features/organizations/server/resolveOrganization";
import { revalidatePath } from "next/cache";

export async function archiveSupplier(id: string) {
  const context = await resolveOrganizationContext();

  if (context.state !== "RESOLVED" || !context.organization) {
    return { error: "Unauthorized access" };
  }

  try {
    await prisma.supplier.update({
      where: {
        id,
        organizationId: context.organization.id, // Enforce tenant isolation
      },
      data: {
        isArchived: true,
      },
    });

    // Clear the router cache so the table refreshes instantly
    revalidatePath("/suppliers");

    return { success: true };
  } catch (error) {
    console.error("Failed to archive supplier:", error);
    return { error: "Failed to archive supplier. Please try again." };
  }
}
