import { findSubsidiesByIndustry } from "@/lib/db/subsidyRepository";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json([]);
  }

  const industryRaw =
    typeof body === "object" && body !== null && "industry" in body
      ? (body as { industry: unknown }).industry
      : undefined;
  const industry = typeof industryRaw === "string" ? industryRaw : undefined;

  try {
    const rows = await findSubsidiesByIndustry(industry);
    const out = rows.map((r) => ({
      id: r.id,
      name: r.name ?? "名称未設定",
      description: r.description ?? "",
      targetIndustries: r.targetIndustries,
    }));
    return Response.json(out);
  } catch (e) {
    console.error("[subsidy/match]", e);
    return Response.json([]);
  }
}
