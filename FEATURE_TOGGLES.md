# Feature Toggle System

This document explains how the feature toggle system works in the golden template and how it integrates with template generation.

## Overview

The feature toggle system allows components and routes to be conditionally enabled/disabled based on:
1. Environment variables (for development/testing)
2. TemplateConfig settings (for generated templates)
3. Runtime configuration (for dynamic features)

## Configuration Sources

### Priority Order
1. **Environment Variables** - Highest priority (development/testing)
2. **TemplateConfig** - Generated template configuration
3. **Default Values** - Fallback when no configuration is available

### Environment Variables

```bash
# User Accounts System
NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=true|false

# Admin Panel
NEXT_PUBLIC_ADMIN_ENABLED=true|false

# Blog System  
NEXT_PUBLIC_BLOG_ENABLED=true|false

# Payments Provider
NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe|lemonsqueezy|none
```

### TemplateConfig Integration

In generated templates, features are controlled by the `TemplateConfig` object:

```typescript
interface TemplateConfig {
  features: {
    auth: { enabled: boolean };
    blog: { enabled: boolean };
    admin: { enabled: boolean };
    billing: { 
      enabled: boolean;
      provider: "stripe" | "lemonsqueezy" | "paddle" | "custom";
    };
  };
}
```

## Feature Flags Available

### User Accounts (`userAccounts`)
- **Controls**: Authentication flows, user routes, account management
- **Affects**: `/app`, `/account/*`, login/register forms, user navigation
- **When disabled**: Shows marketing-only site, hides auth UI

### Admin Panel (`admin`) 
- **Controls**: Administrative interface and routes
- **Affects**: `/admin/*`, admin navigation, user management features
- **When disabled**: Hides admin links and routes for all users

### Blog System (`blog`)
- **Controls**: Blog content and management features  
- **Affects**: `/blog`, `/admin/blog`, blog navigation links
- **When disabled**: Hides blog links and admin blog management

### Billing (`billing`)
- **Controls**: Payment processing and subscription features
- **Affects**: `/account/billing`, billing navigation, payment forms
- **When disabled**: Shows "not configured" message

## Implementation

### Helper Functions

Located in `src/lib/config/features.ts`:

```typescript
// Check individual features
isUserAccountsEnabled(): boolean
isAdminEnabled(): boolean  
isBlogEnabled(): boolean
isBillingEnabled(): boolean

// Get payments provider
getPaymentsProvider(): "stripe" | "lemonsqueezy" | "none"

// Get full configuration
getTemplateConfig(): LegacyTemplateConfig
```

### Conditional Rendering Components

Located in `src/components/conditional/feature-guard.tsx`:

```typescript
// Wrap components to conditionally render based on features
<FeatureGuard feature="userAccounts" fallback={<DisabledMessage />}>
  <UserAccountComponent />
</FeatureGuard>

// HOC for page-level protection
const ProtectedPage = withFeature("admin")(AdminPage);

// Route-level conditional rendering
<ConditionalRoute feature="blog">
  <BlogContent />
</ConditionalRoute>
```

### Navigation Integration

Navigation items are automatically filtered based on feature flags:

```typescript
// Site header navigation
const { publicNav, userNav, adminNav } = getConditionalNavigation({
  includeAuth: isUserAccountsEnabled(),
  includeAdmin: isAdminEnabled(), 
  includeBlog: isBlogEnabled(),
  includeBilling: isBillingEnabled(),
});

// Admin shell navigation  
const filteredNavigation = adminNavigation.filter(section => {
  // Remove blog management if blog is disabled
  if (section.title === "Content Management") {
    const items = section.items.filter(item => 
      item.href !== "/admin/blog" || isBlogEnabled()
    );
    return items.length > 0 ? { ...section, items } : false;
  }
  return section;
});
```

## Template Generation Integration

### During Template Generation

