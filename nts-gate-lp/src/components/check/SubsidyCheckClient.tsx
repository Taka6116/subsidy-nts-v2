"use client";

import { useCallback, useState } from "react";
import { INDUSTRY_OPTIONS } from "@/data/industryOptions";
import type { InsightItem } from "@/lib/ai/bedrockSubsidyInsight";
import type { MatchedSubsidyPreview } from "@/lib/subsidyCheckMocks";
import type { CorporateCandidate } from "@/types/corporateSearch";
import SubsidyResultCard from "@/components/check/SubsidyResultCard";
import SubsidyResultHero from "@/components/check/SubsidyResultHero";

function parseInsightEntry(key: string, v: unknown): InsightItem | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const id = typeof o.id === "string" ? o.id : "";
  if (id !== key) return null;
  const title = typeof o.title === "string" ? o.title : "";
  const use_case = typeof o.use_case === "string" ? o.use_case : "";
  const max_amount = typeof o.max_amount === "string" ? o.max_amount : "";
  const benefit = typeof o.benefit === "string" ? o.benefit : "";
  const urgency = typeof o.urgency === "string" ? o.urgency : "";
  const next_action = typeof o.next_action === "string" ? o.next_action : "";
  if (!title || !use_case || !max_amount || !benefit || !urgency || !next_action) {
    return null;
  }
  return { id, title, use_case, max_amount, benefit, urgency, next_action };
}

