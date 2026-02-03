from __future__ import annotations

from dataclasses import dataclass
from datetime import date

import pandas as pd
import yfinance as yf


@dataclass(frozen=True)
class DailyQuote:
    symbol: str
    date: date
    open: float
    high: float
    low: float
    close: float
    volume: int


class DataProviderError(RuntimeError):
    pass


class BaseProvider:
    def fetch_recent_history(self, symbol: str, days: int = 30) -> pd.DataFrame:
        raise NotImplementedError

    def fetch_daily_quote(self, symbol: str) -> DailyQuote:
        history = self.fetch_recent_history(symbol, days=5)
        if history.empty:
            raise DataProviderError(f"No data for {symbol}")
        latest = history.iloc[-1]
        return DailyQuote(
            symbol=symbol,
            date=latest.name.date(),
            open=float(latest["Open"]),
            high=float(latest["High"]),
            low=float(latest["Low"]),
            close=float(latest["Close"]),
            volume=int(latest["Volume"]),
        )


class YFinanceProvider(BaseProvider):
    def fetch_recent_history(self, symbol: str, days: int = 30) -> pd.DataFrame:
        ticker = yf.Ticker(symbol)
        history = ticker.history(period=f"{days}d")
        if history.empty:
            raise DataProviderError(
                "No data returned from yfinance. "
                "Check symbol format or market holiday."
            )
        return history
