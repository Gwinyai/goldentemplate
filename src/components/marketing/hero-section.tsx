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
    <section className="relative overflow-hidden bg-gradient-background py-section-mobile md:py-section">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-primary/5" />
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-secondary/10 blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-container-mobile md:px-container max-w-page">
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
                      className="inline-flex items-center gap-x-3 rounded-full bg-surface/80 backdrop-blur-sm px-4 py-2 text-sm ring-1 ring-border/30 hover:ring-border/50 transition-all duration-200 hover:scale-105"
                    >
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-800">New</span>
                      <span className="text-muted-foreground font-medium text-sm">Claude Skills and Rules</span>
                      <div className="flex items-center justify-center w-5 h-5 bg-gray-100 rounded-full">
                        <svg
                          className="h-3 w-3 text-gray-600"
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
              <h1 className="text-5xl font-heading font-extrabold tracking-tight text-text-primary sm:text-6xl lg:text-7xl animate-fade-in">
                <span className="text-gradient-primary">
                  {headline}
                </span>
              </h1>
              <p className="mt-8 text-xl leading-relaxed text-text-secondary animate-slide-in">
                {subheadline}
              </p>

              {/* CTAs */}
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 animate-slide-in">
                <Button 
                  size="lg" 
                  className="btn-primary px-8 py-4 text-lg rounded-lg"
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
                    variant="outline" 
                    size="lg" 
                    className="btn-secondary px-8 py-4 text-lg rounded-lg"
                    asChild
                  >
                    <Link href={secondaryCta.href}>
                      {secondaryCta.text}
                    </Link>
                  </Button>
                )}
              </div>

              {/* Social Proof */}
              <div className="mt-12">
                <div className="flex items-center gap-4 text-sm text-text-muted">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-primary ring-2 ring-surface shadow-sm flex items-center justify-center">
                      <span className="text-xs font-bold text-white">S</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gradient-secondary ring-2 ring-surface shadow-sm flex items-center justify-center">
                      <span className="text-xs font-bold text-white">M</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gradient-accent ring-2 ring-surface shadow-sm flex items-center justify-center">
                      <span className="text-xs font-bold text-white">E</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gradient-primary ring-2 ring-surface shadow-sm flex items-center justify-center">
                      <span className="text-xs font-bold text-white">D</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gradient-secondary ring-2 ring-surface shadow-sm flex items-center justify-center text-xs font-bold text-white">
                      +964
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">967+ developers</p>
                    <p className="text-text-muted">Already on VibeGuide</p>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 font-medium text-text-primary">4.8</span>
                  </div>
                </div>
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
          <div className="mt-16 lg:col-span-5 lg:mt-0">
            <div className="relative">
              {image ? (
                <img
                  className="aspect-[4/3] w-full rounded-xl bg-surface object-contain shadow-xl p-8"
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
                      VibeGuide Platform
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
      subheadline="VibeGuide provides battle-tested boilerplates with authentication, payments, database, and deployment - so you can focus on what makes your product unique."
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
        alt: "VibeGuide Platform - Launch faster",
      }}
    />
  );
}