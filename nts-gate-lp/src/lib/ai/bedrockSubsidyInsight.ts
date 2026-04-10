import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const LOG_PREFIX = "[bedrockSubsidyInsight]";

export const FALLBACK =
  "【表示確認用】AI出力の生成に失敗しました。";

export type InsightItem = {
  id: string;
  title: string;
  use_case: string;
  max_amount: string;
  benefit: string;
  urgency: string;
  next_action: string;
};

function buildUserPrompt(companyName: string, industry: string, subsidiesJson: string): string {
  return `あなたは補助金コンサルタントです。
単なる説明ではなく、ユーザーが「相談したい」と思う提案をしてください。

# 前提

ユーザーは補助金に詳しくありません。
専門用語は禁止。

# 入力情報

* 会社名: ${companyName}
* 業種: ${industry}
* 補助金一覧: ${subsidiesJson}

# 出力形式（厳守）

必ずJSON形式のみで出力してください。説明文は禁止。

{
"items": [
{
"id": "string",
"title": "一言で魅力が伝わるタイトル",
"use_case": "この会社での具体的な活用イメージ",
"max_amount": "最大◯◯万円（必ず数値）",
"benefit": "売上増加・コスト削減など具体的効果",
"urgency": "今やるべき理由（年度・期限を含める）",
"next_action": "無料相談はこちら等のCTA"
}
]
}

# IDルール（最重要）

* subsidies の id をそのまま使用すること
* 1文字も変更しない
* 配列件数を必ず一致させる
* 1件も欠けてはいけない

# 表現ルール

* 抽象表現禁止（例：「活用できます」）
* 必ず「この会社ならどう使うか」を書く
* max_amount は必ず具体数値（例：最大450万円）
* 「数百万円」など曖昧表現は禁止
* next_action は必ず行動を促す
`;
}

export function safeParseJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        /* fall through */
      }
    }
    return null;
  }
}

/** マークダウンの \`\`\`json ... \`\`\` を除去（複数フェンスがあれば繰り返し） */
function stripMarkdownCodeFences(text: string): string {
  let t = text.trim();
  for (let i = 0; i < 3; i++) {
    const m = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (!m) break;
    t = m[1].trim();
  }
  return t;
}

