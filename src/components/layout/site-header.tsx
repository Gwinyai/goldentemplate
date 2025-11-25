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
} from "@/components/ui";

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

const publicNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
];

const userNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Account", href: "/account" },
  { label: "Billing", href: "/billing" },
];

const adminNavigation: NavigationItem[] = [
  { label: "Admin", href: "/admin" },
  { label: "Manage Blog", href: "/admin/blog" },
  { label: "Manage Users", href: "/admin/users" },
];

export function SiteHeader({ user }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const isAdmin = user?.role === "admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary" />
            <span className="font-heading text-xl font-bold">
              {tokens.brandName}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6">
          {publicNavigation.map((item) => (
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
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              {/* User Navigation */}
              <nav className="hidden lg:flex items-center space-x-4">
                {userNavigation.map((item) => (
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
                ))}
                {isAdmin && (
                  <>
                    <div className="h-4 w-px bg-border" />
                    {adminNavigation.map((item) => (
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
                    ))}
                  </>
                )}
              </nav>

              {/* User Menu */}
              <Dropdown>
                <DropdownTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
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
                    </div>
                  </div>
                  <DropdownSeparator />
                  <DropdownItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownItem>
                  <DropdownItem asChild>
                    <Link href="/account">Account</Link>
                  </DropdownItem>
                  <DropdownItem asChild>
                    <Link href="/billing">Billing</Link>
                  </DropdownItem>
                  {isAdmin && (
                    <>
                      <DropdownSeparator />
                      <DropdownItem asChild>
                        <Link href="/admin">Admin Panel</Link>
                      </DropdownItem>
                    </>
                  )}
                  <DropdownSeparator />
                  <DropdownItem>
                    Sign Out
                  </DropdownItem>
                </DropdownContent>
              </Dropdown>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
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
            {publicNavigation.map((item) => (
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
            
            {user && (
              <>
                <div className="border-t my-2" />
                {userNavigation.map((item) => (
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
                
                {isAdmin && (
                  <>
                    <div className="border-t my-2" />
                    {adminNavigation.map((item) => (
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}