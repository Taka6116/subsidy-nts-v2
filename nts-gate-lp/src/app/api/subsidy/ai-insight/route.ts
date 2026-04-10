import {
  getSubsidyInsightsFromBedrock,
  type InsightItem,
} from "@/lib/ai/bedrockSubsidyInsight";
import { NextResponse } from "next/server";

type SubsidyIn = {
  id: string;
  name: string;
  description: string;
  targetIndustries: string[];
};

function parseBody(body: unknown): {
  corporate: Record<string, unknown>;
  industryLabel: string;
  subsidies: SubsidyIn[];
} | null {
  if (body === null || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const industryLabel = typeof o.industryLabel === "string" ? o.industryLabel : "";
  const corporate =
    o.corporate !== null && typeof o.corporate === "object"
      ? (o.corporate as Record<string, unknown>)
      : {};
  const rawList = o.subsidies;
  if (!Array.isArray(rawList)) return null;

  const subsidies: SubsidyIn[] = [];
  for (const item of rawList) {
    if (item === null || typeof item !== "object") continue;
    const s = item as Record<string, unknown>;
    const id = typeof s.id === "string" ? s.id : "";
    const name = typeof s.name === "string" ? s.name : "";
    const description = typeof s.description === "string" ? s.description : "";
    const targetIndustries = Array.isArray(s.targetIndustries)
      ? s.targetIndustries.filter((x): x is string => typeof x === "string")
      : [];
    if (id) {
      subsidies.push({ id, name, description, targetIndustries });
    }
  }

  return { corporate, industryLabel, subsidies };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ insights: {} as Record<string, InsightItem> });
  }

  const parsed = parseBody(body);
  if (!parsed) {
    return NextResponse.json({ insights: {} as Record<string, InsightItem> });
  }

  if (parsed.subsidies.length === 0) {
    return NextResponse.json({ insights: {} as Record<string, InsightItem> });
  }

  try {
    const insights = await getSubsidyInsightsFromBedrock(parsed);
    return NextResponse.json({
      insights: insights as Record<string, InsightItem>,
    });
  } catch (e) {
    console.error("[subsidy/ai-insight]", e);
    return NextResponse.json({ insights: {} as Record<string, InsightItem> });
  }
}
