import { mockSearchCorporates } from "@/lib/subsidyCheckMocks";
import type { CorporateCandidate } from "@/types/corporateSearch";
import { mapNtaNameSearchXmlToCandidates } from "./parseNameXml";

const TIMEOUT_MS = 3000;
const NTA_NAME_URL = "https://api.houjin-bangou.nta.go.jp/4/name";

function logLine(payload: Record<string, unknown>) {
  console.log("[corporate/search]", JSON.stringify(payload));
}

function timeoutMockCandidates(name: string): CorporateCandidate[] {
  return mockSearchCorporates(name).slice(0, 10);
}

/**
 * 国税庁法人番号API（法人名・商号検索）を呼び出し、CorporateCandidate[] に正規化する。
 * - 環境変数未設定・HTTPエラー・パース失敗: 空配列
 * - タイムアウト: モック最大10件
 */
export async function searchCorporateByNameFromNta(name: string): Promise<CorporateCandidate[]> {
  const trimmed = name.trim();
  if (!trimmed) {
    logLine({ name: trimmed, count: 0, error: "empty_name" });
    return [];
  }

  const appId = process.env.NTA_CORPORATE_API_APP_ID?.trim();
  if (!appId) {
    logLine({
      name: trimmed,
      count: 0,
      error: "missing_NTA_CORPORATE_API_APP_ID",
    });
    return [];
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const url = new URL(NTA_NAME_URL);
    url.searchParams.set("id", appId);
    url.searchParams.set("name", trimmed);
    url.searchParams.set("type", "12");
    url.searchParams.set("mode", "2");
    url.searchParams.set("target", "1");
    url.searchParams.set("history", "0");
    url.searchParams.set("close", "0");

    const res = await fetch(url.toString(), {
      signal: controller.signal,
      headers: { Accept: "application/xml, text/xml, */*" },
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    const text = await res.text();

    if (!res.ok) {
      logLine({
        name: trimmed,
        count: 0,
        error: `http_${res.status}`,
        detail: text.slice(0, 200),
      });
      return [];
    }

    const mapped = mapNtaNameSearchXmlToCandidates(text);
    logLine({
      name: trimmed,
      count: mapped.length,
      error: null,
    });
    return mapped;
  } catch (e) {
    clearTimeout(timeoutId);
    if (e instanceof Error && e.name === "AbortError") {
      const mock = timeoutMockCandidates(trimmed);
      logLine({
        name: trimmed,
        count: mock.length,
        error: "timeout_fallback_mock",
      });
      return mock;
    }
    logLine({
      name: trimmed,
      count: 0,
      error: e instanceof Error ? e.message : String(e),
    });
    return [];
  }
}
