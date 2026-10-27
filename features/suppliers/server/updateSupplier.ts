"use server";

import { prisma } from "@/lib/db/prisma";
import { resolveOrganizationContext } from "@/features/organizations/server/resolveOrganization";
import { redirect } from "next/navigation";

export async function updateSupplier(id: string, formData: FormData) {
  const context = await resolveOrganizationContext();

  if (context.state !== "RESOLVED" || !context.organization) {
    throw new Error("Unauthorized access");
  }

  const legalName = formData.get("legalName") as string;
  if (!legalName || legalName.trim() === "") {
    throw new Error("Company Name is required");
  }

  await prisma.supplier.update({
    where: {
      id,
      organizationId: context.organization.id, // Double check ownership
    },
    data: {
      legalName: legalName.trim(),
      countryCode: (formData.get("countryCode") as string) || null,
      website: (formData.get("website") as string) || null,
      contactName: (formData.get("contactName") as string) || null,
      contactEmail: (formData.get("contactEmail") as string) || null,
      contactPhone: (formData.get("contactPhone") as string) || null,
      notes: (formData.get("notes") as string) || null,
    },
  });

  redirect("/suppliers");
}
