"use client";
import { Area, AreaChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DripProjectionPoint } from "@/types/dividend";
export function DripProjectionChart({ data }: { data: DripProjectionPoint[] }) { return <section className="card p-5"><h3 className="font-black">DRIP Projection</h3><div className="mt-4 h-80"><ResponsiveContainer><AreaChart data={data}><XAxis dataKey="year"/><YAxis/><Tooltip/><Area dataKey="portfolioValue" fill="#dbeafe" stroke="#2563eb" strokeWidth={3}/><Line dataKey="annualDividend" stroke="#059669" strokeWidth={2}/><Line dataKey="endingShares" stroke="#f59e0b" strokeWidth={2}/></AreaChart></ResponsiveContainer></div></section>; }
