import { DripProjectionPoint } from "@/types/dividend";
import { Holding, PortfolioSummary } from "@/types/portfolio";
import { getMockStock } from "@/data/mockStocks";

export function calculatePortfolioValue(shares: number, currentPrice: number) {
  return shares * currentPrice;
}

export function calculateDividendIncome(shares: number, annualDividendPerShare: number) {
  return shares * annualDividendPerShare;
}

export function calculateTotalReturn(marketValue: number, totalCost: number, dividends = 0) {
  return totalCost === 0 ? 0 : (marketValue + dividends - totalCost) / totalCost;
}

export function summarizePortfolio(holdings: Holding[]): PortfolioSummary {
  const totalValue = holdings.reduce((sum, h) => sum + h.shares * h.currentPrice, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.shares * h.averageCost, 0);
  const dayChange = holdings.reduce((sum, h) => sum + getMockStock(h.ticker).dayChange * h.shares, 0);
  const estimatedAnnualDividend = holdings.reduce((sum, h) => sum + h.shares * h.currentPrice * (getMockStock(h.ticker).dividendYield ?? 0), 0);
  const unrealizedGainLoss = totalValue - totalCost;
  return { totalValue, totalCost, dayChange, dayChangePercent: totalValue ? dayChange / (totalValue - dayChange) : 0, unrealizedGainLoss, unrealizedGainLossPercent: totalCost ? unrealizedGainLoss / totalCost : 0, estimatedAnnualDividend };
}

export function calculateDripProjection(input: {
  ticker: string;
  currentShares: number;
  currentPrice: number;
  annualDividendPerShare: number;
  dividendGrowthRate: number;
  expectedAnnualPriceGrowth: number;
  monthlyContribution: number;
  dividendReinvestmentPercentage: number;
  projectionYears: number;
  strategy?: "cash" | "drip" | "contribution_drip";
}): DripProjectionPoint[] {
  let shares = input.currentShares;
  let price = input.currentPrice;
  let dividendPerShare = input.annualDividendPerShare;
  let totalContribution = shares * price;
  let cumulativeDividend = 0;
  let cumulativeReinvested = 0;
  const points: DripProjectionPoint[] = [];
  const monthlyContribution = input.strategy === "contribution_drip" ? input.monthlyContribution : 0;
  const reinvestPct = input.strategy === "cash" ? 0 : input.dividendReinvestmentPercentage;

  for (let year = 1; year <= input.projectionYears; year += 1) {
    for (let month = 1; month <= 12; month += 1) {
      price *= 1 + input.expectedAnnualPriceGrowth / 12;
      dividendPerShare *= 1 + input.dividendGrowthRate / 12;
      if (monthlyContribution > 0) {
        shares += monthlyContribution / price;
        totalContribution += monthlyContribution;
      }
      const monthlyDividend = (shares * dividendPerShare) / 12;
      cumulativeDividend += monthlyDividend;
      const reinvested = monthlyDividend * reinvestPct;
      shares += reinvested / price;
      cumulativeReinvested += reinvested;
    }
    const annualDividend = calculateDividendIncome(shares, dividendPerShare);
    points.push({ year, portfolioValue: shares * price, totalContribution, dividendReceived: cumulativeDividend, dividendReinvested: cumulativeReinvested, endingShares: shares, annualDividend, monthlyDividend: annualDividend / 12, strategy: input.strategy ?? "contribution_drip" });
  }
  return points;
}
