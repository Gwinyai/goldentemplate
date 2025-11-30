# PRD Update: User Accounts & Auth Structure for VibeGuide Golden Template

This document **updates and extends** the previous VibeGuide PRDs (golden template + Cloud Run backend) by specifying how **user accounts, auth, and routing** work in the generated SaaS templates.

The focus here is on:
- How **user accounts** behave in the **Next.js golden template**
- How `/app`, `/account`, and `/admin` relate
- How this ties back to `TemplateConfig.features.userAccounts` and `admin.superAdminEnabled`

It does **not** redefine the backend generator itself, only how it should treat the **user account feature** when mutating the golden template.

---

## 1. Context & Goals

### 1.1 Context

The VibeGuide system consists of:

- A **Next.js golden template** (App Router, TypeScript, Tailwind, design tokens, Shadcn/DaisyUI) which serves as the base SaaS project.
- A **Cloud Run backend** (Node + Express) that:
  - Accepts a `TemplateConfig` JSON payload.
  - Clones the golden template.
  - Applies mutations (design, features, integrations).
  - Zips and uploads the resulting project to GCS.

The wizard currently collects:

- Project description and design settings.
- Feature flags (`blog`, `userAccounts`, `admin.superAdminEnabled`).
- Integration choices (auth/db preset, payments, storage, email, analytics).

This PRD defines how **user accounts** behave in the generated template, and how the routes `/app`, `/account/*`, and `/admin/*` are structured and controlled.

### 1.2 Goals

- Provide a **clear and opinionated user account architecture** for the golden template.
- Align with common SaaS patterns:
  - `/app` as the main product experience.
  - `/account/profile` and `/account/billing` as personal settings.
  - `/admin/*` as the operator/super-admin area.
- Make the system driven by `TemplateConfig.features.userAccounts` and `admin.superAdminEnabled`.
- Keep the auth provider pluggable (Supabase/Firebase) while exposing a consistent API in the template (e.g. `requireUser`, `requireAdmin`).

### 1.3 Non-Goals

- Defining low-level auth provider details (Supabase vs Firebase/Future).
- Implementing OAuth providers, password reset flows, or magic links in full detail (MVP can be email/password + stubs).
- Building complex multi-tenant or multi-role permission systems (only “user” vs “super admin” for now).

---

## 2. User Roles and Personas

### 2.1 Anonymous Visitor

- Can:
  - View marketing site (`/`).
  - View public blog (`/blog`, `/blog/[slug]`) if blog is enabled.
- Cannot:
  - Access `/app`, `/account/*`, or `/admin/*`.
- Will be redirected to `/login` if trying to access protected routes.

### 2.2 Authenticated User

- Has a valid session via selected auth provider.
- Can:
  - Access `/app` (main product area).
  - Access `/account/*` (profile, billing).
- Cannot:
  - Access `/admin/*` unless also flagged as super admin.

### 2.3 Super Admin

- Is an authenticated user with an additional flag (e.g. `isAdmin = true`) stored in the database.
- Can:
  - Access all user capabilities (`/app`, `/account/*`).
  - Access `/admin/*`:
    - User list
    - Analytics
    - Blog management
    - (Future) Settings

---

## 3. Route Architecture Update (Next.js App Router)

This section clarifies the **final, agreed structure** for the golden template routes related to user accounts and auth.

### 3.1 Route Tree (High-Level)

```txt
app/
  (public)/
    page.tsx                    # Landing / marketing
    login/
      page.tsx                  # Login (and optionally register)
    blog/
      page.tsx                  # Public blog index (if enabled)
      [slug]/
        page.tsx                # Public blog post

  (protected)/
    layout.tsx                  # Global authed layout with top nav + Account menu

    app/
      page.tsx                  # Main product experience (empty state initially)

    account/
      profile/
        page.tsx                # User profile: name, email, etc.
      billing/
        page.tsx                # Billing: plan, invoices, payment methods (if payments enabled)

    admin/
      layout.tsx                # Optional nested layout for distinct admin UI
      page.tsx                  # Admin overview
      users/
        page.tsx                # User list & basic management
      analytics/
        page.tsx                # Metrics & KPIs (stub)
      blog/
        page.tsx                # Blog management (CRUD list + editor)
```

