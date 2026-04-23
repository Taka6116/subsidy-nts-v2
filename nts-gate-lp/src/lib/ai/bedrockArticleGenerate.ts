/**
 * 補助金 1 件 → SEO 記事（Markdown 本文 + メタ情報）を Bedrock (Claude) で生成する。
 * 既存 bedrockSubsidyMatch.ts と同じ呼び出しパターン（BEDROCK_MODEL_ID + AWS_REGION）。
 * 失敗時は null を返す（呼び出し側でハンドリング）。
 */

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import {
  parseAssistantJson,
} from "@/lib/ai/bedrockJsonExtract";

const LOG_PREFIX = "[bedrockArticleGenerate]";

export type SubsidyForArticle = {
  id: string;
  name: string;
  description: string | null;
  maxAmountLabel: string | null;
  deadlineLabel: string | null;
  subsidyRate: string | null;
  targetIndustries: string[];
  targetIndustryNote: string | null;
};

export type GeneratedArticleDraft = {
  slug: string;
  title: string;
  excerpt: string;
  body: string; // Markdown
  metaDescription: string;
  tags: string[];
  categoryLabel: string;
};

const SYSTEM_PROMPT = `あなたは日本の中小企業向け補助金制度に特化した SEO 記事エディターです。

# 目的
与えられた補助金 1 件の実データから、中小企業経営者が読むことを想定した SEO 記事を日本語 Markdown で生成する。

---

# 入力
- name: 制度名（必須）
- description: 制度概要（任意。null や空文字は不明として扱う）
- maxAmountLabel: 補助上限額の表示用文字列（任意）
- deadlineLabel: 公募期限の表示用文字列（任意。「要確認」「—」「null」は期限不明として扱う）
- subsidyRate: 補助率（任意）
- targetIndustries: 対象業種（配列。空配列は不明として扱う）
- targetIndustryNote: 業種補足（任意）

---

# タスク
以下の JSON を 1 つだけ返す。

{
  "slug": "英数字とハイフンのみ・30 文字以内の kebab-case（制度名の英訳 or ローマ字化をベースに簡潔に）",
  "title": "SEO タイトル（32〜40 文字。制度名を含む。煽り文句は使わない）",
  "excerpt": "記事カード用の要約（80〜120 文字。平文・句読点あり）",
  "metaDescription": "メタディスクリプション（100〜140 文字。検索結果で読まれる想定）",
  "tags": ["2〜4 件。例: 補助金基礎 / 申請準備 / 設備投資 / DX / IT導入 / 事業計画 / 事業承継 / 建設 / 運送 / 人材 / 採用 / 省エネ 等から選ぶ"],
  "categoryLabel": "お役立ち情報（固定）",
  "body": "Markdown 本文（後述の構造に従うこと）"
}

---

# body（Markdown）の構造（厳守）

以下の順で H2 を配置し、必要に応じて H3 を使う。各 H2 セクションは 200〜450 字程度。合計 1500〜2500 字を目安とする。

## 1. 制度の概要
制度の目的・背景・位置づけを簡潔にまとめる。description がある場合は事実ベースで要約し、無い場合は「公募要領を要確認」と明記して推測しない。

## 2. 対象となる事業者・用途
targetIndustries / targetIndustryNote から読み取れる対象像を、中小企業経営者が自社を当てはめやすいように整理する。

## 3. 補助額・補助率の目安
maxAmountLabel / subsidyRate を具体的に提示。不明な場合は「公募要領で要確認」と明記し、金額・率は捏造しない。

## 4. 申請スケジュールと準備
deadlineLabel を具体的に提示。「要確認」「—」「null」の場合は「現時点で公募情報が確定していない／通年・随時公募の可能性あり」と書き、日付を断定しない。

## 5. 採択を上げるためのポイント
審査視点（事業計画の具体性・数値根拠・投資対効果）について一般論で書く。制度固有の審査項目の創作は禁止。

## 6. NTS に相談するメリット
以下のトーンで 150〜220 字。煽り・断定・保証表現は禁止。
- 申請代行ではなく「補助金活用戦略の設計」と「採択後 1 年間の伴走」が NTS の役割
- 着手金 15 万円 + 段階的成功報酬（採択時 / 実績報告時 / 1 年後効果検証時 各 5%）の構造
- 「採択を保証」「100% 採択」「代理申請」は**絶対に書かない**

最後の行に次の導線を必ず入れる（そのまま Markdown として出力）:
\`[NTS に無料相談する](/#contact)\`

---

# 禁止事項
- 制度の創作（API に無い情報の補完）
- 具体的な申請代行・採択保証の表現
- 競合比較や誹謗中傷
- 「今すぐ」「お早めに」「必ず」等の煽り表現
- JSON 以外の文字列を出力すること（前置き・後書き・コードフェンス禁止）
- slug に日本語・記号・大文字・アンダースコアを含めること

---

# 出力
JSON オブジェクトを 1 つだけ返す。他の文字列・コードフェンスは一切含めない。`;

