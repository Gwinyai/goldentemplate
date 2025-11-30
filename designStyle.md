# designStyle.md

## Purpose

This document explains **how design tokens and Tailwind CSS work together** in the VibeGuide golden template.

The goals:

- All visual decisions (colors, fonts, spacing, radii, etc.) live in a **single place**: `src/design-tokens.ts`.
- Tailwind utilities are generated from those tokens, so changing the design system does **not** require hunting through components.
- The template generator can safely mutate `design-tokens.ts` based on the wizard’s `TemplateConfig`.

---

## 1. Design Tokens: Single Source of Truth

The golden template defines tokens in `src/design-tokens.ts`. Conceptually, the shape looks like this:

```ts
// src/design-tokens.ts
export const designTokens = {
  brand: {
    name: "__VG_BRAND_NAME__",
  },
  colors: {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#ec4899",
    neutral: "#6b7280",
    background: "#ffffff",
    surface: "#f9fafb",
    success: "#16a34a",
    warning: "#f97316",
    danger: "#dc2626",
  },
  typography: {
    primaryFont: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    secondaryFont: "Merriweather, Georgia, serif",
    baseFontSize: "16px",
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    pill: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(15, 23, 42, 0.05)",
    md: "0 4px 6px rgba(15, 23, 42, 0.08)",
    lg: "0 10px 15px rgba(15, 23, 42, 0.12)",
  },
  layout: {
    pageMaxWidth: "1200px",
  },
} as const;
```

> The template generator overwrites these values from the wizard’s `TemplateConfig` (colors, fonts, brand name, etc.). The **shape must stay stable** even if the values change.

---

## 2. Tailwind Integration

### 2.1 Importing Tokens in `tailwind.config.ts`

Tailwind reads from `designTokens` to define its theme. Example pattern:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import { designTokens } from "./src/design-tokens";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // semantic colors derived from tokens
        primary: designTokens.colors.primary,
        secondary: designTokens.colors.secondary,
        accent: designTokens.colors.accent,
        neutral: designTokens.colors.neutral,
        background: designTokens.colors.background,
        surface: designTokens.colors.surface,
        success: designTokens.colors.success,
        warning: designTokens.colors.warning,
        danger: designTokens.colors.danger,
      },
      fontFamily: {
        primary: [designTokens.typography.primaryFont],
        secondary: [designTokens.typography.secondaryFont],
      },
      borderRadius: {
        sm: designTokens.radius.sm,
        md: designTokens.radius.md,
        lg: designTokens.radius.lg,
        xl: designTokens.radius.xl,
        pill: designTokens.radius.pill,
      },
      boxShadow: {
        sm: designTokens.shadows.sm,
        md: designTokens.shadows.md,
        lg: designTokens.shadows.lg,
      },
      maxWidth: {
        page: designTokens.layout.pageMaxWidth,
      },
    },
  },
  plugins: [],
};