1. **Config Processing**: The template generator reads `TemplateConfig` and determines enabled features
2. **File Filtering**: Routes and components for disabled features can be:
   - Removed entirely (Option A)
   - Kept with disabled state + TODO comments (Option B - recommended)
3. **Environment Setup**: Default environment variables are set based on config
4. **Documentation**: README is updated to reflect enabled features

### Recommended Approach (Option B)

Keep all routes and components but disable them with clear messaging:

```typescript
// In generated templates, this would be replaced with the actual config
export function getTemplateConfig(): LegacyTemplateConfig {
  return {
    features: {
      userAccounts: __VG_USER_ACCOUNTS_ENABLED__, // Generator replaces this
      blog: __VG_BLOG_ENABLED__, // Generator replaces this  
    },
    admin: {
      superAdminEnabled: __VG_ADMIN_ENABLED__, // Generator replaces this
    },
    payments: {
      provider: "__VG_PAYMENTS_PROVIDER__", // Generator replaces this
    },
  };
}
```

## Usage Examples

### Conditionally Show Navigation

```typescript
// In site header
{isUserAccountsEnabled() && (
  <Button asChild>
    <Link href="/login">Sign In</Link>
  </Button>
)}
```

### Protect Admin Routes

```typescript
// In admin pages
export default async function AdminPage() {
  if (!isAdminEnabled()) {
    return <FeatureGuard feature="admin" />;
  }
  
  const user = await requireAdmin();
  return <AdminContent user={user} />;
}
```

### Conditional Billing Features

```typescript
// In account pages
{isBillingEnabled() ? (
  <BillingManagement provider={getPaymentsProvider()} />
) : (
  <div>Billing is not configured in this template.</div>
)}
```

## Development Workflow

### Testing Different Configurations

1. Copy `.env.example` to `.env.local`
2. Modify feature flags for testing:
   ```bash
   NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=false
   NEXT_PUBLIC_ADMIN_ENABLED=false  
   NEXT_PUBLIC_BLOG_ENABLED=true
   NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe
   ```
3. Restart development server
4. Verify UI updates accordingly

### Feature Development

1. **Add new features** to the feature flag system first
2. **Implement conditionally** from the start
3. **Test with flags** both enabled and disabled  
4. **Update navigation** and routing as needed
5. **Document** the new feature in this file

## Best Practices

### For Developers

- Always check feature flags before implementing new features
- Use the `FeatureGuard` component for conditional rendering
- Update navigation configs when adding new routes
- Test with features both enabled and disabled

### For Template Generation

- Keep disabled features with clear messaging rather than removing them
- Use placeholder tokens that can be replaced during generation
- Provide clear documentation about what each feature enables
- Include setup instructions for disabled features

### For Users

- Check environment variables if features seem missing
- Refer to this documentation to understand what each flag controls
- Use the test scenarios in `TEST_FEATURE_FLAGS.md` for verification

## Troubleshooting

### Feature Not Showing Up
1. Check environment variables are set correctly
2. Restart development server after changing env vars  
3. Verify feature flag checks in relevant components
4. Check navigation configuration includes the feature

### Feature Shows When It Shouldn't
1. Verify environment variable is set to "false" (not just missing)
2. Check for multiple environment files that might conflict
3. Ensure conditional logic is implemented correctly

### Navigation Missing Items
1. Verify navigation filtering functions include your feature
2. Check that feature flags are being read correctly
3. Ensure navigation items have correct feature associations

## Files Modified

This feature toggle system touches the following files:

- `src/lib/config/features.ts` - Core feature flag logic
- `src/lib/config/nav.ts` - Navigation filtering
- `src/components/layout/site-header.tsx` - Conditional navigation
- `src/components/layout/admin-shell.tsx` - Admin navigation filtering  
- `src/components/conditional/feature-guard.tsx` - Conditional rendering helpers
- `src/app/(protected)/account/billing/page.tsx` - Billing conditional display
- Various route files with conditional rendering
- `.env.example` - Environment variable examples
- `TEST_FEATURE_FLAGS.md` - Testing scenarios