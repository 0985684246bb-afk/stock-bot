"use client";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
export function PortfolioValueChart({ data }: { data: { date: string; value: number }[] }) {
  return <div className="card p-5"><h3 className="font-black">Portfolio Value</h3><div className="mt-4 h-72"><ResponsiveContainer><AreaChart data={data}><defs><linearGradient id="value" x1="0" x2="0" y1="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.35}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="date" tick={{ fontSize: 12 }}/><YAxis tick={{ fontSize: 12 }}/><Tooltip/><Area type="monotone" dataKey="value" stroke="#2563eb" fill="url(#value)" strokeWidth={3}/></AreaChart></ResponsiveContainer></div></div>;
}
