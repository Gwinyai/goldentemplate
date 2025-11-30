// Navigation Configuration
// Central configuration for all navigation menus and structures
// Use __VG_*__ placeholders for generator replacement

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  icon?: string; // Icon name/identifier instead of ReactNode
  external?: boolean;
  disabled?: boolean;
  badge?: string | number;
  children?: NavigationItem[];
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

// Main site navigation (header)
export const mainNav: NavigationItem[] = [
  {
    title: "Features",
    href: "/#features",
    description: "Explore our powerful features",
  },
  {
    title: "Pricing", 
    href: "/#pricing",
    description: "Simple, transparent pricing",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Latest news and insights",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn more about us",
  },
  {
    title: "Contact",
    href: "/contact", 
    description: "Get in touch",
  },
];

// Dashboard navigation (sidebar)
export const dashboardNav: NavigationSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        description: "Your main dashboard",
        icon: "dashboard",
      },
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        description: "View your analytics",
        icon: "analytics",
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Projects",
        href: "/dashboard/projects",
        description: "Manage your projects",
        icon: "projects",
      },
      {
        title: "Team",
        href: "/dashboard/team",
        description: "Manage team members",
        icon: "team",
      },
      {
        title: "Files",
        href: "/dashboard/files",
        description: "Manage your files",
        icon: "files",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Settings",
        href: "/account",
        description: "Account settings",
        icon: "settings",
      },
      {
        title: "Billing",
        href: "/billing",
        description: "Billing and subscription",
        icon: "billing",
      },
    ],
  },
];

// Admin navigation (admin dashboard)
export const adminNav: NavigationSection[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        href: "/admin",
        description: "Admin dashboard overview",
        icon: "admin-dashboard",
      },
      {
        title: "Analytics",
        href: "/admin/analytics",
        description: "System analytics",
        icon: "chart",
      },
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        title: "Blog Posts",
        href: "/admin/blog",
        description: "Manage blog content",
        icon: "document",
      },
      {
        title: "Pages",
        href: "/admin/pages",
        description: "Manage static pages",
        icon: "page",
      },
      {
        title: "Media",
        href: "/admin/media",
        description: "Manage media files",
        icon: "image",
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        href: "/admin/users",
        description: "Manage users",
        icon: "users",
      },
      {
        title: "Roles & Permissions",
        href: "/admin/roles",
        description: "Manage user roles",
        icon: "shield",
      },
      {
        title: "Activity Logs",
        href: "/admin/logs",
        description: "View user activity",
        icon: "clipboard",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        href: "/admin/settings",
        description: "System configuration",
        icon: "cog",
      },
      {
        title: "Monitoring",
        href: "/admin/monitoring",
        description: "System monitoring",
        icon: "server",
      },
    ],
  },
];

// Footer navigation
export const footerNav: NavigationSection[] = [
  {
    title: "__VG_FOOTER_SECTION_1__",
    items: [
      {
        title: "Features",
        href: "/#features",
      },
      {
        title: "Pricing",
        href: "/#pricing",
      },
      {
        title: "Blog",
        href: "/blog",
      },
      {
        title: "Changelog",
        href: "/changelog",
      },
    ],
  },
  {
    title: "__VG_FOOTER_SECTION_2__",
    items: [
      {
        title: "About",
        href: "/about",
      },
      {
        title: "Contact",
        href: "/contact",
      },
      {
        title: "Support",
        href: "/support",
      },
      {
        title: "Help Center",
        href: "/help",
      },
    ],
  },
  {
    title: "__VG_FOOTER_SECTION_3__",
    items: [
      {
        title: "Privacy Policy",
        href: "/legal/privacy",
      },
      {
        title: "Terms of Service", 
        href: "/legal/terms",
      },
      {
        title: "Cookie Policy",
        href: "/legal/cookies",
      },
      {
        title: "GDPR",
        href: "/legal/gdpr",
      },
    ],
  },
  {
    title: "__VG_FOOTER_SECTION_4__",
    items: [
      {
        title: "API Documentation",
        href: "/docs/api",
      },
      {
        title: "Integration Guides",
        href: "/docs/integrations",
      },
      {
        title: "Developer Tools",
        href: "/developers",
      },
      {
        title: "Status Page",
        href: "/status",
        external: true,
      },
    ],
  },
];

