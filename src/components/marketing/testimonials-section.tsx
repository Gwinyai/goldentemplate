import React from "react";
import { Card, CardContent } from "@/components/ui";

interface Testimonial {
  quote: string;
  author: {
    name: string;
    title: string;
    company: string;
    avatar?: string;
  };
  rating?: number;
}

interface TestimonialsSectionProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  layout?: "grid" | "carousel";
  columns?: 1 | 2 | 3;
}

const StarRating = ({ rating = 5 }: { rating?: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-rating-active" : "text-rating-inactive"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

export function TestimonialsSection({
  title,
  subtitle,
  testimonials,
  layout = "grid",
  columns = 3,
}: TestimonialsSectionProps) {
  return (
    <section className="py-section-mobile md:py-section relative">
      <div className="container mx-auto px-container-mobile md:px-container">
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

        {/* Testimonials Grid */}
        <div className={`grid gap-8 ${columnClasses[columns]}`}>
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-background border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Quote mark decoration */}
              <div className="absolute top-4 right-4 text-6xl text-primary/10 font-serif leading-none">"</div>
              
              <CardContent className="p-6 relative z-10">
                {/* Rating */}
                {testimonial.rating && (
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>
                )}

                {/* Quote */}
                <blockquote className="text-lg font-medium leading-7 text-foreground mb-6 relative">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {testimonial.author.avatar ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
                        src={testimonial.author.avatar}
                        alt={testimonial.author.name}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-md">
                        <span className="text-sm font-bold text-white">
                          {testimonial.author.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {testimonial.author.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.author.title} at {testimonial.author.company}
                    </div>
                  </div>
                </div>
              </CardContent>
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-300 pointer-events-none rounded-lg" />
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}

// Default Testimonials Section with placeholder content
export function DefaultTestimonialsSection() {
  const defaultTestimonials: Testimonial[] = [
    {
      quote: "VibeCodeMax saved us months of development time. The authentication and payment systems work flawlessly out of the box.",
      author: {
        name: "Sarah Chen",
        title: "CTO",
        company: "TechFlow",
      },
      rating: 5,
    },
    {
      quote: "Finally, a boilerplate that actually delivers. Clean code, great documentation, and everything I need to launch fast.",
      author: {
        name: "Marcus Rodriguez",
        title: "Founder",
        company: "StartupLab",
      },
      rating: 5,
    },
    {
      quote: "The best investment I made for my SaaS. Shipped to production in 2 weeks instead of 2 months.",
      author: {
        name: "Emily Watson",
        title: "Full Stack Developer",
        company: "IndieDev",
      },
      rating: 5,
    },
    {
      quote: "VibeCodeMax's architecture is solid. Scaling from MVP to 10k users was seamless with their foundation.",
      author: {
        name: "David Kim",
        title: "Lead Engineer",
        company: "GrowthCorp",
      },
      rating: 5,
    },
    {
      quote: "Love how everything is configurable through design tokens. Consistent branding across the entire app.",
      author: {
        name: "Jessica Taylor",
        title: "Product Designer",
        company: "DesignStudio",
      },
      rating: 5,
    },
    {
      quote: "The deployment workflow is chef's kiss. One command and everything is live with monitoring included.",
      author: {
        name: "Alex Thompson",
        title: "DevOps Engineer",
        company: "CloudNative",
      },
      rating: 5,
    },
  ];

  return (
    <TestimonialsSection
      title="Loved By Thousands Of Developers"
      subtitle="See what builders are saying about VibeCodeMax and how it's transformed their development workflow."
      testimonials={defaultTestimonials}
      layout="grid"
      columns={3}
    />
  );
}
