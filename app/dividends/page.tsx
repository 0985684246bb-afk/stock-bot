import { DividendTable } from "@/components/dividends/DividendTable";
import { DripSimulator } from "@/components/dividends/DripSimulator";
export default function DividendsPage(){ return <div className="space-y-6"><div><h2 className="text-2xl font-black">Dividend / DRIP Simulator</h2><p className="text-slate-500">Model dividends, reinvestment, monthly contributions, ending shares, and income over time.</p></div><DripSimulator/><DividendTable/></div> }
