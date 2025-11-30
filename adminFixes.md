# adminFixes.md

## Purpose

This document describes the changes required to bring the **Admin area** of the VibeGuide golden template in line with the agreed MVP and the User Accounts / Admin PRDs.

The current `/admin` UI is visually strong but **exposes more features than the template actually supports**, and duplicates some global UI. This document specifies:

- What is incorrect or out of scope.
- What the admin area should include for the MVP.
- Concrete fixes to apply to navigation, layout, and quick actions.

> NOTE: We **will have user management**, but **not** full user roles & permissions management (no dedicated RBAC UI).

---

## 1. Sidebar Scope: Too Many Sections for MVP

### Current Sidebar Sections

- **Dashboard**
  - Overview
  - Analytics

- **Content Management**
  - Blog Posts
  - Pages
  - Media Library

- **User Management**
  - Users
  - Roles & Permissions

- **System**
  - Settings
  - API Keys

### Problem

The sidebar implies a **full CMS and system settings panel**, which:
- Goes beyond what the current `TemplateConfig` and generator support.
- Confuses users by showing features like **Pages**, **Media Library**, **System Settings**, and **API Keys** that have no backing logic in the template.
- Introduces UI debt that the generator cannot reliably configure or prune at this stage.

### Intended MVP Scope

Per our discussions and PRDs, the admin area for MVP should provide:

- A simple **Admin Dashboard** (overview page).
- **Analytics** page for basic metrics (stub/demo is fine).
- **Blog management** (if `features.blog` is enabled).
- **User management** (basic user list, optional `isAdmin` toggle) when:
  - `features.userAccounts` is true, and
  - `admin.superAdminEnabled` is true.

We explicitly **do not** support at this stage:
- Full static pages CMS.
- Media library management.
- General system settings and API key management.
- Dedicated roles & permissions UI beyond a basic `isAdmin` flag on users.

### Required Fixes

**Keep:**
- `Dashboard → Overview`
- `Dashboard → Analytics`
- `Content Management → Blog Posts`
- `User Management → Users`

**Remove or comment out for now:**
- `Content Management → Pages`
- `Content Management → Media Library`
- `User Management → Roles & Permissions`
- `System → Settings`
- `System → API Keys`

Implementation detail:
- Prefer to remove these items from the runtime navigation config (e.g. `adminNavItems`), or guard them behind feature flags that are **false for now** with clear TODO comments.

---

## 2. Global Nav vs Admin Layout: Avoid Double Bars

### Current Behavior

The `/admin` screen shows:

1. A **global protected nav** at the very top:
   - `__VG_BRAND_NAME__` on the left.
   - `Admin` + `M` (account dropdown) on the right.
2. A **second admin-specific top bar** immediately below, containing:
   - Sidebar menu icon.
   - `__VG_BRAND_NAME__ Admin` text.
   - "Admin Panel" pill.
   - "Back to App" button.
   - Another `M` avatar on the far right.

This results in:
- Two separate bars with brand and account avatar (`M`).
- Redundant/competing top-level chrome, making it unclear which bar is the “real” app shell.

### Intended Behavior

Per the User Accounts PRD and addendum:

- `(protected)/layout.tsx` defines the **single global protected shell** for:
  - `/app`
  - `/account/*`
  - `/admin/*`

- The Admin area should be a **screen inside that shell**, not a second full app on top of it.

### Required Fixes

1. **Keep the global protected nav** at the very top:
   - Left: brand (`__VG_BRAND_NAME__`) linking to `/app`.
   - Right: `Admin` (for admins only) + account dropdown (`M` with Profile/Billing/Logout).

2. **Simplify the admin layout bar**:
   - Keep sidebar + “Admin Dashboard” title + cards as the main admin chrome.
   - Remove the **second `M` avatar** from the admin-specific bar.
   - Keep or relocate “Back to App”:
     - Ideally move it into the admin header area (e.g. top-right of main panel) rather than a second full-width bar.

Result:
- One global nav; admin-specific UI lives inside the content area.
- Account controls exist in exactly one place (global nav dropdown).

---

## 3. Quick Actions vs Menu Redundancy

### Current Quick Actions (Right Panel)

- Manage Users
- Manage Blog Posts
- View Analytics
- System Settings

### Problem

- The first three map correctly to sidebar items (`Users`, `Blog Posts`, `Analytics`).
- **System Settings** links to a page that is out-of-scope for MVP and should not be exposed.

### Intended Behavior

- Quick actions are fine as **shortcuts** to core admin sections, but they must only reference features that actually exist in the MVP admin.

### Required Fixes

- Keep quick actions for:
  - **Manage Users** → `/admin/users`
  - **Manage Blog Posts** → `/admin/blog`
  - **View Analytics** → `/admin/analytics`
- Remove or comment out:
  - **System Settings** (until we explicitly support system settings in TemplateConfig and in the template).

---

## 4. User Management Scope (No Dedicated Roles & Permissions UI)

### Current UI

- Sidebar includes:
  - `User Management → Users`
  - `User Management → Roles & Permissions`

### Agreed Behavior

- We **do support** user management (list users, update basic properties).
- We **do not** build a full roles & permissions management UI in the MVP.

Instead, for admin logic we only need:

- A way to designate admins (e.g. `isAdmin` boolean on user records).
- `requireAdmin()` guard to restrict access to `/admin/*`.

### Required Fixes

- Keep `Users` page and ensure it supports:
  - Listing users.
  - Showing basic info (email, created date, etc.).
  - Optionally toggling `isAdmin` (for advanced templates).

- Remove `Roles & Permissions` from the sidebar, or replace it with a **non-functional stub** (simple “coming soon/advanced feature” screen) without promising full RBAC.

- In the code, document clearly that:
  - Complex roles/permissions are out of scope for MVP.
  - `isAdmin` is the only special role flag used by `requireAdmin()`.

---

## 5. Mapping Back to TemplateConfig

The admin nav and behavior must align with `TemplateConfig`-driven runtime configs (`features.ts`, `integrations.ts`):

- `features.blog`:
  - Controls whether **Blog Posts** appears in the admin sidebar.
  - If false, hide admin blog management and any associated quick actions.

- `features.userAccounts` and `admin.superAdminEnabled`:
  - Control whether the **Admin** area exists at all.
  - Control whether **Users** appears in the sidebar and quick actions.
  - If either is false, Admin links and `/admin` routes should be disabled/hidden or stubbed.

- `analytics.provider` (if used later):
  - May influence content of Analytics page, but for MVP it can remain mostly static/stubbed.

### Required Fixes

- Ensure admin sidebar items and quick actions are defined via an `adminNavConfig` (or similar) that reads from `features` and `integrations`.
- Do **not** expose admin entries that TemplateConfig can never enable.

---

## 6. Final Target Admin Structure (MVP)

### Sidebar (MVP)

- **Dashboard**
  - Overview
  - Analytics
- **Content Management**
  - Blog Posts *(only if `features.blog` is true)*
- **User Management**
  - Users *(only if `features.userAccounts` and `admin.superAdminEnabled` are true)*

### Removed/Held for Future

- `Pages`
- `Media Library`
- `Settings`
- `API Keys`
- `Roles & Permissions` (beyond `isAdmin` in the Users page)

### Top-Level

- Single global protected nav (brand → `/app`, `Admin` (admins only), account dropdown).
- Admin layout with sidebar + header + content; no second account avatar or global chromes.

By applying these changes, the Admin area will:
- Match the minimal SaaS operator console we designed.
- Avoid over-promising capabilities the generator cannot actually wire up.
- Keep the golden template focused, composable, and easier to mutate from `TemplateConfig`.
