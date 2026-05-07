import { Stock } from "@/types/stock";
import { formatPercent } from "@/lib/formatters";
export function FundamentalCard({ stock }: { stock: Stock }) { return <section className="card p-5"><h3 className="font-black">Fundamental Snapshot</h3><p className="mt-3 text-sm text-slate-600">Revenue growth {formatPercent(stock.revenueGrowth)}, profit margin {formatPercent(stock.profitMargin)}, payout ratio {formatPercent(stock.payoutRatio)}. Long-term investors should compare total return, valuation, profitability, risk, and position sizing rather than only share price.</p></section>; }
