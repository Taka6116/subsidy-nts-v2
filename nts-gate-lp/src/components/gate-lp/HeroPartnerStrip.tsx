"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { PARTNER_LOGOS, type PartnerLogo } from "@/data/partnerLogos";

function logoCells(logos: PartnerLogo[], keySuffix: string) {
  return logos.map((logo, i) => (
    <div
      key={`${logo.alt}-${i}-${keySuffix}`}
      className="flex h-8 w-auto flex-shrink-0 items-center sm:h-9"
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={160}
        height={40}
        className="h-full w-auto max-w-[128px] object-contain sm:max-w-[152px]"
        priority={i < 5}
      />
    </div>
  ));
}

export default function HeroPartnerStrip() {
  const shouldReduceMotion = useReducedMotion();

  const scrollTrack = (className: string, copyA: string, copyB: string) => (
    <div className={className}>
      {logoCells(PARTNER_LOGOS, copyA)}
      {logoCells(PARTNER_LOGOS, copyB)}
    </div>
  );

  const shellClass =
    "relative z-[6] flex w-full flex-none flex-col border-t border-[#0d1a2e]/12 bg-white py-3 shadow-[0_-6px_20px_rgba(13,26,46,0.08)] sm:py-4";

  if (shouldReduceMotion) {
    const mid = Math.ceil(PARTNER_LOGOS.length / 2);
    const topLogos = PARTNER_LOGOS.slice(0, mid);
    const bottomLogos = PARTNER_LOGOS.slice(mid);

    return (
      <div className={shellClass} aria-hidden="true">
        <div className="flex flex-col gap-3 px-4 sm:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 sm:gap-x-9">
            {logoCells(topLogos, "static-top")}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 sm:gap-x-9">
            {logoCells(bottomLogos, "static-bottom")}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={shellClass} aria-hidden="true">
      <div className="flex flex-col gap-2 sm:gap-3">
        <div className="hero-partner-logo-mask relative overflow-hidden">
          {scrollTrack(
            "hero-partner-logo-track flex items-center gap-10 sm:gap-12",
            "rtl-a",
            "rtl-b",
          )}
        </div>
        <div className="hero-partner-logo-mask relative overflow-hidden">
          {scrollTrack(
            "hero-partner-logo-track-reverse flex items-center gap-10 sm:gap-12",
            "ltr-a",
            "ltr-b",
          )}
        </div>
      </div>
    </div>
  );
}
