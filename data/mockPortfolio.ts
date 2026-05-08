import { Holding } from "@/types/portfolio";
import { getMockStock } from "./mockStocks";

const makeHolding = (id: string, ticker: string, shares: number, averageCost: number, purchaseDate: string, accountType: Holding["accountType"]): Holding => {
  const stock = getMockStock(ticker);
  return { id, ticker, name: stock.name, shares, averageCost, purchaseDate, currentPrice: stock.currentPrice, assetType: stock.assetType, accountType };
};

export const mockPortfolio: Holding[] = [
  makeHolding("h1", "VOO", 18, 390, "2022-01-14", "roth_ira"),
  makeHolding("h2", "SCHG", 55, 72, "2021-08-03", "taxable"),
  makeHolding("h3", "AAPL", 24, 136, "2020-06-17", "taxable"),
  makeHolding("h4", "00878.TW", 600, 18.6, "2022-11-02", "taiwan_brokerage"),
  makeHolding("h5", "NVDA", 5, 310, "2023-03-21", "taxable")
];
