import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { DashboardShell } from "@/components/layout/DashboardShell";

export const metadata: Metadata = {
  title: "Smart DRIP Portfolio Tracker",
  description: "Long-term stock and ETF portfolio tracker with DRIP projections and scenario forecasts."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body><DashboardShell>{children}</DashboardShell></body>
    </html>
  );
}
