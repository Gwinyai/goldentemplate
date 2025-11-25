// Google Analytics Integration Stub
// TODO: Implement Google Analytics 4 (GA4) integration when needed

export interface GAConfig {
  measurementId: string;
}

export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface GAPageView {
  page_title?: string;
  page_location?: string;
  page_referrer?: string;
  custom_parameters?: Record<string, any>;
}

export interface GAUserProperties {
  user_id?: string;
  custom_properties?: Record<string, any>;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function initializeGA(): void {
  const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  
  if (!measurementId) {
    console.warn("Google Analytics measurement ID not found. Set NEXT_PUBLIC_GOOGLE_ANALYTICS_ID in your .env file.");
    return;
  }

  // TODO: Load Google Analytics script
  // This would typically be done in a <Script> component in _app.tsx or layout.tsx
  console.warn("Google Analytics initialization not fully implemented");
  
  // Example of how it would be implemented:
  // const script1 = document.createElement('script');
  // script1.async = true;
  // script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  // document.head.appendChild(script1);

  // const script2 = document.createElement('script');
  // script2.innerHTML = `
  //   window.dataLayer = window.dataLayer || [];
  //   function gtag(){dataLayer.push(arguments);}
  //   gtag('js', new Date());
  //   gtag('config', '${measurementId}');
  // `;
  // document.head.appendChild(script2);
}

export function trackPageView(pageView: GAPageView = {}): void {
  if (typeof window === "undefined" || !window.gtag) {
    if (process.env.NODE_ENV === "development") {
      console.log("GA Page View (mock):", pageView);
    }
    return;
  }

  try {
    // TODO: Implement actual Google Analytics page view tracking
    // window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!, {
    //   page_title: pageView.page_title,
    //   page_location: pageView.page_location || window.location.href,
    //   page_referrer: pageView.page_referrer || document.referrer,
    //   ...pageView.custom_parameters,
    // });

    if (process.env.NODE_ENV === "development") {
      console.log("GA Page View (mock):", {
        page_location: pageView.page_location || window.location.href,
        page_title: pageView.page_title || document.title,
        ...pageView,
      });
    }
  } catch (error) {
    console.error("Google Analytics page view error:", error);
  }
}

export function trackEvent(event: GAEvent): void {
  if (typeof window === "undefined" || !window.gtag) {
    if (process.env.NODE_ENV === "development") {
      console.log("GA Event (mock):", event);
    }
    return;
  }

  try {
    // TODO: Implement actual Google Analytics event tracking
    // window.gtag('event', event.action, {
    //   event_category: event.category,
    //   event_label: event.label,
    //   value: event.value,
    //   ...event.custom_parameters,
    // });

    if (process.env.NODE_ENV === "development") {
      console.log("GA Event (mock):", event);
    }
  } catch (error) {
    console.error("Google Analytics event tracking error:", error);
  }
}

export function setUserProperties(properties: GAUserProperties): void {
  if (typeof window === "undefined" || !window.gtag) {
    if (process.env.NODE_ENV === "development") {
      console.log("GA User Properties (mock):", properties);
    }
    return;
  }

  try {
    // TODO: Implement actual Google Analytics user properties
    // if (properties.user_id) {
    //   window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!, {
    //     user_id: properties.user_id,
    //   });
    // }

    // if (properties.custom_properties) {
    //   window.gtag('set', properties.custom_properties);
    // }

    if (process.env.NODE_ENV === "development") {
      console.log("GA User Properties (mock):", properties);
    }
  } catch (error) {
    console.error("Google Analytics user properties error:", error);
  }
}

// Common tracking functions for typical SaaS events
export function trackSignUp(method: string = "email"): void {
  trackEvent({
    action: "sign_up",
    category: "engagement",
    label: method,
    custom_parameters: {
      method,
    },
  });
}

export function trackLogin(method: string = "email"): void {
  trackEvent({
    action: "login",
    category: "engagement",
    label: method,
    custom_parameters: {
      method,
    },
  });
}

export function trackSubscription(planName: string, value: number, currency: string = "USD"): void {
  trackEvent({
    action: "purchase",
    category: "ecommerce",
    label: planName,
    value,
    custom_parameters: {
      currency,
      transaction_id: `sub_${Date.now()}`,
      item_name: planName,
    },
  });
}

export function trackFeatureUse(featureName: string, category: string = "feature"): void {
  trackEvent({
    action: "feature_use",
    category,
    label: featureName,
    custom_parameters: {
      feature_name: featureName,
    },
  });
}

export function trackError(errorMessage: string, errorCategory: string = "javascript_error"): void {
  trackEvent({
    action: "exception",
    category: "error",
    label: errorCategory,
    custom_parameters: {
      description: errorMessage,
      fatal: false,
    },
  });
}

export function trackTiming(name: string, value: number, category: string = "timing"): void {
  trackEvent({
    action: "timing_complete",
    category,
    label: name,
    value,
    custom_parameters: {
      name,
      value,
    },
  });
}