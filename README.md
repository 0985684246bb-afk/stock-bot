# Stock Bot (台股收盤分析)

台股每日收盤後的股票分析 bot，支援單一股票、可擴充多股票、文字報告輸出，並可選擇推播至 LINE Notify。

## 功能
- 指定單一股票代號（可擴充為多股票）。
- 產生文字報告（可輸出到檔案或印在 console）。
- 可用 LINE Notify 推播。
- 可擴充分析事項（技術指標、事件等）。

## 快速開始

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

python -m stock_bot.cli --symbol 2330 --output ./reports --line-token "<TOKEN>"
```

> 若不需要 LINE 推播可省略 `--line-token`。

## 設計重點
- `data_providers.py` 封裝資料來源，方便未來改成券商 API。
- `analysis.py` 與 `report.py` 分離，便於擴充新的分析和報告格式。
- `line_notify.py` 以可選方式推播。
