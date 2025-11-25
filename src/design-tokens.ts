export interface DesignTokens {
  brandName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };
  themeMode: "light" | "dark" | "system";
  fonts: {
    primary: string;
    secondary: string;
  };
  effects: {
    gradients: {
      enabled: boolean;
    };
    shadows: {
      enabled: boolean;
      intensity: "light" | "medium" | "heavy";
    };
  };
}

export const tokens: DesignTokens = {
  brandName: "__VG_BRAND_NAME__",
  colors: {
    primary: "__VG_COLOR_PRIMARY__",
    secondary: "__VG_COLOR_SECONDARY__",
    accent: "__VG_COLOR_ACCENT__",
    neutral: "__VG_COLOR_NEUTRAL__",
  },
  themeMode: "light",
  fonts: {
    primary: "__VG_FONT_PRIMARY__",
    secondary: "__VG_FONT_SECONDARY__",
  },
  effects: {
    gradients: {
      enabled: false,
    },
    shadows: {
      enabled: false,
      intensity: "medium",
    },
  },
} as const;