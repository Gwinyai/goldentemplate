# userAccountFixes.md

## Purpose

This document describes the corrections that must be made to the current `/app` implementation so that it matches the **User Accounts & Auth PRD** and the **User Accounts Plan Addendum** for the VibeGuide golden template.

The screenshot of the current `/app` route shows several deviations from the agreed architecture:

- Public (marketing) navigation items appearing in the protected app layout.
- Admin management links mixed directly into the main app navigation.
- Account functionality partially embedded in the `/app` page instead of the `/account` routes.
- Ambiguous separation between public and protected layouts.

This document explains what is wrong, what the behavior should be, and which PRD expectations were missed.

---

## 1. Public vs Protected Navigation

### What the current implementation does

On `/app`, the top navigation bar shows:

> `__VG_BRAND_NAME__ | Features | Pricing | Blog | About | Contact | App | Account | Admin | Manage Users | Manage Blog | M`

This means the **marketing links** (`Features`, `Pricing`, `Blog`, `About`, `Contact`) are still visible when the user is inside the authenticated app surface.

### Why this is wrong

The **User Accounts PRD** states that:

- `(public)/layout.tsx` is responsible for the **marketing site** and public content.
- `(protected)/layout.tsx` is responsible for the **authenticated product shell**.

The authenticated app shell should be focused on the product (e.g., `/app`) and account/admin areas, not on marketing pages. Once logged in, the user should feel like they are in the “application”, not browsing the public website.

### How it should work

- **Public layout** (`(public)/layout.tsx`):
  - Shows `Brand | Features | Pricing | Blog | About | Contact | Login/App`.
- **Protected layout** (`(protected)/layout.tsx`):
  - Shows `Brand | App | [optional product tabs] | [Admin (if admin)] | Account dropdown`.
  - Does **not** show `Features`, `Pricing`, `About`, or `Contact`.

### Required fix

- Create/cleanly separate `app/(public)/layout.tsx` and `app/(protected)/layout.tsx`.
- Remove all marketing links from `(protected)/layout.tsx`.
- Ensure `/app`, `/account/*`, and `/admin/*` all render under `(protected)/layout.tsx` only.

---

## 2. Admin Links in Main App Nav

### What the current implementation does

On `/app`, the top nav includes:

> `Admin | Manage Users | Manage Blog`

These are shown as first-class items in the **global navigation bar**.

### Why this is wrong

The PRD defines:

- `/admin/*` as the **super-admin/operator area**, separate from the main app experience.
- Admin-only functions (Users, Analytics, Blog management) should live **inside the admin area**, not in the main app nav.
- Admin visibility must be gated by:
  - `admin.superAdminEnabled`
  - `user.isAdmin`

### How it should work

- Global protected nav (for **normal user**):
  - `Brand | App | [Account dropdown]`.
- Global protected nav (for **admin user**):
  - `Brand | App | Admin | [Account dropdown]`.
- Inside `/admin`, use an admin-specific layout/nav with items such as:
  - `Overview | Users | Analytics | Blog | Settings`.

### Required fix

- Remove `Manage Users` and `Manage Blog` from the global top nav.
- Keep a single `Admin` entry in the global nav, shown only when:
  - `admin.superAdminEnabled === true`, and
  - `user.isAdmin === true`.
- Implement the detailed admin navigation **inside** the `/admin` section using `app/(protected)/admin/layout.tsx` or equivalent.

---

## 3. Account Access: Top-Level Link vs Dropdown

### What the current implementation does

- `Account` appears as a direct nav item in the top bar.
- There is also an `M` on the far right (likely an avatar / account menu).

This creates two different “account entry points”.

### Why this is wrong

The PRD specifies that:

- The **Account area is accessed via a dropdown** in the top-right of the protected layout.
- The dropdown options are:
  - `Profile` → `/account/profile`
  - `Billing` → `/account/billing` (only if `payments.provider !== "none"`)
  - `Logout`

There is no separate top-level `Account` link in the main nav.

### How it should work

- The protected nav should have **only one account entry**:
  - An avatar or name (e.g. the `M`), which opens the Account dropdown.
- The dropdown should route to `/account/profile` and `/account/billing` as per the PRD.

### Required fix

- Remove the standalone `Account` link from the main nav.
- Keep the avatar/initial (`M`) as the **Account dropdown trigger**.
- Implement `Profile`, `Billing`, and `Logout` actions inside this dropdown.

---

## 4. `/app` Content vs Account/Billing Responsibilities

### What the current implementation does

The `/app` page currently shows a “dashboard” style layout including:

- Welcome message.
- Quick Actions.
- Recent Activity (empty).
- **Account Status** card with:
  - `Plan: Free Trial`
  - `Status: Active`
  - `Upgrade Plan` button.
- Getting Started section referencing profile setup and support.

### Why this is wrong

Per the PRD:

- `/app` is the **main product experience** / workspace, not the account center.
- **Plan, subscription status, and upgrade actions belong to `/account/billing`**, not `/app`.
- `/account/profile` is where profile/settings belong.

