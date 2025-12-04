export interface DesignTokens {
  brandName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    success: string;
    warning: string;
    danger: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
      inverse: string;
    };
    border: {
      default: string;
      light: string;
    };
  };
  typography: {
    fonts: {
      primary: string;
      secondary: string;
      mono: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
    fontWeights: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
    };
    lineHeights: {
      tight: string;
      normal: string;
      relaxed: string;
    };
    letterSpacing: {
      tight: string;
      normal: string;
      wide: string;
    };
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    pill: string;
  };
  components: {
    button: {
      sizes: {
        xs: { padding: string; text: string; font: string; };
        sm: { padding: string; text: string; font: string; };
        md: { padding: string; text: string; font: string; };
        lg: { padding: string; text: string; font: string; };
        xl: { padding: string; text: string; font: string; };
      };
    };
    input: {
      sizes: {
        sm: { padding: string; text: string; };
        md: { padding: string; text: string; };
        lg: { padding: string; text: string; };
      };
    };
    card: {
      padding: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };
    icon: {
      sizes: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };
  };
  spacing: {
    pageMaxWidth: string;
    sectionPadding: {
      mobile: string;
      desktop: string;
    };
    containerPadding: {
      mobile: string;
      desktop: string;
    };
  };
  effects: {
    gradients: {
      enabled: boolean;
      primary: {
        from: string;
        via: string;
        to: string;
        direction: string;
      };
      secondary: {
        from: string;
        to: string;
        direction: string;
      };
      accent: {
        from: string;
        to: string;
        direction: string;
      };
      background: {
        from: string;
        via: string;
        to: string;
        direction: string;
      };
    };
    shadows: {
      enabled: boolean;
      intensity: "light" | "medium" | "heavy";
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
}

export const tokens: DesignTokens = {
  brandName: "VibeGuide",
  colors: {
    // Deep violet primary - modern and punchy
    primary: "#7c3aed",
    // Brightened secondary violet
    secondary: "#a855f7",
    // Electric cyan accent - fresh and attention-grabbing
    accent: "#06b6d4",
    // Cool slate neutral - sophisticated and readable on dark
    neutral: "#94a3b8",
    // Status colors - vivid and clear
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    // Surface colors - dark theme
    background: "#0b1220",
    surface: "#111827",

    text: {
      primary: "#e2e8f0",      // slate-200
      secondary: "#cbd5e1",    // slate-300
      muted: "#94a3b8",        // slate-400
      inverse: "#0b1220"       // dark on light surfaces if needed
    },

    border: {
      default: "#1f2937",      // slate-800
      light: "#243045"         // custom dark border
    }
  },
  typography: {
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      secondary: "'Poppins', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace"
    },
    
    fontSizes: {
      xs: "0.75rem",          // 12px
      sm: "0.875rem",         // 14px
      base: "1rem",           // 16px
      lg: "1.125rem",         // 18px
      xl: "1.25rem",          // 20px
      '2xl': "1.5rem",        // 24px
      '3xl': "1.875rem",      // 30px
      '4xl': "2.25rem",       // 36px
      '5xl': "3rem",          // 48px
      '6xl': "3.75rem"        // 60px
    },
    
    fontWeights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800"
    },
    
    lineHeights: {
      tight: "1.25",          // For headings
      normal: "1.5",          // For body text
      relaxed: "1.75"         // For comfortable reading
    },
    
    letterSpacing: {
      tight: "-0.025em",      // For large headings
      normal: "0",            // Default
      wide: "0.025em"         // For uppercase text
    }
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    pill: "9999px",
  },
  components: {
    button: {
      sizes: {
        xs: { padding: "px-3 py-1.5", text: "text-xs", font: "font-medium" },
        sm: { padding: "px-4 py-2", text: "text-sm", font: "font-medium" },
        md: { padding: "px-6 py-3", text: "text-base", font: "font-semibold" },
        lg: { padding: "px-8 py-4", text: "text-lg", font: "font-semibold" },
        xl: { padding: "px-10 py-5", text: "text-xl", font: "font-bold" }
      }
    },
    input: {
      sizes: {
        sm: { padding: "px-3 py-2", text: "text-sm" },
        md: { padding: "px-4 py-3", text: "text-base" },
        lg: { padding: "px-5 py-4", text: "text-lg" }
      }
    },
    card: {
      padding: {
        xs: "p-3",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-12"
      }
    },
    icon: {
      sizes: {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8"
      }
    }
  },
  spacing: {
    pageMaxWidth: "1280px",
    sectionPadding: {
      mobile: "4rem",         // py-16
      desktop: "6rem"         // py-24
    },
    containerPadding: {
      mobile: "1rem",         // px-4
      desktop: "2rem"         // px-8
    }
  },
  effects: {
    gradients: {
      enabled: true,
      primary: {
        from: "#7c3aed",
        via: "#a855f7",
        to: "#ec4899",
        direction: "to-br"
      },
      secondary: {
        from: "#06b6d4",
        to: "#3b82f6",
        direction: "to-r"
      },
      accent: {
        from: "#ec4899",
        to: "#f472b6",
        direction: "to-r"
      },
      background: {
        from: "#faf5ff",
        via: "#ffffff",
        to: "#f0f9ff",
        direction: "to-br"
      }
    },
    shadows: {
      enabled: true,
      intensity: "medium",
      sm: "0 1px 3px 0 rgba(99, 102, 241, 0.1), 0 1px 2px -1px rgba(99, 102, 241, 0.1)",
      md: "0 4px 6px -1px rgba(99, 102, 241, 0.15), 0 2px 4px -2px rgba(99, 102, 241, 0.1)",
      lg: "0 10px 15px -3px rgba(99, 102, 241, 0.2), 0 4px 6px -4px rgba(99, 102, 241, 0.15)",
      xl: "0 20px 25px -5px rgba(99, 102, 241, 0.25), 0 8px 10px -6px rgba(99, 102, 241, 0.2)",
    },
  },
} as const;
