export interface Holding {
  id: string;
  ticker: string;
  name: string;
  shares: number;
  averageCost: number;
  purchaseDate: string;
  currentPrice: number;
  assetType: "stock" | "ETF" | "crypto" | "cash";
  accountType: "taxable" | "roth_ira" | "traditional_ira" | "taiwan_brokerage" | "crypto_exchange";
}

export interface PortfolioSummary {
  totalValue: number;
  totalCost: number;
  dayChange: number;
  dayChangePercent: number;
  unrealizedGainLoss: number;
  unrealizedGainLossPercent: number;
  estimatedAnnualDividend: number;
}
