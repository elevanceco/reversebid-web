-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('BUYER', 'SUPPLIER');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "type" "OrganizationType" NOT NULL DEFAULT 'BUYER';
