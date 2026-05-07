import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        muted: "#64748b",
        panel: "#ffffff",
        soft: "#f8fafc",
        brand: "#2563eb",
        gain: "#059669",
        loss: "#dc2626"
      },
      boxShadow: { card: "0 12px 32px rgba(15, 23, 42, 0.08)" }
    }
  },
  plugins: []
};
export default config;