function assistantTextFromBedrockBody(raw: string): string {
  try {
    const outer = JSON.parse(raw) as { content?: unknown };
    const content = outer.content;
    if (!Array.isArray(content) || content.length === 0) return "";
    const texts: string[] = [];
    for (const block of content) {
      const b = block as { type?: string; text?: string };
      if (typeof b.text === "string" && b.text) {
        texts.push(b.text);
      }
    }
    return texts.join("\n");
  } catch {
    return "";
  }
}

function sanitizeSlug(raw: unknown, fallbackSeed: string): string {
  const base =
    (typeof raw === "string" ? raw : "")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48);
  if (base.length >= 3) return base;
  return `article-${fallbackSeed.replace(/[^a-z0-9]/gi, "").slice(0, 10).toLowerCase() || "new"}`;
}

function toStringArray(v: unknown, maxLen: number): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x): x is string => typeof x === "string")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, maxLen);
}

function pickString(v: unknown, maxLen: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, maxLen);
}

function parseDraft(parsed: unknown, subsidyId: string): GeneratedArticleDraft | null {
  if (!parsed || typeof parsed !== "object") return null;
  const o = parsed as Record<string, unknown>;

  const title = pickString(o.title, 80);
  const body = typeof o.body === "string" ? o.body.trim() : "";

  if (!title || body.length < 300) return null;

  return {
    slug: sanitizeSlug(o.slug, subsidyId),
    title,
    excerpt: pickString(o.excerpt, 240),
    body,
    metaDescription: pickString(o.metaDescription, 200),
    tags: toStringArray(o.tags, 4),
    categoryLabel: pickString(o.categoryLabel, 32) || "お役立ち情報",
  };
}

export async function generateSubsidyArticleDraft(
  subsidy: SubsidyForArticle,
): Promise<GeneratedArticleDraft | null> {
  const modelId = process.env.BEDROCK_MODEL_ID?.trim();
  const region = process.env.AWS_REGION?.trim();

  if (!modelId || !region) {
    console.log(`${LOG_PREFIX} skip: missing BEDROCK_MODEL_ID or AWS_REGION`);
    return null;
  }

  try {
    const client = new BedrockRuntimeClient({ region });
    const userPayload = JSON.stringify({ subsidy });

    const body = JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 6000,
      temperature: 0.4,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPayload }],
    });

    const res = await client.send(
      new InvokeModelCommand({
        modelId,
        contentType: "application/json",
        accept: "application/json",
        body: new TextEncoder().encode(body),
      }),
    );

    const raw = res.body ? new TextDecoder().decode(res.body) : "";
    const assistantText = assistantTextFromBedrockBody(raw);

    if (!assistantText.trim()) {
      console.log(`${LOG_PREFIX} empty assistant text`);
      return null;
    }

    const parsed = parseAssistantJson(assistantText, LOG_PREFIX);
    const draft = parseDraft(parsed, subsidy.id);
    if (!draft) {
      console.log(`${LOG_PREFIX} invalid draft shape`);
      return null;
    }
    console.log(
      `${LOG_PREFIX} success subsidyId=${subsidy.id} title="${draft.title}" bodyChars=${draft.body.length}`,
    );
    return draft;
  } catch (e) {
    console.error(LOG_PREFIX, e);
    return null;
  }
}
