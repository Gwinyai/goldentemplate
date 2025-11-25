"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

interface AdminShellProps {
  children: React.ReactNode;
  user: {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    role?: string;
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
      {
        label: "Pages",
        href: "/admin/pages",
        description: "Manage site pages and content",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
      {
        label: "Media Library",
        href: "/admin/media",
        description: "Upload and manage media files",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        label: "Users",
        href: "/admin/users",
        description: "Manage user accounts and permissions",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        ),
      },
      {
        label: "Roles & Permissions",
        href: "/admin/roles",
        description: "Configure user roles and access controls",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
        description: "System configuration and preferences",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
      },
      {
        label: "API Keys",
        href: "/admin/api-keys",
        description: "Manage API keys and integrations",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        ),
      },
      {
        label: "Logs",
        href: "/admin/logs",
        description: "View system logs and audit trail",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
    ],
  },
];

export function AdminShell({ children, user }: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  // Check if user is actually an admin
  const isAdmin = user?.role === "admin";

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

      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
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

          {/* Brand */}
          <div className="flex items-center space-x-2">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-destructive" />
              <span className="font-heading text-lg font-bold">
                {tokens.brandName} Admin
              </span>
            </Link>
          </div>

          {/* Admin Badge */}
          <Badge variant="destructive">Admin Panel</Badge>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Top Bar Actions */}
          <div className="flex items-center gap-2">
            {/* Back to App */}
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to App
              </Link>
            </Button>

            {/* User Menu */}
            <Dropdown>
              <DropdownTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <div className="h-6 w-6 rounded-full bg-destructive/20 flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name || user.email}
                        className="h-6 w-6 rounded-full"
                      />
                    ) : (
                      <span className="text-xs font-medium">
                        {(user.name || user.email)?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user.name && (
                      <p className="font-medium">{user.name}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                    <Badge variant="destructive" className="text-xs w-fit">
                      Admin
                    </Badge>
                  </div>
                </div>
                <DropdownSeparator />
                <DropdownItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownItem>
                <DropdownItem asChild>
                  <Link href="/account">Account Settings</Link>
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem>
                  Sign Out
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
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
              {adminNavigation.map((section) => (
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
              <div className="flex h-16 items-center gap-4 border-b px-4">
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded bg-destructive" />
                  <span className="font-heading text-lg font-bold">
                    {tokens.brandName} Admin
                  </span>
                </div>
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
                  {adminNavigation.map((section) => (
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