import { formatCurrency } from "@/lib/formatters";
export function DividendSummaryCard({ title, value, sub }: { title:string; value:number; sub?:string }) { return <div className="card p-4"><p className="text-sm font-semibold text-slate-500">{title}</p><div className="mt-2 text-2xl font-black">{formatCurrency(value)}</div>{sub&&<p className="text-sm text-slate-500">{sub}</p>}</div>; }
