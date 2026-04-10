import type { Metadata } from "next";
import EndUserResultClient from "@/components/result/EndUserResultClient";

export const metadata: Metadata = {
  title: "照合結果（ご利用者向け）| 日本提携支援",
  description:
    "照会結果に基づくご案内です。申請可否は各制度の公募要領によります。",
};

export default function EndUserResultPage() {
  return <EndUserResultClient />;
}
