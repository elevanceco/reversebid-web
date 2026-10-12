/*
  Warnings:

  - Added the required column `createdById` to the `SourcingEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `SourcingEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `SourcingEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `SourcingEvent` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SourcingEventType" AS ENUM ('RFQ', 'REVERSE_AUCTION');

-- CreateEnum
CREATE TYPE "SourcingEventStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'OPEN', 'CLOSED', 'AWARDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SupplierBidVisibility" AS ENUM ('OWN_RANK_ONLY', 'BEST_PRICE', 'HIDDEN');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "countryCode" TEXT;

-- AlterTable
ALTER TABLE "SourcingEvent" ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "endsAt" TIMESTAMP(3),
ADD COLUMN     "referenceCode" TEXT,
ADD COLUMN     "startsAt" TIMESTAMP(3),
ADD COLUMN     "status" "SourcingEventStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "timezone" TEXT NOT NULL,
ADD COLUMN     "type" "SourcingEventType" NOT NULL;

-- CreateTable
CREATE TABLE "SourcingLot" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourcingLot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourcingItem" (
    "id" TEXT NOT NULL,
    "lotId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" DECIMAL(65,30) NOT NULL,
    "unit" TEXT NOT NULL,
    "specification" TEXT,
    "referencePrice" DECIMAL(65,30),
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourcingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuctionSettings" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "minimumDecrement" DECIMAL(65,30),
    "softCloseEnabled" BOOLEAN NOT NULL DEFAULT true,
    "softCloseThresholdSeconds" INTEGER NOT NULL DEFAULT 120,
    "softCloseExtensionSeconds" INTEGER NOT NULL DEFAULT 120,
    "supplierVisibility" "SupplierBidVisibility" NOT NULL DEFAULT 'OWN_RANK_ONLY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuctionSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SourcingLot_eventId_idx" ON "SourcingLot"("eventId");

-- CreateIndex
CREATE INDEX "SourcingItem_lotId_idx" ON "SourcingItem"("lotId");

-- CreateIndex
CREATE UNIQUE INDEX "AuctionSettings_eventId_key" ON "AuctionSettings"("eventId");

-- CreateIndex
CREATE INDEX "SourcingEvent_organizationId_status_idx" ON "SourcingEvent"("organizationId", "status");

-- CreateIndex
CREATE INDEX "SourcingEvent_createdById_idx" ON "SourcingEvent"("createdById");

-- AddForeignKey
ALTER TABLE "SourcingEvent" ADD CONSTRAINT "SourcingEvent_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SourcingLot" ADD CONSTRAINT "SourcingLot_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "SourcingEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SourcingItem" ADD CONSTRAINT "SourcingItem_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "SourcingLot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionSettings" ADD CONSTRAINT "AuctionSettings_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "SourcingEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
