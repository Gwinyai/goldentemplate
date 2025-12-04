import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--token-primary)",
        secondary: "var(--token-secondary)",
        accent: "var(--token-accent)",
        neutral: "var(--token-neutral)",
        success: "var(--token-success)",
        warning: "var(--token-warning)",
        danger: "var(--token-danger)",
        background: "var(--token-background)",
        surface: "var(--token-surface)",
        text: {
          primary: "var(--token-text-primary)",
          secondary: "var(--token-text-secondary)",
          muted: "var(--token-text-muted)",
          inverse: "var(--token-text-inverse)",
        },
        "muted-foreground": "var(--token-text-muted)",
        foreground: "var(--token-text-primary)",
        muted: {
          DEFAULT: "var(--token-neutral)",
          foreground: "var(--token-text-muted)"
        },
        border: {
          DEFAULT: "var(--token-border-default)",
          light: "var(--token-border-light)",
        },
      },
      fontFamily: {
        primary: "var(--token-font-primary)",
        secondary: "var(--token-font-secondary)",
        mono: "var(--token-font-mono)",
        sans: "var(--token-font-primary)",
        heading: "var(--token-font-secondary)",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        '2xl': "1.5rem",
        '3xl': "1.875rem",
        '4xl': "2.25rem",
        '5xl': "3rem",
        '6xl': "3.75rem",
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      lineHeight: {
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
      },
      borderRadius: {
        sm: "var(--token-radius-sm)",
        DEFAULT: "var(--token-radius-md)",
        md: "var(--token-radius-md)",
        lg: "var(--token-radius-lg)",
        xl: "var(--token-radius-xl)",
        pill: "var(--token-radius-pill)",
      },
      boxShadow: {
        sm: "var(--token-shadow-sm)",
        DEFAULT: "var(--token-shadow-md)",
        md: "var(--token-shadow-md)",
        lg: "var(--token-shadow-lg)",
        xl: "var(--token-shadow-xl)",
      },
      maxWidth: {
        page: "var(--token-spacing-page-max-width)",
      },
      spacing: {
        'section': "var(--token-spacing-section)",
        'section-mobile': "var(--token-spacing-section-mobile)",
        'container': "var(--token-spacing-container)",
        'container-mobile': "var(--token-spacing-container-mobile)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
        "gradient-secondary": "linear-gradient(to right, #06b6d4 0%, #3b82f6 100%)",
        "gradient-accent": "linear-gradient(to right, #ec4899 0%, #f472b6 100%)",
        "gradient-background": "linear-gradient(to bottom right, #0b1220 0%, #0f172a 50%, #111827 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "shimmer": "shimmer 2s infinite",
        "gradient": "gradient 8s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
