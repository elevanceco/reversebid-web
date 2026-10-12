import { createHash } from "crypto";
import { prisma } from "../db/prisma";

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

// Example of how a future service will fetch an event for a supplier:
export async function requireSupplierEventContext(opaqueSessionCookie: string) {
  // Hash the cookie
  const sessionHash = hashToken(opaqueSessionCookie);

  const activeSession = await prisma.supplierEventSession.findFirst({
    where: {
      sessionHash,
      expiresAt: { gt: new Date() },
      revokedAt: null,
      invitation: {
        revokedAt: null,
        status: "ACCEPTED",
      },
    },
    include: {
      invitation: {
        include: { event: true }, // Resolve the authoritative event ID via relation
      },
    },
  });

  if (!activeSession) throw new Error("UNAUTHORIZED_SUPPLIER_SESSION");

  // The application service now uses `activeSession.invitation.event`
  // as the un-spoofable boundary for all subsequent queries.
  return activeSession;
}
