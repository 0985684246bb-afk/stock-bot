import { cn, formatCurrency } from "@/lib/formatters";

export function SummaryCard({ title, value, subtitle, delta }: { title: string; value: number; subtitle?: string; delta?: number }) {
  return <div className="card p-5"><p className="text-sm font-semibold text-slate-500">{title}</p><div className="mt-2 text-3xl font-black text-slate-950">{formatCurrency(value)}</div>{subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}{delta !== undefined && <p className={cn("mt-3 text-sm font-bold", delta >= 0 ? "text-emerald-600" : "text-red-600")}>{delta >= 0 ? "+" : ""}{formatCurrency(delta)} today</p>}</div>;
}
