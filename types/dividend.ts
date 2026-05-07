export interface DividendRecord {
  ticker: string;
  payDate: string;
  amountPerShare: number;
  shares: number;
}

export interface DripProjectionPoint {
  year: number;
  portfolioValue: number;
  totalContribution: number;
  dividendReceived: number;
  dividendReinvested: number;
  endingShares: number;
  annualDividend: number;
  monthlyDividend: number;
  strategy: string;
}
