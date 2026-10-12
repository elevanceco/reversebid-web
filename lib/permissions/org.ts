import { auth } from "../auth/auth";
import { prisma } from "../db/prisma";
import { headers } from "next/headers";
import { OrganizationRole } from "../generated/prisma/enums";

export async function requireOrganizationAccess(
  organizationId: string,
  allowedRoles?: OrganizationRole[],
) {
  // 1. Establish Identity
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("UNAUTHENTICATED");
  }

  // 2. Establish Tenant Membership (Explicit database check)
  const membership = await prisma.organizationMember.findUnique({
    where: {
      userId_organizationId: {
        userId: session.user.id,
        organizationId: organizationId,
      },
    },
    include: {
      organization: true, // Inject organization context safely
    },
  });

  if (!membership) {
    // Fails safe: Prevents cross-tenant data leakage
    throw new Error("FORBIDDEN: Tenant access denied");
  }

  // 3. Optional Role Scoping
  if (allowedRoles && !allowedRoles.includes(membership.role)) {
    throw new Error("FORBIDDEN: Insufficient role permissions");
  }

  // 4. Return authoritative context for the application service to use
  return {
    user: session.user,
    organization: membership.organization,
    role: membership.role,
  };
}
