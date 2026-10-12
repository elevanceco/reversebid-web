import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

export async function resolveOrganizationContext() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { state: "UNAUTHENTICATED" as const };
  }

  console.log(session.user.emailVerified);
  if (!session.user.emailVerified) {
    return { state: "UNVERIFIED" as const, user: session.user };
  }

  const memberships = await prisma.organizationMember.findMany({
    where: { userId: session.user.id },
    include: { organization: true },
    orderBy: { createdAt: "asc" },
  });

  if (memberships.length === 0) {
    return { state: "ONBOARDING_REQUIRED" as const, user: session.user };
  }

  return {
    state: "RESOLVED" as const,
    user: session.user,
    organization: memberships[0].organization,
    membership: memberships[0],
  };
}