By embedding “Plan: Free Trial”, “Status: Active”, and “Upgrade Plan” into `/app`, we are mixing **billing/account concerns** into the core app surface.

### How it should work

- `/app`:
  - Shows a neutral product empty state:
    - “Welcome to __VG_BRAND_NAME__”.
    - “You don’t have any data yet”.
    - Single or minimal CTAs like “Create your first X” or “Start using the app”.
  - Does **not** show billing/plan information.

- `/account/billing`:
  - Shows Plan, Status, Upgrade button, invoices, payment methods, etc.
  - Uses the chosen payments provider (Stripe / LemonSqueezy) per config.

### Required fix

- Remove the **Account Status** card (Plan/Status/Upgrade) from `/app`.
- Move this functionality into a dedicated `/account/billing` page.
- Keep `/app` focused on the product workspace and generic empty state only.

---

## 5. Shared Protected Layout vs Marketing Layout

### What the current implementation suggests

The nav on `/app` looks almost identical to what a marketing page would show, which implies:

- Either the same layout is being reused for both `(public)` and `(protected)` routes, **or**
- `(protected)/layout.tsx` was created by copying the marketing layout instead of creating a distinct app shell.

### Why this is wrong

The **User Accounts PRD** clearly differentiates:

- `(public)/layout.tsx` → for landing pages, pricing, about, public blog, etc.
- `(protected)/layout.tsx` → for authenticated app shell.

Mixing these makes it impossible to cleanly control feature flags like `features.userAccounts` and breaks the conceptual separation between “site” and “product”.

### How it should work

- `(public)/layout.tsx`:
  - Contains marketing header/footer and public nav.
- `(protected)/layout.tsx`:
  - Uses `requireUser()` to enforce authentication.
  - Contains the app shell: brand + `App` link + optional `Admin` link + Account dropdown.
  - Renders all protected routes (`/app`, `/account/*`, `/admin/*`) via `{children}`.

### Required fix

- Ensure `(public)` and `(protected)` layouts are **separate files** and not sharing the same nav component by default.
- Update `(protected)/layout.tsx` so it uses the product-focused nav described above, with no marketing links.

---

## 6. Role- and Feature-Based Nav Visibility

### What the current implementation suggests

Because `Admin`, `Manage Users`, and `Manage Blog` appear on `/app` without obvious gating, it likely means:

- Those nav items are not fully controlled by:
  - `admin.superAdminEnabled`
  - `user.isAdmin`
  - `features.blog`

### Why this is wrong

The PRD and the plan addendum specify:

- Admin links must only appear when **both**:
  - Admin features are enabled in config.
  - The current user has admin privileges.
- Blog management should only be visible when `features.blog === true`.
- The presence of account/billing UI should respect `features.userAccounts` and `payments.provider`.

### How it should work

- In navigation logic (e.g. `lib/config/nav.ts`):
  - Show `Admin` only if:
    - `admin.superAdminEnabled === true`, and
    - `user.isAdmin === true`.
  - Show `/admin/blog` entry only if `features.blog === true`.
  - Show `Billing` in the Account dropdown only if `payments.provider !== "none"`.
- When `features.userAccounts === false`:
  - Do **not** show login or account entries anywhere in the nav.

### Required fix

- Wire nav rendering to read from the runtime config modules (`features.ts`, `integrations.ts`) and current user state (`isAdmin`).
- Remove hard-coded Admin/Manage links from the protected nav.
- Add conditional logic so that:
  - Admin/menu entries respect both config flags and user roles.
  - Account/billing entries respect `features.userAccounts` and `payments.provider`.

---

## 7. Summary of All Corrections

1. **Separate public vs protected layouts**:  
   - Public layout shows marketing nav.  
   - Protected layout shows product nav (`App`, optional `Admin`, Account dropdown) and uses `requireUser()`.

2. **Remove marketing links from `/app` nav**:  
   - `Features`, `Pricing`, `About`, `Contact` should not appear on authenticated routes.

3. **Limit admin exposure in global nav**:  
   - Show only a single `Admin` link (if user is admin and admin is enabled).  
   - Move “Manage Users / Manage Blog” into the `/admin` area only.

4. **Consolidate account access into dropdown**:  
   - Remove the top-level `Account` nav item.  
   - Use the avatar/initial (`M`) as the Account dropdown trigger, linking to `/account/profile`, `/account/billing`, and Logout.

5. **Move billing/account status out of `/app`**:  
   - Remove “Plan / Free Trial / Upgrade Plan” card from `/app`.  
   - Implement this in `/account/billing` instead.

6. **Ensure nav respects roles and feature flags**:  
   - Use `features.userAccounts`, `admin.superAdminEnabled`, `features.blog`, and `payments.provider` (via `features.ts` and `integrations.ts`) plus `user.isAdmin` to drive what appears in nav and what routes are accessible.

By applying these corrections, the `/app` experience will align with the PRD: a clean SaaS structure with `/app` as the main product surface, `/account` as the personal settings area, and `/admin` as the operator console—each with appropriate navigation and responsibilities.
