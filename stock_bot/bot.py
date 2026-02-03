from __future__ import annotations

from pathlib import Path

from .analysis import analyze
from .config import AppConfig
from .data_providers import BaseProvider, YFinanceProvider
from .line_notify import send_line_notify
from .report import build_report


def build_provider(config: AppConfig) -> BaseProvider:
    if config.provider == "yfinance":
        return YFinanceProvider()
    raise ValueError(f"Unknown provider: {config.provider}")


def run_bot(config: AppConfig) -> Path:
    provider = build_provider(config)
    symbol = config.normalized_symbol()
    history = provider.fetch_recent_history(symbol, days=30)
    quote = provider.fetch_daily_quote(symbol)
    analysis = analyze(history)
    report = build_report(quote, analysis)

    output_path = config.output_dir / f"{symbol}_{quote.date:%Y%m%d}.txt"
    config.output_dir.mkdir(parents=True, exist_ok=True)
    output_path.write_text(report.text, encoding="utf-8")

    if config.line_token:
        send_line_notify(config.line_token, report.text)

    return output_path
