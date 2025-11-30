"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { tokens } from "@/design-tokens";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui";
import { isAdminEnabled, isBlogEnabled, isUserAccountsEnabled } from "@/lib/config";

interface AdminShellProps {
  children: React.ReactNode;
  user: {
    id: string;
    email: string | null;
    name: string | null;
    avatar_url?: string | null;
    created_at?: string;
    updated_at?: string;
    isAdmin: true;
    adminRole?: "super" | "moderator";
    permissions?: string[];
  };
}

interface NavigationSection {
  title: string;
  items: {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string;
    disabled?: boolean;
    description?: string;
  }[];
}

// MVP Admin Navigation - only includes features that are actually implemented
const adminNavigation: NavigationSection[] = [
  {
    title: "Dashboard", 
    items: [
      {
        label: "Overview",
        href: "/admin",
        description: "System overview and key metrics",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
      },
      {
        label: "Analytics",
        href: "/admin/analytics",
        description: "Detailed analytics and reporting",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        label: "Blog Posts", 
        href: "/admin/blog",
        description: "Manage blog content and posts",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        ),
      },
      // TODO: Pages and Media Library are out of scope for MVP
      // Uncomment when implementing full CMS features:
      // {
      //   label: "Pages",
      //   href: "/admin/pages", 
      //   description: "Manage site pages and content",
      //   disabled: true
      // },
      // {
      //   label: "Media Library",
      //   href: "/admin/media",
      //   description: "Upload and manage media files", 
      //   disabled: true
      // },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        label: "Users",
        href: "/admin/users",
        description: "Manage user accounts and basic admin status",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        ),
      },
      // TODO: Full roles & permissions system is out of scope for MVP
      // Only basic isAdmin flag is supported currently
      // Uncomment when implementing full RBAC:
      // {
      //   label: "Roles & Permissions",
      //   href: "/admin/roles",
      //   description: "Configure user roles and access controls",
      //   disabled: true
      // },
    ],
  },
  // TODO: System settings are out of scope for MVP  
  // Uncomment when implementing system configuration:
  // {
  //   title: "System",
  //   items: [
  //     {
  //       label: "Settings", 
  //       href: "/admin/settings",
  //       description: "System configuration and preferences",
  //       disabled: true
  //     },
  //     {
  //       label: "API Keys",
  //       href: "/admin/api-keys", 
  //       description: "Manage API keys and integrations",
  //       disabled: true
  //     },
  //   ],
  // },
];

export function AdminShell({ children, user }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  // Filter navigation based on feature flags
  const filteredNavigation = React.useMemo(() => {
    return adminNavigation.filter(section => {
      // Filter content management section based on blog feature
      if (section.title === "Content Management") {
        const items = section.items.filter(item => {
          if (item.href === "/admin/blog") {
            return isBlogEnabled();
          }
          return true;
        });
        return items.length > 0 ? { ...section, items } : false;
      }
      
      // Filter user management section based on user accounts feature
      if (section.title === "User Management") {
        if (!isUserAccountsEnabled()) {
          return false;
        }
        return section;
      }
      
      return section;
    }).filter(Boolean);
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  // Check if user is actually an admin  
  const isAdmin = user?.isAdmin === true;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Redirect to home page and refresh
        router.push("/");
        router.refresh();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Access Warning */}
      {!isAdmin && (
        <Alert variant="destructive" className="border-0 rounded-none">
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You do not have admin privileges to access this area.
          </AlertDescription>
        </Alert>
      )}

      {/* Admin Header - simplified to avoid double navigation */}
      <header className="border-b bg-background">
        <div className="flex h-12 items-center gap-4 px-4 lg:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>

          {/* Desktop Sidebar Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:flex"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>

          {/* Admin Dashboard Title */}
          <div className="flex items-center space-x-2">
            <span className="font-heading text-lg font-semibold">
              Admin Dashboard
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Back to App Button */}
          <Button variant="outline" size="sm" asChild>
            <Link href="/app">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to App
            </Link>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside 
          className={`hidden lg:flex flex-col ${
            sidebarCollapsed ? "w-16" : "w-72"
          } border-r bg-background transition-all duration-300`}
        >
          <div className="flex-1 overflow-auto">
            <nav className="p-4 space-y-6">
              {filteredNavigation.map((section) => (
                <div key={section.title}>
                  {!sidebarCollapsed && (
                    <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.disabled ? "#" : item.href}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? "bg-destructive/10 text-destructive"
                            : "hover:bg-accent hover:text-accent-foreground"
                        } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        title={sidebarCollapsed ? item.label : item.description}
                      >
                        {item.icon}
                        {!sidebarCollapsed && (
                          <div className="flex-1">
                            <div>{item.label}</div>
                            {item.description && (
                              <div className="text-xs text-muted-foreground">
                                {item.description}
                              </div>
                            )}
                          </div>
                        )}
                        {!sidebarCollapsed && item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t">
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>System Healthy</span>
                </div>
                <div>Admin Panel v1.0.0</div>
                <div>© 2024 {tokens.brandName}</div>
              </div>
            </div>
          )}
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed left-0 top-0 h-full w-80 border-r bg-background">
              <div className="flex h-12 items-center gap-4 border-b px-4">
                <span className="font-heading text-lg font-semibold">
                  Admin Dashboard
                </span>
                <div className="flex-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              
              <div className="flex-1 overflow-auto">
                <nav className="p-4 space-y-6">
                  {filteredNavigation.map((section) => (
                    <div key={section.title}>
                      <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {section.title}
                      </h3>
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.disabled ? "#" : item.href}
                            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                              isActive(item.href)
                                ? "bg-destructive/10 text-destructive"
                                : "hover:bg-accent hover:text-accent-foreground"
                            } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.icon}
                            <div className="flex-1">
                              <div>{item.label}</div>
                              {item.description && (
                                <div className="text-xs text-muted-foreground">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto">
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {isAdmin ? children : (
            <div className="flex items-center justify-center h-[50vh]">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                <p className="text-muted-foreground mb-4">
                  You need admin privileges to access this area.
                </p>
                <Button asChild>
                  <Link href="/dashboard">Return to Dashboard</Link>
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}