"use client";
import { Scatter, ScatterChart, ResponsiveContainer, XAxis, YAxis, Tooltip, ZAxis } from "recharts";
import { Stock } from "@/types/stock";
export function RiskReturnChart({ stocks }: { stocks: Stock[] }) { const data=stocks.map(s=>({ticker:s.ticker, risk:(s.volatility??0)*100, return:(s.fiveYearAnnualizedReturn??s.oneYearReturn??0)*100})); return <section className="card p-5"><h3 className="font-black">Risk / Return</h3><div className="mt-4 h-72"><ResponsiveContainer><ScatterChart><XAxis dataKey="risk" name="Volatility" unit="%"/><YAxis dataKey="return" name="Return" unit="%"/><ZAxis range={[120]}/><Tooltip cursor={{strokeDasharray:"3 3"}}/><Scatter data={data} fill="#2563eb" name="Ticker"/></ScatterChart></ResponsiveContainer></div></section>; }
