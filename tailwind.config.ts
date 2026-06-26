import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#6366F1",
          glow: "#818CF8",
          muted: "#312E81",
        },
        surface: {
          base: "#0A0A0F",
          elevated: "#111118",
          card: "#16161F",
          raised: "#1C1C28",
          overlay: "#22223A",
        },
        risk: {
          critical: "#EF4444",
          high: "#F97316",
          medium: "#EAB308",
          low: "#22C55E",
        },
        ai: {
          surface: "#0F1729",
          border: "rgba(99, 102, 241, 0.25)",
          accent: "#A5B4FC",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      keyframes: {
        riskPulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.02)" },
        },
        wordReveal: {
          from: { opacity: "0", filter: "blur(4px)", transform: "translateY(4px)" },
          to: { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
        },
      },
      animation: {
        "risk-pulse": "riskPulse 2s ease-in-out infinite",
        "word-reveal": "wordReveal 0.15s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
