export type DiagnosisMode = "end_user" | "partner";

export interface DiagnosisAnswers {
  mode: DiagnosisMode;
  challenge?: "labor_shortage" | "equipment" | "succession" | "dx" | "other";
  employeeCount?: "under20" | "21to100" | "101to300" | "over300";
  timeline?: "within3months" | "within6months" | "within1year" | "undecided";
  investmentAmount?: "under500" | "500to2000" | "2000to5000" | "over5000";
  industry?:
    | "manufacturing"
    | "retail"
    | "service"
    | "it"
    | "construction"
    | "other";
  productCategory?:
    | "iot_automation"
    | "it_software"
    | "construction_equipment"
    | "hr_system"
    | "other";
  mainCustomerSize?: "small" | "medium" | "large";
  currentlyProposing?: boolean;
}

export interface SubsidyInfo {
  id: string;
  /** 診断結果ヒーロー等で表示する大分類ラベル */
  majorCategory: string;
  name: string;
  maxAmount: string;
  description: string;
  partnerDescription: string;
  targetChallenges: string[];
  targetProducts: string[];
  badgeLabel: string;
  badgeType: "best" | "good" | "check";
  icon: string;
}

export interface MatchedSubsidy {
  subsidy: SubsidyInfo;
  matchScore: number;
  matchReasons: string[];
}

export interface DiagnosisResult {
  mode: DiagnosisMode;
  matchedSubsidies: MatchedSubsidy[];
  summaryItems: { label: string; value: string }[];
  nextSteps: { title: string; description: string }[];
  feeEstimate?: string;
  /**
   * エンドユーザーFV見出し用。`御社の{この文字列}前に進める`（例: 「IT・DX推進を」）
   */
  endUserHeroProgressPhrase?: string;
  /** 制度カード上部ラベル（例: 「IT・DX推進 に使える制度」） */
  subsidyCardContextLabel?: string;
}
