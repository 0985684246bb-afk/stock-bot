"use client";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
export function RecentPerformanceChart({ data }: { data: { period: string; return: number }[] }) {
  return <div className="card p-5"><h3 className="font-black">Recent Performance</h3><div className="mt-4 h-64"><ResponsiveContainer><BarChart data={data}><XAxis dataKey="period"/><YAxis tickFormatter={(v) => `${v}%`}/><Tooltip/><Bar dataKey="return" radius={[8,8,0,0]}>{data.map((d) => <Cell key={d.period} fill={d.return >= 0 ? "#059669" : "#dc2626"}/>)}</Bar></BarChart></ResponsiveContainer></div></div>;
}
