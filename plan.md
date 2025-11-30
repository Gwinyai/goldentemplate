# User Accounts Implementation Plan: VibeGuide Golden Template

## Overview
This plan outlines the implementation of user account functionality and authentication system for the VibeGuide golden template. The focus is on integrating user accounts into the shared protected area (`/app`, `/account/*`, `/admin/*`) while maintaining clear separation of concerns between generator configuration and runtime behavior.

**Note**: This plan focuses on user account functionality and how it integrates into the shared protected area (`/app`, `/account/*`, `/admin/*`). Public-facing website routes (marketing pages, public blog, etc.) remain unchanged.

## Phase 1: Protected Route Structure (App, Account, Admin)

### 1.1 Core Protected Layout
- [x] Update `app/(protected)/layout.tsx` with global auth enforcement (`requireUser()`) and shared top nav
- [x] Create main product route: `app/(protected)/app/page.tsx`
- [x] Create account management routes:
  - [x] `app/(protected)/account/profile/page.tsx`
  - [x] `app/(protected)/account/billing/page.tsx`
- [x] Ensure admin routes under `app/(protected)/admin/*` render under the same protected layout (or a nested `admin/layout.tsx`) and hook into the same auth system

## Phase 2: Authentication System

### 2.1 Core Auth Infrastructure
- [x] Implement `requireUser()` middleware for protected routes
- [x] Create login/logout functionality with proper session management
- [x] Set up auth provider integration (Supabase/Firebase abstractions)
- [x] Implement redirect logic: successful login → `/admin` (if admin) or `/app` (if regular user)

### 2.2 User Roles & Permissions
- [x] Define user object interface with `isAdmin` field (or equivalent role indicator)
- [x] Implement role-based access control using `requireAdmin()`
- [x] Add admin flag handling in user sessions and/or database

### 2.3 Auth UI Components
- [x] Create login form component
- [x] Create user registration form
- [x] Implement logout functionality
- [x] Add loading states and error handling for auth flows

## Phase 3: Navigation & Layout Components

### 3.1 Global Navigation
- [x] Create top navigation bar with user authentication state
- [x] Implement Account menu dropdown (Profile, Billing, Logout)
- [x] Add conditional admin navigation:
  - [x] If `admin.superAdminEnabled = true` and `user.isAdmin = true`: Show Admin link to `/admin`
  - [x] If `user.isAdmin = false`: Hide admin navigation items
- [ ] When `features.userAccounts = false`: Hide Login and Account menu items from the global navigation

### 3.2 Protected Layout Shell
- [x] Create shared layout component for `(protected)` route group
- [ ] Implement breadcrumb navigation for `/app`, `/account/*`, `/admin/*`
- [x] Add user avatar and quick actions in header
- [x] Ensure consistent styling across all protected areas

### 3.3 Account-Specific Components
- [ ] User profile form with validation
- [ ] Account settings management
- [ ] Password change functionality
- [ ] Account deletion workflow (with confirmations)

## Phase 4: Account Management & Billing

### 4.1 Account Profile Management
- [x] Implement `/account/profile` page with user information editing
- [ ] Add profile image upload functionality
- [ ] Create form validation for profile updates
- [ ] Add success/error messaging for profile changes

### 4.2 Billing Integration
- [x] Create `/account/billing` page with subscription management
- [ ] If `integrations.paymentsProvider` is `"stripe"` or `"lemonsqueezy"`:
  - [ ] Show active Billing UI under `/account/billing`
  - [ ] Include provider-specific labels and README notes
- [x] If `integrations.paymentsProvider` is `"none"`:
  - [x] Either hide Billing from the Account menu **or**
  - [x] Show a clear "Billing not configured" stub UI
- [x] Implement subscription status display
- [x] Add billing history and invoice download functionality

### 4.3 App Dashboard Implementation
- [x] Create main product dashboard at `/app`
- [x] Add user-specific content and functionality
- [x] Implement dashboard widgets and stats
- [x] Add quick access to account settings and billing

## Phase 5: Admin Integration

### 5.1 Admin Auth & Navigation Integration
- [x] Ensure all `app/(protected)/admin/*` routes are protected by `requireAdmin()` via `app/(protected)/admin/layout.tsx` or per-page usage
- [x] Ensure admin users see admin navigation links in the global nav (e.g., a link to `/admin` or admin menu entry)
- [x] Verify existing admin pages (Users, Analytics, Blog) work correctly under the new auth system
- [x] Test that non-admin users cannot access `/admin/*` and are redirected appropriately (e.g., to `/app`)

