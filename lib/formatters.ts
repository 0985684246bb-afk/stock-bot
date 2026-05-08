export const formatCurrency = (value: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: value > 1000 ? 0 : 2 }).format(value);
export const formatNumber = (value?: number) => (value === undefined ? "—" : new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value));
export const formatPercent = (value?: number) => (value === undefined ? "—" : `${(value * 100).toFixed(2)}%`);
export const formatLargeNumber = (value?: number) => {
  if (value === undefined) return "—";
  if (Math.abs(value) >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (Math.abs(value) >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (Math.abs(value) >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return formatCurrency(value);
};
export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");
