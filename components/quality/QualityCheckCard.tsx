import { calculateQualityScore } from "@/lib/qualityCheck";
import { Stock } from "@/types/stock";
import { RiskBadge } from "./RiskBadge";

export function QualityCheckCard({ stock, overlap = 0 }: { stock: Stock; overlap?: number }) {
  const result = calculateQualityScore(stock, "balanced", overlap);
  return <section className="card p-5">
    <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-slate-500">Quality Check</p><h3 className="text-xl font-black">{result.rating}</h3></div><div className="text-right"><div className="text-3xl font-black">{result.qualityScore}</div><div className="text-xs text-slate-500">/ 100</div></div></div>
    <p className="mt-3 text-sm text-slate-600">{result.explanation}</p>
    <div className="mt-4 flex flex-wrap gap-2">{result.riskBadges.length ? result.riskBadges.map((b) => <RiskBadge key={b} label={b} tone="amber" />) : <RiskBadge label="Long-Term Trackable" tone="green" />}</div>
    <ul className="mt-4 space-y-2 text-sm text-slate-600">{result.warnings.map((w) => <li key={w}>• {w}</li>)}</ul>
  </section>;
}
