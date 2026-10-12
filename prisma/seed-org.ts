import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured in environment variables.");
}

// 1. Instantiate PG Pool and Adapter required by Prisma 7
const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);

// 2. Pass the adapter option into PrismaClient
const prisma = new PrismaClient({ adapter });

async function main() {
  const targetEmail = process.argv[2];

  if (!targetEmail) {
    console.error(
      "Please provide an email: npx tsx prisma/seed-org.ts user@example.com",
    );
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email: targetEmail } });

  if (!user) {
    console.error(
      `User ${targetEmail} not found. Please sign up via Better Auth first.`,
    );
    process.exit(1);
  }

  const org = await prisma.organization.create({
    data: {
      name: "Acme Procurement",
      slug: "acme-procurement",
      members: {
        create: {
          userId: user.id,
          role: "OWNER",
        },
      },
    },
  });

  console.log(
    `✅ Organization '${org.name}' created and assigned to ${user.email} as OWNER.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Ensure no backslash before \$disconnect
    await prisma.$disconnect();
    await pool.end();
  });
