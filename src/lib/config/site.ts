// Site Configuration
// Central configuration for brand, URLs, metadata, and site-wide settings
// Use __VG_*__ placeholders for generator replacement

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
    docs?: string;
    discord?: string;
    linkedin?: string;
  };
  author: {
    name: string;
    email: string;
    twitter?: string;
    github?: string;
    url?: string;
  };
  keywords: string[];
  locale: string;
  themeColor: string;
  favicon: string;
  appleIcon: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface LegalInfo {
  companyName: string;
  registrationNumber?: string;
  taxId?: string;
  termsUrl: string;
  privacyUrl: string;
  cookieUrl?: string;
  supportUrl: string;
}

// Main site configuration with placeholder tokens
export const siteConfig: SiteConfig = {
  name: "__VG_SITE_NAME__",
  description: "__VG_SITE_DESCRIPTION__",
  url: "__VG_SITE_URL__",
  ogImage: "__VG_SITE_URL__/og-image.jpg",
  links: {
    twitter: "__VG_TWITTER_URL__",
    github: "__VG_GITHUB_URL__",
    docs: "__VG_DOCS_URL__",
    discord: "__VG_DISCORD_URL__",
    linkedin: "__VG_LINKEDIN_URL__",
  },
  author: {
    name: "__VG_AUTHOR_NAME__",
    email: "__VG_AUTHOR_EMAIL__",
    twitter: "__VG_AUTHOR_TWITTER__",
    github: "__VG_AUTHOR_GITHUB__",
    url: "__VG_AUTHOR_URL__",
  },
  keywords: [
    "__VG_KEYWORD_1__",
    "__VG_KEYWORD_2__",
    "__VG_KEYWORD_3__",
    "__VG_KEYWORD_4__",
    "__VG_KEYWORD_5__"
  ],
  locale: "en-US",
  themeColor: "#000000",
  favicon: "/favicon.ico",
  appleIcon: "/apple-touch-icon.png",
};

// Contact information
export const contactInfo: ContactInfo = {
  email: "__VG_CONTACT_EMAIL__",
  phone: "__VG_CONTACT_PHONE__",
  address: {
    street: "__VG_ADDRESS_STREET__",
    city: "__VG_ADDRESS_CITY__",
    state: "__VG_ADDRESS_STATE__",
    zip: "__VG_ADDRESS_ZIP__",
    country: "__VG_ADDRESS_COUNTRY__",
  },
};

// Legal and compliance information
export const legalInfo: LegalInfo = {
  companyName: "__VG_COMPANY_NAME__",
  registrationNumber: "__VG_REGISTRATION_NUMBER__",
  taxId: "__VG_TAX_ID__",
  termsUrl: "/legal/terms",
  privacyUrl: "/legal/privacy", 
  cookieUrl: "/legal/cookies",
  supportUrl: "/support",
};

// Development defaults (used when placeholders aren't replaced)
export const devDefaults = {
  siteName: "VibeGuide App",
  siteDescription: "A modern SaaS application built with Next.js 14, TypeScript, and Tailwind CSS",
  siteUrl: "http://localhost:3000",
  authorName: "VibeGuide Team",
  authorEmail: "hello@vibeguide.dev",
  contactEmail: "support@vibeguide.dev",
  companyName: "VibeGuide Inc.",
  keywords: ["SaaS", "Next.js", "TypeScript", "Tailwind CSS", "React"],
};

// Helper function to get config value with fallback to dev defaults
export function getConfigValue(key: keyof typeof devDefaults): string {
  const configMap: Record<string, string | string[]> = {
    siteName: siteConfig.name,
    siteDescription: siteConfig.description,
    siteUrl: siteConfig.url,
    authorName: siteConfig.author.name,
    authorEmail: siteConfig.author.email,
    contactEmail: contactInfo.email,
    companyName: legalInfo.companyName,
    keywords: siteConfig.keywords,
  };

  const value = configMap[key];
  
  // Handle array values (like keywords)
  if (Array.isArray(value)) {
    return Array.isArray(devDefaults[key]) ? (devDefaults[key] as any).join(', ') : devDefaults[key];
  }
  
  // If value contains placeholder token, return dev default
  if (value && typeof value === 'string' && value.startsWith("__VG_") && value.endsWith("__")) {
    return Array.isArray(devDefaults[key]) ? (devDefaults[key] as any).join(', ') : devDefaults[key];
  }
  
  return (typeof value === 'string' ? value : '') || (Array.isArray(devDefaults[key]) ? (devDefaults[key] as any).join(', ') : devDefaults[key]);
}

// Helper function to check if running in development with placeholders
export function isUsingPlaceholders(): boolean {
  return siteConfig.name.startsWith("__VG_") && siteConfig.name.endsWith("__");
}

// SEO metadata helpers
export function getMetadata(page?: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}) {
  const title = page?.title 
    ? `${page.title} | ${getConfigValue('siteName')}` 
    : getConfigValue('siteName');
    
  const description = page?.description || getConfigValue('siteDescription');
  const image = page?.image || siteConfig.ogImage;
  const url = page?.url ? `${getConfigValue('siteUrl')}${page.url}` : getConfigValue('siteUrl');

  return {
    title,
    description,
    keywords: siteConfig.keywords.filter(k => !k.startsWith("__VG_")),
    authors: [{ name: getConfigValue('authorName'), email: getConfigValue('authorEmail') }],
    creator: getConfigValue('authorName'),
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      title,
      description,
      siteName: getConfigValue('siteName'),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.author.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "__VG_GOOGLE_SITE_VERIFICATION__",
      yandex: "__VG_YANDEX_VERIFICATION__",
    },
  };
}

// Structured data helpers
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: getConfigValue('companyName'),
    url: getConfigValue('siteUrl'),
    logo: `${getConfigValue('siteUrl')}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: getConfigValue('contactEmail'),
      contactType: "customer service",
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ].filter(link => link && !link.startsWith("__VG_")),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: getConfigValue('siteName'),
    url: getConfigValue('siteUrl'),
    description: getConfigValue('siteDescription'),
    publisher: {
      "@type": "Organization",
      name: getConfigValue('companyName'),
    },
  };
}