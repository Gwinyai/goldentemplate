# VibeGuide Golden Template

A comprehensive Next.js SaaS template with user accounts, authentication, admin panel, and billing integration. This template provides a solid foundation for building modern SaaS applications with feature flags and configurable components.

## ✨ Features

### 🔐 User Authentication & Authorization
- **Multi-provider auth support**: Supabase (default) and Firebase
- **Role-based access control**: User and Admin roles
- **Protected routes**: Automatic redirects with return URLs
- **Session management**: Secure server-side authentication

### 👤 User Account Management
- **Profile management**: Full profile forms with validation
- **Account settings**: User preferences and privacy controls
- **Social links**: Twitter, LinkedIn, GitHub, portfolio links
- **Avatar support**: Profile photo management

### 💳 Billing & Subscriptions
- **Payment providers**: Stripe, LemonSqueezy support
- **Subscription management**: Plans, billing history, invoices
- **Conditional rendering**: Shows/hides based on provider configuration
- **Payment method management**: Add/remove payment methods

### ⚙️ Admin Panel
- **User management**: View, edit, manage user accounts
- **Content management**: Blog posts, pages, media library
- **Analytics dashboard**: System metrics and KPIs
- **Role permissions**: Configurable admin access levels

### 🎛️ Feature Flags
- **Configurable features**: Enable/disable entire features
- **Template generation**: Support for conditional code generation
- **Environment-based**: Easy development and testing
- **Documentation**: Comprehensive feature toggle guide

### 🎨 Design System
- **Design tokens**: Centralized styling configuration
- **Component library**: Reusable UI components
- **Dark/light themes**: System preference support
- **Responsive design**: Mobile-first approach

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun
- Optional: Supabase account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd golden-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```bash
   # Feature Flags
   NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=true
   NEXT_PUBLIC_ADMIN_ENABLED=true
   NEXT_PUBLIC_BLOG_ENABLED=true
   NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe

   # Authentication (Optional - defaults to mock auth in development)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 🔧 Configuration

### Feature Flags

Control which features are available in your application:

```bash
# User account system
NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=true|false

# Admin panel access
NEXT_PUBLIC_ADMIN_ENABLED=true|false

# Blog functionality
NEXT_PUBLIC_BLOG_ENABLED=true|false

# Payment processing
NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe|lemonsqueezy|none
```

### Authentication Providers

#### Supabase (Default)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### Firebase (Alternative)
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
# ... other Firebase config
```

### Payment Providers

#### Stripe
```bash
NEXT_PUBLIC_PAYMENTS_PROVIDER=stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### LemonSqueezy
```bash
NEXT_PUBLIC_PAYMENTS_PROVIDER=lemonsqueezy
LEMONSQUEEZY_API_KEY=your-api-key
LEMONSQUEEZY_STORE_ID=your-store-id
LEMONSQUEEZY_WEBHOOK_SECRET=your-webhook-secret
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes
│   │   ├── login/                # Authentication pages
│   │   ├── register/             
│   │   └── blog/                 # Public blog
│   ├── (protected)/              # Protected routes
│   │   ├── app/                  # Main application
│   │   ├── account/              # Account management
│   │   │   ├── profile/          # User profile
│   │   │   └── billing/          # Billing & subscriptions
│   │   └── admin/                # Admin panel
│   │       ├── users/            # User management
│   │       ├── blog/             # Content management
│   │       └── analytics/        # System analytics
│   └── api/                      # API routes
│       ├── auth/                 # Authentication endpoints
│       └── webhooks/             # Payment webhooks
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components
│   ├── forms/                   # Form components
│   ├── layout/                  # Layout components
│   └── conditional/             # Feature flag components
├── lib/                         # Utility libraries
│   ├── auth/                    # Authentication logic
│   ├── config/                  # Configuration management
│   ├── types/                   # TypeScript types
│   └── validations/             # Form validation schemas
└── design-tokens.ts             # Design system tokens
```

## 🔐 Authentication System

### User Roles

- **User**: Access to `/app` and `/account/*` routes
- **Admin**: Access to all user routes plus `/admin/*` routes

### Protected Routes

All routes under `(protected)/` require authentication:
- `/app` - Main application dashboard
- `/account/profile` - User profile management  
- `/account/billing` - Billing and subscriptions
- `/admin/*` - Admin panel (requires admin role)

### Development Mode

In development, the template uses mock authentication:
- Any valid email/password combination works
- Emails containing "admin" are treated as admin users
- No external auth provider required for testing

## 💳 Billing Integration

### Supported Providers

1. **Stripe**: Full integration with subscription management
2. **LemonSqueezy**: Alternative payment processor
3. **None**: Billing features disabled

### Billing Features

- Subscription management
- Payment method storage
- Invoice history
- Usage tracking
- Plan upgrades/downgrades

## 👥 User Management

### Profile Management
- Personal information forms
- Avatar upload support
- Social media links
- Privacy settings
- Account preferences

### Admin User Management
- User list with filtering
- Role assignments
- Account status management
- Activity monitoring
- Bulk operations

## 🧪 Testing

### User Flow Testing

Run through the comprehensive test scenarios in `USER_FLOW_TEST.md`:

```bash
# Test different feature flag combinations
cp .env.example .env.local
# Modify feature flags and restart server
npm run dev
```

### Feature Flag Testing

Test various configurations using `TEST_FEATURE_FLAGS.md`:

```bash
# Example: Marketing site only
NEXT_PUBLIC_USER_ACCOUNTS_ENABLED=false
NEXT_PUBLIC_ADMIN_ENABLED=false
NEXT_PUBLIC_BLOG_ENABLED=true
NEXT_PUBLIC_PAYMENTS_PROVIDER=none
```

## 🚀 Deployment

### Environment Setup

1. **Set production environment variables**
2. **Configure authentication provider**
3. **Set up payment processing**
4. **Configure email services**

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms

The template supports deployment on:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway
- Self-hosted Docker

### Database Setup

When using Supabase:
1. Create a new Supabase project
2. Enable Authentication
3. Configure RLS policies
4. Set up user profiles table
5. Configure admin roles

## 📚 Documentation

- **[Feature Toggles Guide](FEATURE_TOGGLES.md)**: Comprehensive feature flag documentation
- **[User Flow Testing](USER_FLOW_TEST.md)**: Step-by-step testing scenarios
- **[Environment Variables](.env.example)**: All configuration options

## 🛠️ Development

### Adding New Features

1. **Create feature flag** in `src/lib/config/features.ts`
2. **Add navigation items** in `src/lib/config/nav.ts`
3. **Implement components** with conditional rendering
4. **Update documentation** and testing guides

### Customization

- **Design tokens**: Modify `src/design-tokens.ts`
- **Styling**: Update Tailwind configuration
- **Components**: Extend the component library
- **Authentication**: Add new providers in `src/lib/auth/`

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the guides in this repository
- **Issues**: Create an issue for bugs or feature requests
- **Discussions**: Join the community discussions

---

Built with ❤️ using [Next.js](https://nextjs.org), [TypeScript](https://typescriptlang.org), and [Tailwind CSS](https://tailwindcss.com).
