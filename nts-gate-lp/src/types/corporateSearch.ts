/**
 * 法人検索APIの公開レスポンス型（フロント・Route Handler 共通）。
 * 欠損は空文字（null は使わない）。法人番号のみ欠ける候補もあり得る。
 */
export type CorporateCandidate = {
  corporateNumber: string;
  name: string;
  prefecture: string;
  city: string;
};
