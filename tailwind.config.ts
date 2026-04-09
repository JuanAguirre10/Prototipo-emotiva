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
        primary: {
          DEFAULT: "#1A56A0",
          50: "#EBF2FB",
          100: "#D6E5F7",
          200: "#ADCBEF",
          300: "#85B0E7",
          400: "#5C96DF",
          500: "#337CD7",
          600: "#2265BE",
          700: "#1A56A0",
          800: "#134180",
          900: "#0C2B60",
        },
        accent: "#2D6CC0",
        lightblue: "#E8F0FB",
        success: "#0D7C6E",
        danger: "#C0392B",
        warning: "#F39C12",
        dark: "#333333",
        muted: "#666666",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0C2B60 0%, #1A56A0 50%, #2D6CC0 100%)",
        "card-gradient": "linear-gradient(135deg, #1A56A0 0%, #2D6CC0 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "count-up": "countUp 2s ease-out forwards",
        "slide-in": "slideIn 0.3s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-10px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
