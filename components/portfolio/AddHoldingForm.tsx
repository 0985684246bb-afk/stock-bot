"use client";
import { FormEvent, useState } from "react";
import { getMockStock } from "@/data/mockStocks";
import { Holding } from "@/types/portfolio";
export function AddHoldingForm({ onAdd }: { onAdd: (holding: Holding) => void }) {
  const [ticker, setTicker] = useState("VOO"), [shares, setShares] = useState(1), [averageCost, setAverageCost] = useState(100);
  const submit = (e: FormEvent) => { e.preventDefault(); const s = getMockStock(ticker); onAdd({ id: crypto.randomUUID(), ticker: s.ticker, name: s.name, shares, averageCost, purchaseDate: new Date().toISOString().slice(0,10), currentPrice: s.currentPrice, assetType: s.assetType, accountType: "taxable" }); };
  return <form onSubmit={submit} className="card grid gap-3 p-4 md:grid-cols-5"><div className="md:col-span-5 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-800">Please write your investment reason before adding this holding.</div><input className="input" value={ticker} onChange={(e)=>setTicker(e.target.value.toUpperCase())}/><input className="input" type="number" value={shares} onChange={(e)=>setShares(Number(e.target.value))}/><input className="input" type="number" value={averageCost} onChange={(e)=>setAverageCost(Number(e.target.value))}/><select className="input"><option>taxable</option><option>roth_ira</option><option>traditional_ira</option><option>taiwan_brokerage</option><option>crypto_exchange</option></select><button className="btn">Add Holding</button></form>;
}
