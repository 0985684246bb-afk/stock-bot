# Smart DRIP Portfolio Tracker

A stock and ETF dashboard for long-term investors to track portfolio performance, dividends, DRIP projections, quality checks, and scenario-based price forecasts.

## MVP Scope

This project is a **Smart DRIP Portfolio Tracker / 小資複利追蹤器** built with mock data first. It is designed for long-term investors who want to understand total return, fees, dividend reinvestment, valuation risk, risk concentration, and scenario outcomes rather than short-term trading signals.

Core principles:

- Low share price does not mean cheap valuation.
- Long-term investing should consider total return, expense ratio, valuation, risk, and asset allocation.
- Forecasting must use Bear / Base / Bull scenarios instead of a single target price.
- ETF projections should focus on compounding, annualized return assumptions, expense drag, dividend reinvestment, and contributions.
- Forecasts are educational estimates and are not investment advice.

## Features

- Dashboard
  - Total portfolio value, total cost, unrealized gain/loss, annual dividend estimate.
  - Asset allocation, recent performance, top winners, top losers, and risk alerts.
- Watchlist
  - Add, remove, search, and sort tickers.
  - Supports US stocks, US ETFs, Taiwan ETFs, and mock high-risk test symbols.
  - Displays low price / high PE warning.
- Portfolio
  - Add holdings with localStorage persistence.
  - Calculates market value, total cost, gain/loss, portfolio weight, estimated dividends, and risk alerts.
- Stock Detail
  - Header, price chart, metrics, fundamentals, technical indicators, ETF holdings, and quality checks.
- Dividend / DRIP Simulator
  - Simulates no reinvestment, DRIP-only, and monthly contribution + DRIP strategies.
- ETF Compare
  - Compare 2 to 4 securities by price, returns, volatility, fees, AUM, holdings concentration, quality, and estimated overlap.
- Forecast Lab
  - Bear / Base / Bull scenario ranges, confidence score, Monte Carlo simulation, ETF long-term projection, PE multiple valuation for stocks, and rule-based summary.
- Quality Check
  - Detects low price traps, high expense ratios, limited history, low liquidity, yield traps, concentration risk, and overlap risk.
- Investment Journal
  - Stores ticker-specific investment notes in localStorage.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Recharts
- React components
- Mock data with a provider-ready API abstraction

## Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:3000> and the app redirects to `/dashboard`.

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in API keys as needed:

```bash
NEXT_PUBLIC_APP_NAME=Smart DRIP Portfolio Tracker
STOCK_API_PROVIDER=mock
ALPHA_VANTAGE_API_KEY=
FINNHUB_API_KEY=
POLYGON_API_KEY=
```

API keys are reserved for server-side API routes and `lib/api.ts`. Do not expose provider secrets in client components.

## Mock Data

The MVP includes mock data for:

- AAPL
- MSFT
- NVDA
- SCHG
- VOO
- QQQM
- SPY
- 00878.TW
- 006208.TW
- 0050.TW
- MOCK_LOW_PRICE_HIGH_PE
- MOCK_HIGH_YIELD_TRAP
- MOCK_NEW_ETF

## Forecast Disclaimer

Forecasts are based on historical data and assumptions. They are not financial advice. Actual results may differ materially from Bear / Base / Bull scenarios and Monte Carlo percentile ranges.

## Future Extensions

- Supabase login
- Supabase or PostgreSQL persistence
- Real-time quote API
- Alpha Vantage / Finnhub / Polygon / Twelve Data integrations
- AI news summary
- Tax tracking
- Crypto tracking
- Broker import
- Dividend calendar
