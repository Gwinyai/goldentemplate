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
    <section className="py-section-mobile md:py-section">
      <div className="container mx-auto px-container-mobile md:px-container max-w-page">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="section-title">
            <span>{title}</span>
          </h2>
          {subtitle && (
            <p className="mt-6 section-description">
              {subtitle}
            </p>
          )}

          {/* Billing Toggle */}
          {billingToggle && (
            <div className="mt-8 flex items-center justify-center">
              <div className="relative inline-flex items-center rounded-full bg-surface border border-border px-1 py-1 shadow-lg overflow-hidden">
                <span
                  className={`absolute inset-y-1 w-28 rounded-full bg-primary shadow-md transition-transform duration-300 ease-out z-0 ${billing === "monthly" ? "billing-toggle-active" : "billing-toggle-yearly"}`}
                  style={{ left: 0 }}
                />
                {(["monthly","yearly"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setBilling(option)}
                    className={`relative z-10 px-6 py-2.5 text-sm font-semibold transition-colors duration-300 rounded-full w-28 ${
                      billing === option
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {option === "monthly" ? "Monthly" : "Yearly"}
                  </button>
                ))}
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
                className={`relative group transition-all duration-300 bg-surface/80 backdrop-blur-md border-border/60 ${
                  plan.popular 
                    ? "ring-2 ring-primary shadow-lg shadow-primary/30 lg:-translate-y-2"
                    : "hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {plan.popular && (
                  <>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge
                        variant="default"
                        className="border-transparent shadow-lg ring-1 px-4 py-1.5 font-bold hover:shadow-primary badge-popular"
                      >
                        Most Popular
                      </Badge>
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 -z-10" />
                  </>
                )}

                <CardHeader className="text-center pb-8 relative z-10">
                  <CardTitle className="text-xl text-text-primary">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-center">
                      <span className={`text-4xl font-bold ${plan.popular ? "text-gradient-primary" : "text-text-primary"}`}>
                        {formatPrice(currentPrice, plan.price.currency)}
                      </span>
                      {currentPrice > 0 && (
                        <span className="text-muted-foreground ml-2 text-base">
                          /{billing === "monthly" ? "month" : "year"}
                        </span>
                      )}
                    </div>
                    
                    {billing === "yearly" && yearlyDiscount > 0 && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        <span className="line-through">
                          {formatPrice(plan.price.monthly * 12, plan.price.currency)}/year
                        </span>
                        <span className="ml-2 text-success font-medium">
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
                    className={`w-full transition-all duration-300 ${plan.popular ? "btn-primary" : "btn-secondary"}`}
                    variant={plan.popular ? "default" : "secondary"}
                    size="lg"
                    asChild
                  >
                    <Link href={plan.ctaHref}>
                      {plan.ctaText}
                      {plan.popular && (
                        <svg
                          className="ml-2 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      )}
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
        "Complete Next.js 14 + TypeScript setup",
        "Authentication with multiple providers",
        "Basic UI components library",
        "Community support & documentation",
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
        "Everything in Starter plan",
        "Advanced payment integration (Stripe)",
        "Email automation & templates",
        "Analytics & monitoring setup",
        "Premium UI components",
        "Priority support & updates",
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
        "Everything in Professional plan",
        "Multi-tenant architecture",
        "Advanced role-based permissions",
        "Custom integrations & webhooks",
        "White-label customization",
        "Dedicated account manager",
        "Custom onboarding & training",
        "99.9% SLA guarantee",
      ],
      ctaText: "Contact Sales",
      ctaHref: "/contact",
      stripePriceId: "__VG_STRIPE_PRICE_ENTERPRISE__",
      lemonsqueezyVariantId: "__VG_LS_VARIANT_ENTERPRISE__",
    },
  ];

  return (
    <PricingSection
      title="Choose Your Perfect Plan"
      subtitle="Start building faster with VibeCodeMax. All plans include our core boilerplate and essential integrations."
      plans={defaultPlans}
      billingToggle={true}
      defaultBilling="monthly"
    />
  );
}
