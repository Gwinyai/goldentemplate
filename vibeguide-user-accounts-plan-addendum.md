# PRD Addendum: Revised User Accounts Implementation Plan

This document refines and corrects the **User Accounts Implementation Plan** to fully align with the **User Accounts & Auth PRD** for the VibeGuide golden template.

It focuses on four key adjustments:

1. Widening the scope from just `/app` to the **entire protected area** (`/app`, `/account/*`, `/admin/*`).
2. Ensuring the **admin panel** adopts the new auth patterns (`requireAdmin`).
3. Clarifying the boundary between **TemplateConfig** (generator-only) and **runtime config** (`features.ts`, `integrations.ts`).
4. Making the behavior for `features.userAccounts = false` **explicit and testable**.

This addendum replaces the earlier implementation plan where they conflict.

---

## 1. Scope Clarification: Protected Area

### Previous Wording (Problematic)

> This plan focuses only on user account functionality within the protected `/app` routes… No changes needed to the public-facing website routes… or the existing admin panel.

### Revised Intent

The user account system and auth integration **must** cover the entire **protected area**, not just `/app`.

### Updated Scope

The implementation must:

- Treat the `(protected)` route group as a **shared authenticated shell** for:
  - `/app`
  - `/account/*`
  - `/admin/*`
- Ensure all of these routes:
  - Use the same global auth enforcement (`requireUser()`).
  - Share a consistent top navigation bar, including the Account menu (where appropriate).
- Avoid treating the admin panel as a separate, untouched system; it must integrate with the new auth and layout patterns.

### Updated Phase 1 Title and Description

Replace:

> ## Phase 1: User Account Routes (Protected Area Only)

With:

