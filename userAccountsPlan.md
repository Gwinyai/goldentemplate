# User Accounts Implementation Plan

This plan outlines the steps to implement the user accounts system as specified in `@userAccountsPRD.md`.

**Note**: This plan focuses only on user account functionality within the protected `/app` routes. No changes are needed to the public-facing website routes (marketing pages, public blog, etc.) or the existing admin panel.

## Phase 1: User Account Routes (Protected Area Only)

### 1.1 Protected Route Structure
- [x] Update `app/(protected)/layout.tsx` with global auth enforcement
- [x] Create main product route: `app/(protected)/app/page.tsx` (Note: `/app` is the main user product experience)
- [x] Create account management routes:
  - [x] `app/(protected)/account/profile/page.tsx`
  - [x] `app/(protected)/account/billing/page.tsx`
- [x] Ensure admin routes remain accessible to admin users (no changes needed to existing admin panel)

## Phase 2: Authentication System

### 2.1 Auth Abstractions & Guards
- [x] Create `src/lib/auth/` directory structure
- [x] Implement `getCurrentUser()` function (as `getUser()` in require-user.ts)
- [x] Implement `requireUser()` guard function
- [x] Implement `requireAdmin()` guard function
- [x] Create auth provider abstraction layer

### 2.2 User Roles & Permissions
- [x] Define user object interface with `isAdmin` field
- [x] Implement role-based access control
- [x] Add admin flag handling in user sessions

## Phase 3: Navigation & Layout Components

### 3.1 Global Navigation
- [x] Create navigation configuration in `lib/config/nav.ts`
- [x] Implement conditional navigation based on:
  - [x] `features.userAccounts` flag
  - [x] `admin.superAdminEnabled` flag
  - [x] `features.blog` flag
  - [x] `payments.provider` setting
- [x] Build Account dropdown menu component
- [x] Add admin navigation links for eligible users

### 3.2 Layout Components
- [x] Update `(protected)/layout.tsx` with:
  - [x] Global top navigation bar
  - [x] Brand/logo integration
  - [x] Account menu dropdown
  - [x] Logout functionality
- [x] Verify admin access from global navigation (existing admin layout is sufficient)

## Phase 4: Account Management Features

### 4.1 Profile Management
- [x] Build profile settings form
- [x] Integrate with auth provider for profile updates
- [x] Add form validation and error handling

### 4.2 Billing Integration
- [x] Create billing page stub
- [x] Integrate with payments provider configuration
- [x] Add conditional billing menu visibility based on `payments.provider`
- [x] Handle "none" provider state with appropriate messaging

## Phase 5: Admin Integration

### 5.1 Admin Navigation Integration
- [x] Ensure admin users see admin navigation links in global nav
- [x] Verify existing admin routes remain accessible
- [x] Test admin access flows with new authentication system

## Phase 6: Template Configuration Integration

### 6.1 Feature Flag Implementation
- [x] Create `lib/config/features.ts` configuration
- [x] Implement feature flag reading from TemplateConfig
- [x] Add conditional rendering based on flags:
  - [x] `features.userAccounts`
  - [x] `admin.superAdminEnabled`
  - [x] `features.blog`
  - [x] `payments.provider`

### 6.2 Template Generation Support
- [x] Ensure routes can be conditionally enabled/disabled
- [x] Add clear TODOs and comments for disabled features
- [x] Create documentation for feature toggles

## Phase 7: User Experience Flows

### 7.1 Authentication Flow
- [x] Implement login redirect logic
- [x] Add role-based post-login routing (admin vs user)
- [x] Handle authentication state across the app

### 7.2 Navigation Flow
- [x] Test user journey from `/app` to account pages
- [x] Verify admin access flows
- [x] Ensure logout functionality works correctly

### 7.3 Account Management Flow
- [x] Test profile updates end-to-end
- [x] Verify billing page functionality
- [x] Test account menu interactions

## Phase 8: Integration & Testing

### 8.1 Auth Provider Integration
- [x] Test with Supabase integration
- [x] Prepare Firebase integration stubs
- [x] Verify provider-agnostic auth API

### 8.2 Cross-Feature Integration
- [x] Verify existing admin panel works with new authentication system
- [x] Test payments provider integration
- [x] Test account features with all feature flags enabled/disabled

### 8.3 Documentation & Cleanup
- [x] Update README with user accounts setup
- [x] Document environment variables needed
- [x] Add deployment considerations for user accounts
- [x] Create troubleshooting guide for common issues

## Success Criteria Verification

### Final Validation Steps
- [x] With `features.userAccounts = true`: Login → `/app` → Account menu works
- [x] With `features.userAccounts = false`: No login/account UI visible
- [x] With `admin.superAdminEnabled = true`: Admin users can access `/admin/*`
- [x] With `admin.superAdminEnabled = false`: Admin routes hidden/disabled
- [x] With `payments.provider = "stripe"/"lemonsqueezy"`: Billing page shows provider-specific UI
- [x] With `payments.provider = "none"`: Billing hidden or shows "not configured" message
- [x] Admin users see admin navigation options
- [x] Regular users cannot access admin routes
- [x] Account dropdown correctly navigates to profile and billing
- [x] Logout functionality clears session and redirects appropriately