// Features Configuration
// Central configuration for feature flags and toggles
// Use __VG_*__ placeholders for generator replacement

export interface FeatureFlag {
  name: string;
  description: string;
  enabled: boolean;
  environments?: ("development" | "staging" | "production")[];
  plans?: ("free" | "pro" | "enterprise")[];
  roles?: ("user" | "admin" | "moderator")[];
  percentage?: number; // For gradual rollouts (0-100)
  dependencies?: string[]; // Other features this depends on
}

export interface FeatureSection {
  name: string;
  description: string;
  features: FeatureFlag[];
}

// Core application features
export const coreFeatures: FeatureSection = {
  name: "Core Features",
  description: "Essential application functionality",
  features: [
    {
      name: "user_authentication",
      description: "User login and registration system",
      enabled: true,
      environments: ["development", "staging", "production"],
      plans: ["free", "pro", "enterprise"],
    },
    {
      name: "user_dashboard",
      description: "User dashboard and account management",
      enabled: true,
      environments: ["development", "staging", "production"],
      plans: ["free", "pro", "enterprise"],
    },
    {
      name: "admin_panel",
      description: "Administrative interface and controls",
      enabled: true,
      environments: ["development", "staging", "production"],
      roles: ["admin"],
    },
    {
      name: "blog_system",
      description: "Blog content management system",
      enabled: true,
      environments: ["development", "staging", "production"],
      plans: ["free", "pro", "enterprise"],
    },
  ],
};

// Premium features (requiring paid plans)
export const premiumFeatures: FeatureSection = {
  name: "Premium Features",
  description: "Advanced features for paid subscribers",
  features: [
    {
      name: "advanced_analytics",
      description: "Detailed analytics and reporting",
      enabled: true,
      environments: ["development", "staging", "production"],
      plans: ["pro", "enterprise"],
    },
    {
      name: "team_collaboration",
      description: "Team member management and collaboration tools",
      enabled: true,
      environments: ["development", "staging", "production"],
      plans: ["pro", "enterprise"],
    },
    {
      name: "api_access",
      description: "REST API access for integrations",
      enabled: true,
      environments: ["development", "staging", "production"],
      plans: ["pro", "enterprise"],
    },
    {
      name: "custom_branding",
      description: "Custom branding and white-label options",
      enabled: true,
      environments: ["development", "staging", "production"],
      plans: ["enterprise"],
    },
    {
      name: "priority_support",
      description: "Priority customer support access",
      enabled: true,
      environments: ["development", "staging", "production"],
      plans: ["pro", "enterprise"],
    },
  ],
};

// Experimental features (gradual rollout)
export const experimentalFeatures: FeatureSection = {
  name: "Experimental Features",
  description: "New features being tested and rolled out",
  features: [
    {
      name: "__VG_EXPERIMENTAL_FEATURE_1__",
      description: "__VG_EXPERIMENTAL_FEATURE_1_DESCRIPTION__",
      enabled: false,
      environments: ["development", "staging"],
      percentage: 10, // Only show to 10% of users
    },
    {
      name: "__VG_EXPERIMENTAL_FEATURE_2__",
      description: "__VG_EXPERIMENTAL_FEATURE_2_DESCRIPTION__",
      enabled: false,
      environments: ["development"],
      percentage: 5, // Only show to 5% of users
    },
    {
      name: "beta_ui",
      description: "New user interface design (beta)",
      enabled: false,
      environments: ["development", "staging"],
      percentage: 25,
    },
    {
      name: "ai_features",
      description: "AI-powered features and suggestions",
      enabled: false,
      environments: ["development"],
      plans: ["pro", "enterprise"],
      percentage: 15,
    },
  ],
};

