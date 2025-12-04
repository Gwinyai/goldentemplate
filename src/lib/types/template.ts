// Template Configuration Types
// TypeScript interfaces and types for template configuration and generation

// Base template configuration
export interface TemplateConfig {
  // Project identification
  projectId: string;
  templateVersion: string;
  generatedAt: string;
  
  // Site configuration
  site: {
    name: string;
    description: string;
    url: string;
    logo: string;
    favicon: string;
    keywords: string[];
    author: AuthorInfo;
    social: SocialLinks;
  };
  
  // Feature flags and settings
  features: {
    auth: AuthConfig;
    billing: BillingConfig;
    blog: BlogConfig;
    analytics: AnalyticsConfig;
    integrations: IntegrationConfig;
    admin: AdminConfig;
  };
  
  // Styling and theming
  theme: ThemeConfig;
  
  // Content and copy
  content: ContentConfig;
  
  // Deployment and environment
  deployment: DeploymentConfig;
}

// Author and contact information
export interface AuthorInfo {
  name: string;
  email: string;
  website?: string;
  avatar?: string;
  bio?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

// Social media links
export interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
  discord?: string;
  youtube?: string;
  instagram?: string;
  facebook?: string;
}

// Authentication configuration
export interface AuthConfig {
  enabled: boolean;
  provider: 'supabase' | 'firebase' | 'auth0' | 'clerk' | 'custom';
  features: {
    registration: boolean;
    socialLogin: boolean;
    twoFactor: boolean;
    emailVerification: boolean;
    passwordReset: boolean;
  };
  socialProviders?: ('google' | 'github' | 'twitter' | 'facebook' | 'discord')[];
  redirectUrls?: {
    signIn: string;
    signUp: string;
    signOut: string;
    error: string;
  };
}

// Billing and payments configuration
export interface BillingConfig {
  enabled: boolean;
  provider: 'stripe' | 'lemonsqueezy' | 'paddle' | 'custom';
  currency: string;
  features: {
    subscriptions: boolean;
    oneTimePayments: boolean;
    invoicing: boolean;
    coupons: boolean;
    trials: boolean;
  };
  plans?: SubscriptionPlan[];
  webhookEndpoints?: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly?: number;
    yearly?: number;
    oneTime?: number;
  };
  features: string[];
  limits?: {
    users?: number;
    storage?: number;
    apiCalls?: number;
    projects?: number;
  };
  popular?: boolean;
  trial?: {
    enabled: boolean;
    days: number;
  };
}

// Blog configuration
export interface BlogConfig {
  enabled: boolean;
  features: {
    comments: boolean;
    categories: boolean;
    tags: boolean;
    search: boolean;
    rss: boolean;
    seo: boolean;
  };
  layout: 'grid' | 'list' | 'masonry';
  postsPerPage: number;
  authors?: BlogAuthor[];
}

export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  social?: SocialLinks;
}

// Analytics configuration
export interface AnalyticsConfig {
  enabled: boolean;
  providers: {
    googleAnalytics?: {
      measurementId: string;
      enabled: boolean;
    };
    plausible?: {
      domain: string;
      apiHost?: string;
      enabled: boolean;
    };
    mixpanel?: {
      token: string;
      enabled: boolean;
    };
    hotjar?: {
      siteId: number;
      enabled: boolean;
    };
  };
  cookieConsent: {
    enabled: boolean;
    bannerText?: string;
    policyUrl?: string;
  };
}

// Third-party integrations
export interface IntegrationConfig {
  email: {
    provider: 'resend' | 'mailgun' | 'sendgrid' | 'postmark' | 'custom';
    fromAddress: string;
    fromName: string;
    templates?: EmailTemplate[];
  };
  storage: {
    provider: 'supabase' | 's3' | 'gcs' | 'cloudinary' | 'custom';
    bucket?: string;
    region?: string;
    publicUrl?: string;
  };
  cms: {
    enabled: boolean;
    provider?: 'contentful' | 'sanity' | 'strapi' | 'ghost' | 'custom';
  };
  search: {
    enabled: boolean;
    provider?: 'algolia' | 'elastic' | 'custom';
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  description?: string;
  variables?: string[];
}

// Admin panel configuration
export interface AdminConfig {
  enabled: boolean;
  features: {
    userManagement: boolean;
    contentManagement: boolean;
    analytics: boolean;
    settings: boolean;
    logs: boolean;
  };
  permissions: {
    roles: UserRole[];
    defaultRole: string;
  };
}

export interface UserRole {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  isDefault?: boolean;
  isSystem?: boolean;
}

// Theme and design configuration
export interface ThemeConfig {
  mode: 'light';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  fonts: {
    sans: string;
    serif?: string;
    mono?: string;
  };
  spacing: {
    base: number;
    scale: number[];
  };
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animations: boolean;
  customCss?: string;
}

// Content and copy configuration
export interface ContentConfig {
  defaultLanguage: string;
  supportedLanguages?: string[];
  
  // Landing page content
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary?: string;
    backgroundImage?: string;
    videoUrl?: string;
  };
  
  // Feature sections
  features: FeatureSection[];
  
  // Testimonials
  testimonials?: Testimonial[];
  
  // FAQ
  faq?: FAQItem[];
  
  // Legal pages
  legal: {
    termsOfService?: string;
    privacyPolicy?: string;
    cookiePolicy?: string;
  };
  
  // Navigation
  navigation: {
    header: NavigationItem[];
    footer: FooterSection[];
  };
}

