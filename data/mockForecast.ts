import { getMockStock } from "./mockStocks";
import { buildForecastScenarios, calculateAnnualizedReturn, calculateVolatility, runMonteCarloSimulation } from "@/lib/forecast";

const stock = getMockStock("SCHG");
export const mockForecast = {
  ticker: stock.ticker,
  scenarios: buildForecastScenarios(stock, 5),
  monteCarlo: runMonteCarloSimulation(stock.currentPrice, calculateAnnualizedReturn(stock.historicalPrices), calculateVolatility(stock.historicalPrices), 5, 250)
};
