"use client";

import React from "react";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge } from "@/components/ui";

interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaHref: string;
  stripePriceId?: string;
  lemonsqueezyVariantId?: string;
}

interface PricingSectionProps {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
  billingToggle?: boolean;
  defaultBilling?: "monthly" | "yearly";
}

export function PricingSection({
  title,
  subtitle,
  plans,
  billingToggle = true,
  defaultBilling = "monthly",
}: PricingSectionProps) {
  const [billing, setBilling] = React.useState<"monthly" | "yearly">(defaultBilling);

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return "Free";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-heading font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {subtitle}
            </p>
          )}

          {/* Billing Toggle */}
          {billingToggle && (
            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center rounded-full bg-background p-1 shadow-sm">
                <button
                  onClick={() => setBilling("monthly")}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    billing === "monthly"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling("yearly")}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                    billing === "yearly"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Yearly
                  <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const currentPrice = billing === "monthly" ? plan.price.monthly : plan.price.yearly;
            const yearlyDiscount = plan.price.monthly > 0 
              ? Math.round((1 - plan.price.yearly / (plan.price.monthly * 12)) * 100)
              : 0;

            return (
              <Card 
                key={index}
                className={`relative ${
                  plan.popular 
                    ? "ring-2 ring-primary shadow-lg scale-105" 
                    : "hover:shadow-md transition-shadow"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-center">
                      <span className="text-4xl font-bold">
                        {formatPrice(currentPrice, plan.price.currency)}
                      </span>
                      {currentPrice > 0 && (
                        <span className="text-muted-foreground ml-2">
                          /{billing === "monthly" ? "month" : "year"}
                        </span>
                      )}
                    </div>
                    
                    {billing === "yearly" && yearlyDiscount > 0 && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <span className="line-through">
                          {formatPrice(plan.price.monthly * 12, plan.price.currency)}/year
                        </span>
                        <span className="ml-2 text-green-600 font-medium">
                          Save {yearlyDiscount}%
                        </span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <svg
                          className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link href={plan.ctaHref}>
                      {plan.ctaText}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Bottom Text */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Cancel anytime
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Secure payments
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364" />
              </svg>
              24/7 support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default Pricing Section with placeholder content
export function DefaultPricingSection() {
  const defaultPlans: PricingPlan[] = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      price: {
        monthly: 0,
        yearly: 0,
        currency: "USD",
      },
      features: [
        "__VG_PLAN_STARTER_FEATURE_1__",
        "__VG_PLAN_STARTER_FEATURE_2__",
        "__VG_PLAN_STARTER_FEATURE_3__",
        "__VG_PLAN_STARTER_FEATURE_4__",
      ],
      ctaText: "Get Started Free",
      ctaHref: "/register",
      stripePriceId: "__VG_STRIPE_PRICE_STARTER__",
    },
    {
      name: "Professional",
      description: "Ideal for growing teams and businesses",
      price: {
        monthly: 29,
        yearly: 290,
        currency: "USD",
      },
      features: [
        "__VG_PLAN_PRO_FEATURE_1__",
        "__VG_PLAN_PRO_FEATURE_2__",
        "__VG_PLAN_PRO_FEATURE_3__",
        "__VG_PLAN_PRO_FEATURE_4__",
        "__VG_PLAN_PRO_FEATURE_5__",
        "__VG_PLAN_PRO_FEATURE_6__",
      ],
      popular: true,
      ctaText: "Start Free Trial",
      ctaHref: "/register?plan=professional",
      stripePriceId: "__VG_STRIPE_PRICE_PRO__",
      lemonsqueezyVariantId: "__VG_LS_VARIANT_PRO__",
    },
    {
      name: "Enterprise",
      description: "Advanced features for large organizations",
      price: {
        monthly: 99,
        yearly: 990,
        currency: "USD",
      },
      features: [
        "__VG_PLAN_ENTERPRISE_FEATURE_1__",
        "__VG_PLAN_ENTERPRISE_FEATURE_2__",
        "__VG_PLAN_ENTERPRISE_FEATURE_3__",
        "__VG_PLAN_ENTERPRISE_FEATURE_4__",
        "__VG_PLAN_ENTERPRISE_FEATURE_5__",
        "__VG_PLAN_ENTERPRISE_FEATURE_6__",
        "__VG_PLAN_ENTERPRISE_FEATURE_7__",
        "__VG_PLAN_ENTERPRISE_FEATURE_8__",
      ],
      ctaText: "Contact Sales",
      ctaHref: "/contact",
      stripePriceId: "__VG_STRIPE_PRICE_ENTERPRISE__",
      lemonsqueezyVariantId: "__VG_LS_VARIANT_ENTERPRISE__",
    },
  ];

  return (
    <PricingSection
      title="__VG_PRICING_SECTION_TITLE__"
      subtitle="__VG_PRICING_SECTION_SUBTITLE__"
      plans={defaultPlans}
      billingToggle={true}
      defaultBilling="monthly"
    />
  );
}