### 5.2 Admin Dashboard Enhancement
- [ ] Update admin dashboard to integrate with user account system
- [ ] Add user management functionality for admin users
- [ ] Implement admin-only features and settings
- [ ] Add audit logging for admin actions

## Phase 6: Feature Flags & Config Integration

### 6.1 Runtime Config Modules
- [ ] Create `lib/config/features.ts` with strongly-typed feature flags:
  - `features.userAccounts`
  - `features.blog`
  - `features.admin` (or `admin.superAdminEnabled` applied here)
- [ ] Create `lib/config/integrations.ts` to represent integration choices at runtime:
  - `integrations.authDbPreset`
  - `integrations.paymentsProvider`
  - `integrations.storageProvider`
  - `integrations.emailProvider`
  - `integrations.analyticsProvider`

### 6.2 App Usage
- [ ] Ensure navigation, layouts, and feature-specific components:
  - Import and use `features` and `integrations` from these config modules
  - Do **not** reference `TemplateConfig` directly
- [ ] Use these flags to conditionally show or hide:
  - Login and Account UI (based on `features.userAccounts`)
  - Admin nav and routes (based on admin flag)
  - Blog links (based on `features.blog`)
  - Billing UI (based on `integrations.paymentsProvider`)

### 6.3 Generator Responsibility (for reference)
- [ ] The Cloud Run generator service will:
  - Parse `TemplateConfig`
  - Update `features.ts` and `integrations.ts` (and potentially related files) to match the requested configuration
  - Leave clear TODO comments around disabled features where appropriate

## Phase 7: User Experience Flows

### 7.1 Authentication Flow
- [ ] Implement login redirect logic:
  - [ ] If `features.userAccounts = true`:
    - [ ] Normal behavior: `/login` → on success, redirect to `/admin` (if `isAdmin`) or `/app` (if normal user)
  - [ ] If `features.userAccounts = false`:
    - [ ] The app should not expose `/login` via navigation
    - [ ] (Optional) Hitting `/login` directly should either redirect to `/` or show a clear message that user accounts are disabled in this template

### 7.2 Access Control When User Accounts Are Disabled
- [ ] If `features.userAccounts = false` and a user attempts to access `/app` or `/account/*`:
  - [ ] Redirect to `/` **or** display a simple stub page: "User accounts are disabled in this template. Enable them via TemplateConfig to use `/app` and `/account` features."
- [ ] Confirm there is no way to accidentally surface broken account UIs when user accounts are disabled

### 7.3 User Onboarding & Setup
- [ ] Create first-time user setup flow
- [ ] Implement account verification process
- [ ] Add welcome messages and guided tours
- [ ] Ensure smooth transitions between auth states

## Phase 8: Testing & Validation

### 8.1 User Account Testing
- [ ] Test user registration and login flows
- [ ] Verify account management functionality
- [ ] Test admin access controls and permissions
- [ ] Validate billing integration when enabled

### 8.2 Feature Flag Testing
- [ ] Test behavior when `features.userAccounts = false`
- [ ] Verify navigation respects feature flags
- [ ] Test graceful degradation of disabled features
- [ ] Ensure no broken UI states when features are disabled

## Key Implementation Guidelines

### Design Token Strategy
- Use `__VG_*__` prefixed placeholders for generator replacement
- Centralize all brand elements in `design-tokens.ts`
- Ensure Tailwind config reads from design tokens

### Auth Abstraction
- Create provider-agnostic interfaces
- Default to Supabase but keep Firebase patterns
- Use clear TODO comments for integration points

### Integration Safety
- All integrations must be safe when unconfigured
- Use no-op fallbacks or clear error messages
- Provide type-safe interfaces for all services

### Generator Readiness
- Use consistent placeholder naming conventions
- Structure files for easy find-and-replace operations
- Separate configuration from implementation
- Document all customization points

## Success Criteria

✅ **Runnable**: `npm run dev` starts a fully functional Next.js app
✅ **Complete**: All required routes and components implemented  
✅ **Configurable**: Clear placeholder system for generator replacement
✅ **Safe**: All integrations handle missing configuration gracefully
✅ **Extensible**: Well-structured foundation for feature additions
✅ **Documented**: Clear guides for usage and extension

## Timeline Estimate
- **Phase 1-2**: Foundation (2-3 days)
- **Phase 3-4**: Components & Routes (3-4 days)  
- **Phase 5-6**: API & Documentation (1-2 days)
- **Phase 7**: Testing & Polish (1 day)

**Total**: ~7-10 days for complete implementation