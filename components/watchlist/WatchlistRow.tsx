import Link from "next/link";
import { CheapPriceWarning } from "@/components/quality/CheapPriceWarning";
import { RiskBadge } from "@/components/quality/RiskBadge";
import { formatCurrency, formatLargeNumber, formatNumber, formatPercent, cn } from "@/lib/formatters";
import { calculateQualityScore } from "@/lib/qualityCheck";
import { Stock } from "@/types/stock";

export function WatchlistRow({ stock, onRemove }: { stock: Stock; onRemove: (ticker: string) => void }) {
  const quality = calculateQualityScore(stock);
  const lowTrap = stock.currentPrice < 20 && (stock.peRatio ?? 0) > 30;
  return <tr className="border-t border-slate-100 align-top"><td className="td"><Link className="font-black text-blue-700" href={`/stock/${stock.ticker}`}>{stock.ticker}</Link><div className="text-xs text-slate-500">{stock.name}</div>{lowTrap && <div className="mt-2"><CheapPriceWarning /></div>}</td><td className="td"><RiskBadge label={stock.assetType} tone={stock.assetType === "ETF" ? "blue" : "purple"}/></td><td className="td font-bold">{formatCurrency(stock.currentPrice)}</td><td className={cn("td font-bold", stock.dayChange >= 0 ? "text-emerald-600" : "text-red-600")}>{formatCurrency(stock.dayChange)} / {formatPercent(stock.dayChangePercent/100)}</td><td className="td">{formatLargeNumber(stock.marketCap)}</td><td className="td">{formatNumber(stock.peRatio)}</td><td className="td">{formatPercent(stock.dividendYield)}</td><td className="td">{stock.expenseRatio ? formatPercent(stock.expenseRatio) : "—"}</td><td className="td">{formatCurrency(stock.fiftyTwoWeekHigh)} / {formatCurrency(stock.fiftyTwoWeekLow)}</td><td className="td">{formatNumber(stock.volume)} / {formatNumber(stock.averageVolume)}</td><td className="td"><RiskBadge label={`${quality.qualityScore}`} tone={quality.qualityScore > 75 ? "green" : quality.qualityScore > 55 ? "amber" : "red"}/></td><td className="td"><button className="text-red-600" onClick={() => onRemove(stock.ticker)}>Remove</button></td></tr>;
}
