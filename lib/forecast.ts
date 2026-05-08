import { HistoricalPrice, Stock } from "@/types/stock";
import { ETFProjectionInput, ETFProjectionResult, ForecastScenario, MonteCarloResult } from "@/types/forecast";

export function calculateAnnualizedReturn(prices: HistoricalPrice[]) {
  if (prices.length < 2) return 0;
  const first = prices[0].close;
  const last = prices[prices.length - 1].close;
  const years = prices.length / 252;
  return Math.pow(last / first, 1 / years) - 1;
}

export function calculateVolatility(prices: HistoricalPrice[]) {
  if (prices.length < 2) return 0;
  const returns = prices.slice(1).map((p, i) => Math.log(p.close / prices[i].close));
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
  return Math.sqrt(variance) * Math.sqrt(252);
}

const percentile = (values: number[], p: number) => values[Math.min(values.length - 1, Math.floor((values.length - 1) * p))];

export function runMonteCarloSimulation(currentPrice: number, annualizedReturn: number, annualizedVolatility: number, years: number, simulations = 1000): MonteCarloResult[] {
  const results: MonteCarloResult[] = [];
  for (let year = 1; year <= years; year += 1) {
    const outcomes = Array.from({ length: simulations }, (_, i) => {
      const deterministicNoise = Math.sin((i + 1) * (year + 3) * 12.9898) * 43758.5453;
      const z = (deterministicNoise - Math.floor(deterministicNoise) - 0.5) * 2.6;
      return currentPrice * Math.exp((annualizedReturn - 0.5 * annualizedVolatility ** 2) * year + annualizedVolatility * Math.sqrt(year) * z);
    }).sort((a, b) => a - b);
    results.push({ year, percentile10: percentile(outcomes, 0.1), percentile25: percentile(outcomes, 0.25), percentile50: percentile(outcomes, 0.5), percentile75: percentile(outcomes, 0.75), percentile90: percentile(outcomes, 0.9) });
  }
  return results;
}

export function calculateFairValueByPE(currentEPS: number, epsGrowthRate: number, years: number, bearPE: number, fairPE: number, bullPE: number, currentPrice: number) {
  const futureEPS = currentEPS * Math.pow(1 + epsGrowthRate, years);
  const values = { bear: futureEPS * bearPE, base: futureEPS * fairPE, bull: futureEPS * bullPE };
  return { futureEPS, ...values, bearUpside: values.bear / currentPrice - 1, baseUpside: values.base / currentPrice - 1, bullUpside: values.bull / currentPrice - 1 };
}

export function calculateConfidenceScore(stock: Stock) {
  let score = 50;
  const historyYears = stock.historicalPrices.length / 252;
  if (historyYears > 10) score += 30;
  else if (historyYears > 5) score += 20;
  if (stock.volume > stock.averageVolume) score += 10;
  if ((stock.aum ?? 0) > 10_000_000_000) score += 10;
  if (stock.eps !== undefined || stock.assetType === "ETF") score += 10;
  if ((stock.volatility ?? calculateVolatility(stock.historicalPrices)) < 0.2) score += 10;
  if (historyYears < 3) score -= 25;
  if ((stock.volatility ?? 0) > 0.35) score -= 20;
  if (stock.volume < stock.averageVolume * 0.5) score -= 15;
  if (stock.assetType === "stock" && stock.eps === undefined) score -= 15;
  if (stock.inceptionDate && new Date(stock.inceptionDate) > new Date("2023-05-06")) score -= 20;
  if ((stock.peRatio ?? 0) > 60) score -= 15;
  return Math.max(0, Math.min(100, score));
}

export const confidenceLabel = (score: number) => score >= 80 ? "High Confidence" : score >= 60 ? "Medium Confidence" : score >= 40 ? "Low Confidence" : "Very Low Confidence";

export function getTrendSignal(stock: Stock) {
  const closes = stock.historicalPrices.map((p) => p.close);
  const avg = (n: number) => closes.slice(-n).reduce((a, b) => a + b, 0) / Math.min(n, closes.length);
  const ma20 = avg(20), ma50 = avg(50), ma200 = avg(200), price = stock.currentPrice;
  if (price > ma20 && ma20 > ma50 && ma50 > ma200) return "Strong Uptrend";
  if (price > ma200 && ma20 < ma50) return "Long-term Uptrend, Short-term Weakness";
  if (price < ma200) return "Long-term Downtrend";
  if (Math.abs(price / ma50 - 1) < 0.03) return "Consolidation";
  return "Mixed Trend";
}

