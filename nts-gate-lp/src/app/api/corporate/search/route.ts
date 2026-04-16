import { searchCorporateByNameFromNta } from "@/lib/ntaHoujinBangou/searchByName";
import type { CorporateCandidate } from "@/types/corporateSearch";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    console.log(
      "[corporate/search]",
      JSON.stringify({ name: "", count: 0, error: "invalid_json_body" }),
    );
    return Response.json([] satisfies CorporateCandidate[]);
  }

  const rawName =
    typeof body === "object" &&
    body !== null &&
    "name" in body &&
    typeof (body as { name: unknown }).name === "string"
      ? (body as { name: string }).name
      : "";

  if (!rawName.trim()) {
    console.log(
      "[corporate/search]",
      JSON.stringify({ name: rawName, count: 0, error: "missing_or_empty_name" }),
    );
    return Response.json([] satisfies CorporateCandidate[]);
  }

  let list: Awaited<ReturnType<typeof searchCorporateByNameFromNta>>;
  try {
    list = await searchCorporateByNameFromNta(rawName);
  } catch (e) {
    console.log(
      "[corporate/search]",
      JSON.stringify({
        name: rawName,
        count: 0,
        error: "search_threw",
        detail: e instanceof Error ? e.message : String(e),
      }),
    );
    return Response.json([] satisfies CorporateCandidate[]);
  }

  const normalized: CorporateCandidate[] = list.map((c) => ({
    corporateNumber: c.corporateNumber ?? "",
    name: c.name ?? "",
    prefecture: c.prefecture ?? "",
    city: c.city ?? "",
  }));

  return Response.json(normalized);
}
