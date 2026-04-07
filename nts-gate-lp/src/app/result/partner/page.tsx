import type { Metadata } from "next";
import PartnerResultClient from "@/components/result/PartnerResultClient";

export const metadata: Metadata = {
  title: "診断結果（パートナー・提案企業向け）| 日本提携支援",
  description:
    "取引先・顧客への補助金提案を検討されている企業様向けのご案内です。",
};

export default function PartnerResultPage() {
  return <PartnerResultClient />;
}
