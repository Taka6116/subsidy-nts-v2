"use client";

import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";
import HeroThreeWebGLBackground from "./HeroThreeWebGLBackground";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section
      className={styles.hero}
      aria-label="補助金照会サービス ヒーローセクション"
    >
      <HeroThreeWebGLBackground interactive />

      <div className={styles.content}>
        <h1 className={`${styles.headline} font-heading font-normal`}>
          <span className={styles.headlineLine}>補助金は、取るだけがゴールじゃない。</span>
          <span className={styles.headlineLine}>採択後の1年間もあなたの経営に寄り添います。</span>
        </h1>

        <p className={`${styles.sub} font-body`}>
          <span className={styles.subLine}>経営者のための補助金活用戦略まで担当します。</span>
        </p>

        <div className={`${styles.ctaRow} font-body`}>
          <Link
            href="/consult"
            className={styles.cta}
            onClick={() => trackCTAClick("hero")}
          >
            まず話を聞かせてください（無料相談）
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>

      <div className={`${styles.scrollHint} font-body`} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </div>
    </section>
  );
}
