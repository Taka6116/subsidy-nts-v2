"use client";

import { FileText } from "lucide-react";
import type { MatchedSubsidy } from "@/types/diagnosis";
import TopSubsidyReportCard from "@/components/result/TopSubsidyReportCard";

type Props = {
  matches: MatchedSubsidy[];
  primary: string;
  primaryContainer: string;
  headingColor: string;
  accentMuted: string;
  matchLabel: string;
  detailHref: string;
  cardContextLabel?: string;
};

export default function SubsidyBentoGrid({
  matches,
  primary,
  primaryContainer,
  headingColor,
  accentMuted,
  matchLabel,
  detailHref,
  cardContextLabel,
}: Props) {
  const m0 = matches[0];
  const m1 = matches[1];
  const m2 = matches[2];
  const largeSpan = m1 ? "md:col-span-2" : "md:col-span-3";

  if (matches.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {m0 && (
        <TopSubsidyReportCard
          match={m0}
          primary={primary}
          headingColor={headingColor}
          accentMuted={accentMuted}
          matchLabel={matchLabel}
          detailHref={detailHref}
          contextLabel={cardContextLabel}
          className={largeSpan}
        />
      )}

      {m1 && (
        <div
          className="rounded p-8 text-white md:p-10"
          style={{ backgroundColor: primaryContainer }}
        >
          <div className="mb-2 flex items-end justify-between gap-2">
            <h3 className="font-heading text-xl font-bold leading-snug">
              {m1.subsidy.name}
            </h3>
            <span className="shrink-0 font-heading text-2xl font-bold tabular-nums">
              {m1.matchScore}%
            </span>
          </div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest opacity-70">
            {matchLabel}
          </p>
          <p className="mb-10 text-sm leading-relaxed opacity-90">
            {m1.subsidy.description}
          </p>
          <div className="mb-8 font-heading text-2xl font-bold tabular-nums">{m1.subsidy.maxAmount}</div>
          <div className="rounded bg-white/10 p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              マッチ理由
            </p>
            <p className="mt-1 text-sm font-bold leading-snug">
              {m1.matchReasons[0] ?? "ご回答に基づく候補です"}
            </p>
          </div>
        </div>
      )}

      {m2 && (
        <div className="rounded border border-slate-200/50 bg-[#e7e8e9] p-8 md:p-10">
          <h3
            className="mb-4 font-heading text-xl font-bold"
            style={{ color: headingColor }}
          >
            {m2.subsidy.name}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-slate-600">
            {m2.subsidy.description}
          </p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {matchLabel}
              </p>
              <p className="font-heading text-2xl font-bold tabular-nums" style={{ color: primary }}>
                {m2.matchScore}%
              </p>
            </div>
            <FileText className="h-8 w-8 shrink-0 text-slate-400" aria-hidden />
          </div>
          <p
            className="mt-6 font-heading text-lg font-bold tabular-nums"
            style={{ color: primary }}
          >
            {m2.subsidy.maxAmount}
          </p>
        </div>
      )}
    </div>
  );
}
