"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackPartnerLinkClick } from "@/lib/analytics";
import { getPartnerUrl } from "@/lib/partnerUrl";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroStyle = isHome && !scrolled;
  const partnerHref = getPartnerUrl();
  /** トップ以外は常に視認性のあるヘッダー帯（ロゴ反転のため） */
  const barClass =
    heroStyle
      ? "border-transparent bg-transparent"
      : !isHome
        ? "border-b border-neutral-200 bg-neutral-50/95 backdrop-blur-[12px]"
        : scrolled
          ? "border-b border-neutral-200 bg-neutral-50/90 backdrop-blur-[12px]"
          : "border-transparent bg-transparent";

  return (
    <header
      className={`
        absolute left-0 right-0 top-4 z-[10]
    flex h-16 items-center justify-between
    px-6 transition-all duration-300
        ${barClass}
      `}
      data-hero-transparent={heroStyle ? "true" : undefined}
    >
      <Link
        href="/"
        className={`flex shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${heroStyle ? "drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]" : ""}`}
      >
        <img
          src="/nts-logo.svg"
          alt="日本提携支援"
          className={`h-7 w-auto sm:h-8 ${heroStyle ? "brightness-0 invert contrast-[1.05]" : ""}`}
          width={200}
          height={29}
        />
      </Link>

      <Link
        href={partnerHref}
        onClick={() => trackPartnerLinkClick("header")}
        className={`
          text-small transition-colors duration-200
          rounded-sm
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
          ${
            heroStyle
              ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] hover:text-white/95"
              : "text-neutral-600 hover:text-primary-700"
          }
        `}
      >
        パートナー企業の方へ
        <span className="ml-1" aria-hidden="true">
          →
        </span>
      </Link>
    </header>
  );
}
