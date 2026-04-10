/**
 * jGrants 同期の骨格。実 API 接続前は DB 接続確認用のダミー upsert のみ。
 * 実行: npm run sync:jgrants（要 DATABASE_URL）
 */
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { normalizeSubsidy } from "../src/lib/subsidy/normalize";

config({ path: ".env" });
config({ path: ".env.local", override: true });

const prisma = new PrismaClient();

async function main() {
  const run = await prisma.subsidySyncRun.create({
    data: {
      status: "partial",
      itemCount: 0,
      errorMessage: "jGrants API 未接続（プレースホルダ同期）",
    },
  });

  const rawPayload = {
    source: "sync-jgrants.ts",
    note: "Replace with real jGrants payload",
    targetIndustryNote: "製造業の設備投資に関する補助制度です。",
    targetUseNote: "設備導入やシステム構築を支援します。",
    description: "ものづくり補助金（プレースホルダ説明）",
  };

  const { targetIndustries, description } = normalizeSubsidy(rawPayload);

  await prisma.subsidyGrant.upsert({
    where: { externalId: "__placeholder__" },
    create: {
      externalId: "__placeholder__",
      name: "（同期プレースホルダ・削除可）",
      rawPayload,
      targetIndustries,
      description: description ?? null,
      syncRunId: run.id,
    },
    update: {
      syncedAt: new Date(),
      syncRunId: run.id,
      rawPayload,
      targetIndustries,
      description: description ?? null,
    },
  });

  await prisma.subsidySyncRun.update({
    where: { id: run.id },
    data: {
      finishedAt: new Date(),
      status: "partial",
      itemCount: 1,
    },
  });

  console.log("[sync-jgrants] OK runId=%s", run.id);
}

main()
  .catch((e) => {
    console.error("[sync-jgrants]", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
