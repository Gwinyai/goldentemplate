"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge, Button } from "@/components/ui";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  items?: NavItem[];
}

interface SidebarNavProps {
  items: NavItem[];
  collapsed?: boolean;
  className?: string;
}

const defaultNavItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
      </svg>
    ),
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    badge: "3",
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
    items: [
      {
        title: "Members",
        href: "/dashboard/team/members",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      },
      {
        title: "Invites",
        href: "/dashboard/team/invites",
        icon: (
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        ),
        badge: "2",
      },
    ],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function SidebarNav({ 
  items = defaultNavItems, 
  collapsed = false, 
  className 
}: SidebarNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const active = isActive(item.href);
    
    return (
      <div key={item.href}>
        <Link
          href={item.disabled ? "#" : item.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            level > 0 && "pl-6",
            active
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground",
            item.disabled && "opacity-50 cursor-not-allowed",
            collapsed && "justify-center px-2"
          )}
        >
          {item.icon}
          {!collapsed && (
            <>
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="h-5 text-xs">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </Link>
        
        {/* Sub-items */}
        {!collapsed && item.items && item.items.length > 0 && (
          <div className="ml-4 mt-1 space-y-1">
            {item.items.map((subItem) => renderNavItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={cn("space-y-2", className)}>
      {items.map((item) => renderNavItem(item))}
    </nav>
  );
}

export function SidebarNavSection({
  title,
  children,
  collapsed = false,
}: {
  title: string;
  children: React.ReactNode;
  collapsed?: boolean;
}) {
  return (
    <div className="space-y-2">
      {!collapsed && (
        <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}