export function getRsiSignal(rsi: number) {
  if (rsi > 70) return "Overbought";
  if (rsi < 30) return "Oversold";
  if (rsi >= 45 && rsi <= 55) return "Neutral";
  if (rsi > 55 && rsi <= 70) return "Positive Momentum";
  return "Weak Momentum";
}

export function getVolumeSignal(stock: Stock) {
  if (stock.volume > stock.averageVolume * 1.5 && stock.dayChange > 0) return "Accumulation";
  if (stock.volume > stock.averageVolume * 1.5 && stock.dayChange < 0) return "Distribution";
  if (stock.volume < stock.averageVolume * 0.7) return "Low Conviction";
  return "Normal";
}

export function buildForecastScenarios(stock: Stock, horizonYears: number): ForecastScenario[] {
  const baseReturn = stock.assetType === "ETF" ? 0.07 : Math.min(0.18, Math.max(-0.02, stock.revenueGrowth ?? 0.08));
  return [
    { type: "bear", priceLow: stock.currentPrice * Math.pow(0.92, horizonYears), priceHigh: stock.currentPrice * Math.pow(0.97, horizonYears), expectedReturn: -0.04, assumptions: ["Valuation compression", "Interest rates rise", "Revenue growth slows", "Market correction"], risks: ["Macro weakness", "Liquidity stress"] },
    { type: "base", priceLow: stock.currentPrice * Math.pow(1 + baseReturn * 0.8, horizonYears), priceHigh: stock.currentPrice * Math.pow(1 + baseReturn * 1.1, horizonYears), expectedReturn: baseReturn, assumptions: ["Normal revenue growth", "Valuation remains stable", "Neutral market conditions"], risks: ["Forecast assumptions may be wrong"] },
    { type: "bull", priceLow: stock.currentPrice * Math.pow(1.1, horizonYears), priceHigh: stock.currentPrice * Math.pow(1.16, horizonYears), expectedReturn: 0.13, assumptions: ["Earnings beat expectations", "AI / technology demand remains strong", "Interest rates decline", "Valuation expansion"], risks: ["Optimistic multiples may not persist"] }
  ];
}

export function calculateETFProjection(input: ETFProjectionInput): ETFProjectionResult & { bear: number; base: number; bull: number } {
  const project = (annualReturn: number) => {
    let value = input.currentInvestment;
    let expenseDrag = 0;
    for (let month = 1; month <= input.years * 12; month += 1) {
      value += input.monthlyContribution;
      const gross = value * (annualReturn / 12);
      const expense = value * (input.expenseRatio / 12);
      const reinvestedDiv = value * (input.dividendYield / 12) * input.dividendReinvestmentPercent;
      value += gross - expense + reinvestedDiv;
      expenseDrag += expense;
    }
    return { value, expenseDrag };
  };
  const base = project(input.expectedAnnualReturn);
  const totalContribution = input.currentInvestment + input.monthlyContribution * input.years * 12;
  return { futureValue: base.value, totalContribution, totalGain: base.value - totalContribution, endingDividendIncome: base.value * input.dividendYield, expenseDragEstimate: base.expenseDrag, bear: project(0.04).value, base: project(0.07).value, bull: project(0.1).value };
}

export function buildRuleBasedSummary(stock: Stock, trendSignal: string, rsiSignal: string, valuationSignal: string, confidenceScore: number, forecastHorizon: string) {
  if (confidenceScore < 40) return "This stock has a low confidence score due to limited history, high volatility, or weak trading volume. Price forecasts should be treated with caution.";
  if (stock.ticker === "SCHG") return "SCHG is currently trading above its 200-day moving average, suggesting a long-term uptrend. Because it is heavily exposed to large-cap growth stocks, valuation may be sensitive to interest rate changes. The base case assumes moderate growth and stable market conditions.";
  if (stock.ticker === "00878.TW") return "00878 is a dividend-focused ETF. Its forecast should be evaluated based on income stability, dividend reinvestment, expense ratio, and long-term total return rather than short-term price movement.";
  return `${stock.ticker} has a ${trendSignal.toLowerCase()} trend, ${rsiSignal.toLowerCase()} RSI signal, and ${valuationSignal.toLowerCase()} valuation signal for the ${forecastHorizon} horizon. Use bear/base/bull scenarios rather than a single target price.`;
}