export default config;
```

This means:

- `bg-primary`, `text-accent`, `shadow-md`, `rounded-xl`, etc. are all **semantic shortcuts** wired to design tokens.
- Re-theming only needs changes in `design-tokens.ts` (via generator) – components remain untouched.

### 2.2 CSS Variables (Optional Enhancement)

In some parts of the golden template we also expose tokens as CSS variables for flexibility, for example in `app/globals.css`:

```css
:root {
  --vg-color-primary: theme("colors.primary");
  --vg-color-background: theme("colors.background");
  --vg-radius-lg: theme("borderRadius.lg");
}
```

Then components can either use Tailwind utilities (`bg-primary`) or direct CSS variables for advanced patterns (gradients, borders, etc.).

---

## 3. Using Tokens in Components

### 3.1 Basic Usage

Use the **semantic Tailwind classes** instead of hard-coded values:

```tsx
// Good: uses token-backed Tailwind classes
export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-primary/90">
      {children}
    </button>
  );
}
```

Avoid inline colors or arbitrary hex codes in components:

```tsx
// ❌ Avoid this – hard-coded, not tokenized
<button className="bg-[#6366f1] text-white rounded-lg">Click</button>
```

### 3.2 Layout & Shell Components

Higher-level layout components should also use semantic utilities:

```tsx
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-neutral">
      <header className="border-b border-neutral/20 bg-surface">
        {/* nav content */}
      </header>
      <main className="mx-auto max-w-page px-4 py-8">{children}</main>
    </div>
  );
}
```

Here:

- `bg-background`, `bg-surface`, `text-neutral`, `max-w-page` all flow from `designTokens`.

### 3.3 Shadcn Components and Tokens

Shadcn UI components are also styled using Tailwind. When customizing them:

- Use `bg-primary`, `text-primary`, `border-neutral`, `shadow-md`, etc.
- Do **not** replace with raw hex codes unless necessary.

If you need to adjust Shadcn’s base theme, do it via:

- The `cn()` wrapper + Tailwind classes backed by tokens.
- Or via a small theme config that still **depends on Tailwind theme values**, not direct literals.

---

## 4. Light / Dark Theme Considerations

The golden template treats **token values as “semantic”**, not “raw”. For MVP, we keep this simple:

- `designTokens.colors.background` and `designTokens.colors.surface` represent the default theme (often light).
- If/when dark mode is added, the pattern should be:
  - Add separate token sets (`light`, `dark`) inside `designTokens`.
  - Map them into Tailwind `:root` and `.dark` scopes via CSS variables.

For now, components should not assume a specific hex value – they depend only on the **semantic class** (e.g. `bg-background`), so future dark-mode support is possible without refactoring all components.

---

## 5. How the Generator Uses Tokens

The backend uses the wizard’s `TemplateConfig` to overwrite the values in `design-tokens.ts`:

- `TemplateConfig.design.colors.primary` → `designTokens.colors.primary`
- `TemplateConfig.design.typography.primaryFont` → `designTokens.typography.primaryFont`
- etc.

Because Tailwind reads from `designTokens` at build time, a freshly generated template will:

- Build using the **user’s color palette and fonts**.
- Maintain consistent styling across marketing pages, `/app`, `/account`, and `/admin`.

**Important rule:**  
Do not change the **shape** of `designTokens` in random places. If new tokens are needed, they should be added deliberately and wired into Tailwind in a structured way.

---

## 6. Rules for Future Development (and AI Assistants)

When adding or updating UI:

1. **Always prefer token-backed Tailwind classes** (`bg-primary`, `text-neutral`, `shadow-md`, etc.).
2. Do not hard-code hex colors or font stacks in components.
3. If a new semantic value is needed (e.g. `badge` background):
   - Extend `designTokens` with a new semantic token (e.g. `colors.badge`).
   - Wire it into `tailwind.config.ts`.
   - Then use `bg-badge` in components.
4. Avoid introducing second sources of truth for theme values:
   - No ad-hoc SCSS theme maps.
   - No isolated config files with colors unrelated to `design-tokens.ts`.

This keeps the golden template:

- **Easy to re-theme** from one wizard run to another.
- **Predictable for generators** and AI assistants.
- **Consistent** across marketing, app, and admin surfaces.

---

## 7. Quick Checklist

When reviewing a component or PR:

- [ ] Are all colors derived from Tailwind classes (`bg-*`, `text-*`, `border-*`) wired to tokens?
- [ ] Are fonts referenced only via `font-primary` / `font-secondary` or global typography styles?
- [ ] Are spacing/radius/shadows using token-backed utilities (`rounded-lg`, `shadow-md`) instead of custom inline values?
- [ ] Are there any hard-coded hex values that should be tokens instead?
- [ ] Does any new visual concept introduce a corresponding token in `design-tokens.ts` + Tailwind config?

If all are “yes” (and no hard-coded hex codes are left), the template remains cleanly token-driven and safe for automated re-theming.
