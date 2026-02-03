from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class AppConfig:
    symbol: str
    output_dir: Path
    line_token: str | None = None
    provider: str = "yfinance"

    def normalized_symbol(self) -> str:
        symbol = self.symbol.strip().upper()
        if symbol.isdigit():
            return f"{symbol}.TW"
        return symbol
