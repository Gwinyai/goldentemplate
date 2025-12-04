"use client";

import { useEffect } from "react";
import { applyDesignSystemSettings } from "@/lib/utils/design-system";

/**
 * Design System Provider
 * 
 * Applies design token settings (gradients, shadows) to the document.
 * This component should be rendered once at the root layout.
 */
export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply design system settings on mount
    applyDesignSystemSettings();
  }, []);

  return <>{children}</>;
}

