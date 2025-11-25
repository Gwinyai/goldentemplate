# Implementation Plan: VibeGuide Golden Template

## Overview
This plan outlines the step-by-step implementation of a Next.js 14+ golden template that serves as a base for SaaS code generation. The template will be fully runnable and structured for easy customization by a generator service.

## Phase 1: Foundation Setup

### 1.1 Project Structure & Configuration
- [x] Create `golden-template/` directory structure
- [x] Initialize Next.js 14+ project with App Router
- [x] Configure TypeScript with strict settings
- [x] Set up Tailwind CSS with custom configuration
- [x] Configure ESLint, Prettier, and development tools
- [x] Create `.env.example` with all required environment variables

### 1.2 Design System Foundation
- [x] Implement `src/design-tokens.ts` with replaceable placeholders
- [x] Configure `tailwind.config.ts` to use design tokens
- [x] Create global CSS with theme variables
- [x] Set up Shadcn UI base components

## Phase 2: Core Infrastructure

### 2.1 Authentication Layer
- [x] Create auth abstraction in `lib/auth/`
- [x] Implement Supabase server/client helpers
- [x] Create Firebase stubs (not fully wired)
- [x] Build `requireUser()` and `requireAdmin()` guards
- [x] Set up session management patterns

### 2.2 Database & Storage
- [ ] Create database client abstractions
- [ ] Set up Supabase client configuration
- [ ] Create Firebase client stubs
- [ ] Implement safe fallbacks for missing configurations

### 2.3 Integration Stubs
- [ ] **Payments**: Stripe and LemonSqueezy integration stubs
- [ ] **Email**: Resend and Mailgun service stubs  
- [ ] **Storage**: AWS S3, GCS, and Supabase Storage stubs
- [ ] **Analytics**: Google Analytics and Pulser integration stubs
- [ ] **Webhooks**: API routes for payment and service webhooks

## Phase 3: UI Components

### 3.1 Base UI Components (Shadcn)
- [ ] Button, Input, Card, Badge components
- [ ] Modal, Dropdown, Alert components  
- [ ] Form components (Textarea, Select)
- [ ] Ensure all components use design tokens

### 3.2 Layout Components
- [ ] Site header with navigation
- [ ] Site footer with links
- [ ] Dashboard shell with sidebar/topbar
- [ ] Admin shell with appropriate navigation
- [ ] Responsive layout patterns

### 3.3 Marketing Components
- [ ] Hero section with CTAs
- [ ] Features grid with placeholder content
- [ ] Pricing section (subscription-ready)
- [ ] Testimonials section
- [ ] Blog listing and post components

### 3.4 Dashboard Components
- [ ] Sidebar navigation
- [ ] Top navigation bar
- [ ] Statistics cards with mock data
- [ ] Recent activity feed
- [ ] User profile components

## Phase 4: Application Routes

### 4.1 Public Routes (`(public)` route group)
- [ ] **Landing page** (`/`) - Marketing site with hero, features, pricing
- [ ] **Auth pages** (`/login`, `/register`) - Authentication forms
- [ ] **Blog system** (`/blog`, `/blog/[slug]`) - Public blog with mock posts
- [ ] Ensure all pages use placeholder content from config

### 4.2 Protected Routes (`(protected)` route group)  
- [ ] **Dashboard** (`/dashboard`) - User home with stats and navigation
- [ ] **Account page** (`/account`) - User profile and settings
- [ ] **Billing page** (`/billing`) - Subscription management stub
- [ ] Implement auth guards for all protected routes

### 4.3 Admin Routes (`(protected)/admin` route group)
- [ ] **Admin home** (`/admin`) - Admin dashboard overview
- [ ] **Blog management** (`/admin/blog`) - CRUD interface for posts
- [ ] **User management** (`/admin/users`) - User administration interface
- [ ] Implement admin role checking

## Phase 5: API & Configuration

### 5.1 API Routes
- [ ] Health check endpoint (`/api/health`)
- [ ] Stripe webhook handler (`/api/webhooks/stripe`)
- [ ] LemonSqueezy webhook handler (`/api/webhooks/lemonsqueezy`)
- [ ] Ensure all webhooks are properly stubbed

### 5.2 Configuration Files
- [ ] **Site config** (`lib/config/site.ts`) - Brand, URLs, metadata
- [ ] **Navigation config** (`lib/config/nav.ts`) - Menu structures
- [ ] **Features config** (`lib/config/features.ts`) - Feature flags
- [ ] Use placeholder tokens for generator replacement

### 5.3 Utilities & Helpers
- [ ] Logger utility with different levels
- [ ] Pagination helpers for lists
- [ ] Data formatters (dates, currency, etc.)
- [ ] Zod schemas for form validation
- [ ] Template configuration types

## Phase 6: Documentation & Developer Experience

### 6.1 Documentation
- [ ] `README.template.md` - Setup and configuration guide
- [ ] `docs/TEMPLATE-PRD.template.md` - PRD skeleton for generated projects
- [ ] `docs/TEMPLATE-USAGE.md` - How to extend and customize
- [ ] Inline code comments for generator integration points

### 6.2 Developer Tools
- [x] `.cursor/rules/*.mdc` – modular AI coding guidelines and conventions
- [x] Optional minimal `.cursorrules` that simply points to `.cursor/rules` (for backwards compatibility)
- [ ] ESLint configuration for consistency
- [ ] Prettier configuration for formatting
- [ ] TypeScript strict configuration

The modular cursor rules are organized by concern:
- **general.mdc** - Repository-wide conventions and Next.js patterns
- **design-tokens.mdc** - Design system and theming guidelines
- **routing.mdc** - Route group conventions and auth guards
- **backend-and-integrations.mdc** - Server actions, API routes, and integrations
- **config-and-env.mdc** - Configuration and environment variable management

These rules guide AI tools to:
- Respect `design-tokens.ts` and Tailwind token usage
- Follow routing conventions (`(public)`, `(protected)`, `(protected)/admin`)
- Keep integration logic in `lib/integrations/*`
- Centralize configuration and environment variables

## Phase 7: Testing & Validation

### 7.1 Integration Testing
- [ ] Verify `npm install` and `npm run dev` work out of the box
- [ ] Test all route navigation without errors
- [ ] Validate responsive design across devices
- [ ] Ensure all integration stubs are safe when unconfigured

### 7.2 Code Quality
- [ ] Run ESLint and fix all issues
- [ ] Ensure TypeScript compilation with no errors
- [ ] Validate all placeholder tokens are consistently named
- [ ] Check that all TODO comments are properly marked

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