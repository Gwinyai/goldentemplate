// Configuration Index
// Central exports for all configuration modules

export * from "./site";
export * from "./nav";
export * from "./features";
export * from "./integrations";

// Re-export commonly used items for convenience
export { siteConfig, contactInfo, legalInfo, getConfigValue } from "./site";
export { mainNav, dashboardNav, adminNav, footerNav, socialLinks } from "./nav";
export { isFeatureEnabled, getEnabledFeatures, useFeatureFlag } from "./features";
