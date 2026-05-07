"use client";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
const colors = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6"];
export function AssetAllocationChart({ data }: { data: { name: string; value: number }[] }) {
  return <div className="card p-5"><h3 className="font-black">Asset Allocation</h3><div className="mt-4 h-64"><ResponsiveContainer><PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={4}>{data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div><div className="grid grid-cols-2 gap-2">{data.map((d, i) => <div key={d.name} className="text-sm"><span style={{ background: colors[i % colors.length] }} className="mr-2 inline-block h-2 w-2 rounded-full" />{d.name}: {d.value.toFixed(1)}%</div>)}</div></div>;
}
