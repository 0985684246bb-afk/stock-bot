import Link from "next/link";

const nav = [
  ["Dashboard", "/dashboard"], ["Watchlist", "/watchlist"], ["Portfolio", "/portfolio"], ["Dividends / DRIP", "/dividends"], ["Compare", "/compare"], ["Forecast Lab", "/forecast"], ["Notes", "/notes"]
];

export function Sidebar() {
  return <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-white p-5 lg:block">
    <Link href="/" className="mb-8 block"><div className="text-xl font-black text-slate-950">Smart DRIP</div><div className="text-xs text-slate-500">Portfolio Tracker MVP</div></Link>
    <nav className="space-y-2">{nav.map(([label, href]) => <Link key={href} href={href} className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950">{label}</Link>)}</nav>
    <div className="mt-8 rounded-2xl bg-blue-50 p-4 text-xs text-blue-900"><strong>Not financial advice.</strong><br />Track total return, fees, risk, allocation, and scenario assumptions.</div>
  </aside>;
}
