/** jGrants 等の raw 相当オブジェクトから S5 向けの軽い正規化 */

const INDUSTRY_RULES: { test: (text: string) => boolean; code: string }[] = [
  { test: (t) => t.includes("製造"), code: "manufacturing" },
  { test: (t) => /\bIT\b/i.test(t) || t.includes("システム"), code: "it" },
  { test: (t) => t.includes("建設"), code: "construction" },
];

function strField(raw: Record<string, unknown>, key: string): string {
  const v = raw[key];
  return typeof v === "string" ? v.trim() : "";
}

function pick(...values: unknown[]): string | null {
  for (const v of values) {
    if (typeof v === "string" && v.trim() !== "") return v.trim();
  }
  return null;
}

function extractIndustries(raw: Record<string, unknown>): string[] {
  const a = strField(raw, "targetIndustryNote");
  const b = strField(raw, "targetUseNote");
  const text = `${a} ${b}`.trim();
  if (!text) return [];

  const set = new Set<string>();
  for (const { test, code } of INDUSTRY_RULES) {
    if (test(text)) set.add(code);
  }
  return [...set];
}

function buildDescription(raw: Record<string, unknown>): string | null {
  return pick(raw.description, raw.targetUseNote, raw.targetIndustryNote);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- 同期元の形を固定しない
export function normalizeSubsidy(raw: any): {
  targetIndustries: string[];
  description: string | null;
} {
  const obj =
    raw !== null && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  return {
    targetIndustries: extractIndustries(obj),
    description: buildDescription(obj),
  };
}
