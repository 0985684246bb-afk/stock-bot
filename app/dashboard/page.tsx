import { AssetAllocationChart } from "@/components/dashboard/AssetAllocationChart";
import { PortfolioValueChart } from "@/components/dashboard/PortfolioValueChart";
import { RecentPerformanceChart } from "@/components/dashboard/RecentPerformanceChart";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { RiskBadge } from "@/components/quality/RiskBadge";
import { mockPortfolio } from "@/data/mockPortfolio";
import { getMockStock } from "@/data/mockStocks";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { summarizePortfolio } from "@/lib/calculations";
import { calculateQualityScore } from "@/lib/qualityCheck";

export default function DashboardPage() {
  const summary = summarizePortfolio(mockPortfolio);
  const rows = mockPortfolio.map((h) => ({ ...h, stock: getMockStock(h.ticker), gainPct: (h.currentPrice - h.averageCost) / h.averageCost, value: h.currentPrice * h.shares }));
  const winners = [...rows].sort((a, b) => b.gainPct - a.gainPct).slice(0, 3);
  const losers = [...rows].sort((a, b) => a.gainPct - b.gainPct).slice(0, 3);
  const allocation = ["ETF", "stock", "cash", "crypto"].map((type) => ({ name: type === "stock" ? "Individual Stocks" : type, value: rows.filter((r) => r.assetType === type).reduce((s, r) => s + r.value, 0) / summary.totalValue * 100 })).filter((a) => a.value > 0);
  const valueData = Array.from({ length: 12 }, (_, i) => ({ date: `M${i + 1}`, value: Math.round(summary.totalValue * (0.82 + i * 0.018 + Math.sin(i) * 0.025)) }));
  const alerts = rows.flatMap((r) => {
    const qs = calculateQualityScore(r.stock);
    const weight = r.value / summary.totalValue;
    return [...(weight > 0.3 ? [`${r.ticker}: concentration risk above 30%`] : []), ...qs.warnings.slice(0, 1).map((w) => `${r.ticker}: ${w}`)];
  });
  return <div className="space-y-6"><div><h2 className="text-2xl font-black">Dashboard</h2><p className="text-slate-500">Track total return, dividends, allocation, and valuation risk in one place.</p></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><SummaryCard title="Total Portfolio Value" value={summary.totalValue} delta={summary.dayChange} subtitle={formatPercent(summary.dayChangePercent)} /><SummaryCard title="Total Cost" value={summary.totalCost} /><SummaryCard title="Unrealized Gain / Loss" value={summary.unrealizedGainLoss} subtitle={formatPercent(summary.unrealizedGainLossPercent)} /><SummaryCard title="Estimated Annual Dividend" value={summary.estimatedAnnualDividend} subtitle={`${formatCurrency(summary.estimatedAnnualDividend / 12)} monthly`} /></div>
    <div className="grid gap-6 xl:grid-cols-3"><div className="xl:col-span-2"><PortfolioValueChart data={valueData} /></div><AssetAllocationChart data={allocation} /></div>
    <div className="grid gap-6 xl:grid-cols-3"><RecentPerformanceChart data={[{period:"1M",return:2.4},{period:"3M",return:6.8},{period:"6M",return:11.3},{period:"YTD",return:9.2},{period:"1Y",return:18.5}]} /><List title="Top Winners" rows={winners} positive /><List title="Top Losers" rows={losers} /></div>
    <section className="card p-5"><h3 className="font-black">Risk Alerts</h3><div className="mt-4 grid gap-3 md:grid-cols-2">{alerts.map((a) => <div key={a} className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{a}</div>)}</div></section>
  </div>;
}
function List({ title, rows, positive = false }: { title: string; rows: Array<{ ticker:string; name:string; gainPct:number; stock: ReturnType<typeof getMockStock> }>; positive?: boolean }) { return <section className="card p-5"><h3 className="font-black">{title}</h3><div className="mt-4 space-y-3">{rows.map((r) => <div key={r.ticker} className="flex items-center justify-between gap-2"><div><div className="font-bold">{r.ticker}</div><div className="text-xs text-slate-500">{r.name}</div></div><div className={positive ? "text-emerald-600 font-black" : "text-red-600 font-black"}>{formatPercent(r.gainPct)}</div><RiskBadge label={calculateQualityScore(r.stock).rating} tone={calculateQualityScore(r.stock).qualityScore > 75 ? "green" : "amber"}/></div>)}</div></section>; }
