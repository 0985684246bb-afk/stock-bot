import { Stock } from "@/types/stock";
import { formatCurrency } from "@/lib/formatters";
export function PricePredictionCard({ stock, trend, rsi, volume, valuation }: { stock:Stock; trend:string; rsi:string; volume:string; valuation:string }) { return <section className="card grid gap-3 p-5 md:grid-cols-5"><Metric k="Current Price" v={formatCurrency(stock.currentPrice)}/><Metric k="Trend" v={trend}/><Metric k="RSI" v={rsi}/><Metric k="Volume" v={volume}/><Metric k="Valuation" v={valuation}/></section>; }
function Metric({k,v}:{k:string;v:string}){return <div><p className="text-xs font-bold uppercase text-slate-500">{k}</p><p className="font-black">{v}</p></div>}