function parseMatchSubsidyRows(data: unknown): Array<{
  id: string;
  name: string;
  description: string;
  targetIndustries: string[];
}> {
  if (!Array.isArray(data)) return [];

  return data
    .map((r) => {
      if (!r || typeof r !== "object") return null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- API 行の形は不定
      const row = r as any;

      const rawTid = Array.isArray(row.targetIndustries) ? row.targetIndustries : [];
      const targetIndustries = rawTid.filter((x: unknown): x is string => typeof x === "string");

      return {
        id: String(row.id ?? ""),
        name: typeof row.name === "string" ? row.name : "名称未設定",
        description: typeof row.description === "string" ? row.description : "",
        targetIndustries,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item != null);
}

type Step = "form" | "loading" | "results";

type Props = {
  audience: "end_user" | "partner";
};

function syntheticCorporate(name: string): CorporateCandidate {
  const n = name.trim();
  return {
    corporateNumber: "",
    name: n,
    prefecture: "",
    city: "",
  };
}

export default function SubsidyCheckClient({ audience }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [companyName, setCompanyName] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<CorporateCandidate | null>(null);
  const [results, setResults] = useState<MatchedSubsidyPreview[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const isPartner = audience === "partner";

  const reset = useCallback(() => {
    setStep("form");
    setCompanyName("");
    setIndustryId("");
    setFormError(null);
    setConfirmed(null);
    setResults([]);
    setSearchLoading(false);
  }, []);

  const runMatchAndInsights = useCallback(
    async (corp: CorporateCandidate) => {
      try {
        const matchRes = await fetch("/api/subsidy/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ industry: industryId }),
        });
        let matchJson: unknown;
        try {
          matchJson = await matchRes.json();
        } catch {
          matchJson = [];
        }
        const rows = parseMatchSubsidyRows(Array.isArray(matchJson) ? matchJson : []);

        const industryLabel =
          INDUSTRY_OPTIONS.find((o) => o.id === industryId)?.label ?? industryId;

        const mapped: MatchedSubsidyPreview[] = rows.map((row) => ({
          id: row.id,
          name: row.name || "名称未設定",
          maxAmountLabel: "—",
          deadlineLabel: "—",
          summary: row.description,
          description: row.description || undefined,
          targetIndustries: row.targetIndustries,
        }));

        let insights: Record<string, InsightItem> = {};
        try {
          const aiRes = await fetch("/api/subsidy/ai-insight", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              corporate: {
                name: corp.name,
                prefecture: corp.prefecture,
                city: corp.city,
                corporateNumber: corp.corporateNumber,
              },
              industryLabel,
              subsidies: mapped.map((m) => ({
                id: m.id,
                name: m.name,
                description: m.description ?? m.summary ?? "",
                targetIndustries: m.targetIndustries ?? [],
              })),
            }),
          });
          const aiJson: unknown = await aiRes.json().catch(() => ({}));
          if (
            aiJson !== null &&
            typeof aiJson === "object" &&
            "insights" in aiJson &&
            (aiJson as { insights: unknown }).insights !== null &&
            typeof (aiJson as { insights: unknown }).insights === "object" &&
            !Array.isArray((aiJson as { insights: unknown }).insights)
          ) {
            const rawIn = (aiJson as { insights: Record<string, unknown> }).insights;
            const next: Record<string, InsightItem> = {};
            for (const [k, val] of Object.entries(rawIn)) {
              const item = parseInsightEntry(k, val);
              if (item) next[k] = item;
            }
            insights = next;
          }
        } catch {
          /* insight 省略で続行 */
        }

        const withInsights: MatchedSubsidyPreview[] = mapped.map((m) => ({
          ...m,
          aiInsight: insights[m.id],
        }));

        setResults(withInsights);
      } catch {
        setResults([]);
      } finally {
        setStep("results");
      }
    },
    [industryId],
  );

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!companyName.trim()) {
      setFormError(isPartner ? "顧客企業の会社名を入力してください。" : "会社名を入力してください。");
      return;
    }
    if (!industryId) {
      setFormError("業種を選択してください。");
      return;
    }

    const corp = syntheticCorporate(companyName);
    setConfirmed(corp);
    setSearchLoading(true);
    setStep("loading");

    try {
      await runMatchAndInsights(corp);
    } finally {
      setSearchLoading(false);
    }
  };

  const locationLine =
    confirmed && (confirmed.prefecture || confirmed.city)
      ? `（${confirmed.prefecture}${confirmed.city}）`
      : "";

  const formTitle = isPartner
    ? "顧客企業の対象補助金イメージ（デモ）"
    : "御社の対象補助金イメージ（デモ）";

  const formLead =
    "個人の氏名・連絡先は不要です。ご入力の会社名と業種をもとに、対象になり得る制度のイメージを表示します（法人の正式な特定は行いません）。表示は参考例です。制度DB・AIの設定に応じて内容が変わります。";

  return (
    <div className="mx-auto w-full max-w-5xl">
      {step === "form" && (
        <>
          <section className="mb-10" aria-labelledby="check-intro-heading">
            <span className="mb-4 inline-block rounded-md bg-portal-tertiary-container px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-portal-on-tertiary-container">
              デモ・参考表示
            </span>
            <p className="text-xs font-bold uppercase tracking-widest text-portal-primary-container">
              {isPartner ? "Partner check" : "Subsidy check"}
            </p>
            <h1
              id="check-intro-heading"
              className="mt-3 font-heading text-h1 font-bold leading-tight text-portal-primary"
            >
              {formTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-body leading-loose text-portal-on-surface-variant">
              {formLead}
            </p>
          </section>
          <div className="rounded-xl border border-portal-outline/30 bg-portal-surface-lowest p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-h2 font-bold text-portal-primary">
              {isPartner ? "顧客企業の情報を入力" : "会社情報を入力"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-portal-on-surface-variant">
              {isPartner
                ? "顧客企業の会社名と業種を入力してください。法人の正式な特定は行わず、ご入力の社名と業種をもとに対象制度のイメージを表示します。"
                : "会社名と業種を入力してください。法人の正式な特定は行わず、ご入力の社名と業種をもとに対象制度のイメージを表示します。"}
            </p>
            <form onSubmit={submitForm} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="check-company"
                  className="block text-sm font-bold text-portal-on-surface"
                >
                  {isPartner ? "顧客企業の会社名" : "会社名"}
                  <span className="ml-1 text-portal-error">*</span>
                </label>
                <input
                  id="check-company"
                  type="text"
                  autoComplete="organization"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={isPartner ? "例：株式会社○○" : "例：株式会社○○"}
                  className="mt-2 w-full rounded-lg border border-portal-outline bg-portal-surface-lowest px-4 py-3 text-body text-portal-on-surface outline-none transition-colors focus:border-portal-primary-container focus:ring-2 focus:ring-portal-primary-container/20"
                />
              </div>
              <div>
                <label
                  htmlFor="check-industry"
                  className="block text-sm font-bold text-portal-on-surface"
                >
                  業種
                  <span className="ml-1 text-portal-error">*</span>
                </label>
                <select
                  id="check-industry"
                  value={industryId}
                  onChange={(e) => setIndustryId(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-portal-outline bg-portal-surface-lowest px-4 py-3 text-body text-portal-on-surface outline-none transition-colors focus:border-portal-primary-container focus:ring-2 focus:ring-portal-primary-container/20"
                >
                  <option value="">選択してください</option>
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              {formError ? (
                <p className="text-sm font-medium text-portal-error">{formError}</p>
              ) : null}
              <button
                type="submit"
                disabled={searchLoading}
                className="w-full rounded-full bg-portal-tertiary-fixed-dim px-6 py-4 text-base font-bold text-portal-primary shadow-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal-primary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {searchLoading ? "照合中…" : "補助金を照合する"}
              </button>
            </form>
          </div>
        </>
      )}

      {step === "loading" && (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-portal-outline/30 bg-portal-surface-lowest p-10 shadow-sm">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-portal-surface-container border-t-portal-primary-container"
            aria-hidden
          />
          <p className="mt-6 text-center font-medium text-portal-on-surface">対象制度を照合しています…</p>
          <p className="mt-2 text-center text-sm text-portal-on-surface-variant">
            制度データを取得しています…
          </p>
          <p className="mt-1 text-center text-xs text-portal-secondary">
            AI が提案文を生成しています…
          </p>
        </div>
      )}

      {step === "results" && confirmed && (
        <div className="space-y-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-portal-primary-container">
              照合結果（デモ）
            </p>
            <p className="mt-2 text-sm text-portal-on-surface-variant">
              <span className="font-semibold text-portal-on-surface">{confirmed.name}</span>
              {locationLine}
              <span className="mx-1">・</span>
              {INDUSTRY_OPTIONS.find((o) => o.id === industryId)?.label ?? industryId}
            </p>
          </div>

          {results.length === 0 ? (
            <>
              <h1 className="font-heading text-h1 font-bold text-portal-primary">
                照合結果（デモ）
              </h1>
              <p className="mt-4 text-sm text-portal-on-surface-variant">
                該当する制度が見つかりませんでした。
              </p>
            </>
          ) : (
            <>
              <SubsidyResultHero item={results[0]} />
              {results.length > 1 ? (
                <section aria-labelledby="check-related-heading">
                  <h2
                    id="check-related-heading"
                    className="mb-6 font-heading text-2xl font-bold text-portal-primary-container"
                  >
                    ほかの候補
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {results.slice(1).map((r) => (
                      <SubsidyResultCard key={r.id} item={r} />
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          )}

          <p className="text-xs leading-relaxed text-portal-on-surface-variant">
            本画面は開発用のイメージです。採択可否・金額は公募要領および最新の情報で必ずご確認ください。
          </p>
          <button
            type="button"
            onClick={reset}
            className="w-full rounded-full border-2 border-portal-primary-container/40 bg-portal-surface-lowest px-6 py-3 text-sm font-bold text-portal-primary transition-colors hover:bg-portal-surface-low sm:w-auto"
          >
            条件を変えてやり直す
          </button>
        </div>
      )}
    </div>
  );
}
