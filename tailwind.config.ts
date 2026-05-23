import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0B0E14",
          card: "#13161f",
          border: "#2B6EFF",
          blue: "#2B6EFF",
          purple: "#300D4F",
          pink: "#800080",
          plum: "#800080",
          mint: "#A0FFE3",
          lavender: "#C8B1FF",
          magenta: "#6B2D8E",
          yellow: "#A0FFE3",
          muted: "#D1D5DB",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "system-ui", "sans-serif"],
        body: ["var(--font-rajdhani)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 24px rgba(43, 110, 255, 0.35)",
        "neon-pink": "0 0 28px rgba(128, 0, 128, 0.3)",
        "neon-yellow": "0 0 24px rgba(160, 255, 227, 0.25)",
        "neon-mint": "0 0 24px rgba(160, 255, 227, 0.3)",
      },
      backgroundImage: {
        "cyber-gradient":
          "linear-gradient(90deg, #0B0E14 0%, #1a0a2e 35%, #300D4F 55%, #5a2060 80%, #800080 100%)",
        "cyber-gradient-overlay":
          "radial-gradient(ellipse 70% 60% at 15% 30%, rgba(43,110,255,0.12), transparent), radial-gradient(ellipse 50% 50% at 85% 70%, rgba(128,0,128,0.15), transparent), radial-gradient(ellipse 40% 30% at 50% 0%, rgba(200,177,255,0.06), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
