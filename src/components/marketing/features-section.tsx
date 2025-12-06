import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

interface FeaturesSectionProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

const columnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3", 
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export function FeaturesSection({
  title,
  subtitle,
  features,
  columns = 3,
}: FeaturesSectionProps) {
  return (
    <section className="py-section-mobile md:py-section relative bg-background">
      <div className="container mx-auto px-container-mobile md:px-container max-w-page">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="section-title">
            <span>{title}</span>
          </h2>
          {subtitle && (
            <p className="mt-6 section-description">
              {subtitle}
            </p>
          )}
        </div>

        {/* Features Grid */}
        <div className={`grid gap-8 ${columnClasses[columns]}`}>
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`card-base card-hover relative group bg-surface border-border-light ${
                feature.highlight 
                  ? "ring-2 ring-primary/50 shadow-lg bg-gradient-primary/5" 
                  : "hover:shadow-md hover:-translate-y-2 border-border-light/50"
              }`}
            >
              {feature.highlight && (
                <div className="absolute -top-3 left-6 z-10">
                  <span className="bg-gradient-primary text-text-inverse px-4 py-2 text-sm font-bold rounded-pill shadow-md">
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-300 pointer-events-none" />
              
              <CardHeader className="relative z-10 p-8">
                <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  feature.highlight 
                    ? "bg-gradient-primary shadow-md" 
                    : "bg-primary/10 group-hover:bg-gradient-primary group-hover:shadow-md"
                }`}>
                  <div className={feature.highlight ? "text-text-inverse" : "text-primary group-hover:text-text-inverse transition-colors"}>
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-heading font-bold text-text-primary group-hover:text-primary transition-colors">{feature.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10 p-8 pt-0">
                <CardDescription className="text-lg text-text-secondary leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Default Features Section with VibeGuide content
export function DefaultFeaturesSection() {
  const defaultFeatures: Feature[] = [
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Next.js 14 + TypeScript",
      description: "Built on the latest Next.js with TypeScript, Tailwind CSS, and modern React patterns for maximum performance and developer experience.",
      highlight: true,
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Authentication Built-In",
      description: "Complete auth system with social logins, email verification, password reset, and role-based access control out of the box.",
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Payments & Billing",
      description: "Stripe integration with subscriptions, one-time payments, invoicing, and customer portal - everything you need to monetize.",
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      title: "Database & ORM",
      description: "PostgreSQL with Prisma ORM, migrations, seeding, and optimized queries. Switch to any database with ease.",
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: "Deploy Anywhere",
      description: "One-click deployment to Vercel, Netlify, or any hosting platform. Docker support and CI/CD workflows included.",
    },
    {
      icon: (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Production Ready",
      description: "Error handling, logging, monitoring, testing, and security best practices. Scale from MVP to millions of users.",
    },
  ];

  return (
    <FeaturesSection
      title="Everything You Need to Ship Fast"
      subtitle="Stop wasting time on boilerplate. Focus on building features that matter with our battle-tested foundation."
      features={defaultFeatures}
      columns={3}
    />
  );
}
