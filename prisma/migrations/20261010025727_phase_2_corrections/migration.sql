/*
  Warnings:

  - A unique constraint covering the columns `[eventSupplierId]` on the table `EventSupplierInvitation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventSupplierId` to the `EventSupplierInvitation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventSupplierStatus" AS ENUM ('SELECTED', 'INVITED', 'ACCEPTED', 'DECLINED', 'REVOKED');

-- AlterTable
ALTER TABLE "AuctionSettings" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "EventSupplierInvitation" ADD COLUMN     "eventSupplierId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notes" TEXT;

-- CreateTable
CREATE TABLE "EventSupplier" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "status" "EventSupplierStatus" NOT NULL DEFAULT 'SELECTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventSupplier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventSupplier_eventId_idx" ON "EventSupplier"("eventId");

-- CreateIndex
CREATE INDEX "EventSupplier_supplierId_idx" ON "EventSupplier"("supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "EventSupplier_eventId_supplierId_key" ON "EventSupplier"("eventId", "supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "EventSupplierInvitation_eventSupplierId_key" ON "EventSupplierInvitation"("eventSupplierId");

-- CreateIndex
CREATE INDEX "Supplier_organizationId_legalName_idx" ON "Supplier"("organizationId", "legalName");

-- AddForeignKey
ALTER TABLE "EventSupplier" ADD CONSTRAINT "EventSupplier_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "SourcingEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSupplier" ADD CONSTRAINT "EventSupplier_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSupplierInvitation" ADD CONSTRAINT "EventSupplierInvitation_eventSupplierId_fkey" FOREIGN KEY ("eventSupplierId") REFERENCES "EventSupplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
