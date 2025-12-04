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
} from "@/components/ui";

interface DashboardShellProps {
  children: React.ReactNode;
  user: {
    id: string;
    email: string | null;
    name: string | null;
    avatar_url?: string | null;
    created_at?: string;
    updated_at?: string;
  };
}

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  disabled?: boolean;
}

const dashboardNavigation: NavigationItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    label: "Team",
    href: "/dashboard/team",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
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
            <Link href="/dashboard" className="flex items-center space-x-2 group">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-secondary shadow-md group-hover:shadow-lg transition-all duration-200" />
              <span className="font-heading text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {tokens.brandName}
              </span>
            </Link>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Top Bar Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5.5-7.5L12 14l-2.5-3.5L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </Button>

            {/* User Menu */}
            <Dropdown>
              <DropdownTrigger asChild>
                <Button variant="ghost" size="sm" className="relative hover:bg-primary/5">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.name || user.email || "User"}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-white">
                        {(user.name || user.email || "U").charAt(0).toUpperCase()}
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
                      {user.email || "No email"}
                    </p>
                  </div>
                </div>
                <DropdownSeparator />
                <DropdownItem asChild>
                  <Link href="/account">Account Settings</Link>
                </DropdownItem>
                <DropdownItem asChild>
                  <Link href="/billing">Billing</Link>
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
            sidebarCollapsed ? "w-16" : "w-64"
          } border-r border-border/40 bg-background transition-all duration-300`}
        >
          <nav className="flex-1 p-4 space-y-1">
            {dashboardNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.disabled ? "#" : item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
                } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {item.icon}
                {!sidebarCollapsed && (
                  <>
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto bg-secondary/10 text-secondary">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-border/40">
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="font-medium">Version 1.0.0</div>
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
            <div className="fixed left-0 top-0 h-full w-72 border-r border-border/40 bg-background shadow-xl">
              <div className="flex h-16 items-center gap-4 border-b border-border/40 px-4">
                <div className="flex items-center space-x-2">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-secondary shadow-md" />
                  <span className="font-heading text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {tokens.brandName}
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
              <nav className="flex-1 p-4 space-y-1">
                {dashboardNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.disabled ? "#" : item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-foreground/70 hover:bg-primary/5 hover:text-primary"
                    } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto bg-secondary/10 text-secondary">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}