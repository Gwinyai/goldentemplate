# PRD: VibeGuide Golden Template (Next.js App)

## 1. Overview

We want a **single “golden template” Next.js app** that serves as the base for code generation.  
A separate generator service will **copy and mutate this template** based on a `TemplateConfig` JSON and produce customized projects.

This PRD is **only** for building the golden template itself.

- Framework: **Next.js 14+ (App Router)**
- Language: **TypeScript**
- Styling: **Tailwind CSS + design tokens**
- UI system in the golden template: **Shadcn UI** (DaisyUI will be added later via generator)
- Auth/DB: **Supabase-first**, Firebase stubs exist but are not fully wired for MVP
- Integrations: Stripe, LemonSqueezy, Resend, Mailgun, S3, GCS, Supabase Storage, Google Analytics, Pulser — all as **extensible stubs with secure defaults**

This app must be **fully runnable on its own** (`npm run dev`) and structured so that another process can:

- Copy the `golden-template/` directory
- Replace/token-patch key files
- Remove or include features/integrations

---

## 2. Goals

1. Provide a **clean, well-structured Next.js App Router project** that represents a “full-featured SaaS”:
   - Marketing landing page
   - Blog (public)
   - User login/register/dashboard
   - Admin area
   - Billing page stub
2. Use a **consistent file structure** that:
   - Separates public vs protected vs admin routes
   - Separates UI components, lib helpers, integrations, and config
3. Centralize **design and branding** in:
   - `src/design-tokens.ts`
   - Tailwind config
4. Provide **stubs for integrations** (Stripe, LemonSqueezy, email, storage, analytics) that:
   - Are ready to be wired
   - But safe if left unconfigured
5. Include **template-friendly placeholders** that the generator can safely replace:
   - Brand name
   - Colors
   - Descriptions
   - Feature flags

---

## 3. Non-Goals

- No actual code-generation logic here (no `/generatetemplate` endpoint).  
- No real Supabase/Firebase project configuration (just helpers and usage patterns).  
- No complete implementation of billing/checkout flows — only a scaffold.  
- No DaisyUI integration yet (future).  
- No MCP, no CAPTCHAs, no heavy security features beyond basic good practices.

---

## 4. Tech Stack

- **Next.js** 14+ (App Router, `/app` directory)
- **TypeScript**
- **Tailwind CSS** with custom `design-tokens.ts` used by `tailwind.config.ts`
- **Shadcn UI** components in `components/ui`
- **ESLint + Prettier**
- **Node.js** 20 target

---

## 5. High-Level Behavior

The golden template should support the following **out of the box**:

- Public routes:
  - `/` – SaaS marketing landing page (hero, features, CTA, pricing stub, testimonials, blog list)
  - `/login` – login page
  - `/register` – registration page
  - `/blog` – blog listing with mock posts
  - `/blog/[slug]` – blog post detail with mock content
- Protected routes (require user auth, currently mocked):
  - `/dashboard` – basic “Welcome, User” dashboard with placeholder stats
  - `/account` – user account/profile page stub
  - `/billing` – subscription/billing stub (Stripe-ready placeholders)
- Admin routes (super admin UI, gated by `isAdmin` check, currently mocked):
  - `/admin` – admin home
  - `/admin/blog` – blog management skeleton (list, create/edit stubs)
  - `/admin/users` – user list stub

Auth should be **abstracted**:

- Supabase helpers ready to use
- Firebase helpers stubbed but not wired by default
- Protected layout uses an abstraction (`requireUser`) so the generator can swap underlying provider later

Integrations should be:

- Implemented as **utilities** in `lib/integrations/*` with safe, no-op fallbacks.
- Webhooks routes exist but are clearly marked as stubs.

---

## 6. File Structure Requirements

Create the following structure under a root folder named **`golden-template/`**.

