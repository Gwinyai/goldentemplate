import type { Config } from "tailwindcss";
import { tokens } from "./src/design-tokens";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        secondary: tokens.colors.secondary,
        accent: tokens.colors.accent,
        neutral: tokens.colors.neutral,
      },
      fontFamily: {
        sans: [tokens.fonts.primary, "system-ui", "sans-serif"],
        heading: [tokens.fonts.secondary, tokens.fonts.primary, "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;