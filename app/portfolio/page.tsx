import { PortfolioTable } from "@/components/portfolio/PortfolioTable";
export default function PortfolioPage() { return <div className="space-y-6"><div><h2 className="text-2xl font-black">Portfolio</h2><p className="text-slate-500">LocalStorage MVP for holdings, allocation weights, unrealized gains, dividends, and risk alerts.</p></div><PortfolioTable /></div>; }
