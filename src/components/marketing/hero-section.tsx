import React from "react";
import Link from "next/link";
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
    <section className="relative overflow-hidden bg-background py-section-mobile md:py-section">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
      </div>

      <div className="container mx-auto px-container-mobile md:px-container max-w-page">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Content */}
          <div className="lg:col-span-7">
            <div className="mx-auto max-w-2xl lg:mx-0 text-center lg:text-left">
              {/* Badge */}
              {badge && (
                <div className="mb-8 flex justify-center lg:justify-start">
                  {badge.href ? (
                    <Link
                      href={badge.href}
                      className="inline-flex items-center gap-x-3 rounded-full bg-surface px-4 py-2 text-sm border border-border hover:border-border-light hover:bg-muted/10 transition-all duration-200"
                    >
                      <span className="px-3 py-1 rounded-full text-xs font-semibold badge-new">New</span>
                      <span className="text-muted-foreground font-medium text-sm">Claude Skills and Rules</span>
                      <div className="flex items-center justify-center w-5 h-5 rounded-full icon-container">
                        <svg
                          className="h-3 w-3 icon-arrow"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  ) : (
                    <Badge variant="secondary" className="mb-4">
                      {badge.text}
                    </Badge>
                  )}
                </div>
              )}

              {/* Headlines */}
              <h1 className="text-5xl font-heading font-extrabold tracking-tight text-text-primary sm:text-6xl lg:text-7xl animate-fade-in text-center lg:text-left">
                <span>Launch Your SaaS In </span>
                <span className="text-gradient-primary">Just A Weekend</span>
              </h1>
              <p className="mt-8 text-xl leading-relaxed text-text-secondary animate-slide-in text-center lg:text-left">
                {subheadline}
              </p>

              {/* CTAs */}
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 animate-slide-in justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  variant="default"
                  className="btn-primary"
                  asChild
                >
                  <Link href={primaryCta.href}>
                    {primaryCta.text}
                    <svg
                      className="ml-2 h-5 w-5"
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
                </Button>
                {secondaryCta && (
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="btn-secondary"
                    asChild
                  >
                    <Link href={secondaryCta.href}>
                      {secondaryCta.text}
                    </Link>
                  </Button>
                )}
              </div>


              {/* Features */}
              {features && features.length > 0 && (
                <div className="mt-12">
                  <div className="flex flex-wrap gap-8">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-base text-text-secondary font-medium"
                      >
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-primary flex items-center justify-center">
                          <svg
                            className="h-3 w-3 text-text-inverse"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="mt-10 lg:col-span-5 lg:mt-0 flex items-start">
            <div className="relative w-full">
              {image ? (
                <img
                  className="aspect-[6/5] w-full object-contain"
                  src={image.src}
                  alt={image.alt}
                />
              ) : (
                <div className="aspect-[3/2] w-full rounded-xl bg-gradient-primary shadow-lg ring-1 ring-primary/20 flex items-center justify-center relative overflow-hidden group animate-scale-in">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
                  <div className="text-center relative z-10">
                    <div className="h-24 w-24 rounded-xl bg-white/20 backdrop-blur-sm mx-auto flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="h-12 w-12 text-text-inverse"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-bold text-text-inverse drop-shadow-lg">
                      VibeCodeMax Platform
                    </p>
                    <p className="text-sm text-text-inverse/80 mt-2">
                      Boilerplate Generator
                    </p>
                  </div>
                  {/* Shimmer effect */}
                  <div className="shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}

            </div>
          </div>
        </div>

        {/* As Seen On */}
        <div className="mt-12 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-8">As Seen On</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["logo1.png", "logo2.png", "logo3.png"].map((logo) => (
              <div
                key={logo}
                className="h-20 w-40 rounded-lg flex items-center justify-center bg-surface/80 shadow-sm transition-all duration-200 hover:scale-105"
              >
                <img
                  src={`/${logo}`}
                  alt={`Featured on ${logo}`}
                  className="h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Default Hero Section with VibeGuide content
export function DefaultHeroSection() {
  return (
    <HeroSection
      badge={{
        text: "New: Claude Skills and Rules",
        href: "/features",
      }}
      headline="Build Production-Ready SaaS Faster"
      subheadline="VibeCodeMax provides battle-tested boilerplates with authentication, payments, database, and deployment - so you can focus on what makes your product unique."
      primaryCta={{
        text: "Start Building",
        href: "/register",
      }}
      secondaryCta={{
        text: "Features",
        href: "#features",
      }}
      image={{
        src: "/hero.png",
        alt: "VibeCodeMax Platform - Launch faster",
      }}
    />
  );
}
