import React from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "sm" | "md" | "lg" | "xl";
}

const getColsClasses = (cols: GridProps["cols"]) => {
  if (!cols) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  
  const classes = [];
  
  if (cols.default) classes.push(`grid-cols-${cols.default}`);
  if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
  if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
  if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
  if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
  
  return classes.join(" ") || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

export function Grid({
  children,
  className,
  cols,
  gap = "md",
}: GridProps) {
  return (
    <div className={cn(
      "grid",
      getColsClasses(cols),
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
}