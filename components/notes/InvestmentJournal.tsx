"use client";
import { useState } from "react";
import { loadLocal, saveLocal } from "@/lib/storage";
import { InvestmentNote } from "@/types/note";
import { NoteEditor } from "./NoteEditor";
import { NoteList } from "./NoteList";
const initial: InvestmentNote[] = [{ id:"n1", ticker:"SCHG", date:"2026-05-06", action:"hold", reason:"Core growth ETF for long-term compounding; monitor valuation and technology concentration.", expectedHoldingPeriod:"10 years", riskFactors:"Large-cap growth valuation and rate sensitivity", sellTrigger:"Expense, tracking, or allocation no longer fits plan", confidenceLevel:"high", relatedThesis:"Use DRIP and monthly contributions instead of short-term trading." }];
export function InvestmentJournal(){ const [notes,setNotes]=useState(()=>loadLocal("notes",initial)); const [filter,setFilter]=useState(""); const update=(next:InvestmentNote[])=>{setNotes(next);saveLocal("notes",next)}; const filtered=notes.filter(n=>n.ticker.toLowerCase().includes(filter.toLowerCase())); return <div className="space-y-4"><NoteEditor onSave={n=>update([n,...notes])}/><input className="input" placeholder="Filter by ticker" value={filter} onChange={e=>setFilter(e.target.value)}/><NoteList notes={filtered}/></div> }