### 3.2 Global Protected Layout

- `(protected)/layout.tsx` wraps all authenticated experiences:
  - `/app`
  - `/account/*`
  - `/admin/*`
- This layout is responsible for:
  - **Enforcing auth** via `requireUser()` (redirect to `/login` if no session).
  - Rendering a **global top navigation bar** with:
    - Brand/logo (from design tokens).
    - Optional links to `/app` and `/admin` (for admins).
    - An **Account menu** on the right (profile avatar or name).

### 3.3 Account Menu Behavior

In the top-right of the nav:

- Clicking the **Account menu** opens options:

  - **Profile** → navigate to `/account/profile`
  - **Billing** → navigate to `/account/billing`  
    - Only visible/active if `payments.provider !== "none"`
  - **Logout** → triggers logout action and redirects to `/` or `/login`

The main content area beneath the nav changes based on the current route:

- `/app` → empty/product empty state.
- `/account/profile` → profile form.
- `/account/billing` → billing UI.

This matches the desired UX: users feel like they stay “in the app” while moving between app and account screens.

### 3.4 Admin Area

- `/admin/*` remains the super-admin/operator area.
- It can either:
  - Use the global `(protected)/layout.tsx`, **or**
  - Have an additional nested `admin/layout.tsx` for a distinct admin-style shell (different sidebar, color accent, “Admin” badge, etc.).
- Admin nav includes:
  - **Users** `/admin/users`
  - **Analytics** `/admin/analytics`
  - **Blog** `/admin/blog`
  - (Optional) **Settings** `/admin/settings` (stub)

Access is enforced via `requireAdmin()` on the admin layout or individual pages.

---

## 4. Auth & Guards (Template-Level Abstractions)

### 4.1 Auth Provider Abstraction

The golden template will provide a provider-agnostic auth API in `lib/auth/`:

- `getCurrentUser()`
- `requireUser()`
- `requireAdmin()`

These delegate to the chosen auth/db combo (e.g. Supabase by default), but the rest of the app only depends on these helpers, not the underlying provider.

### 4.2 `requireUser()`

- Used in `(protected)/layout.tsx` (or a `ProtectedLayout` used there).
- Behavior:
  - If session exists → return `user` object (with at least `id`, `email`).
  - If no session → redirect to `/login`.

### 4.3 `requireAdmin()`

- Used in `/admin/layout.tsx` or each admin page.
- Behavior:
  - Uses `requireUser()` to ensure the user is logged in.
  - Checks an `isAdmin` boolean or role field in the user record.
  - If not admin → redirect to `/app` or show “Not authorized” page.

Implementation details (where `isAdmin` lives, how it’s seeded) can be left as TODO with clear comments and a section in README for now.

---

## 5. Behavior Driven by TemplateConfig

The backend already uses a `TemplateConfig` type. For user accounts, the relevant fields are:

```ts
features: {
  blog: boolean;
  userAccounts: boolean;
},
admin: {
  superAdminEnabled: boolean;
},
payments: {
  provider: "stripe" | "lemonsqueezy" | "none";
},
```

### 5.1 `features.userAccounts`

- `true`:
  - The generator leaves `/app` and `/account/*` routes fully active.
  - The protected layout and Account menu are wired up.
  - The login route is fully functional.
- `false`:
  - The template behaves like a **marketing-only** site.
  - Expected generator behavior:
    - Hide “Login” and “Account” entries from navigation.
    - Option A (MVP-friendly): keep `/app` and `/account/*` in the source tree, but **hide all entry points** and add comments/TODOs explaining they are disabled because `userAccounts` is `false`.
    - Option B (later): remove or stub those routes entirely.

### 5.2 `admin.superAdminEnabled`

- `true`:
  - `/admin/*` routes remain in place.
  - Admin nav entry is shown (for users with `isAdmin`).
  - Admin helpers (`requireAdmin`) remain active.
- `false`:
  - Generator should:
    - Hide admin nav entries.
    - Option A: keep admin routes but wrapped in comments and TODOs (easier to re-enable later).
    - Option B (later): drop the `/admin` route folder entirely.

### 5.3 `features.blog`

- `true`:
  - Public blog routes (`(public)/blog/*`) stay active.
  - Admin blog management (`(protected)/admin/blog`) stays active.
