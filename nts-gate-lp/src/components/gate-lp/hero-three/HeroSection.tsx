"use client";

import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section
      className={`section-hero ${styles.hero}`}
      aria-label="補助金照会サービス ヒーローセクション"
    >
      <div className={styles.content}>
        <h1 className={`${styles.headline} font-heading font-bold`}>
          <span className={styles.headlineLine}>補助金だけでなく、経営課題を超えて</span>
          <span className={styles.headlineLine}>前に進みたい方へ</span>
        </h1>

        <p className={`${styles.sub} font-body`}>
          <span className={styles.subLine}>補助金活用の戦略から採択後の伴走まで、</span>
          <span className={styles.subLine}>経営者のパートナーとして伴います。</span>
        </p>

        <div className={`${styles.ctaRow} font-body`}>
          <Link
            href="/consult"
            className={styles.ctaConsult}
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