// Integration features
export const integrationFeatures: FeatureSection = {
  name: "Integrations",
  description: "Third-party service integrations",
  features: [
    {
      name: "stripe_payments",
      description: "Stripe payment processing",
      enabled: true,
      environments: ["development", "staging", "production"],
      plans: ["free", "pro", "enterprise"],
    },
    {
      name: "lemonsqueezy_payments",
      description: "LemonSqueezy payment processing",
      enabled: true,
      environments: ["development", "staging", "production"],
      plans: ["free", "pro", "enterprise"],
    },
    {
      name: "google_analytics",
      description: "Google Analytics tracking",
      enabled: true,
      environments: ["development", "staging", "production"],
      plans: ["free", "pro", "enterprise"],
    },
    {
      name: "email_notifications",
      description: "Email notification system",
      enabled: true,
      environments: ["development", "staging", "production"],
      plans: ["free", "pro", "enterprise"],
    },
    {
      name: "social_auth",
      description: "Social media authentication (Google, GitHub, etc.)",
      enabled: false,
      environments: ["development", "staging", "production"],
      plans: ["free", "pro", "enterprise"],
    },
  ],
};

// All feature sections
export const allFeatures: FeatureSection[] = [
  coreFeatures,
  premiumFeatures,
  experimentalFeatures,
  integrationFeatures,
];

// Development defaults for experimental features
export const devFeatureDefaults = {
  experimentalFeature1: "advanced_search",
  experimentalFeature1Description: "Enhanced search functionality with filters",
  experimentalFeature2: "real_time_collaboration",
  experimentalFeature2Description: "Real-time collaborative editing features",
};

// Helper functions for feature checking
export function isFeatureEnabled(
  featureName: string,
  context?: {
    environment?: string;
    plan?: string;
    role?: string;
    userId?: string;
  }
): boolean {
  // Find the feature across all sections
  let feature: FeatureFlag | undefined;
  
  for (const section of allFeatures) {
    feature = section.features.find(f => f.name === featureName);
    if (feature) break;
  }

  if (!feature) {
    console.warn(`Feature "${featureName}" not found`);
    return false;
  }

  // Basic enabled check
  if (!feature.enabled) {
    return false;
  }

  // Environment check
  if (feature.environments && context?.environment) {
    if (!feature.environments.includes(context.environment as any)) {
      return false;
    }
  }

  // Plan check
  if (feature.plans && context?.plan) {
    if (!feature.plans.includes(context.plan as any)) {
      return false;
    }
  }

  // Role check
  if (feature.roles && context?.role) {
    if (!feature.roles.includes(context.role as any)) {
      return false;
    }
  }

  // Percentage rollout check
  if (feature.percentage !== undefined && context?.userId) {
    const hash = simpleHash(context.userId + featureName);
    const userPercentage = hash % 100;
    if (userPercentage >= feature.percentage) {
      return false;
    }
  }

  // Dependency check
  if (feature.dependencies) {
    for (const dependency of feature.dependencies) {
      if (!isFeatureEnabled(dependency, context)) {
        return false;
      }
    }
  }

  return true;
}

export function getEnabledFeatures(context?: {
  environment?: string;
  plan?: string;
  role?: string;
  userId?: string;
}): string[] {
  const enabled: string[] = [];
  
  for (const section of allFeatures) {
    for (const feature of section.features) {
      if (isFeatureEnabled(feature.name, context)) {
        enabled.push(feature.name);
      }
    }
  }
  
  return enabled;
}

export function getFeatureConfig(featureName: string): FeatureFlag | null {
  for (const section of allFeatures) {
    const feature = section.features.find(f => f.name === featureName);
    if (feature) return feature;
  }
  return null;
}

export function getFeaturesBySection(sectionName: string): FeatureFlag[] {
  const section = allFeatures.find(s => s.name === sectionName);
  return section?.features || [];
}

export function getFeaturesByPlan(plan: string): FeatureFlag[] {
  const features: FeatureFlag[] = [];
  
  for (const section of allFeatures) {
    for (const feature of section.features) {
      if (!feature.plans || feature.plans.includes(plan as any)) {
        features.push(feature);
      }
    }
  }
  
  return features;
}

// Template configuration integration
// These functions bridge between TemplateConfig and our feature system
import type { TemplateConfig } from "@/lib/types/template";

export interface LegacyTemplateConfig {
  features: {
    userAccounts: boolean;
    blog: boolean;
  };
  admin: {
    superAdminEnabled: boolean;
  };
  payments: {
    provider: "stripe" | "lemonsqueezy" | "none";
  };
}

