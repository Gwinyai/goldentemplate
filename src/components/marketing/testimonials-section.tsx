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
            i < rating ? "text-yellow-400" : "text-gray-300"
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

        {/* Testimonials Grid */}
        <div className={`grid gap-8 ${columnClasses[columns]}`}>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="p-6">
                {/* Rating */}
                {testimonial.rating && (
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>
                )}

                {/* Quote */}
                <blockquote className="text-lg font-medium leading-7 text-foreground mb-6">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {testimonial.author.avatar ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={testimonial.author.avatar}
                        alt={testimonial.author.name}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {testimonial.author.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.author.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.author.title} at {testimonial.author.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by thousands of customers worldwide
          </p>
          
          {/* Company Logos Placeholder */}
          <div className="flex items-center justify-center gap-8 grayscale opacity-60">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-12 w-24 bg-muted rounded flex items-center justify-center"
              >
                <span className="text-xs font-medium text-muted-foreground">
                  Logo {i}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Default Testimonials Section with placeholder content
export function DefaultTestimonialsSection() {
  const defaultTestimonials: Testimonial[] = [
    {
      quote: "__VG_TESTIMONIAL_1_QUOTE__",
      author: {
        name: "__VG_TESTIMONIAL_1_AUTHOR__",
        title: "__VG_TESTIMONIAL_1_TITLE__",
        company: "__VG_TESTIMONIAL_1_COMPANY__",
        avatar: "__VG_TESTIMONIAL_1_AVATAR__",
      },
      rating: 5,
    },
    {
      quote: "__VG_TESTIMONIAL_2_QUOTE__",
      author: {
        name: "__VG_TESTIMONIAL_2_AUTHOR__",
        title: "__VG_TESTIMONIAL_2_TITLE__",
        company: "__VG_TESTIMONIAL_2_COMPANY__",
        avatar: "__VG_TESTIMONIAL_2_AVATAR__",
      },
      rating: 5,
    },
    {
      quote: "__VG_TESTIMONIAL_3_QUOTE__",
      author: {
        name: "__VG_TESTIMONIAL_3_AUTHOR__",
        title: "__VG_TESTIMONIAL_3_TITLE__",
        company: "__VG_TESTIMONIAL_3_COMPANY__",
        avatar: "__VG_TESTIMONIAL_3_AVATAR__",
      },
      rating: 5,
    },
    {
      quote: "__VG_TESTIMONIAL_4_QUOTE__",
      author: {
        name: "__VG_TESTIMONIAL_4_AUTHOR__",
        title: "__VG_TESTIMONIAL_4_TITLE__",
        company: "__VG_TESTIMONIAL_4_COMPANY__",
        avatar: "__VG_TESTIMONIAL_4_AVATAR__",
      },
      rating: 5,
    },
    {
      quote: "__VG_TESTIMONIAL_5_QUOTE__",
      author: {
        name: "__VG_TESTIMONIAL_5_AUTHOR__",
        title: "__VG_TESTIMONIAL_5_TITLE__",
        company: "__VG_TESTIMONIAL_5_COMPANY__",
        avatar: "__VG_TESTIMONIAL_5_AVATAR__",
      },
      rating: 5,
    },
    {
      quote: "__VG_TESTIMONIAL_6_QUOTE__",
      author: {
        name: "__VG_TESTIMONIAL_6_AUTHOR__",
        title: "__VG_TESTIMONIAL_6_TITLE__",
        company: "__VG_TESTIMONIAL_6_COMPANY__",
        avatar: "__VG_TESTIMONIAL_6_AVATAR__",
      },
      rating: 5,
    },
  ];

  return (
    <TestimonialsSection
      title="__VG_TESTIMONIALS_SECTION_TITLE__"
      subtitle="__VG_TESTIMONIALS_SECTION_SUBTITLE__"
      testimonials={defaultTestimonials}
      layout="grid"
      columns={3}
    />
  );
}