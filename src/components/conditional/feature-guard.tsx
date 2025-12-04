"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  isUserAccountsEnabled, 
  isAdminEnabled, 
  isBlogEnabled, 
  isBillingEnabled 
} from "@/lib/config";

interface FeatureGuardProps {
  feature: "userAccounts" | "admin" | "blog" | "billing";
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface DisabledFeatureMessageProps {
  feature: "userAccounts" | "admin" | "blog" | "billing";
  title?: string;
  description?: string;
}

const featureConfig = {
  userAccounts: {
    title: "User Accounts Not Enabled",
    description: "User account features are not currently enabled in this template.",
    icon: "👤",
    setupSteps: [
      "Set NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=true",
      "Configure authentication provider (Supabase/Firebase)",
      "Set up database schemas for user data",
    ],
  },
  admin: {
    title: "Admin Panel Not Enabled", 
    description: "Administrative features are not currently enabled in this template.",
    icon: "⚙️",
    setupSteps: [
      "Set NEXT_PUBLIC_ADMIN_ENABLED=true",
      "Configure admin user roles in your database",
      "Set up admin authentication flow",
    ],
  },
  blog: {
    title: "Blog Not Enabled",
    description: "Blog features are not currently enabled in this template.",
    icon: "📝",
    setupSteps: [
      "Set NEXT_PUBLIC_BLOG_ENABLED=true", 
      "Configure content management system",
      "Set up blog post database schemas",
    ],
  },
  billing: {
    title: "Billing Not Configured",
    description: "Billing and payment features are not currently configured in this template.",
    icon: "💳",
    setupSteps: [
      "Set NEXT_PUBLIC_PAYMENTS_PROVIDER to 'stripe' or 'lemonsqueezy'",
      "Configure payment provider API keys",
      "Set up subscription plans and pricing",
    ],
  },
};

function DisabledFeatureMessage({ feature, title, description }: DisabledFeatureMessageProps) {
  const config = featureConfig[feature];
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">{config.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{displayTitle}</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {displayDescription}
              </p>
              
              <div className="text-left max-w-md mx-auto mb-6">
                <h3 className="text-lg font-semibold mb-3">To enable this feature:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  {config.setupSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <p>
                  This page is shown because the feature flag for <code>{feature}</code> is disabled.
                </p>
                <p>
                  In a generated template, this would be controlled by the TemplateConfig during generation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function FeatureGuard({ feature, fallback, children }: FeatureGuardProps) {
  const isEnabled = React.useMemo(() => {
    switch (feature) {
      case "userAccounts":
        return isUserAccountsEnabled();
      case "admin":
        return isAdminEnabled();
      case "blog":
        return isBlogEnabled();
      case "billing":
        return isBillingEnabled();
      default:
        return false;
    }
  }, [feature]);

  if (!isEnabled) {
    return fallback || <DisabledFeatureMessage feature={feature} />;
  }

  return <>{children}</>;
}

// HOC for pages that require specific features
export function withFeature<P extends object>(
  feature: "userAccounts" | "admin" | "blog" | "billing",
  fallback?: React.ComponentType<P>
) {
  return function FeatureWrappedComponent(Component: React.ComponentType<P>) {
    const WrappedComponent = (props: P) => {
      return (
        <FeatureGuard 
          feature={feature} 
          fallback={fallback ? React.createElement(fallback, props) : undefined}
        >
          <Component {...props} />
        </FeatureGuard>
      );
    };

    WrappedComponent.displayName = `withFeature(${feature})(${Component.displayName || Component.name})`;
    return WrappedComponent;
  };
}

// Route-level component for conditional rendering
export function ConditionalRoute({ 
  feature, 
  children, 
  fallback 
}: {
  feature: "userAccounts" | "admin" | "blog" | "billing";
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <FeatureGuard feature={feature} fallback={fallback}>
      {children}
    </FeatureGuard>
  );
}

// Helper component for development mode feature toggle warnings
export function FeatureToggleWarning({ feature }: { feature: string }) {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg z-50">
      <div className="text-sm">
        <div className="font-medium text-yellow-800 mb-1">Development Mode</div>
        <div className="text-yellow-700">
          Feature <code className="bg-yellow-100 px-1 rounded">{feature}</code> is currently disabled. 
          Check your environment variables to enable.
        </div>
      </div>
    </div>
  );
}