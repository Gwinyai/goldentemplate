// Zod Validation Schemas
// Comprehensive schemas for form validation and data validation

import { z } from "zod";

// Common field validations
export const commonValidations = {
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
    
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
    
  strongPassword: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
    
  url: z
    .string()
    .url("Please enter a valid URL"),
    
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens only"),
    
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s\-'\.]+$/, "Name can only contain letters, spaces, hyphens, apostrophes, and periods"),
    
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(200, "Company name must be less than 200 characters"),
    
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters"),
    
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
};

// Authentication schemas
export const authSchemas = {
  login: z.object({
    email: commonValidations.email,
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional().default(false),
  }),

  register: z.object({
    firstName: commonValidations.name,
    lastName: commonValidations.name,
    email: commonValidations.email,
    password: commonValidations.password,
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
    marketingEmails: z.boolean().optional().default(false),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),

  forgotPassword: z.object({
    email: commonValidations.email,
  }),

  resetPassword: z.object({
    password: commonValidations.password,
    confirmPassword: z.string(),
    token: z.string().min(1, "Reset token is required"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),

  changePassword: z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: commonValidations.password,
    confirmPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),

  verifyEmail: z.object({
    token: z.string().min(1, "Verification token is required"),
  }),
};

// User profile schemas
export const userSchemas = {
  profile: z.object({
    firstName: commonValidations.name,
    lastName: commonValidations.name,
    email: commonValidations.email,
    phone: commonValidations.phone.optional(),
    bio: commonValidations.description.optional(),
    website: commonValidations.url.optional(),
    location: z.string().max(100, "Location must be less than 100 characters").optional(),
    timezone: z.string().optional(),
    avatar: z.string().url("Please provide a valid avatar URL").optional(),
    socialLinks: z.object({
      twitter: commonValidations.url.optional(),
      linkedin: commonValidations.url.optional(),
      github: commonValidations.url.optional(),
      website: commonValidations.url.optional(),
    }).optional(),
  }),

  preferences: z.object({
    theme: z.enum(["light", "dark", "system"]).default("system"),
    language: z.string().default("en"),
    notifications: z.object({
      email: z.boolean().default(true),
      push: z.boolean().default(true),
      marketing: z.boolean().default(false),
      security: z.boolean().default(true),
    }),
    privacy: z.object({
      showProfile: z.boolean().default(true),
      showEmail: z.boolean().default(false),
      allowAnalytics: z.boolean().default(true),
    }),
  }),

  settings: z.object({
    displayName: z.string().min(1, "Display name is required").max(50),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
    emailNotifications: z.boolean().default(true),
    twoFactorEnabled: z.boolean().default(false),
    sessionsLimit: z.number().min(1).max(10).default(5),
  }),
};

// Contact and support schemas
export const contactSchemas = {
  contact: z.object({
    name: commonValidations.name,
    email: commonValidations.email,
    company: commonValidations.companyName.optional(),
    subject: z.string().min(1, "Subject is required").max(200),
    message: z.string().min(10, "Message must be at least 10 characters").max(2000),
    category: z.enum(["general", "support", "sales", "feedback", "bug", "feature"]),
    priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  }),

  feedback: z.object({
    type: z.enum(["bug", "feature", "improvement", "other"]),
    title: commonValidations.title,
    description: z.string().min(20, "Description must be at least 20 characters").max(1000),
    rating: z.number().min(1).max(5).optional(),
    page: z.string().optional(),
    userAgent: z.string().optional(),
  }),

  newsletter: z.object({
    email: commonValidations.email,
    firstName: z.string().optional(),
    interests: z.array(z.string()).optional(),
    frequency: z.enum(["daily", "weekly", "monthly"]).default("weekly"),
  }),
};

// Billing and subscription schemas
const addressSchema = z.object({
  street1: z.string().min(1, "Street address is required").max(100),
  street2: z.string().max(100).optional(),
  city: z.string().min(1, "City is required").max(50),
  state: z.string().min(1, "State is required").max(50),
  postalCode: z.string().min(1, "Postal code is required").max(20),
  country: z.string().min(1, "Country is required").max(2),
});

export const billingSchemas = {
  address: addressSchema,

  paymentMethod: z.object({
    type: z.enum(["card", "bank", "paypal"]),
    isDefault: z.boolean().default(false),
    billingAddress: addressSchema.optional(),
  }),

  subscription: z.object({
    planId: z.string().min(1, "Plan ID is required"),
    interval: z.enum(["month", "year"]).default("month"),
    coupon: z.string().optional(),
    paymentMethodId: z.string().min(1, "Payment method is required"),
    billingAddress: addressSchema,
  }),

  invoice: z.object({
    companyName: commonValidations.companyName.optional(),
    taxId: z.string().optional(),
    billingAddress: addressSchema,
    email: commonValidations.email,
  }),
};

// Content management schemas
export const contentSchemas = {
  blogPost: z.object({
    title: commonValidations.title,
    slug: commonValidations.slug,
    excerpt: z.string().max(300, "Excerpt must be less than 300 characters").optional(),
    content: z.string().min(100, "Content must be at least 100 characters"),
    featuredImage: commonValidations.url.optional(),
    status: z.enum(["draft", "published", "archived"]).default("draft"),
    publishedAt: z.date().optional(),
    tags: z.array(z.string().max(30)).max(10, "Maximum 10 tags allowed").optional(),
    categories: z.array(z.string().max(50)).max(5, "Maximum 5 categories allowed").optional(),
    seoTitle: z.string().max(60, "SEO title must be less than 60 characters").optional(),
    seoDescription: z.string().max(160, "SEO description must be less than 160 characters").optional(),
    author: z.string().optional(),
    readingTime: z.number().optional(),
    featured: z.boolean().default(false),
  }),

  page: z.object({
    title: commonValidations.title,
    slug: commonValidations.slug,
    content: z.string().min(50, "Content must be at least 50 characters"),
    template: z.enum(["default", "landing", "legal", "contact"]).default("default"),
    status: z.enum(["draft", "published", "archived"]).default("draft"),
    publishedAt: z.date().optional(),
    seoTitle: z.string().max(60, "SEO title must be less than 60 characters").optional(),
    seoDescription: z.string().max(160, "SEO description must be less than 160 characters").optional(),
    showInNav: z.boolean().default(false),
    order: z.number().optional(),
  }),

  comment: z.object({
    content: z.string().min(1, "Comment cannot be empty").max(1000),
    author: commonValidations.name.optional(),
    email: commonValidations.email.optional(),
    website: commonValidations.url.optional(),
    parentId: z.string().optional(),
  }),
};

// Admin and management schemas
export const adminSchemas = {
  user: z.object({
    firstName: commonValidations.name,
    lastName: commonValidations.name,
    email: commonValidations.email,
    role: z.enum(["user", "admin", "editor", "viewer"]).default("user"),
    status: z.enum(["active", "inactive", "suspended", "pending"]).default("active"),
    permissions: z.array(z.string()).optional(),
    notes: commonValidations.description.optional(),
  }),

  role: z.object({
    name: z.string().min(1, "Role name is required").max(50),
    description: commonValidations.description.optional(),
    permissions: z.array(z.string()).min(1, "At least one permission is required"),
    isDefault: z.boolean().default(false),
    isSystem: z.boolean().default(false),
  }),

  settings: z.object({
    siteName: z.string().min(1, "Site name is required").max(100),
    siteDescription: commonValidations.description.optional(),
    siteUrl: commonValidations.url,
    adminEmail: commonValidations.email,
    maintenanceMode: z.boolean().default(false),
    registrationEnabled: z.boolean().default(true),
    emailVerificationRequired: z.boolean().default(true),
    approvalRequired: z.boolean().default(false),
    maxFileSize: z.number().min(1).max(100).default(10), // MB
    allowedFileTypes: z.array(z.string()).default(["jpg", "jpeg", "png", "gif", "pdf"]),
  }),
};

// File upload schemas
export const uploadSchemas = {
  file: z.object({
    name: z.string().min(1, "File name is required"),
    type: z.string().min(1, "File type is required"),
    size: z.number().min(1, "File size must be greater than 0"),
    url: commonValidations.url.optional(),
    alt: z.string().max(200, "Alt text must be less than 200 characters").optional(),
    caption: z.string().max(300, "Caption must be less than 300 characters").optional(),
  }),

  avatar: z.object({
    file: z.any().refine((file) => {
      if (!file || !(file instanceof File)) return false;
      return file.size <= 5 * 1024 * 1024; // 5MB
    }, "File must be less than 5MB"),
    crop: z.object({
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number(),
    }).optional(),
  }),
};

// Search and filter schemas
export const searchSchemas = {
  search: z.object({
    query: z.string().max(200, "Search query must be less than 200 characters").optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    dateFrom: z.date().optional(),
    dateTo: z.date().optional(),
    sortBy: z.enum(["relevance", "date", "title", "author"]).default("relevance"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(20),
  }),

  filters: z.object({
    status: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    authors: z.array(z.string()).optional(),
    dateRange: z.object({
      from: z.date(),
      to: z.date(),
    }).optional(),
  }),
};

// API request schemas
export const apiSchemas = {
  pagination: z.object({
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(20),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  }),

  cursor: z.object({
    cursor: z.string().optional(),
    limit: z.number().min(1).max(100).default(20),
    direction: z.enum(["forward", "backward"]).default("forward"),
  }),

  webhook: z.object({
    event: z.string().min(1, "Event type is required"),
    data: z.record(z.any()),
    timestamp: z.number().optional(),
    signature: z.string().optional(),
  }),
};

// Type inference helpers
export type LoginSchema = z.infer<typeof authSchemas.login>;
export type RegisterSchema = z.infer<typeof authSchemas.register>;
export type UserProfileSchema = z.infer<typeof userSchemas.profile>;
export type ContactSchema = z.infer<typeof contactSchemas.contact>;
export type BlogPostSchema = z.infer<typeof contentSchemas.blogPost>;
export type BillingAddressSchema = z.infer<typeof billingSchemas.address>;
export type SearchSchema = z.infer<typeof searchSchemas.search>;

// Schema validation helpers
export const validateSchema = <T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
} => {
  try {
    const result = schema.safeParse(data);
    
    if (result.success) {
      return { success: true, data: result.data };
    }
    
    const errors: Record<string, string> = {};
    result.error.errors.forEach((error) => {
      const path = error.path.join('.');
      errors[path] = error.message;
    });
    
    return { success: false, errors };
  } catch (error) {
    return { 
      success: false, 
      errors: { _root: "Validation failed" } 
    };
  }
};

// Form validation hook data (for React Hook Form integration)
export const getFormResolver = (schema: z.ZodSchema) => {
  return (data: any) => {
    const result = validateSchema(schema, data);
    
    if (result.success) {
      return { values: result.data, errors: {} };
    }
    
    return {
      values: {},
      errors: Object.entries(result.errors || {}).reduce((acc, [key, message]) => {
        acc[key] = { type: 'validation', message };
        return acc;
      }, {} as Record<string, { type: string; message: string }>),
    };
  };
};