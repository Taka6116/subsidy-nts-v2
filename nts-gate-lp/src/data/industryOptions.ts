/** UI 用の業種マスタ（将来 jGrants / 法人番号側コードとマッピング） */
export type IndustryOption = { id: string; label: string };

export const INDUSTRY_OPTIONS: IndustryOption[] = [
  { id: "construction", label: "建設業" },
  { id: "manufacturing", label: "製造業" },
  { id: "retail", label: "卸売・小売業" },
  { id: "it_services", label: "情報通信業" },
  { id: "professional", label: "学術研究・専門・技術サービス業" },
  { id: "accommodation", label: "宿泊・飲食サービス業" },
  { id: "transport", label: "運輸業・郵便業" },
  { id: "real_estate", label: "不動産業" },
  { id: "finance", label: "金融・保険業" },
  { id: "health", label: "医療・福祉" },
  { id: "education", label: "教育・学習支援業" },
  { id: "services_other", label: "サービス業（他に分類されないもの）" },
  { id: "agriculture", label: "農業・林業・漁業" },
  { id: "energy", label: "電気・ガス・水道・廃棄物処理" },
  { id: "other", label: "その他" },
];
