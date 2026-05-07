import { getMockStock, mockStocks } from "@/data/mockStocks";

export type StockApiProvider = "mock" | "alpha_vantage" | "finnhub" | "polygon" | "twelve_data" | "yahoo_fallback";

const provider = (process.env.STOCK_API_PROVIDER ?? "mock") as StockApiProvider;

export async function fetchStockData(ticker: string) {
  switch (provider) {
    case "alpha_vantage":
    case "finnhub":
    case "polygon":
    case "twelve_data":
    case "yahoo_fallback":
    case "mock":
    default:
      return getMockStock(ticker);
  }
}

export async function fetchHistoricalPrices(ticker: string) {
  return getMockStock(ticker).historicalPrices;
}

export async function fetchETFHoldings(ticker: string) {
  return getMockStock(ticker).topHoldings ?? [];
}

export async function fetchFundamentals(ticker: string) {
  const { historicalPrices: _historicalPrices, ...fundamentals } = getMockStock(ticker);
  return fundamentals;
}

export async function fetchAllStocks() {
  return mockStocks;
}
