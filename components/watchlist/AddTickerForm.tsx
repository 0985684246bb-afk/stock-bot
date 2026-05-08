"use client";
import { FormEvent, useState } from "react";
export function AddTickerForm({ onAdd }: { onAdd: (ticker: string) => void }) {
  const [ticker, setTicker] = useState("");
  const submit = (e: FormEvent) => { e.preventDefault(); if (ticker.trim()) onAdd(ticker.trim().toUpperCase()); setTicker(""); };
  return <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row"><input className="input" placeholder="AAPL, SCHG, 00878.TW" value={ticker} onChange={(e)=>setTicker(e.target.value)} /><button className="btn">Add ticker</button></form>;
}
