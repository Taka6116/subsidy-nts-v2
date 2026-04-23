/**
 * CLI: 指定された subsidyId の補助金について Bedrock で記事を生成し DB に保存する
 *
 * 使い方:
 *   npx tsx scripts/generate-article.ts <subsidyId> [--force]
 *
 * 成功時 stdout に JSON を 1 行で出力:
 *   {"ok":true,"contentId":"...","slug":"...","title":"...","subsidyId":"..."}
 *
 * 失敗時 stderr にエラー + exit code 1
 */
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function main() {
  const args = process.argv.slice(2);
  const subsidyId = args.find((a) => !a.startsWith("--"));
  const force = args.includes("--force");

  if (!subsidyId) {
    console.error("Usage: npx tsx scripts/generate-article.ts <subsidyId> [--force]");
    process.exit(2);
  }

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set (checked .env.local and .env)");
    process.exit(2);
  }
  if (!process.env.BEDROCK_MODEL_ID || !process.env.AWS_REGION) {
    console.error("BEDROCK_MODEL_ID / AWS_REGION is not set");
    process.exit(2);
  }

  const { runContentJob } = await import("../src/lib/content/runContentJob");
  const { prisma } = await import("../src/lib/db/prisma");

  try {
    const result = await runContentJob({ subsidyId, force });
    console.log(JSON.stringify({ ok: true, ...result }));
    await prisma.$disconnect();
    process.exit(0);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(JSON.stringify({ ok: false, error: msg }));
    await prisma.$disconnect().catch(() => {});
    process.exit(1);
  }
}

main();
