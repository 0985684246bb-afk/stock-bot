"use client";
import { useMemo, useState } from "react";
import { ConfidenceScoreCard } from "@/components/forecast/ConfidenceScoreCard";
import { ETFProjectionCard } from "@/components/forecast/ETFProjectionCard";
import { ForecastInputPanel } from "@/components/forecast/ForecastInputPanel";
import { ForecastSummaryCard } from "@/components/forecast/ForecastSummaryCard";
import { MonteCarloChart } from "@/components/forecast/MonteCarloChart";
import { PredictionWarning } from "@/components/forecast/PredictionWarning";
import { PricePredictionCard } from "@/components/forecast/PricePredictionCard";
import { ScenarioForecast } from "@/components/forecast/ScenarioForecast";
import { ValuationRangeCard } from "@/components/forecast/ValuationRangeCard";
import { getMockStock } from "@/data/mockStocks";
import { buildForecastScenarios, buildRuleBasedSummary, calculateAnnualizedReturn, calculateConfidenceScore, calculateVolatility, getRsiSignal, getTrendSignal, getVolumeSignal, runMonteCarloSimulation } from "@/lib/forecast";
const horizonYears=(h:string)=>h==="1M"?1/12:h==="6M"?0.5:h==="1Y"?1:h==="3Y"?3:h==="10Y"?10:5;
export default function ForecastPage(){ const [ticker,setTicker]=useState("SCHG"),[horizon,setHorizon]=useState("5Y"); const stock=getMockStock(ticker); const years=horizonYears(horizon); const confidence=calculateConfidenceScore(stock); const trend=getTrendSignal(stock), rsi=getRsiSignal(58), volume=getVolumeSignal(stock), valuation=(stock.peRatio??0)>40?"Rich Valuation":"Reasonable / Mixed"; const scenarios=buildForecastScenarios(stock,years); const mc=useMemo(()=>runMonteCarloSimulation(stock.currentPrice,calculateAnnualizedReturn(stock.historicalPrices),calculateVolatility(stock.historicalPrices),Math.max(1,Math.ceil(years)),500),[stock,years]); const summary=buildRuleBasedSummary(stock,trend,rsi,valuation,confidence,horizon); return <div className="space-y-6"><div><h2 className="text-2xl font-black">Forecast Lab / Scenario Lab</h2><p className="text-slate-500">Bear / Base / Bull forecasting with technical signals, valuation assumptions, confidence score, and Monte Carlo ranges.</p></div><PredictionWarning/><ForecastInputPanel ticker={ticker} horizon={horizon} onTicker={setTicker} onHorizon={setHorizon}/><PricePredictionCard stock={stock} trend={trend} rsi={rsi} volume={volume} valuation={valuation}/><ConfidenceScoreCard score={confidence}/><ScenarioForecast scenarios={scenarios}/><ETFProjectionCard stock={stock} years={Math.max(1,Math.ceil(years))}/><ValuationRangeCard stock={stock} years={Math.max(1,Math.ceil(years))}/><MonteCarloChart data={mc}/><ForecastSummaryCard summary={summary}/></div> }
