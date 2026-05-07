"use client";
import { useMemo, useState } from "react";
import { mockPortfolio } from "@/data/mockPortfolio";
import { getMockStock } from "@/data/mockStocks";
import { summarizePortfolio } from "@/lib/calculations";
import { formatCurrency, formatPercent, cn } from "@/lib/formatters";
import { calculateQualityScore } from "@/lib/qualityCheck";
import { loadLocal, saveLocal } from "@/lib/storage";
import { Holding } from "@/types/portfolio";
import { AddHoldingForm } from "./AddHoldingForm";

type Row = Holding & { totalCost: number; marketValue: number; gain: number; gainPct: number; weight: number; annualDividend: number; quality: number; risk: string };
export function PortfolioTable() {
  const [holdings, setHoldings] = useState<Holding[]>(() => loadLocal("portfolio", mockPortfolio));
  const [sortKey, setSortKey] = useState<keyof Row>("marketValue");
  const update = (next: Holding[]) => { setHoldings(next); saveLocal("portfolio", next); };
  const summary = summarizePortfolio(holdings);
  const rows: Row[] = useMemo(() => holdings.map((h) => { const stock = getMockStock(h.ticker); const totalCost = h.shares * h.averageCost; const marketValue = h.shares * h.currentPrice; const weight = summary.totalValue ? marketValue / summary.totalValue : 0; const quality = calculateQualityScore(stock).qualityScore; const risk = weight > 0.3 ? "Concentration risk" : (stock.assetType === "stock" && weight > 0.15 && (stock.volatility ?? 0) > 0.35) ? "High volatility risk" : (stock.expenseRatio ?? 0) > 0.005 ? "Expense ratio risk" : stock.inceptionDate && new Date(stock.inceptionDate) > new Date("2023-05-06") ? "Limited history" : "Monitor"; return { ...h, totalCost, marketValue, gain: marketValue - totalCost, gainPct: totalCost ? (marketValue - totalCost) / totalCost : 0, weight, annualDividend: marketValue * (stock.dividendYield ?? 0), quality, risk }; }), [holdings, summary.totalValue]);
  const sorted = [...rows].sort((a, b) => ((a[sortKey] ?? 0) > (b[sortKey] ?? 0) ? -1 : 1));
  const th = (label: string, key: keyof Row) => <th className="th" onClick={() => setSortKey(key)}>{label}</th>;
  return <div className="space-y-4"><AddHoldingForm onAdd={(h) => update([...holdings, h])}/><div className="card overflow-x-auto"><table className="min-w-full"><thead><tr>{th("Ticker","ticker")}{th("Shares","shares")}{th("Avg Cost","averageCost")}{th("Price","currentPrice")}{th("Total Cost","totalCost")}{th("Value","marketValue")}{th("Gain/Loss","gain")}{th("Gain %","gainPct")}{th("Weight","weight")}{th("Dividend","annualDividend")}{th("Quality","quality")}{th("Risk","risk")}</tr></thead><tbody>{sorted.map((r) => <tr key={r.id} className="border-t border-slate-100"><td className="td font-black text-blue-700">{r.ticker}</td><td className="td">{r.shares}</td><td className="td">{formatCurrency(r.averageCost)}</td><td className="td">{formatCurrency(r.currentPrice)}</td><td className="td">{formatCurrency(r.totalCost)}</td><td className="td font-bold">{formatCurrency(r.marketValue)}</td><td className={cn("td font-bold", r.gain >= 0 ? "text-emerald-600" : "text-red-600")}>{formatCurrency(r.gain)}</td><td className={cn("td", r.gainPct >= 0 ? "text-emerald-600" : "text-red-600")}>{formatPercent(r.gainPct)}</td><td className="td">{formatPercent(r.weight)}</td><td className="td">{formatCurrency(r.annualDividend)}</td><td className="td">{r.quality}</td><td className="td">{r.risk}</td></tr>)}</tbody></table></div></div>;
}
