"use client";

import type { MatchedSubsidy } from "@/types/diagnosis";

interface Props {
  matched: MatchedSubsidy;
  accentColor: string;
  accentBgColor: string;
  matchLabel: string;
  isTopMatch: boolean;
}

const BADGE_STYLES: Record<string, string> = {
  best: "bg-[var(--badge-bg)] text-white",
  good: "bg-[var(--badge-bg-good)] text-white",
  check: "bg-[var(--badge-bg-check)] text-[var(--accent)]",
};

export default function SubsidyMatchCard({
  matched,
  accentColor,
  accentBgColor,
  matchLabel,
  isTopMatch,
}: Props) {
  const { subsidy, matchScore, matchReasons } = matched;
  const badge = subsidy.badgeType;

  return (
    <div
      className="mb-3 flex items-start gap-4 rounded-xl border border-[#e0e0e0]/60 bg-white p-4"
      style={
        isTopMatch
          ? { borderLeftWidth: 4, borderLeftColor: accentColor }
          : undefined
      }
    >
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold ${BADGE_STYLES[badge] ?? BADGE_STYLES.check}`}
            style={
              {
                "--badge-bg": accentColor,
                "--badge-bg-good": `${accentColor}cc`,
                "--badge-bg-check": accentBgColor,
                "--accent": accentColor,
              } as React.CSSProperties
            }
          >
            {subsidy.badgeLabel}
          </span>
          <span className="text-[13px] font-semibold text-neutral-400">
            {subsidy.maxAmount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-hidden="true">
            {subsidy.icon}
          </span>
          <span className="text-[15px] font-bold" style={{ color: accentColor }}>
            {subsidy.name}
          </span>
        </div>
        <p className="text-[12px] leading-relaxed text-neutral-500">
          {subsidy.description}
        </p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {matchReasons.slice(0, 2).map((r) => (
            <span
              key={r}
              className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ backgroundColor: accentBgColor, color: accentColor }}
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end text-right">
        <span className="text-[20px] font-bold" style={{ color: accentColor }}>
          {matchScore}
          <span className="text-[13px]">%</span>
        </span>
        <span className="text-[10px] text-neutral-400">{matchLabel}</span>
      </div>
    </div>
  );
}
