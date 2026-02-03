from __future__ import annotations

from dataclasses import dataclass

from .analysis import AnalysisResult
from .data_providers import DailyQuote


@dataclass(frozen=True)
class Report:
    symbol: str
    text: str


def build_report(quote: DailyQuote, analysis: AnalysisResult) -> Report:
    lines: list[str] = []
    lines.append(f"台股收盤分析報告 - {quote.symbol}")
    lines.append(f"日期：{quote.date:%Y-%m-%d}")
    lines.append("")
    lines.append(
        "收盤資訊："
        f" 開盤 {quote.open:.2f} | 最高 {quote.high:.2f} | "
        f"最低 {quote.low:.2f} | 收盤 {quote.close:.2f}"
    )
    lines.append(
        f"漲跌：{analysis.change:+.2f} "
        f"({analysis.change_pct:+.2f}%)"
    )
    if analysis.sma_5 is not None:
        lines.append(f"5 日均價：{analysis.sma_5:.2f}")
    if analysis.sma_20 is not None:
        lines.append(f"20 日均價：{analysis.sma_20:.2f}")
    if analysis.volume_avg_5 is not None:
        lines.append(f"5 日均量：{analysis.volume_avg_5:,.0f}")
    lines.append("")
    lines.append("備註：可在 analysis.py 擴充更多指標。")

    return Report(symbol=quote.symbol, text="\n".join(lines))
