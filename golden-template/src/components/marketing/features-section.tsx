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
    <section className="py-16 sm:py-24">
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
        </div>

        {/* Features Grid */}
        <div className={`grid gap-8 ${columnClasses[columns]}`}>
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`relative ${
                feature.highlight 
                  ? "ring-2 ring-primary shadow-lg" 
                  : "hover:shadow-md transition-shadow"
              }`}
            >
              {feature.highlight && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full">
                    Popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-base">
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

// Default Features Section with placeholder content
export function DefaultFeaturesSection() {
  const defaultFeatures: Feature[] = [
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "__VG_FEATURE_1_TITLE__",
      description: "__VG_FEATURE_1_DESCRIPTION__",
      highlight: true,
    },
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "__VG_FEATURE_2_TITLE__",
      description: "__VG_FEATURE_2_DESCRIPTION__",
    },
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "__VG_FEATURE_3_TITLE__",
      description: "__VG_FEATURE_3_DESCRIPTION__",
    },
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      ),
      title: "__VG_FEATURE_4_TITLE__",
      description: "__VG_FEATURE_4_DESCRIPTION__",
    },
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "__VG_FEATURE_5_TITLE__",
      description: "__VG_FEATURE_5_DESCRIPTION__",
    },
    {
      icon: (
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "__VG_FEATURE_6_TITLE__",
      description: "__VG_FEATURE_6_DESCRIPTION__",
    },
  ];

  return (
    <FeaturesSection
      title="__VG_FEATURES_SECTION_TITLE__"
      subtitle="__VG_FEATURES_SECTION_SUBTITLE__"
      features={defaultFeatures}
      columns={3}
    />
  );
}