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
} from "@/components/ui";
import {
  getConditionalNavigation,
  isUserAccountsEnabled,
  isAdminEnabled,
  isBlogEnabled,
  isBillingEnabled,
} from "@/lib/config";

interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

interface SiteHeaderProps {
  user?: {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    role?: string;
  } | null;
}

export function SiteHeader({ user }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [logoVisible, setLogoVisible] = React.useState(true);

  // Get conditional navigation based on feature flags
  const {
    publicNav: publicNavigation,
    protectedNav: protectedNavigation,
    accountDropdownNav: accountDropdownNavigation,
    adminNav: adminNavigation,
  } = React.useMemo(() => {
    return getConditionalNavigation({
      includeAuth: isUserAccountsEnabled(),
      includeAdmin: isAdminEnabled(),
      includeBlog: isBlogEnabled(),
      includeBilling: isBillingEnabled(),
    });
  }, []);

  // Convert to the expected format
  const publicNavigationItems: NavigationItem[] = publicNavigation.map(item => ({
    label: item.title,
    href: item.href,
    external: item.external,
  }));

  const protectedNavigationItems: NavigationItem[] = protectedNavigation.map(item => ({
    label: item.title,
    href: item.href,
    external: item.external,
  }));

  const accountDropdownItems: NavigationItem[] = accountDropdownNavigation.map(item => ({
    label: item.title,
    href: item.href,
    external: item.external,
  }));

  const adminNavigationItems: NavigationItem[] = adminNavigation.map(item => ({
    label: item.title,
    href: item.href,
    external: item.external,
  }));

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const isAdmin = user?.role === "admin";

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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center px-6">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <Link href={user ? "/app" : "/"} className="flex items-center space-x-2 group">
            {logoVisible && (
              <img
                src="/logo.png"
                alt={tokens.brandName}
                className="h-12 w-12 rounded-lg object-contain bg-surface shadow-md group-hover:shadow-lg transition-all duration-200"
                onError={() => setLogoVisible(false)}
              />
            )}
            <span className="font-heading text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {tokens.brandName}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-1">
          {user ? (
            // Protected layout navigation - no marketing links
            protectedNavigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.label}
              </Link>
            ))
          ) : (
            // Public layout navigation - marketing links
            publicNavigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.label}
              </Link>
            ))
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              {/* Admin Navigation - single Admin link only */}
              <nav className="hidden lg:flex items-center space-x-4">
                {isAdmin && adminNavigationItems.length > 0 && (
                  adminNavigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive(item.href)
                          ? "text-foreground"
                          : "text-foreground/60"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))
                )}
              </nav>

              {/* User Menu */}
              <Dropdown>
                <DropdownTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative hover:bg-primary/5">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name || user.email}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-semibold text-white">
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
                    </div>
                  </div>
                  <DropdownSeparator />
                  {accountDropdownItems.map((item) => (
                    <DropdownItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownItem>
                  ))}
                  <DropdownSeparator />
                  <DropdownItem onClick={handleLogout} disabled={isLoggingOut}>
                    {isLoggingOut ? "Signing Out..." : "Sign Out"}
                  </DropdownItem>
                </DropdownContent>
              </Dropdown>
            </div>
          ) : (
            isUserAccountsEnabled() && (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="hover:bg-primary/5" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-200" asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d={
                  mobileMenuOpen
                    ? "m6 6 12 12M6 18 18 6"
                    : "M3 12h18M3 6h18M3 18h18"
                }
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 border-t">
            {user ? (
              // Protected layout mobile navigation
              <>
                {protectedNavigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                      isActive(item.href)
                        ? "text-foreground bg-accent/50"
                        : "text-foreground/60"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Admin navigation */}
                {isAdmin && adminNavigationItems.length > 0 && (
                  <>
                    <div className="border-t my-2" />
                    {adminNavigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                          isActive(item.href)
                            ? "text-foreground bg-accent/50"
                            : "text-foreground/60"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </>
                )}

                {/* Account navigation */}
                <div className="border-t my-2" />
                {accountDropdownItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                      isActive(item.href)
                        ? "text-foreground bg-accent/50"
                        : "text-foreground/60"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            ) : (
              // Public layout mobile navigation
              publicNavigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    isActive(item.href)
                      ? "text-foreground bg-accent/50"
                      : "text-foreground/60"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </header>
  );
}