```md
## Phase 1: Protected Route Structure (App, Account, Admin)

- [ ] Update `app/(protected)/layout.tsx` with global auth enforcement (`requireUser()`) and shared top nav.
- [ ] Create main product route: `app/(protected)/app/page.tsx`.
- [ ] Create account management routes:
  - [ ] `app/(protected)/account/profile/page.tsx`
  - [ ] `app/(protected)/account/billing/page.tsx`
- [ ] Ensure admin routes under `app/(protected)/admin/*` render under the same protected layout (or a nested `admin/layout.tsx`) and hook into the same auth system.
```

And adjust the note at the top of the plan to:

```md
**Note**: This plan focuses on user account functionality and how it integrates into the shared protected area (`/app`, `/account/*`, `/admin/*`). Public-facing website routes (marketing pages, public blog, etc.) remain unchanged.
```

---

## 2. Admin Panel Integration with `requireAdmin`

### Previous Assumption

> Ensure admin routes remain accessible to admin users (no changes needed to existing admin panel)

This is misleading. The admin panel **must** be wired into the new auth abstraction and properly restricted.

### Revised Requirements

The admin area must:

- Live under `app/(protected)/admin/*`.
- Be protected by `requireAdmin()`.
- Optionally use an `admin/layout.tsx` for distinct UI, but still inherit `requireUser()` from `(protected)/layout.tsx`.

### Updated Items (Phases 1, 2, 5)

**Phase 1** (as above) now explicitly mentions admin routes under `(protected)`.

**Phase 2 – Authentication System** should include:

```md
### 2.2 User Roles & Permissions

- [ ] Define user object interface with `isAdmin` field (or equivalent role indicator).
- [ ] Implement role-based access control using `requireAdmin()`.
- [ ] Add admin flag handling in user sessions and/or database.
```

**Phase 5 – Admin Integration** should be refined to:

```md
## Phase 5: Admin Integration

### 5.1 Admin Auth & Navigation Integration

- [ ] Ensure all `app/(protected)/admin/*` routes are protected by `requireAdmin()` via `app/(protected)/admin/layout.tsx` or per-page usage.
- [ ] Ensure admin users see admin navigation links in the global nav (e.g., a link to `/admin` or admin menu entry).
- [ ] Verify existing admin pages (Users, Analytics, Blog) work correctly under the new auth system.
- [ ] Test that non-admin users cannot access `/admin/*` and are redirected appropriately (e.g., to `/app`).
```

The phrase “no changes needed to admin panel” should be removed from the implementation plan.

---

## 3. TemplateConfig vs Runtime Config (`features.ts` / `integrations.ts`)

### Previous Wording (Ambiguous)

> Implement feature flag reading from TemplateConfig

This blurs the separation of concerns. The golden template **should not** know about `TemplateConfig` directly. That object is used only by the **generator backend** when mutating the template.

### Correct Architecture

- **Backend/generator**:
  - Receives `TemplateConfig` from the wizard.
  - Mutates **source files** in the golden template (e.g. `lib/config/features.ts`, `lib/config/integrations.ts`) to match the chosen options.
- **Golden template runtime**:
  - Only imports and reads from `features.ts` and `integrations.ts` (or similar modules).
  - Has no knowledge of `TemplateConfig` at runtime.

### Revised Phase 6

Replace Phase 6 with:

```md
## Phase 6: Feature Flags & Config Integration

### 6.1 Runtime Config Modules

- [ ] Create `lib/config/features.ts` with strongly-typed feature flags, for example:
  - `features.userAccounts`
  - `features.blog`
  - `features.admin` (or `admin.superAdminEnabled` applied here)
- [ ] Create `lib/config/integrations.ts` to represent integration choices at runtime, for example:
  - `integrations.authDbPreset`
  - `integrations.paymentsProvider`
  - `integrations.storageProvider`
  - `integrations.emailProvider`
  - `integrations.analyticsProvider`

### 6.2 App Usage

- [ ] Ensure navigation, layouts, and feature-specific components:
  - Import and use `features` and `integrations` from these config modules.
  - Do **not** reference `TemplateConfig` directly.
- [ ] Use these flags to conditionally show or hide:
  - Login and Account UI (based on `features.userAccounts`).
  - Admin nav and routes (based on admin flag).
  - Blog links (based on `features.blog`).
  - Billing UI (based on `integrations.paymentsProvider`).

### 6.3 Generator Responsibility (for reference)

- [ ] The Cloud Run generator service will:
  - Parse `TemplateConfig`.
  - Update `features.ts` and `integrations.ts` (and potentially related files) to match the requested configuration.
  - Leave clear TODO comments around disabled features where appropriate.
```

This makes it clear that the implementation work is about **consuming** `features`/`integrations`, not `TemplateConfig` itself.

---

## 4. Behavior When `features.userAccounts = false`

### Previous Plan

The behavior for disabled user accounts was only fully described in the **Success Criteria** section, not in the implementation steps. This risks Cursor treating it as “nice-to-have” instead of a requirement.

### Required Behavior

When `features.userAccounts = false`:

- The template behaves like a **marketing-only site**.
- Users should not see login/account entry points.
- Attempting to access protected user-account routes should not expose broken or half-wired UIs.

### Revised Implementation Items

Add to Phase 3 (Navigation) and Phase 7 (UX flows):

```md
## Phase 3: Navigation & Layout Components (Additions)

- [ ] When `features.userAccounts = false`:
  - [ ] Hide Login and Account menu items from the global navigation.
```

```md
## Phase 7: User Experience Flows (Additions)

### 7.1 Authentication Flow

- [ ] Implement login redirect logic:
  - [ ] If `features.userAccounts = true`:
    - [ ] Normal behavior: `/login` → on success, redirect to `/admin` (if `isAdmin`) or `/app` (if normal user).
  - [ ] If `features.userAccounts = false`:
    - [ ] The app should not expose `/login` via navigation.
    - [ ] (Optional) Hitting `/login` directly should either redirect to `/` or show a clear message that user accounts are disabled in this template.

### 7.2 Access Control When User Accounts Are Disabled

- [ ] If `features.userAccounts = false` and a user attempts to access `/app` or `/account/*`:
  - [ ] Redirect to `/` **or** display a simple stub page: “User accounts are disabled in this template. Enable them via TemplateConfig to use `/app` and `/account` features.”
- [ ] Confirm there is no way to accidentally surface broken account UIs when user accounts are disabled.
```

This ensures **both nav and routing** respect `features.userAccounts` and that behavior is easy to test and validate.

---

## 5. Minor Clarifications and Confirmations

### 5.1 Billing Behavior

To make Phase 4 crystal clear, add:

```md
### 4.2 Billing Integration (Clarification)

- [ ] If `integrations.paymentsProvider` is `"stripe"` or `"lemonsqueezy"`:
  - [ ] Show active Billing UI under `/account/billing`.
  - [ ] Include provider-specific labels and README notes.
- [ ] If `integrations.paymentsProvider` is `"none"`:
  - [ ] Either hide Billing from the Account menu **or**
  - [ ] Show a clear "Billing not configured" stub UI.
```

### 5.2 Admin Links in Nav

Explicitly require the nav to respect admin status:

```md
### 3.1 Global Navigation (Clarification)

- [ ] If `admin.superAdminEnabled = true` and `user.isAdmin = true`:
  - [ ] Show an Admin link or entry in the global navigation that routes to `/admin`.
- [ ] If `user.isAdmin = false`:
  - [ ] Do not show admin navigation items, even if `admin.superAdminEnabled = true`.
```

---

## 6. Summary of Changes

- **Scope expanded**: The plan now clearly applies to the entire `(protected)` area (`/app`, `/account/*`, `/admin/*`), not just `/app`.
- **Admin integrated**: Admin routes are required to use `requireAdmin()` and integrate with the new auth and navigation patterns.
- **Config boundary clarified**: TemplateConfig is acknowledged as generator-only; runtime reads from `features.ts` and `integrations.ts` instead.
- **`features.userAccounts = false`**: The implementation must explicitly hide login/account UI, handle attempted access to `/app`/`/account/*`, and ensure the app behaves as a marketing-only template when user accounts are disabled.

These changes should be applied to the existing implementation plan so that Cursor (or any other agent) builds a user account system that matches the intended golden template architecture and SaaS UX patterns.
