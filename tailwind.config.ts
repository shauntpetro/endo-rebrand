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
        
        // Accents
        "clinical-teal": "#4A9B8E",
        "warm-rose": "#D4A5A5",
        "deep-plum": "#4A3F5C",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        logo: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