```txt
golden-template/
  package.json
  tsconfig.json
  next.config.mjs
  tailwind.config.ts
  postcss.config.mjs
  .eslintrc.cjs
  .prettierrc
  .gitignore
  .cursorrules
  .env.example

  README.template.md
  docs/
    TEMPLATE-PRD.template.md
    TEMPLATE-USAGE.md

  src/
    design-tokens.ts
    styles/
      globals.css
      theme.css

    app/
      (public)/
        layout.tsx
        page.tsx

        login/
          page.tsx
        register/
          page.tsx

        blog/
          page.tsx
          [slug]/
            page.tsx

      (protected)/
        layout.tsx

        dashboard/
          page.tsx

        account/
          page.tsx

        billing/
          page.tsx

        admin/
          layout.tsx
          page.tsx
          blog/
            page.tsx
          users/
            page.tsx

      api/
        health/
          route.ts
        webhooks/
          stripe/
            route.ts
          lemonsqueezy/
            route.ts

    components/
      ui/
        button.tsx
        input.tsx
        card.tsx
        badge.tsx
        textarea.tsx
        select.tsx
        modal.tsx
        dropdown.tsx
        alert.tsx
      layout/
        site-header.tsx
        site-footer.tsx
        marketing-nav.tsx
        dashboard-shell.tsx
        admin-shell.tsx
      marketing/
        hero-section.tsx
        features-grid.tsx
        pricing-section.tsx
        testimonials-section.tsx
        blog-list.tsx
        cta-section.tsx
      dashboard/
        sidebar.tsx
        topbar.tsx
        stat-cards.tsx
        recent-activity.tsx
      forms/
        auth-form.tsx
        contact-form.tsx
        newsletter-form.tsx
      blog/
        blog-card.tsx
        post-meta.tsx
        post-content.tsx

    lib/
      config/
        site.ts
        nav.ts
        features.ts

      auth/
        supabase-server.ts
        firebase-server.ts
        require-user.ts
        require-admin.ts

      db/
        supabase-client.ts
        firebase-client.ts

      integrations/
        stripe.ts
        lemonsqueezy.ts
        email/
          resend.ts
          mailgun.ts
        storage/
          aws-s3.ts
          gcs.ts
          supabase-storage.ts
        analytics/
          google-analytics.ts
          pulser.ts

      utils/
        logger.ts
        pagination.ts
        formatters.ts
        zod-schemas.ts

      template/
        template-config.d.ts
        feature-guards.ts

    types/
      index.d.ts
```

---

## 7. Detailed Requirements by Area

### 7.1 Design Tokens & Tailwind

**`src/design-tokens.ts`**

- Export a `tokens` object representing the default, generic SaaS brand.
- Use clearly replaceable constants so the generator can patch them later.

Example shape:

```ts
export const tokens = {
  brandName: "__VG_BRAND_NAME__",
  colors: {
    primary: "__VG_COLOR_PRIMARY__",   // e.g. "#6366f1"
    secondary: "__VG_COLOR_SECONDARY__",
    accent: "__VG_COLOR_ACCENT__",
    neutral: "__VG_COLOR_NEUTRAL__",
  },
  themeMode: "light" as "light" | "dark" | "system",
  fonts: {
    primary: "__VG_FONT_PRIMARY__",   // e.g. "inter"
    secondary: "__VG_FONT_SECONDARY__", // e.g. "merriweather",
  },
  effects: {
    gradients: {
      enabled: false,
    },
    shadows: {
      enabled: false,
      intensity: "medium" as "light" | "medium" | "heavy",
    },
  },
} as const;
```

**`tailwind.config.ts`**

- Import `tokens`.
- Use `tokens.colors` and `tokens.fonts` for `theme.extend.colors` and `fontFamily`.

### 7.2 Site Config & Features

**`lib/config/site.ts`**

- Configuration for:
  - `brandName`, `tagline`, `description`, `url`, social links.
- Use placeholders where appropriate:

```ts
export const siteConfig = {
  name: "__VG_BRAND_NAME__",
  tagline: "__VG_TAGLINE__",
  description: "__VG_DESCRIPTION__",
  url: "https://example.com",
};
```

**`lib/config/features.ts`**

- Default all features to `true` in the golden template:

```ts
export const features = {
  blog: true,
  userAccounts: true,
  admin: true,
} as const;
```

Generator will modify this or overwrite it.

### 7.3 Routing & Layouts