export interface FeatureSection {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  link?: string;
  features?: FeatureItem[];
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    title?: string;
    company?: string;
    avatar?: string;
  };
  rating?: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavigationItem[];
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: NavigationItem[];
}

// Deployment configuration
export interface DeploymentConfig {
  platform: 'vercel' | 'netlify' | 'aws' | 'gcp' | 'azure' | 'docker' | 'custom';
  domain?: string;
  environment: 'development' | 'staging' | 'production';
  
  // Environment variables
  env: {
    required: EnvironmentVariable[];
    optional?: EnvironmentVariable[];
  };
  
  // Build configuration
  build: {
    command: string;
    outputDirectory: string;
    nodeVersion?: string;
  };
  
  // Database configuration
  database?: {
    provider: 'supabase' | 'planetscale' | 'neon' | 'railway' | 'custom';
    migrations: boolean;
    seeding: boolean;
  };
}

export interface EnvironmentVariable {
  key: string;
  description: string;
  required: boolean;
  type: 'string' | 'number' | 'boolean' | 'url' | 'secret';
  defaultValue?: string;
  example?: string;
}

// Template generation types
export interface GenerationContext {
  config: TemplateConfig;
  outputPath: string;
  templatePath: string;
  packageManager: 'npm' | 'yarn' | 'pnpm';
  skipInstall?: boolean;
  overwrite?: boolean;
}

export interface GenerationResult {
  success: boolean;
  projectPath: string;
  filesGenerated: string[];
  errors?: GenerationError[];
  warnings?: string[];
  nextSteps?: string[];
}

export interface GenerationError {
  file?: string;
  line?: number;
  message: string;
  code?: string;
  severity: 'error' | 'warning';
}

// Token replacement types
export interface TokenMap {
  [key: string]: string | number | boolean | object;
}

export interface TokenReplacement {
  token: string;
  value: string;
  files?: string[];
  recursive?: boolean;
}

// Validation types
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  path: string;
  message: string;
  code: string;
  value?: any;
}

export interface ValidationWarning {
  path: string;
  message: string;
  suggestion?: string;
}

// File system types
export interface TemplateFile {
  path: string;
  content: string;
  type: 'template' | 'static' | 'generated';
  encoding?: 'utf8' | 'binary';
}

export interface FileOperation {
  type: 'create' | 'update' | 'delete' | 'copy' | 'move';
  source?: string;
  target: string;
  content?: string;
  backup?: boolean;
}

// Plugin and extension types
export interface TemplatePlugin {
  name: string;
  version: string;
  description: string;
  author: string;
  hooks: {
    beforeGeneration?: (context: GenerationContext) => Promise<void> | void;
    afterGeneration?: (result: GenerationResult) => Promise<void> | void;
    beforeFileWrite?: (file: TemplateFile) => Promise<TemplateFile> | TemplateFile;
    afterFileWrite?: (file: TemplateFile) => Promise<void> | void;
  };
  config?: Record<string, any>;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type ConfigPath<T> = T extends object 
  ? { [K in keyof T]: T[K] extends object 
    ? `${string & K}.${ConfigPath<T[K]>}` 
    : string & K 
  }[keyof T]
  : never;

// Default configurations
export const defaultTemplateConfig: Partial<TemplateConfig> = {
  templateVersion: '1.0.0',
  features: {
    auth: {
      enabled: true,
      provider: 'supabase',
      features: {
        registration: true,
        socialLogin: false,
        twoFactor: false,
        emailVerification: true,
        passwordReset: true,
      },
    },
    billing: {
      enabled: false,
      provider: 'stripe',
      currency: 'USD',
      features: {
        subscriptions: false,
        oneTimePayments: false,
        invoicing: false,
        coupons: false,
        trials: false,
      },
    },
    blog: {
      enabled: true,
      features: {
        comments: false,
        categories: true,
        tags: true,
        search: false,
        rss: true,
        seo: true,
      },
      layout: 'grid',
      postsPerPage: 12,
    },
    analytics: {
      enabled: false,
      providers: {},
      cookieConsent: {
        enabled: true,
      },
    },
    integrations: {
      email: {
        provider: 'resend',
        fromAddress: 'hello@example.com',
        fromName: 'Example App',
      },
      storage: {
        provider: 'supabase',
      },
      cms: {
        enabled: false,
      },
      search: {
        enabled: false,
      },
    },
    admin: {
      enabled: false,
      features: {
        userManagement: true,
        contentManagement: true,
        analytics: false,
        settings: true,
        logs: false,
      },
      permissions: {
        roles: [
          {
            id: 'admin',
            name: 'Administrator',
            description: 'Full system access',
            permissions: ['*'],
            isSystem: true,
          },
          {
            id: 'user',
            name: 'User',
            description: 'Basic user access',
            permissions: ['user.read', 'user.update'],
            isDefault: true,
          },
        ],
        defaultRole: 'user',
      },
    },
  },
  theme: {
    mode: 'light',
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#8b5cf6',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      muted: '#64748b',
    },
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
    },
    spacing: {
      base: 4,
      scale: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
    },
    borderRadius: 'md',
    animations: true,
  },
  deployment: {
    platform: 'vercel',
    environment: 'development',
    env: {
      required: [
        {
          key: 'NEXT_PUBLIC_SITE_URL',
          description: 'Public URL of the site',
          required: true,
          type: 'url',
          example: 'https://example.com',
        },
      ],
    },
    build: {
      command: 'npm run build',
      outputDirectory: '.next',
      nodeVersion: '18.x',
    },
  },
};