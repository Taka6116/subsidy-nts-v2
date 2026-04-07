interface Props {
  stepNumber: number;
  title: string;
  description: string;
  accentColor: string;
}

export default function StepItem({
  stepNumber,
  title,
  description,
  accentColor,
}: Props) {
  return (
    <div className="flex gap-3">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
        style={{ backgroundColor: accentColor }}
      >
        {stepNumber}
      </span>
      <div>
        <p className="text-[14px] font-bold text-neutral-900">{title}</p>
        <p className="mt-0.5 text-[12px] leading-relaxed text-neutral-500">
          {description}
        </p>
      </div>
    </div>
  );
}
