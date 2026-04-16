interface Props {
  label: string;
  value: string;
  valueColor?: string;
}

export default function SummaryCard({ label, value, valueColor }: Props) {
  return (
    <div className="rounded border border-slate-100 bg-white p-4 shadow-sm">
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p
        className="text-[14px] font-bold"
        style={{ color: valueColor ?? "#1a2e4a" }}
      >
        {value}
      </p>
    </div>
  );
}
