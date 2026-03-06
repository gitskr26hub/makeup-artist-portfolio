import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: "#fdfaf5",
          100: "#f9f1e1",
          200: "#f2e0b8",
          300: "#e8c87e",
          400: "#dba94a",
          500: "#c8922c",
          600: "#a97322",
          700: "#8a581e",
          800: "#6e441e",
          900: "#5a371c",
        },
        obsidian: {
          50: "#f5f5f5",
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#9e9e9e",
          400: "#757575",
          500: "#4a4a4a",
          600: "#333333",
          700: "#222222",
          800: "#141414",
          900: "#0a0a0a",
          950: "#050505",
        },
        blush: {
          50: "#fef5f5",
          100: "#fde8e8",
          200: "#fccece",
          300: "#f9a3a3",
          400: "#f47070",
          500: "#e84444",
          600: "#d42626",
          700: "#b21e1e",
          800: "#941c1c",
          900: "#7a1d1d",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        accent: ["'Playfair Display'", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 1s ease forwards",
        shimmer: "shimmer 2s infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
