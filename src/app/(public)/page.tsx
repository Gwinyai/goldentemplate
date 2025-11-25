"use client";

import React from "react";
import {
  DefaultHeroSection,
  DefaultFeaturesSection,
  DefaultPricingSection,
  DefaultTestimonialsSection,
  DefaultBlogSection,
} from "@/components/marketing";
import { Section } from "@/components/layout";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <DefaultHeroSection />

      {/* Features Section */}
      <Section id="features" background="muted" padding="xl">
        <DefaultFeaturesSection />
      </Section>

      {/* Testimonials Section */}
      <Section background="default" padding="xl">
        <DefaultTestimonialsSection />
      </Section>

      {/* Pricing Section */}
      <Section id="pricing" background="muted" padding="xl">
        <DefaultPricingSection />
      </Section>

      {/* Blog Section */}
      <Section background="default" padding="xl">
        <DefaultBlogSection />
      </Section>
    </>
  );
}