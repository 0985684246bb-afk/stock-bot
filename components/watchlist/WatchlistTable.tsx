"use client";
import { useMemo, useState } from "react";
import { mockStocks } from "@/data/mockStocks";
import { Stock } from "@/types/stock";
import { AddTickerForm } from "./AddTickerForm";
import { WatchlistRow } from "./WatchlistRow";
import { loadLocal, saveLocal } from "@/lib/storage";

type SortKey = keyof Pick<Stock, "ticker" | "currentPrice" | "dayChangePercent" | "peRatio" | "dividendYield" | "volume">;

export function WatchlistTable() {
  const [tickers, setTickers] = useState<string[]>(() => loadLocal("watchlist", ["AAPL", "MSFT", "SCHG", "VOO", "QQQM", "00878.TW", "006208.TW", "0050.TW", "MOCK_LOW_PRICE_HIGH_PE"]));
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("ticker");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const update = (next: string[]) => { setTickers(next); saveLocal("watchlist", next); };
  const stocks = useMemo(() => tickers.map((t) => mockStocks.find((s) => s.ticker === t)).filter(Boolean) as Stock[], [tickers]);
  const visible = [...stocks].filter((s) => `${s.ticker} ${s.name}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => {
    const av = a[sortKey] ?? 0, bv = b[sortKey] ?? 0;
    return (av > bv ? 1 : -1) * (direction === "asc" ? 1 : -1);
  });
  const header = (label: string, key: SortKey) => <th className="th" onClick={() => { setSortKey(key); setDirection(direction === "asc" ? "desc" : "asc"); }}>{label}</th>;
  return <div className="space-y-4"><div className="card flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"><AddTickerForm onAdd={(ticker) => !tickers.includes(ticker) && update([...tickers, ticker])} /><input className="input" placeholder="Search watchlist" value={search} onChange={(e) => setSearch(e.target.value)} /></div><div className="card overflow-x-auto"><table className="min-w-full"><thead><tr>{header("Ticker", "ticker")}<th className="th">Type</th>{header("Price", "currentPrice")}{header("Day", "dayChangePercent")}<th className="th">Market Cap</th>{header("PE", "peRatio")}{header("Yield", "dividendYield")}<th className="th">Expense</th><th className="th">52W</th>{header("Volume", "volume")}<th className="th">Quality</th><th className="th"></th></tr></thead><tbody>{visible.map((s) => <WatchlistRow key={s.ticker} stock={s} onRemove={(ticker) => update(tickers.filter((t) => t !== ticker))} />)}</tbody></table></div></div>;
}
