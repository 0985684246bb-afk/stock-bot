"use client";
import { useState } from "react";
import { CompareSelector } from "@/components/compare/CompareSelector";
import { CompareTable } from "@/components/compare/CompareTable";
import { OverlapCard } from "@/components/compare/OverlapCard";
import { RiskReturnChart } from "@/components/compare/RiskReturnChart";
import { mockStocks } from "@/data/mockStocks";
export default function ComparePage(){ const [selected,setSelected]=useState(["SCHG","VOO","QQQM"]); const stocks=selected.map(t=>mockStocks.find(s=>s.ticker===t)!).filter(Boolean); return <div className="space-y-6"><div><h2 className="text-2xl font-black">Compare</h2><p className="text-slate-500">Compare ETFs and stocks by return, volatility, fees, holdings concentration, overlap, and quality.</p></div><CompareSelector selected={selected} onChange={setSelected}/><div className="grid gap-6 xl:grid-cols-3"><div className="xl:col-span-2"><RiskReturnChart stocks={stocks}/></div><OverlapCard stocks={stocks}/></div><CompareTable stocks={stocks}/></div> }
