import { notFound } from "next/navigation";
import { ETFHoldingsCard } from "@/components/stock/ETFHoldingsCard";
import { FundamentalCard } from "@/components/stock/FundamentalCard";
import { StockHeader } from "@/components/stock/StockHeader";
import { StockMetricCards } from "@/components/stock/StockMetricCards";
import { StockPriceChart } from "@/components/stock/StockPriceChart";
import { TechnicalIndicatorCard } from "@/components/stock/TechnicalIndicatorCard";
import { QualityCheckCard } from "@/components/quality/QualityCheckCard";
import { mockStocks } from "@/data/mockStocks";
export default function StockDetailPage({ params }: { params: { ticker: string } }) { const stock = mockStocks.find(s=>s.ticker.toUpperCase()===decodeURIComponent(params.ticker).toUpperCase()); if(!stock) notFound(); return <div className="space-y-6"><StockHeader stock={stock}/><StockPriceChart data={stock.historicalPrices}/><StockMetricCards stock={stock}/><div className="grid gap-6 xl:grid-cols-2"><FundamentalCard stock={stock}/><TechnicalIndicatorCard stock={stock}/></div><ETFHoldingsCard stock={stock}/><QualityCheckCard stock={stock}/></div>; }
