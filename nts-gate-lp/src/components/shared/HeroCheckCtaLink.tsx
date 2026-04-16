"use client";

import Link from "next/link";
import heroStyles from "@/components/gate-lp/hero-three/HeroSection.module.css";
import { trackCTAClick, type CTALocation } from "@/lib/analytics";

type Props = {
  location: CTALocation;
  href?: string;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Hero 内 CTA と同一見た目（HeroSection.module.css の .cta）
 */
export default function HeroCheckCtaLink({
  location,
  href = "/check",
  children,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={`${heroStyles.cta} ${className ?? ""}`.trim()}
      onClick={() => trackCTAClick(location)}
    >
      {children ?? (
        <>
          対象の補助金を確認する
          <span className={heroStyles.ctaArrow} aria-hidden="true">
            →
          </span>
        </>
      )}
    </Link>
  );
}