// Social links
export const socialLinks: NavigationItem[] = [
  {
    title: "Twitter",
    href: "__VG_TWITTER_URL__",
    external: true,
    icon: "twitter",
  },
  {
    title: "GitHub",
    href: "__VG_GITHUB_URL__",
    external: true,
    icon: "github",
  },
  {
    title: "LinkedIn",
    href: "__VG_LINKEDIN_URL__",
    external: true,
    icon: "linkedin",
  },
  {
    title: "Discord",
    href: "__VG_DISCORD_URL__",
    external: true,
    icon: "discord",
  },
];

// Development defaults for footer sections
export const devFooterDefaults = {
  section1: "Product",
  section2: "Company", 
  section3: "Legal",
  section4: "Developers",
};

// Helper function to get footer section title with fallback
export function getFooterSectionTitle(index: 1 | 2 | 3 | 4): string {
  const section = footerNav[index - 1];
  const title = section?.title;
  
  if (title?.startsWith("__VG_") && title?.endsWith("__")) {
    const key = `section${index}` as keyof typeof devFooterDefaults;
    return devFooterDefaults[key];
  }
  
  return title || devFooterDefaults[`section${index}` as keyof typeof devFooterDefaults];
}

// Helper function to filter navigation items based on user permissions
export function filterNavByPermissions(
  nav: NavigationItem[] | NavigationSection[], 
  userPermissions: string[] = []
): NavigationItem[] | NavigationSection[] {
  // For now, just return all items
  // TODO: Implement permission-based filtering when needed
  return nav;
}

// Helper function to get filtered navigation based on feature flags
export function getConditionalNavigation(options: {
  includeAuth?: boolean;
  includeAdmin?: boolean;
  includeBlog?: boolean;
  includeBilling?: boolean;
}): {
  publicNav: NavigationItem[];
  protectedNav: NavigationItem[];
  accountDropdownNav: NavigationItem[];
  adminNav: NavigationItem[];
} {
  const {
    includeAuth = true,
    includeAdmin = true,
    includeBlog = true,
    includeBilling = true,
  } = options;

  // Filter public navigation (marketing site)
  const filteredPublicNav = mainNav.filter(item => {
    if (item.href === "/blog") return includeBlog;
    return true;
  });

  // Protected navigation (shows in protected layout top nav)
  const filteredProtectedNav: NavigationItem[] = [];
  // No "App" button needed - brand logo handles navigation to /app

  // Account dropdown navigation (Profile, Billing, Logout)
  const filteredAccountDropdownNav: NavigationItem[] = [];
  if (includeAuth) {
    filteredAccountDropdownNav.push({ title: "Profile", href: "/account/profile" });
    if (includeBilling) {
      filteredAccountDropdownNav.push({ title: "Billing", href: "/account/billing" });
    }
  }

  // Admin navigation (single Admin entry in top nav + dropdown)
  const filteredAdminNav: NavigationItem[] = [];
  if (includeAuth && includeAdmin) {
    filteredAdminNav.push({ title: "Admin", href: "/admin" });
  }

  return {
    publicNav: filteredPublicNav,
    protectedNav: filteredProtectedNav,
    accountDropdownNav: filteredAccountDropdownNav,
    adminNav: filteredAdminNav,
  };
}

// Helper function to get active navigation item
export function getActiveNavItem(
  nav: NavigationItem[], 
  pathname: string
): NavigationItem | null {
  return nav.find(item => {
    if (item.href === pathname) return true;
    if (item.children) {
      return item.children.some(child => child.href === pathname);
    }
    return false;
  }) || null;
}

// Icon mapping for components to use
export const iconMap = {
  // Dashboard icons
  dashboard: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z",
  analytics: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  projects: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  team: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
  files: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  billing: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  
  // Admin icons  
  "admin-dashboard": "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  chart: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  document: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  page: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  image: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  users: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  clipboard: "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  cog: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  server: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  
  // Social icons  
  twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  github: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  discord: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0003 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z",
};