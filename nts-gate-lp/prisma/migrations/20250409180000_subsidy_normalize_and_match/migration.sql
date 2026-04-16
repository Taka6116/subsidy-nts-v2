-- AlterTable
ALTER TABLE "SubsidyGrant" ADD COLUMN     "targetIndustries" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "SubsidyGrant" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "SubsidyGrant" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "SubsidyGrant_updatedAt_idx" ON "SubsidyGrant"("updatedAt");
