import React from "react";
import Link from "next/link";
import { tokens } from "@/design-tokens";
import { Button, Badge } from "@/components/ui";

interface HeroSectionProps {
  badge?: {
    text: string;
    href?: string;
  };
  headline: string;
  subheadline: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  features?: string[];
  image?: {
    src: string;
    alt: string;
  };
}

export function HeroSection({
  badge,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  features,
  image,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-accent/5 shadow-xl shadow-accent/10 ring-1 ring-accent/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      </div>

      <div className="container mx-auto px-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Content */}
          <div className="lg:col-span-7">
            <div className="mx-auto max-w-2xl lg:mx-0">
              {/* Badge */}
              {badge && (
                <div className="mb-8">
                  {badge.href ? (
                    <Link
                      href={badge.href}
                      className="inline-flex items-center gap-x-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent ring-1 ring-inset ring-accent/20 hover:bg-accent/20 transition-colors"
                    >
                      <span>{badge.text}</span>
                      <svg
                        className="h-3 w-3"
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
                    </Link>
                  ) : (
                    <Badge variant="secondary" className="mb-4">
                      {badge.text}
                    </Badge>
                  )}
                </div>
              )}

              {/* Headlines */}
              <h1 className="text-4xl font-heading font-bold tracking-tight text-foreground sm:text-6xl">
                {headline}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {subheadline}
              </p>

              {/* CTAs */}
              <div className="mt-10 flex items-center gap-4">
                <Button size="lg" asChild>
                  <Link href={primaryCta.href}>
                    {primaryCta.text}
                  </Link>
                </Button>
                {secondaryCta && (
                  <Button variant="outline" size="lg" asChild>
                    <Link href={secondaryCta.href}>
                      {secondaryCta.text}
                    </Link>
                  </Button>
                )}
              </div>

              {/* Features */}
              {features && features.length > 0 && (
                <div className="mt-10">
                  <div className="flex flex-wrap gap-6">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <svg
                          className="h-4 w-4 text-primary"
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
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="mt-16 lg:col-span-5 lg:mt-0">
            <div className="relative">
              {image ? (
                <img
                  className="aspect-[3/2] w-full rounded-2xl bg-muted object-cover shadow-2xl ring-1 ring-border"
                  src={image.src}
                  alt={image.alt}
                />
              ) : (
                <div className="aspect-[3/2] w-full rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 shadow-2xl ring-1 ring-border flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-4">
                      <svg
                        className="h-8 w-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {tokens.brandName} Platform
                    </p>
                  </div>
                </div>
              )}

              {/* Floating Stats/Badges */}
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-background p-4 shadow-lg ring-1 ring-border lg:-left-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary ring-2 ring-background" />
                    <div className="h-8 w-8 rounded-full bg-accent ring-2 ring-background" />
                    <div className="h-8 w-8 rounded-full bg-secondary ring-2 ring-background" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">__VG_CUSTOMER_COUNT__+ users</p>
                    <p className="text-xs text-muted-foreground">trusted worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Default Hero Section with placeholder content
export function DefaultHeroSection() {
  return (
    <HeroSection
      badge={{
        text: "🚀 Now in Beta - Join Early Access",
        href: "/register",
      }}
      headline="__VG_HERO_HEADLINE__"
      subheadline="__VG_HERO_SUBHEADLINE__"
      primaryCta={{
        text: "Get Started Free",
        href: "/register",
      }}
      secondaryCta={{
        text: "View Demo",
        href: "#demo",
      }}
      features={[
        "__VG_FEATURE_1__",
        "__VG_FEATURE_2__",
        "__VG_FEATURE_3__",
      ]}
    />
  );
}