**Public layout (`app/(public)/layout.tsx`)**

- Uses `site-header` and `site-footer`.
- Reads from `siteConfig`.

**Protected layout (`app/(protected)/layout.tsx`)**

- Uses `requireUser()` from `lib/auth/require-user`.
- For MVP, `requireUser` can:
  - Return a mocked user or
  - Throw if not implemented, but the pattern must be correct.

**Admin layout (`app/(protected)/admin/layout.tsx`)**

- Uses `requireAdmin()` from `lib/auth/require-admin`.
- For now, `requireAdmin` can treat everyone as admin (or mock), but shape must be correct.

### 7.4 Auth & DB Helpers

**`lib/auth/supabase-server.ts`**

- Create a Supabase server client using env vars:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY` (for client) and placeholder for service role key if needed later.
- Include a helper like `getSupabaseServerClient()`.

**`lib/auth/firebase-server.ts`**

- Stub for Firebase server-side auth.
- Not fully wired, but the interface should mirror Supabase style.

**`lib/auth/require-user.ts`**

- Export `requireUser()`:
  - For now can be a placeholder returning a mocked user object.
  - Add TODO comments clearly marking where to integrate Supabase/Firebase.

**`lib/auth/require-admin.ts`**

- Export `requireAdmin()`:
  - Wraps `requireUser` and checks a fake `isAdmin` field.
  - TODO markers for real role checks.

### 7.5 Integrations Stubs

For each integration, provide:

- Type-safe function signatures.
- Safe no-op implementations and/or clear TODO comments.

Example: **`lib/integrations/stripe.ts`**

```ts
export async function createCheckoutSession(params: {
  userId: string;
  priceId: string;
}): Promise<{ url: string }> {
  // TODO: implement real Stripe integration
  // For now return a placeholder URL
  return { url: "https://example.com/mock-checkout" };
}
```

**Webhook routes** (`app/api/webhooks/stripe/route.ts` and `lemonsqueezy/route.ts`):

- Receive POST.
- Parse body.
- TODO comments for real signature verification.
- Return `{ received: true }`.

### 7.6 Components

Implement components as **presentational Shadcn-based UI**, not tied to real data:

- `components/ui/*`:
  - Wrap Shadcn primitives (e.g., Button, Input, etc.) in a way that generator can leave alone.
- `components/marketing/*`:
  - Static content with placeholders that read from `siteConfig` and `tokens`.
- `components/dashboard/*`:
  - Generic dashboard layout and stat cards with placeholder numbers.

### 7.7 Docs & Cursor Rules

**`README.template.md`**

- Explain:
  - Tech stack
  - How to run dev server
  - Where to configure design tokens
  - Where to plug in Supabase/Firebase, Stripe, Resend, etc.

**`docs/TEMPLATE-PRD.template.md`**

- Skeleton PRD for a generated project:
  - Sections: Overview, Goals, Features, Integrations, Data model, Routes.

**`docs/TEMPLATE-USAGE.md`**

- Document how to:
  - Add a new page.
  - Add a new component.
  - Extend the dashboard or admin area.

**`.cursorrules`**

- Include rules like:
  - Always use `tokens` from `src/design-tokens.ts` for colors/fonts.
  - Do not hardcode hex colors or font names.
  - Keep all integration-specific logic in `lib/integrations/*`.
  - Use existing route groups for new pages (public vs protected vs admin).

---

## 8. Acceptance Criteria

- `golden-template/` can be run locally with:
  - `npm install`
  - `npm run dev`
- Visiting:
  - `/` shows a generic SaaS landing page with placeholders.
  - `/login`, `/register` show auth form UIs (no real auth required yet).
  - `/blog` and `/blog/[slug]` show mock posts.
  - `/dashboard` and `/admin` render without crashing (even if they use mocked `requireUser`).
- `src/design-tokens.ts` and `lib/config/site.ts` contain clear placeholder values like `__VG_BRAND_NAME__` that are easy for a generator to replace.
- All integration modules compile and are safe to import even if env vars are missing (they should throw only when used, or no-op).
- File structure matches the tree above.
