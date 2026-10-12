"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

const onboardingSchema = z.object({
  companyName: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/),
  countryCode: z.string().length(2),
});

export async function createWorkspace(data: z.infer<typeof onboardingSchema>) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = onboardingSchema.parse(data);

  await prisma.$transaction(async (tx) => {
    // 1. Create the Organization (Type: BUYER)
    const org = await tx.organization.create({
      data: {
        name: parsed.companyName,
        slug: parsed.slug,
        countryCode: parsed.countryCode,
        type: "BUYER",
      },
    });

    // 2. Assign the creating user as OWNER
    await tx.organizationMember.create({
      data: {
        userId: session.user.id,
        organizationId: org.id,
        role: "OWNER",
      },
    });
  });

  redirect("/dashboard");
}
