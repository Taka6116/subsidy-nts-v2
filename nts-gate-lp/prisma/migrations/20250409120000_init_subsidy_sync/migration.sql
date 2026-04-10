-- CreateTable
CREATE TABLE "SubsidySyncRun" (
    "id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "itemCount" INTEGER,
    "errorMessage" TEXT,

    CONSTRAINT "SubsidySyncRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubsidyGrant" (
    "id" TEXT NOT NULL,
    "externalId" TEXT,
    "name" TEXT,
    "maxAmountLabel" TEXT,
    "deadlineLabel" TEXT,
    "targetIndustryNote" TEXT,
    "targetUseNote" TEXT,
    "rawPayload" JSONB,
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "syncRunId" TEXT,

    CONSTRAINT "SubsidyGrant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubsidyGrant_externalId_key" ON "SubsidyGrant"("externalId");

-- CreateIndex
CREATE INDEX "SubsidyGrant_syncedAt_idx" ON "SubsidyGrant"("syncedAt");

-- AddForeignKey
ALTER TABLE "SubsidyGrant" ADD CONSTRAINT "SubsidyGrant_syncRunId_fkey" FOREIGN KEY ("syncRunId") REFERENCES "SubsidySyncRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;
