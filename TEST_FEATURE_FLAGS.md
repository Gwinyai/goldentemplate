# Feature Flag Testing Guide

This document provides test scenarios to verify that the conditional navigation system works correctly with different feature flag combinations.

## Test Environment Setup

Copy `.env.example` to `.env.local` and modify the feature flags for each test scenario.

## Test Scenarios

### Scenario 1: All Features Enabled (Default)
```bash
NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=true
NEXT_PUBLIC_ADMIN_ENABLED=true
NEXT_PUBLIC_BLOG_ENABLED=true
NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe
```

**Expected Behavior:**
- Public navigation includes "Blog" link
- When logged in as user: "App", "Account", "Billing" links visible
- When logged in as admin: All user links + "Admin", "Manage Blog", "Manage Users"
- Account dropdown includes: App, Account, Billing (+ Admin links for admins)
- Sign In/Sign Up buttons visible when logged out

### Scenario 2: User Accounts Disabled
```bash
NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=false
NEXT_PUBLIC_ADMIN_ENABLED=true
NEXT_PUBLIC_BLOG_ENABLED=true
NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe
```

**Expected Behavior:**
- Public navigation includes "Blog" link
- No user authentication UI visible (no Sign In/Sign Up buttons)
- No user or admin navigation links
- No account dropdown menu

### Scenario 3: Admin Disabled
```bash
NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=true
NEXT_PUBLIC_ADMIN_ENABLED=false
NEXT_PUBLIC_BLOG_ENABLED=true
NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe
```

**Expected Behavior:**
- User accounts work normally
- No admin navigation links visible (even for admin users)
- Account dropdown only includes user-level links
- Admin users cannot access admin features through navigation

### Scenario 4: Blog Disabled
```bash
NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=true
NEXT_PUBLIC_ADMIN_ENABLED=true
NEXT_PUBLIC_BLOG_ENABLED=false
NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe
```

**Expected Behavior:**
- No "Blog" link in public navigation
- No "Manage Blog" link for admin users
- User accounts and other admin features work normally

### Scenario 5: Billing Disabled (Payments = none)
```bash
NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=true
NEXT_PUBLIC_ADMIN_ENABLED=true
NEXT_PUBLIC_BLOG_ENABLED=true
NEXT_PUBLIC_PAYMENTS_PROVIDER=none
```

**Expected Behavior:**
- User accounts work normally
- No "Billing" link in user navigation
- Account dropdown excludes billing option
- Profile and other user features work normally

### Scenario 6: Marketing Site Only
```bash
NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=false
NEXT_PUBLIC_ADMIN_ENABLED=false
NEXT_PUBLIC_BLOG_ENABLED=false
NEXT_PUBLIC_PAYMENTS_PROVIDER=none
```

**Expected Behavior:**
- Only basic public navigation (Home, Features, Pricing, About, Contact)
- No authentication UI
- No user account features
- No admin features
- No blog features

## Testing Process

1. Set environment variables for each scenario
2. Restart the development server (`npm run dev`)
3. Visit the application and verify:
   - Public navigation items
   - Authentication UI visibility
   - User navigation (when logged in as regular user)
   - Admin navigation (when logged in as admin user)
   - Account dropdown contents
   - Mobile menu behavior

## Implementation Files

The conditional navigation is implemented in:
- `src/lib/config/features.ts` - Feature flag functions
- `src/lib/config/nav.ts` - Navigation filtering logic
- `src/components/layout/site-header.tsx` - Navigation component
- `.env.example` - Environment variable examples

## Notes

- Changes to environment variables require restarting the development server
- The feature flag system is designed for template generation, not runtime toggling
- In production, these flags would be set during the template generation process