import Link from "next/link";

interface Props {
  primaryLabel: string;
  primaryHref: string;
  primaryColor: string;
  secondaryLabel: string;
  secondaryHref: string;
  containerBg?: string;
}

export default function DualCTA({
  primaryLabel,
  primaryHref,
  primaryColor,
  secondaryLabel,
  secondaryHref,
  containerBg,
}: Props) {
  return (
    <div className="px-5 pb-8" style={{ backgroundColor: containerBg }}>
      <Link
        href={primaryHref}
        className="flex w-full items-center justify-center rounded-lg py-4 text-[16px] font-bold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: primaryColor }}
      >
        {primaryLabel} →
      </Link>
      <Link
        href={secondaryHref}
        className="mt-3 flex w-full items-center justify-center rounded-lg border border-white/40 py-3 text-[14px] text-white transition-opacity hover:opacity-80"
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}
