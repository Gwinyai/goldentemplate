// Centralized Analytics Integration Layer
// Allows tracking events across multiple analytics providers

import {
  trackPageView as trackGAPageView,
  trackEvent as trackGAEvent,
  trackSignUp as trackGASignUp,
  trackLogin as trackGALogin,
  trackSubscription as trackGASubscription,
  trackFeatureUse as trackGAFeatureUse,
  trackError as trackGAError,
  setUserProperties as setGAUserProperties,
} from "./google-analytics";

import {
  trackPulserEvent,
  trackPulserPageView,
  identifyPulserUser,
  trackSignUpWithPulser,
  trackLoginWithPulser,
  trackSubscriptionWithPulser,
  trackFeatureUseWithPulser,
  trackErrorWithPulser,
} from "./pulser";

export type AnalyticsProvider = "google-analytics" | "pulser" | "all";

export interface AnalyticsConfig {
  providers: AnalyticsProvider[];
  userId?: string;
}

export interface UniversalPageView {
  url?: string;
  title?: string;
  referrer?: string;
  properties?: Record<string, any>;
}

export interface UniversalEvent {
  name: string;
  category?: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
  userId?: string;
}

export interface UniversalUser {
  userId: string;
  email?: string;
  properties?: Record<string, any>;
  traits?: Record<string, any>;
}

function getActiveProviders(): AnalyticsProvider[] {
  const providersEnv = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDERS;
  if (!providersEnv) {
    return ["google-analytics"]; // Default to GA
  }

  const providers = providersEnv.split(",").map(p => p.trim()) as AnalyticsProvider[];
  return providers.includes("all") ? ["google-analytics", "pulser"] : providers;
}

export async function trackPageView(pageView: UniversalPageView = {}): Promise<void> {
  const providers = getActiveProviders();

  const promises = providers.map(async (provider) => {
    try {
      switch (provider) {
        case "google-analytics":
          trackGAPageView({
            page_location: pageView.url,
            page_title: pageView.title,
            page_referrer: pageView.referrer,
            custom_parameters: pageView.properties,
          });
          break;

        case "pulser":
          await trackPulserPageView({
            url: pageView.url || (typeof window !== "undefined" ? window.location.href : ""),
            title: pageView.title,
            referrer: pageView.referrer,
            properties: pageView.properties,
          });
          break;
      }
    } catch (error) {
      console.error(`Analytics page view error (${provider}):`, error);
    }
  });

  // Don't wait for analytics to complete, but handle any errors gracefully
  Promise.all(promises).catch((error) => {
    console.error("Analytics page view errors:", error);
  });
}

export async function trackEvent(event: UniversalEvent): Promise<void> {
  const providers = getActiveProviders();

  const promises = providers.map(async (provider) => {
    try {
      switch (provider) {
        case "google-analytics":
          trackGAEvent({
            action: event.name,
            category: event.category || "engagement",
            label: event.label,
            value: event.value,
            custom_parameters: event.properties,
          });
          break;

        case "pulser":
          await trackPulserEvent({
            name: event.name,
            properties: {
              category: event.category,
              label: event.label,
              value: event.value,
              ...event.properties,
            },
            userId: event.userId,
          });
          break;
      }
    } catch (error) {
      console.error(`Analytics event tracking error (${provider}):`, error);
    }
  });

  Promise.all(promises).catch((error) => {
    console.error("Analytics event tracking errors:", error);
  });
}

export async function identifyUser(user: UniversalUser): Promise<void> {
  const providers = getActiveProviders();

  const promises = providers.map(async (provider) => {
    try {
      switch (provider) {
        case "google-analytics":
          setGAUserProperties({
            user_id: user.userId,
            custom_properties: {
              email: user.email,
              ...user.properties,
              ...user.traits,
            },
          });
          break;

        case "pulser":
          await identifyPulserUser({
            userId: user.userId,
            properties: { email: user.email, ...user.properties },
            traits: user.traits,
          });
          break;
      }
    } catch (error) {
      console.error(`Analytics user identification error (${provider}):`, error);
    }
  });

  Promise.all(promises).catch((error) => {
    console.error("Analytics user identification errors:", error);
  });
}

// Convenience functions for common SaaS events
export async function trackSignUp(
  userId: string,
  email: string,
  method: string = "email"
): Promise<void> {
  const providers = getActiveProviders();

  const promises = providers.map(async (provider) => {
    try {
      switch (provider) {
        case "google-analytics":
          trackGASignUp(method);
          break;

        case "pulser":
          await trackSignUpWithPulser(userId, email, method);
          break;
      }
    } catch (error) {
      console.error(`Analytics sign up tracking error (${provider}):`, error);
    }
  });

  Promise.all(promises).catch((error) => {
    console.error("Analytics sign up tracking errors:", error);
  });
}

export async function trackLogin(userId: string, method: string = "email"): Promise<void> {
  const providers = getActiveProviders();

  const promises = providers.map(async (provider) => {
    try {
      switch (provider) {
        case "google-analytics":
          trackGALogin(method);
          break;

        case "pulser":
          await trackLoginWithPulser(userId, method);
          break;
      }
    } catch (error) {
      console.error(`Analytics login tracking error (${provider}):`, error);
    }
  });

  Promise.all(promises).catch((error) => {
    console.error("Analytics login tracking errors:", error);
  });
}

export async function trackSubscription(
  userId: string,
  planName: string,
  amount: number,
  currency: string = "USD"
): Promise<void> {
  const providers = getActiveProviders();

  const promises = providers.map(async (provider) => {
    try {
      switch (provider) {
        case "google-analytics":
          trackGASubscription(planName, amount, currency);
          break;

        case "pulser":
          await trackSubscriptionWithPulser(userId, planName, amount, currency);
          break;
      }
    } catch (error) {
      console.error(`Analytics subscription tracking error (${provider}):`, error);
    }
  });

  Promise.all(promises).catch((error) => {
    console.error("Analytics subscription tracking errors:", error);
  });
}

export async function trackFeatureUse(
  featureName: string,
  userId?: string,
  context?: Record<string, any>
): Promise<void> {
  const providers = getActiveProviders();

  const promises = providers.map(async (provider) => {
    try {
      switch (provider) {
        case "google-analytics":
          trackGAFeatureUse(featureName);
          break;

        case "pulser":
          if (userId) {
            await trackFeatureUseWithPulser(userId, featureName, context);
          }
          break;
      }
    } catch (error) {
      console.error(`Analytics feature use tracking error (${provider}):`, error);
    }
  });

  Promise.all(promises).catch((error) => {
    console.error("Analytics feature use tracking errors:", error);
  });
}

export async function trackError(
  errorMessage: string,
  errorCategory: string = "javascript_error",
  userId?: string,
  context?: Record<string, any>
): Promise<void> {
  const providers = getActiveProviders();

  const promises = providers.map(async (provider) => {
    try {
      switch (provider) {
        case "google-analytics":
          trackGAError(errorMessage, errorCategory);
          break;

        case "pulser":
          await trackErrorWithPulser(errorMessage, errorCategory, userId, context);
          break;
      }
    } catch (error) {
      console.error(`Analytics error tracking error (${provider}):`, error);
    }
  });

  Promise.all(promises).catch((error) => {
    console.error("Analytics error tracking errors:", error);
  });
}

// Re-export provider-specific functions for direct usage when needed
export * from "./google-analytics";
export * from "./pulser";