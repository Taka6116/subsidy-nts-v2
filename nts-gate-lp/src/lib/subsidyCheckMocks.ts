/** スプリント2: 法人検索・マッチング結果のモック（タイムアウト時フォールバック等で利用） */

import type { InsightItem } from "@/lib/ai/bedrockSubsidyInsight";
import type { CorporateCandidate } from "@/types/corporateSearch";

export type { CorporateCandidate };

export type MatchedSubsidyPreview = {
  id: string;
  name: string;
  maxAmountLabel: string;
  deadlineLabel: string;
  summary: string;
  /** /api/subsidy/match 等の description（表示は description ?? summary） */
  description?: string;
  aiInsight?: InsightItem;
  targetIndustries?: string[];
};

export function mockSearchCorporates(companyName: string): CorporateCandidate[] {
  const trimmed = companyName.trim();
  const suffix = trimmed || "サンプル";

  return [
    {
      corporateNumber: "1010001000000",
      name: `${suffix}株式会社（本店）`,
      prefecture: "東京都",
      city: "千代田区",
    },
    {
      corporateNumber: "2020002000000",
      name: `${suffix}ホールディングス`,
      prefecture: "大阪府",
      city: "大阪市北区",
    },
    {
      corporateNumber: "3030003000000",
      name: `株式会社${suffix}エンジニアリング`,
      prefecture: "愛知県",
      city: "名古屋市中区",
    },
  ];
}

export function mockMatchedSubsidies(_industryId: string): MatchedSubsidyPreview[] {
  void _industryId;
  return [
    {
      id: "mock-it",
      name: "IT導入補助金",
      maxAmountLabel: "最大450万円（例）",
      deadlineLabel: "公募ごとに異なります（要確認）",
      summary: "ITツール・SaaS導入など業務効率化・DX投資が対象になり得る制度です。",
    },
    {
      id: "mock-labor",
      name: "省力化投資補助金（例）",
      maxAmountLabel: "上限は公募要領で確認",
      deadlineLabel: "随時更新",
      summary: "ロボット・IoT等の省力化設備投資を支援する制度のイメージです。",
    },
    {
      id: "mock-succession",
      name: "事業承継・引継ぎ補助金（例）",
      maxAmountLabel: "上限は公募要領で確認",
      deadlineLabel: "随時更新",
      summary: "承継に伴う設備投資や専門家活用などが対象になり得る制度のイメージです。",
    },
  ];
}
