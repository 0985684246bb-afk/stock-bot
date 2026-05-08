import { Stock } from "@/types/stock";
import { QualityCheckResult, StrategyPreference } from "@/types/quality";

export const detectLowPriceTrap = (s: Stock) => s.currentPrice < 20 && (s.peRatio ?? 0) > 30;
export const detectExpenseRatioRisk = (s: Stock) => s.assetType === "ETF" && (s.expenseRatio ?? 0) > 0.005;
export const detectYieldTrap = (s: Stock) => (s.dividendYield ?? 0) > 0.08 && (s.oneYearReturn ?? 0) < -0.1;
export const detectLiquidityRisk = (s: Stock) => s.volume < s.averageVolume * 0.5;
export const detectConcentrationRisk = (s: Stock) => (s.topTenHoldingsWeight ?? 0) > 50;
export const detectOverlapRisk = (_s: Stock, overlap = 0) => overlap > 50;
const limitedHistory = (s: Stock) => !!s.inceptionDate && new Date(s.inceptionDate) > new Date("2023-05-06");

export function calculateQualityScore(stock: Stock, strategy: StrategyPreference = "balanced", overlap = 0): QualityCheckResult {
  const warnings: string[] = [];
  const riskBadges: string[] = [];
  let score = 82;
  const add = (condition: boolean, points: number, warning: string, badge: string) => {
    if (condition) { score -= points; warnings.push(warning); riskBadges.push(badge); }
  };
  add(detectLowPriceTrap(stock), 25, "Low stock price does not mean the stock is cheap. Valuation is still high.", "Low Price Trap");
  add(detectExpenseRatioRisk(stock), 15, "Expense ratio is relatively high and may reduce long-term returns.", "High Expense");
  add(limitedHistory(stock), 18, "This fund has limited history. Long-term performance is uncertain.", "Limited History");
  add(detectLiquidityRisk(stock), 15, "Low trading volume may increase liquidity risk.", "Low Liquidity");
  add(detectYieldTrap(stock), 20, "High yield may be caused by price decline. Check sustainability.", "Yield Trap");
  add(detectConcentrationRisk(stock), 12, "Top holdings concentration is high.", "Concentration");
  add(detectOverlapRisk(stock, overlap), 10, "This ETF may overlap heavily with your current holdings.", "Overlap Risk");
  if (strategy === "dividend income" && (stock.dividendYield ?? 0) < 0.015) { score -= 8; warnings.push("Dividend yield may not fit an income-focused strategy."); }
  if (strategy === "long-term growth" && stock.assetType === "stock" && (stock.revenueGrowth ?? 0) < 0.03) { score -= 8; warnings.push("Growth profile may not fit a long-term growth strategy."); }
  score = Math.max(0, Math.min(100, score));
  const rating = score >= 80 ? "Strong Long-Term Candidate" : score >= 60 ? "Watch Carefully" : score >= 40 ? "Avoid Heavy Position" : "High Risk";
  return { qualityScore: score, rating, explanation: warnings.length ? warnings.join(" ") : "No major quality issues detected in mock data. Continue monitoring valuation, total return, fees, and diversification.", riskBadges, warnings };
}
