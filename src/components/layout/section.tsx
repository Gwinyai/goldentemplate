import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "default" | "muted" | "accent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  id?: string;
}

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted/50",
  accent: "bg-accent/5",
};

const paddingClasses = {
  none: "py-0",
  sm: "py-8",
  md: "py-12",
  lg: "py-16",
  xl: "py-24",
};

export function Section({
  children,
  className,
  background = "default",
  padding = "lg",
  id,
}: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "w-full",
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </section>
  );
}