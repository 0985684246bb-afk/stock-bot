import { WatchlistTable } from "@/components/watchlist/WatchlistTable";
export default function WatchlistPage() { return <div className="space-y-6"><div><h2 className="text-2xl font-black">Watchlist</h2><p className="text-slate-500">Sortable stock and ETF watchlist with valuation, liquidity, and quality warnings.</p></div><WatchlistTable /></div>; }
