import type { MatchedSubsidyPreview } from "@/lib/subsidyCheckMocks";

/** 概要タブのビル背景などで使う（差し替えしやすいよう定数化） */
export const RESULT_DASHBOARD_HERO_IMAGE = "/images/team-portrait.webp";

export type EligibilityPair = { label: string; text: string };

/**
 * 制度名から「（21次締切）」「（第20次公募）」などの公募回数表記を除去する。
 * - 一般ユーザーには意味不明なノイズになるため、LP側では落として表示する。
 * - DBの原本は変更しない（表示時にのみクレンジング）。
 */
export function cleanSubsidyName(name: string): string {
  if (!name) return "";
  return name
    .replace(/\s*[（(]\s*(?:第)?\s*\d+\s*次\s*(?:締切|公募|募集)?\s*[)）]\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 制度 description から、ユーザーが NTS を介さず事務局へ直接連絡してしまう
 * リスクのある「問合せ先」「参照URL」「電話番号」「メールアドレス」等の
 * 外部コンタクト情報ブロックを丸ごと除去する。
 *
 * - jGrants 原文には末尾に「■問合せ先 …」「■参照URL …」が含まれることが多い
 * - 「■」記号を見出しに使う形式 / プレーン行で続く形式の両方に対応
 * - 電話・メール・裸 URL も個別に除去（事務局連絡手段の露出を防ぐ）
 */
export function cleanSubsidyDescription(text: string | null | undefined): string {
  if (!text) return "";
  let out = String(text);

  // 見出し記号つきの連絡先ブロックは、次の「■」見出しまで / 末尾まで丸ごと落とす
  const sectionHeaders = [
    "問合せ先",
    "問い合わせ先",
    "お問合せ先",
    "お問い合わせ先",
    "お問合せ",
    "お問い合わせ",
    "参照URL",
    "参照ＵＲＬ",
    "参考URL",
    "参考ＵＲＬ",
    "関連URL",
    "関連ＵＲＬ",
    "公式サイト",
    "問合せ窓口",
    "連絡先",
  ];
  for (const h of sectionHeaders) {
    const re = new RegExp(
      `[■◆●▼\\[【]\\s*${h}[^\\n]*[\\s\\S]*?(?=(?:[■◆●▼\\[【]\\s*\\S)|$)`,
      "g",
    );
    out = out.replace(re, "");
  }

  // 行単位で残留しがちな連絡先要素を削除
  const linePatterns: RegExp[] = [
    /^.*(?:電話番号|TEL|Tel|ＴＥＬ)\s*[:：].*$/gm,
    /^.*(?:メール\s*アドレス|メールアドレス|E-?mail|ＥーＭＡＩＬ|e-?mail)\s*[:：].*$/gm,
    /^.*受付時間\s*[:：].*$/gm,
    /^.*FAX\s*[:：].*$/gmi,
    // 独立行として置かれた裸 URL
    /^\s*https?:\/\/\S+\s*$/gm,
    // メールアドレス単体（@ を含む）
    /^\s*\S+@\S+\.[\w.-]+\s*$/gm,
  ];
  for (const re of linePatterns) {
    out = out.replace(re, "");
  }

  // 文中に紛れるメールアドレスも伏せる
  out = out.replace(/\b[\w.+-]+@[\w.-]+\.[\w.-]+\b/g, "");
  // 文中 URL も落とす（公募要領配布先などへの直接誘導を避ける）
  out = out.replace(/https?:\/\/\S+/g, "");

  return out.replace(/\n{3,}/g, "\n\n").trim();
}

/**
 * 公募期限のラベルが表示に値する実データかどうかを判定する。
 * 「—」「要確認」「未定」「TBD」「不明」「null」は無効扱い。
 */
export function isMeaningfulDeadline(label?: string | null): boolean {
  if (!label) return false;
  const normalized = label.trim().toLowerCase();
  if (!normalized) return false;
  const invalidTokens = new Set([
    "—",
    "-",
    "ー",
    "要確認",
    "未定",
    "不明",
    "tbd",
    "null",
    "undefined",
    "n/a",
    "na",
  ]);
  return !invalidTokens.has(normalized);
}

/**
 * 照合結果の「対象業種・補助率・地域」などを最大2枚に要約（Hero / 確認事項タブで共有）
 */
export function eligibilityPair(item: MatchedSubsidyPreview): EligibilityPair[] {
  const industries =
    item.targetIndustries && item.targetIndustries.length > 0
      ? item.targetIndustries.slice(0, 4).join("、")
      : "";
  const regionLine = item.targetArea
    ? item.targetArea.split(" / ")[0] + (item.targetArea.includes(" / ") ? " ほか" : "")
    : "";
  const rate = item.subsidyRate?.trim() ?? "";

  const cards: EligibilityPair[] = [];
  if (industries) {
    cards.push({ label: "対象業種（参考）", text: industries });
  }
  const secondParts: string[] = [];
  if (rate) secondParts.push(`補助率: ${rate}`);
  if (regionLine) secondParts.push(`対象地域: ${regionLine}`);
  if (secondParts.length > 0) {
    cards.push({ label: "条件・地域", text: secondParts.join(" / ") });
  } else if (isMeaningfulDeadline(item.deadlineLabel)) {
    cards.push({ label: "申請期限", text: item.deadlineLabel as string });
  }

  const fallback =
    "詳細は公募要領および jGrants の掲載内容でご確認ください。";
  if (cards.length === 0) {
    cards.push(
      {
        label: "対象業種（参考）",
        text: "一覧に業種の明示がない場合があります。公募要領でご確認ください。",
      },
      { label: "補足", text: fallback },
    );
  } else if (cards.length === 1) {
    cards.push({ label: "補足", text: fallback });
  }
  return cards.slice(0, 2);
}
