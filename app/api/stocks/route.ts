import { NextResponse } from "next/server";
import { fetchAllStocks, fetchStockData } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker");
  if (ticker) return NextResponse.json(await fetchStockData(ticker));
  return NextResponse.json(await fetchAllStocks());
}
