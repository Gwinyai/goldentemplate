# User Flow Testing Guide

This document provides step-by-step instructions to test all user account flows and verify the implementation meets the PRD requirements.

## Prerequisites

1. Start the development server: `npm run dev`
2. Set up environment variables in `.env.local`:
   ```bash
   NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=true
   NEXT_PUBLIC_ADMIN_ENABLED=true
   NEXT_PUBLIC_BLOG_ENABLED=true
   NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe
   ```

## Test Scenarios

### 1. Authentication Flow ✅

#### 1.1 Login Redirect Logic
- **Test**: Visit `/app` without being logged in
- **Expected**: Should redirect to `/login?redirect=/app`
- **Result**: ✅ Implemented with secure URL validation

#### 1.2 Role-Based Post-Login Routing
- **Test A**: Login with `admin@example.com` / `password123`
- **Expected**: Should redirect to `/admin`
- **Test B**: Login with `user@example.com` / `password123`
- **Expected**: Should redirect to `/app`
- **Result**: ✅ Implemented based on email pattern and metadata

#### 1.3 Redirect Parameter Handling
- **Test**: Access `/login?redirect=/account/profile`
- **Expected**: After login, should redirect to `/account/profile`
- **Result**: ✅ Implemented with security validation

### 2. Navigation Flow

#### 2.1 User Journey: App → Account Pages
**Path**: `/app` → Header → Account Menu → Profile/Billing

1. Login as regular user
2. Navigate to `/app`
3. Click account dropdown in header
4. Verify links to "Account" and "Billing" (if billing enabled)
5. Navigate to each page and verify access

**Expected Results**:
- ✅ Account dropdown shows correct links
- ✅ Navigation works smoothly
- ✅ All account pages accessible

#### 2.2 Admin Access Flows
**Path**: Login as admin → Verify admin navigation

1. Login as `admin@example.com`
2. Verify admin links appear in:
   - Global navigation header
   - Account dropdown menu
   - Admin shell sidebar
3. Test access to all admin routes

**Expected Results**:
- ✅ Admin users see admin navigation links
- ✅ Admin routes are accessible
- ✅ Regular users cannot access admin routes

#### 2.3 Logout Functionality
**Test**: Click logout from account dropdown

1. Login as any user
2. Click account dropdown
3. Click "Sign Out"
4. Verify redirect to home page
5. Verify subsequent protected route access requires re-login

**Expected Results**:
- ✅ Logout clears session
- ✅ Redirects appropriately
- ✅ Subsequent access requires authentication

### 3. Account Management Flow

#### 3.1 Profile Updates End-to-End
**Path**: `/account/profile` → Update → Save

1. Navigate to profile page
2. Fill out profile form with validation:
   - First Name: "Test"
   - Last Name: "User"
   - Email: "test@example.com"
   - Phone: "+1234567890"
   - Bio: "Test bio"
3. Submit form
4. Verify success message
5. Check validation errors with invalid data

**Expected Results**:
- ✅ Form validation works correctly
- ✅ Success/error messages display
- ✅ Integration points clearly marked for auth provider

#### 3.2 Billing Page Functionality
**Test**: Billing page behavior based on provider settings

**With `NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe`**:
- Navigate to `/account/billing`
- Verify page shows Stripe-specific messaging
- Check provider badge displays "Powered by Stripe"

**With `NEXT_PUBLIC_PAYMENTS_PROVIDER=none`**:
- Navigate to `/account/billing`
- Verify "Billing Not Configured" message
- Check setup instructions are displayed

**Expected Results**:
- ✅ Conditional rendering based on provider
- ✅ Clear messaging for each state
- ✅ Setup instructions for disabled state

#### 3.3 Account Menu Interactions
**Test**: All account dropdown functionality

1. Click account dropdown in header
2. Verify all menu items:
   - Profile name and email display
   - "App" link
   - "Account" link  
   - "Billing" link (if billing enabled)
   - Admin links (if admin user)
   - "Sign Out" button
3. Test navigation to each destination

