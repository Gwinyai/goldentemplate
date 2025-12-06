"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export function FAQSection({ title, subtitle, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-section-mobile md:py-section">
      <div className="container mx-auto px-container-mobile md:px-container max-w-page">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="section-title">{title}</h2>
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Card
                key={index}
                className="border border-border/60 bg-surface/80 backdrop-blur-md shadow-sm"
              >
                <button
                  className="w-full flex items-start justify-between gap-4 p-5 text-left"
                  onClick={() => toggle(index)}
                >
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {faq.question}
                    </h3>
                    {isOpen && (
                      <p className="mt-3 text-text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200" aria-hidden>
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DefaultFAQSection() {
  const faqs: FAQItem[] = [
    {
      question: "What do I get with VibeCodeMax?",
      answer:
        "A production-grade SaaS starter with authentication, payments, email, storage, and analytics wired to design tokens so you can launch fast.",
    },
    {
      question: "Can I customize the design?",
      answer:
        "Yes. The entire UI is powered by design tokens (colors, radius, shadows). Update tokens and the components restyle automatically.",
    },
    {
      question: "Is it ready for teams?",
      answer:
        "Roles, billing, and admin areas are included. You can extend them or plug in your own flows without rebuilding core scaffolding.",
    },
    {
      question: "How fast can I launch?",
      answer:
        "Most teams ship an MVP in days, not weeks. The boilerplate removes setup work so you focus on product-specific features.",
    },
  ];

  return (
    <FAQSection
      title="Frequently Asked Questions"
      subtitle="Answers to the most common questions about launching with VibeCodeMax."
      faqs={faqs}
    />
  );
}
