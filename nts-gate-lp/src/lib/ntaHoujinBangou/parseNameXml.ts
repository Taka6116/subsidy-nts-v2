import type { CorporateCandidate } from "@/types/corporateSearch";

const MAX = 10;

function tagContent(block: string, tag: string): string {
  const re = new RegExp(`<${tag}>([^<]*)</${tag}>`);
  const m = block.match(re);
  return (m?.[1] ?? "").trim();
}

/**
 * 法人番号システム Web-API（商号検索）の XML（type=12）から内部型へ変換。
 * 外部仕様はここに閉じ込め、呼び出し側には CorporateCandidate のみ返す。
 */
export function mapNtaNameSearchXmlToCandidates(xml: string): CorporateCandidate[] {
  const out: CorporateCandidate[] = [];
  const blockRe = /<corporation>([\s\S]*?)<\/corporation>/g;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(xml)) !== null && out.length < MAX) {
    const block = m[1];
    const corporateNumber = tagContent(block, "corporateNumber");
    const name = tagContent(block, "name");
    const prefecture = tagContent(block, "prefectureName");
    const city = tagContent(block, "cityName");
    // 法人番号だけ欠けるケースも候補として残す（API と同様に行単位で捨てない）
    if (!corporateNumber && !name) continue;
    out.push({
      corporateNumber: corporateNumber || "",
      name: name || "",
      prefecture: prefecture || "",
      city: city || "",
    });
  }
  return out;
}
