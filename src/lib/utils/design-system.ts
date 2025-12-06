/**
 * Design System Utilities
 * 
 * Utilities for applying design token settings to the application.
 * This allows gradients and shadows to be controlled from design tokens.
 */

import { tokens } from "@/design-tokens";

function applyColorVariables(root: HTMLElement) {
  // Core palette
  root.style.setProperty("--token-primary", tokens.colors.primary);
  root.style.setProperty("--token-secondary", tokens.colors.secondary);
  root.style.setProperty("--token-accent", tokens.colors.accent);
  root.style.setProperty("--token-neutral", tokens.colors.neutral);
  root.style.setProperty("--token-success", tokens.colors.success);
  root.style.setProperty("--token-warning", tokens.colors.warning);
  root.style.setProperty("--token-danger", tokens.colors.danger);
  root.style.setProperty("--token-background", tokens.colors.background);
  root.style.setProperty("--token-surface", tokens.colors.surface);

  // Text palette
  root.style.setProperty("--token-text-primary", tokens.colors.text.primary);
  root.style.setProperty("--token-text-secondary", tokens.colors.text.secondary);
  root.style.setProperty("--token-text-muted", tokens.colors.text.muted);
  root.style.setProperty("--token-text-inverse", tokens.colors.text.inverse);

  // Borders
  root.style.setProperty("--token-border-default", tokens.colors.border.default);
  root.style.setProperty("--token-border-light", tokens.colors.border.light);
}

function applyRadiusVariables(root: HTMLElement) {
  root.style.setProperty("--token-radius-sm", tokens.radius.sm);
  root.style.setProperty("--token-radius-md", tokens.radius.md);
  root.style.setProperty("--token-radius-lg", tokens.radius.lg);
  root.style.setProperty("--token-radius-xl", tokens.radius.xl);
  root.style.setProperty("--token-radius-pill", tokens.radius.pill);
}

/**
 * Apply design system settings to the document
 * Call this on app initialization to apply gradient/shadow settings
 */
export function applyDesignSystemSettings() {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  // Sync CSS variables with current tokens so text-muted/foreground stays token-driven
  applyColorVariables(root);
  applyRadiusVariables(root);

  // Apply gradient settings
  if (tokens.effects.gradients.enabled) {
    root.setAttribute("data-gradients", "enabled");
  } else {
    root.setAttribute("data-gradients", "disabled");
  }

  // Apply shadow settings
  if (tokens.effects.shadows.enabled) {
    root.setAttribute("data-shadows", "enabled");
    
    // Set shadow intensity
    const intensityMap = {
      light: "0.5",
      medium: "1",
      heavy: "1.5",
    };
    root.style.setProperty(
      "--shadow-intensity",
      intensityMap[tokens.effects.shadows.intensity]
    );
  } else {
    root.setAttribute("data-shadows", "disabled");
    root.style.setProperty("--shadow-intensity", "0");
  }
}

/**
 * Get conditional class name based on gradient settings
 * Use this helper to apply gradient classes conditionally
 */
export function gradientClass(gradientClass: string, fallbackClass: string = ""): string {
  return tokens.effects.gradients.enabled ? gradientClass : fallbackClass;
}

/**
 * Get conditional class name based on shadow settings
 * Use this helper to apply shadow classes conditionally
 */
export function shadowClass(shadowClass: string, fallbackClass: string = ""): string {
  return tokens.effects.shadows.enabled ? shadowClass : fallbackClass;
}

/**
 * Check if gradients are enabled
 */
export function gradientsEnabled(): boolean {
  return tokens.effects.gradients.enabled;
}

/**
 * Check if shadows are enabled
 */
export function shadowsEnabled(): boolean {
  return tokens.effects.shadows.enabled;
}

/**
 * Get shadow intensity multiplier
 */
export function getShadowIntensity(): number {
  const intensityMap = {
    light: 0.5,
    medium: 1,
    heavy: 1.5,
  };
  return tokens.effects.shadows.enabled 
    ? intensityMap[tokens.effects.shadows.intensity] 
    : 0;
}
