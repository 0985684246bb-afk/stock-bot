export type RiskLevel = "low" | "medium" | "high";
export type StrategyPreference = "long-term growth" | "dividend income" | "balanced" | "speculative";

export interface QualityCheckResult {
  qualityScore: number;
  rating: "Strong Long-Term Candidate" | "Watch Carefully" | "High Risk" | "Avoid Heavy Position";
  explanation: string;
  riskBadges: string[];
  warnings: string[];
}