// Get template config from multiple sources with fallback hierarchy
export function getTemplateConfig(): LegacyTemplateConfig {
  // Priority order:
  // 1. Environment variables (for development/testing)
  // 2. TemplateConfig file (for generated templates) 
  // 3. Default values

  // First try to load from a generated template config file
  let templateConfig: Partial<TemplateConfig> = {};
  try {
    // In a real generated template, this would be replaced with the actual config
    // For now, we'll simulate with environment-based defaults
    templateConfig = {};
  } catch (error) {
    // Config file doesn't exist, use fallback
  }

  return {
    features: {
      userAccounts: 
        process.env.NEXT_PUBLIC_USER_ACCOUNTS_ENABLED !== "false" &&
        templateConfig?.features?.auth?.enabled !== false,
      blog: 
        process.env.NEXT_PUBLIC_BLOG_ENABLED !== "false" &&
        templateConfig?.features?.blog?.enabled !== false,
    },
    admin: {
      superAdminEnabled: 
        process.env.NEXT_PUBLIC_ADMIN_ENABLED !== "false" &&
        templateConfig?.features?.admin?.enabled !== false,
    },
    payments: {
      provider: 
        (process.env.NEXT_PUBLIC_PAYMENTS_PROVIDER as any) ||
        (templateConfig?.features?.billing?.provider === "stripe" ? "stripe" :
         templateConfig?.features?.billing?.provider === "lemonsqueezy" ? "lemonsqueezy" :
         templateConfig?.features?.billing?.provider === "paddle" ? "stripe" : // fallback paddle to stripe
         "none"),
    },
  };
}

// Helper function to check if user accounts are enabled
export function isUserAccountsEnabled(): boolean {
  const config = getTemplateConfig();
  return config.features.userAccounts;
}

// Helper function to check if admin is enabled
export function isAdminEnabled(): boolean {
  const config = getTemplateConfig();
  return config.admin.superAdminEnabled;
}

// Helper function to check if blog is enabled
export function isBlogEnabled(): boolean {
  const config = getTemplateConfig();
  return config.features.blog;
}

// Helper function to check payments provider
export function getPaymentsProvider(): "stripe" | "lemonsqueezy" | "none" {
  const config = getTemplateConfig();
  return config.payments.provider;
}

// Helper function to check if billing should be shown
export function isBillingEnabled(): boolean {
  return getPaymentsProvider() !== "none";
}

// Helper function to get current environment
export function getCurrentEnvironment(): string {
  return process.env.NODE_ENV || "development";
}

// Helper function to get user context from request/session
export function getFeatureContext(user?: {
  id: string;
  plan?: string;
  role?: string;
}): {
  environment: string;
  plan?: string;
  role?: string;
  userId?: string;
} {
  return {
    environment: getCurrentEnvironment(),
    plan: user?.plan,
    role: user?.role,
    userId: user?.id,
  };
}

// Simple hash function for percentage rollouts
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Feature flag middleware for API routes
export function withFeatureFlag(featureName: string) {
  return function (handler: Function) {
    return async function (req: any, res: any, ...args: any[]) {
      // TODO: Extract user context from request
      const context = getFeatureContext();
      
      if (!isFeatureEnabled(featureName, context)) {
        return res.status(404).json({ error: "Feature not available" });
      }
      
      return handler(req, res, ...args);
    };
  };
}

// React hook for feature flags (to be used in components)
export function useFeatureFlag(featureName: string, user?: {
  id: string;
  plan?: string;
  role?: string;
}): boolean {
  const context = getFeatureContext(user);
  return isFeatureEnabled(featureName, context);
}

// Helper to replace placeholder feature names with dev defaults
export function getFeatureName(featureName: string): string {
  if (featureName.startsWith("__VG_") && featureName.endsWith("__")) {
    const key = featureName.toLowerCase().replace(/__vg_|__/g, "");
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    return (devFeatureDefaults as any)[camelKey] || featureName;
  }
  return featureName;
}

export function getFeatureDescription(description: string): string {
  if (description.startsWith("__VG_") && description.endsWith("__")) {
    const key = description.toLowerCase().replace(/__vg_|__/g, "");
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    return (devFeatureDefaults as any)[camelKey] || description;
  }
  return description;
}