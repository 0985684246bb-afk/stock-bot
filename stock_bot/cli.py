from __future__ import annotations

import argparse
from pathlib import Path

from .bot import run_bot
from .config import AppConfig


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Taiwan stock closing analysis bot")
    parser.add_argument("--symbol", required=True, help="Stock symbol, e.g. 2330")
    parser.add_argument(
        "--output",
        default="./reports",
        help="Output directory for text reports",
    )
    parser.add_argument(
        "--line-token",
        default=None,
        help="LINE Notify token (optional)",
    )
    parser.add_argument(
        "--provider",
        default="yfinance",
        help="Data provider (default: yfinance)",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    config = AppConfig(
        symbol=args.symbol,
        output_dir=Path(args.output),
        line_token=args.line_token,
        provider=args.provider,
    )
    report_path = run_bot(config)
    print(f"Report saved to {report_path}")


if __name__ == "__main__":
    main()
