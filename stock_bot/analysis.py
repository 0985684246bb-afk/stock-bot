from __future__ import annotations

from dataclasses import dataclass

import pandas as pd


@dataclass(frozen=True)
class AnalysisResult:
    change: float
    change_pct: float
    sma_5: float | None
    sma_20: float | None
    volume_avg_5: float | None


def analyze(history: pd.DataFrame) -> AnalysisResult:
    if history.empty:
        raise ValueError("history cannot be empty")
    latest = history.iloc[-1]
    prev = history.iloc[-2] if len(history) > 1 else latest
    change = float(latest["Close"] - prev["Close"])
    change_pct = float(change / prev["Close"] * 100) if prev["Close"] else 0.0

    close_series = history["Close"]
    volume_series = history["Volume"]
    sma_5 = float(close_series.tail(5).mean()) if len(history) >= 5 else None
    sma_20 = float(close_series.tail(20).mean()) if len(history) >= 20 else None
    volume_avg_5 = float(volume_series.tail(5).mean()) if len(history) >= 5 else None

    return AnalysisResult(
        change=change,
        change_pct=change_pct,
        sma_5=sma_5,
        sma_20=sma_20,
        volume_avg_5=volume_avg_5,
    )