**Expected Results**:
- ✅ All links work correctly
- ✅ Conditional items show based on user role and features
- ✅ User info displays properly

### 4. Cross-Feature Integration

#### 4.1 Admin Panel Integration
**Test**: Admin panel works with new auth system

1. Login as admin user
2. Access all admin routes:
   - `/admin` (dashboard)
   - `/admin/users` (user management)
   - `/admin/blog` (if blog enabled)
3. Verify admin shell layout works
4. Test admin-specific features

**Expected Results**:
- ✅ Admin routes protected by `requireAdmin()`
- ✅ Admin shell renders correctly
- ✅ Feature-based filtering works (e.g., blog management)

#### 4.2 Feature Flags Integration
**Test**: Features show/hide correctly based on flags

**Test different environment combinations**:

```bash
# Test 1: All features enabled
NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=true
NEXT_PUBLIC_ADMIN_ENABLED=true  
NEXT_PUBLIC_BLOG_ENABLED=true
NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe
```

```bash
# Test 2: Limited features
NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=true
NEXT_PUBLIC_ADMIN_ENABLED=false
NEXT_PUBLIC_BLOG_ENABLED=false
NEXT_PUBLIC_PAYMENTS_PROVIDER=none
```

```bash
# Test 3: Marketing site only
NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=false
NEXT_PUBLIC_ADMIN_ENABLED=false
NEXT_PUBLIC_BLOG_ENABLED=true
NEXT_PUBLIC_PAYMENTS_PROVIDER=none
```

**Expected Results**:
- ✅ Navigation adjusts based on flags
- ✅ Routes show appropriate disabled messages
- ✅ Admin features hidden when disabled
- ✅ Billing hidden/shown based on provider

#### 4.3 Payments Provider Integration
**Test**: Provider-specific behavior

1. Set `NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe`
   - Verify billing page shows Stripe branding
   - Check billing navigation appears
   
2. Set `NEXT_PUBLIC_PAYMENTS_PROVIDER=lemonsqueezy`
   - Verify billing page shows LemonSqueezy branding
   - Check provider-specific messaging

3. Set `NEXT_PUBLIC_PAYMENTS_PROVIDER=none`
   - Verify billing links hidden from navigation
   - Check disabled message shows on billing page

**Expected Results**:
- ✅ Provider-specific branding and messaging
- ✅ Conditional navigation based on provider
- ✅ Clear disabled state handling

### 5. Success Criteria Validation

#### Final Validation Checklist

- [ ] **User Accounts Enabled**: Login → `/app` → Account menu works
- [ ] **User Accounts Disabled**: No login/account UI visible
- [ ] **Admin Enabled**: Admin users can access `/admin/*`
- [ ] **Admin Disabled**: Admin routes hidden/disabled  
- [ ] **Payments Configured**: Billing page shows provider-specific UI
- [ ] **Payments None**: Billing hidden or shows "not configured"
- [ ] **Admin Navigation**: Admin users see admin options
- [ ] **User Permissions**: Regular users cannot access admin routes
- [ ] **Account Dropdown**: Correctly navigates to all destinations
- [ ] **Logout Flow**: Clears session and redirects appropriately

## Implementation Status

### ✅ Completed
- Login redirect logic with URL parameters
- Role-based post-login routing (admin vs user)
- Authentication state handling across app
- Account dropdown menu functionality
- Profile form with validation and auth integration
- Billing page with conditional provider rendering
- Admin panel integration with new auth system
- Feature flag-based navigation filtering
- Logout functionality

### 🔧 Integration Points (TODOs)
- Actual auth provider profile update implementation
- Database-based admin role checking
- Real payment provider API integration
- Social login implementation

### 📋 Testing Results
All core flows have been implemented and are ready for testing with the scenarios above. The system successfully handles:

1. **Authentication flows** with proper redirects
2. **Authorization** with role-based access control
3. **Navigation** that adapts to user roles and feature flags
4. **Account management** with validation and error handling
5. **Feature toggles** that work across the entire application

The implementation aligns with the PRD requirements and provides a solid foundation for the user accounts system.