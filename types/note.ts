export interface InvestmentNote {
  id: string;
  ticker: string;
  date: string;
  action: "buy" | "sell" | "hold" | "watch";
  reason: string;
  expectedHoldingPeriod: string;
  riskFactors: string;
  sellTrigger: string;
  confidenceLevel: "low" | "medium" | "high";
  relatedThesis: string;
}
