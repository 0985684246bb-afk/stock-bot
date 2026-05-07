import { cn } from "@/lib/formatters";
export function RiskBadge({ label, tone = "slate" }: { label: string; tone?: "green" | "red" | "amber" | "blue" | "purple" | "slate" }) {
  const map = { green: "bg-emerald-50 text-emerald-700", red: "bg-red-50 text-red-700", amber: "bg-amber-50 text-amber-700", blue: "bg-blue-50 text-blue-700", purple: "bg-purple-50 text-purple-700", slate: "bg-slate-100 text-slate-700" };
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold", map[tone])}>{label}</span>;
}
