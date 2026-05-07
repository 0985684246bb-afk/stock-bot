export type AssetType = "stock" | "ETF" | "crypto" | "cash";

export interface HistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ETFHolding {
  ticker: string;
  name: string;
  weight: number;
  sector?: string;
}

export interface Stock {
  ticker: string;
  name: string;
  market: string;
  exchange: string;
  assetType: AssetType;
  currentPrice: number;
  previousClose: number;
  dayChange: number;
  dayChangePercent: number;
  marketCap?: number;
  peRatio?: number;
  forwardPE?: number;
  eps?: number;
  revenueGrowth?: number;
  profitMargin?: number;
  dividendYield?: number;
  payoutRatio?: number;
  expenseRatio?: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  volume: number;
  averageVolume: number;
  sector?: string;
  industry?: string;
  beta?: number;
  inceptionDate?: string;
  aum?: number;
  numberOfHoldings?: number;
  topTenHoldingsWeight?: number;
  trackingIndex?: string;
  oneYearReturn?: number;
  threeYearAnnualizedReturn?: number;
  fiveYearAnnualizedReturn?: number;
  volatility?: number;
  maxDrawdown?: number;
  sectorAllocation?: { name: string; value: number }[];
  topHoldings?: ETFHolding[];
  historicalPrices: HistoricalPrice[];
}