/** 先頭の { から対応する } までを抜き出す（文字列内の括弧は簡易対応） */
function extractBalancedJsonObject(text: string): string | null {
  const start = text.indexOf("{");
  if (start < 0) return null;
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (c === "\\" && inString) {
      escape = true;
      continue;
    }
    if (c === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

/**
 * アシスタント本文から JSON を取り出してパースする。
 */
function parseAssistantJson(assistantText: string): unknown {
  const rawLogLimit = 4000;
  console.log(
    `${LOG_PREFIX} assistantText(raw, truncated)`,
    assistantText.length > rawLogLimit
      ? `${assistantText.slice(0, rawLogLimit)}… (${assistantText.length} chars)`
      : assistantText,
  );

  let candidate = stripMarkdownCodeFences(assistantText);
  candidate = candidate.replace(/^\uFEFF/, "").trim();

  const tryParse = (s: string): unknown => {
    try {
      return JSON.parse(s);
    } catch {
      return null;
    }
  };

  let parsed: unknown = tryParse(candidate);
  if (parsed === null) {
    const balanced = extractBalancedJsonObject(candidate);
    if (balanced) {
      parsed = tryParse(balanced);
    }
  }
  if (parsed === null) {
    parsed = safeParseJson(candidate);
  }
  if (parsed === null && candidate !== assistantText) {
    parsed = safeParseJson(assistantText);
  }

  console.log(`${LOG_PREFIX} parsedAfterExtract`, JSON.stringify(parsed));

  return parsed;
}

function buildInsightsFromParsed(
  parsed: unknown,
  expectedIds: Set<string>,
): Record<string, InsightItem> {
  const map: Record<string, InsightItem> = {};
  if (!parsed || typeof parsed !== "object") return map;

  const items = (parsed as { items?: unknown }).items;
  if (!Array.isArray(items)) return map;

  for (const el of items) {
    if (!el || typeof el !== "object") continue;
    const row = el as Record<string, unknown>;
    const id = row.id;
    if (typeof id !== "string" || !expectedIds.has(id)) continue;

    map[id] = {
      id,
      title: typeof row.title === "string" ? row.title : "",
      use_case: typeof row.use_case === "string" ? row.use_case : "",
      max_amount: typeof row.max_amount === "string" ? row.max_amount : "",
      benefit: typeof row.benefit === "string" ? row.benefit : "",
      urgency: typeof row.urgency === "string" ? row.urgency : "",
      next_action: typeof row.next_action === "string" ? row.next_action : "",
    };
  }
  return map;
}

export function isInvalid(i: InsightItem | null | undefined): boolean {
  return (
    !i ||
    !i.title ||
    !i.use_case ||
    !i.max_amount ||
    !i.benefit ||
    !i.urgency ||
    !i.next_action
  );
}

export function ensureEverySubsidyId(
  ids: string[],
  map: Record<string, InsightItem>,
): Record<string, InsightItem> {
  const result: Record<string, InsightItem> = {};

  for (const id of ids) {
    if (!id) continue;
    const item = map[id];

    if (!item || isInvalid(item)) {
      result[id] = {
        id,
        title: FALLBACK,
        use_case: FALLBACK,
        max_amount: FALLBACK,
        benefit: FALLBACK,
        urgency: FALLBACK,
        next_action: FALLBACK,
      };
    } else {
      result[id] = item;
    }
  }

  console.log(`${LOG_PREFIX} finalInsights`, JSON.stringify(result));
  return result;
}

export type BedrockSubsidyInsightInput = {
  corporate: Record<string, unknown>;
  industryLabel: string;
  subsidies: Array<{
    id: string;
    name: string;
    description: string;
    targetIndustries: string[];
  }>;
};

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

function truncatePayload(input: BedrockSubsidyInsightInput): BedrockSubsidyInsightInput {
  const maxDesc = 800;
  return {
    ...input,
    subsidies: input.subsidies.slice(0, 10).map((s) => ({
      ...s,
      description:
        s.description.length > maxDesc ? `${s.description.slice(0, maxDesc)}…` : s.description,
    })),
  };
}

function corporateName(corporate: Record<string, unknown>): string {
  const n = corporate.name;
  return typeof n === "string" ? n : "";
}

/**
 * Bedrock 経由で補助金ごとの提案型インサイトを取得。
 * 入力 subsidies の各 id には必ず InsightItem が入る（フォールバック含む）。
 */
export async function getSubsidyInsightsFromBedrock(
  input: BedrockSubsidyInsightInput,
): Promise<Record<string, InsightItem>> {
  const modelId = process.env.BEDROCK_MODEL_ID?.trim();
  const region = process.env.AWS_REGION?.trim();

  const ids = input.subsidies.map((s) => s.id).filter(Boolean);
  const expectedIds = new Set(ids);

  if (ids.length === 0) {
    return {};
  }

  if (!modelId || !region) {
    console.log(`${LOG_PREFIX} skip: missing BEDROCK_MODEL_ID or AWS_REGION, using fallback only`);
    return ensureEverySubsidyId(ids, {});
  }

  try {
    const client = new BedrockRuntimeClient({ region });
    const payload = truncatePayload(input);
    const companyName = corporateName(payload.corporate);
    const userPrompt = buildUserPrompt(
      companyName,
      payload.industryLabel,
      JSON.stringify(payload.subsidies),
    );

    const body = JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 2048,
      temperature: 0.5,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
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
      console.log(`${LOG_PREFIX} empty assistant text, using fallback`);
      return ensureEverySubsidyId(ids, {});
    }

    const parsed = parseAssistantJson(assistantText);
    const fromModel = buildInsightsFromParsed(parsed, expectedIds);

    return ensureEverySubsidyId(ids, fromModel);
  } catch (e) {
    console.error(LOG_PREFIX, e);
    return ensureEverySubsidyId(ids, {});
  }
}
