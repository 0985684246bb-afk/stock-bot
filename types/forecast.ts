export type ForecastScenarioType = "bear" | "base" | "bull";

export interface ForecastScenario {
  type: ForecastScenarioType;
  priceLow: number;
  priceHigh: number;
  expectedReturn: number;
  assumptions: string[];
  risks: string[];
}

export interface MonteCarloResult {
  year: number;
  percentile10: number;
  percentile25: number;
  percentile50: number;
  percentile75: number;
  percentile90: number;
}

export interface PredictionSignal {
  ticker: string;
  trendSignal: string;
  rsiSignal: string;
  volumeSignal: string;
  valuationSignal: string;
  confidenceScore: number;
  summary: string;
}

export interface ETFProjectionInput {
  currentInvestment: number;
  monthlyContribution: number;
  expectedAnnualReturn: number;
  expenseRatio: number;
  dividendYield: number;
  dividendReinvestmentPercent: number;
  years: number;
}

export interface ETFProjectionResult {
  futureValue: number;
  totalContribution: number;
  totalGain: number;
  endingDividendIncome: number;
  expenseDragEstimate: number;
}
