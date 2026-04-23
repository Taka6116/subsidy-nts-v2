/**
 * 補助金記事の hero 画像を public/images 配下の固定プールから決定論的に割り当てる。
 * Bedrock で画像生成はせず、既存ストック画像を tags / 業種で分配する。
 */

const IMAGE_POOL = [
  "/images/PANA2232.jpg",
  "/images/PANA2394.jpg",
  "/images/PANA2664.jpg",
  "/images/PANA2822-2.jpg",
  "/images/PANA3061.jpg",
  "/images/PANA3202-2.jpg",
  "/images/PANA3362.jpg",
  "/images/PANA3446.jpg",
  "/images/PANA3907.jpg",
  "/images/PANA3955.jpg",
] as const;

/** タグ / 業種キーワードから優先画像を指定するマップ（先頭一致の優先順） */
const TAG_PREFERENCE: Array<{ keywords: string[]; image: string }> = [
  { keywords: ["人材", "採用", "雇用", "キャリア"], image: "/images/PANA2822-2.jpg" },
  { keywords: ["設備投資", "ものづくり", "製造"], image: "/images/PANA3061.jpg" },
  { keywords: ["DX", "IT導入", "デジタル", "システム"], image: "/images/PANA2664.jpg" },
  { keywords: ["事業承継", "M&A", "承継"], image: "/images/PANA2394.jpg" },
  { keywords: ["事業計画", "申請準備", "書類"], image: "/images/PANA3202-2.jpg" },
  { keywords: ["補助金基礎", "基礎", "入門"], image: "/images/PANA2232.jpg" },
  { keywords: ["省エネ", "環境", "エネルギー"], image: "/images/PANA3907.jpg" },
  { keywords: ["建設", "運送", "物流"], image: "/images/PANA3362.jpg" },
  { keywords: ["中小企業", "小規模"], image: "/images/PANA3446.jpg" },
];

/** FNV-1a 風の単純ハッシュ（外部依存なし・決定論的） */
function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = (hash * 16777619) >>> 0;
  }
  return hash;
}

export function pickHeroImage(params: {
  subsidyId: string;
  tags?: string[];
  targetIndustries?: string[];
}): string {
  const haystack = [...(params.tags ?? []), ...(params.targetIndustries ?? [])]
    .map((s) => s.trim())
    .filter(Boolean);

  for (const pref of TAG_PREFERENCE) {
    if (haystack.some((h) => pref.keywords.some((k) => h.includes(k)))) {
      return pref.image;
    }
  }

  const idx = hashString(params.subsidyId) % IMAGE_POOL.length;
  return IMAGE_POOL[idx];
}
