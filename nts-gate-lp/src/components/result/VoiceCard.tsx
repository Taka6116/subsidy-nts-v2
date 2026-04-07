interface Props {
  initial: string;
  company: string;
  name: string;
  quote: string;
  result: string;
  accentColor: string;
}

export default function VoiceCard({
  initial,
  company,
  name,
  quote,
  result,
  accentColor,
}: Props) {
  return (
    <div className="rounded border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[15px] font-bold text-white"
          style={{ backgroundColor: accentColor }}
        >
          {initial}
        </span>
        <div>
          <p className="text-[12px] text-neutral-500">{company}</p>
          <p className="text-[14px] font-bold text-neutral-900">{name}</p>
        </div>
      </div>
      <p className="text-[13px] leading-[1.65] text-neutral-700">
        「{quote}」
      </p>
      <p
        className="mt-2 text-[12px] font-bold"
        style={{ color: accentColor }}
      >
        {result}
      </p>
    </div>
  );
}
