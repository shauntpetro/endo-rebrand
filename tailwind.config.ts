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
        // Brand Core
        "gold-primary": "#C9A961",
        "gold-light": "#E5D4A6",
        "gold-dark": "#A68945",
        "black-primary": "#1A1A1A",
        "black-soft": "#2D2D2D",
        "cream-primary": "#F5F1E8",
        "plum-primary": "#4A3F5C",
        "coral-primary": "#FF6B6B",
        
        // New Palette
        "plum-dark": "#2E263A",
        "pastel-plum": "#F3F0F7",
        "pastel-gold": "#FAF7F0",
        "pastel-rose": "#FFF5F5",
        
        "gray-therapeutics": "#6B6B6B",
        "gray-light": "#F9F9F9",
        "gray-mid": "#E0E0E0",
        
        // Surface
        "surface": "#F8F9FA",

        // Accents
        "clinical-teal": "#4A9B8E",
        "warm-rose": "#D4A5A5",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        logo: ["var(--font-montserrat)", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(201, 169, 97, 0.4)",
        "gold-glow-lg": "0 0 40px rgba(201, 169, 97, 0.35)",
        "gold-glow-sm": "0 0 10px rgba(201, 169, 97, 0.3)",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(201, 169, 97, 0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(201, 169, 97, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