- `false`:
  - Generator hides blog links and may remove blog routes or convert them to stubs with clear TODOs.

### 5.4 `payments.provider`

- `"stripe"` or `"lemonsqueezy"`:
  - `/account/billing` route is enabled in navigation and shows billing UI stubs tied to the chosen provider.
  - Env variables and docs mention only the chosen provider.
- `"none"`:
  - `/account/billing`:
    - Either hidden from the Account menu, **or**
    - Shows a stub (“Billing is not configured in this template; set `payments.provider` in TemplateConfig to enable it”).

---

## 6. UX Flows (User Accounts)

### 6.1 Login Flow (MVP)

1. User visits `/login` from landing page.
2. They sign in (email/password; actual provider: Supabase/Firebase depending on `authDb.preset`).
3. On success:
   - If `isAdmin` → redirect to `/admin` or `/admin/analytics`.
   - Else → redirect to `/app`.

### 6.2 Using the App

1. Authenticated user lands on `/app`:
   - Sees empty state or starter product UI.
2. Top nav includes:
   - Logo/brand name (from design tokens).
   - Maybe a link to `/app` (“App” or product name).
   - If user is admin, a link or entry to `/admin`.
   - Right side: Account dropdown (Profile, Billing, Logout).

### 6.3 Account Management

1. User clicks **Account → Profile**:
   - Navigate to `/account/profile`.
   - Update profile fields (name, etc.).
2. User clicks **Account → Billing** (if enabled):
   - Navigate to `/account/billing`.
   - See current plan, status, and stubbed actions for upgrading/cancelling.

### 6.4 Logout

1. User clicks **Account → Logout**.
2. Template calls the auth provider logout endpoint.
3. Session cleared; redirect to `/` or `/login`.

---

## 7. Implementation Requirements (Golden Template)

### 7.1 Files to Implement / Adjust

- `(protected)/layout.tsx`  
  - Uses `requireUser()`.
  - Renders top nav with Account menu.
- `app/(protected)/app/page.tsx`  
  - Empty state main product page.
- `app/(protected)/account/profile/page.tsx`  
  - Profile settings form (uses auth provider to update metadata where applicable).
- `app/(protected)/account/billing/page.tsx`  
  - Billing UI stub, integrated with payments provider config.
- `app/(protected)/admin/layout.tsx` (optional but recommended)  
  - Uses `requireAdmin()`.
  - Renders admin-specific nav and shell.
- `app/(protected)/admin/users/page.tsx`, `admin/analytics/page.tsx`, `admin/blog/page.tsx`  
  - Basic views, stubbed but wired.

### 7.2 Auth Helpers

In `src/lib/auth/` (or similar):

- `getCurrentUser()`
- `requireUser()`
- `requireAdmin()`

These should be implemented with clear comments indicating where provider-specific logic plugs in (Supabase by default, Firebase as an alternative stub).

### 7.3 Navigation Logic

- Navigation config should live in `lib/config/nav.ts` or similar.
- It must support conditional entries based on:
  - `features.userAccounts`
  - `admin.superAdminEnabled`
  - `features.blog`
  - `payments.provider`

The generator will mutate a `features.ts` and `integrations.ts` config, and the nav should read from these to determine what to show.

---

## 8. Success Criteria (User Accounts)

The user accounts system is considered correctly integrated when:

- With `features.userAccounts = true`:
  - `/login` → successful auth → redirect to `/app` or `/admin` based on `isAdmin`.
  - `/app` shows an empty state under a global top nav.
  - The Account menu appears in the top nav and correctly routes to `/account/profile` and `/account/billing`.
  - `/admin/*` is accessible only for admin users.
- With `features.userAccounts = false`:
  - No visible login/account entry in navigation.
  - Attempting to hit `/app` or `/account/*` results in either redirect to `/` or a clear stub message.
- With `payments.provider = "stripe"` or `"lemonsqueezy"`:
  - `/account/billing` exists and clearly references the chosen provider in the UI and README.
- With `payments.provider = "none"`:
  - Billing is hidden or shows a clear “not configured” stub.

This structure should feel familiar to developers who’ve used modern SaaS products: `/app` for the product, `/account` for personal settings, and `/admin` for operations, all driven by `TemplateConfig` and safe defaults.
