import { NextResponse } from "next/server";
import { fetchStockData } from "@/lib/api";
import { buildForecastScenarios, calculateAnnualizedReturn, calculateConfidenceScore, calculateVolatility, runMonteCarloSimulation } from "@/lib/forecast";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker") ?? "SCHG";
  const years = Number(searchParams.get("years") ?? 5);
  const stock = await fetchStockData(ticker);
  return NextResponse.json({
    ticker,
    scenarios: buildForecastScenarios(stock, years),
    confidenceScore: calculateConfidenceScore(stock),
    monteCarlo: runMonteCarloSimulation(stock.currentPrice, calculateAnnualizedReturn(stock.historicalPrices), calculateVolatility(stock.historicalPrices), years)
  });
}
