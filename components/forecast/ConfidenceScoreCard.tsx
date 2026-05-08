import { confidenceLabel } from "@/lib/forecast";
export function ConfidenceScoreCard({ score }: { score:number }) { return <section className="card p-5"><p className="text-sm font-semibold text-slate-500">Confidence Score</p><div className="mt-2 text-5xl font-black">{score}</div><p className="font-bold text-blue-700">{confidenceLabel(score)}</p></section>; }
