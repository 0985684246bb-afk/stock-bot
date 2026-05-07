import Link from "next/link";

export function Header() {
  return <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur lg:px-8">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">小資複利追蹤器</p><h1 className="text-lg font-black text-slate-950 md:text-2xl">Smart DRIP Portfolio Tracker</h1></div>
      <div className="flex gap-2 lg:hidden"><Link className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold" href="/dashboard">Dashboard</Link><Link className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold" href="/watchlist">Watchlist</Link><Link className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold" href="/portfolio">Portfolio</Link></div>
      <div className="rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800">Forecasts are estimates, not advice.</div>
    </div>
  </header>;
}
