"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Button, 
  Input, 
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from "@/components/ui";
import { tokens } from "@/design-tokens";

interface TopNavProps {
  user: {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    role?: string;
  };
  onSidebarToggle?: () => void;
  showSearch?: boolean;
  showNotifications?: boolean;
  showQuickActions?: boolean;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
}

export function TopNav({
  user,
  onSidebarToggle,
  showSearch = true,
  showNotifications = true,
  showQuickActions = true,
  breadcrumbs,
}: TopNavProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const pathname = usePathname();

  const quickActions = [
    {
      label: "New Project",
      href: "/dashboard/projects/new",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      label: "Invite Team",
      href: "/dashboard/team/invite",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
  ];

  const notifications = [
    {
      id: "1",
      title: "New team member joined",
      description: "Sarah Wilson joined your team",
      time: "2 minutes ago",
      unread: true,
      type: "team",
    },
    {
      id: "2", 
      title: "Project deployment completed",
      description: "Your project 'Website Redesign' has been deployed successfully",
      time: "1 hour ago",
      unread: true,
      type: "deployment",
    },
    {
      id: "3",
      title: "Monthly usage report",
      description: "Your usage report for this month is now available",
      time: "3 hours ago",
      unread: false,
      type: "report",
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        {/* Sidebar Toggle */}
        {onSidebarToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSidebarToggle}
            className="lg:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="hidden sm:flex items-center space-x-1 text-sm text-muted-foreground">
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                {breadcrumb.href ? (
                  <Link 
                    href={breadcrumb.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {breadcrumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">
                    {breadcrumb.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <svg className="h-4 w-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Search */}
        {showSearch && (
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
                  onClick={() => setSearchQuery("")}
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="flex-1" />

        {/* Quick Actions */}
        {showQuickActions && (
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="outline" size="sm">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">New</span>
              </Button>
            </DropdownTrigger>
            <DropdownContent align="end">
              {quickActions.map((action, index) => (
                <DropdownItem key={index} asChild>
                  <Link href={action.href} className="flex items-center gap-2">
                    {action.icon}
                    {action.label}
                  </Link>
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
        )}

        {/* Notifications */}
        {showNotifications && (
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5.5-7.5L12 14l-2.5-3.5L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownTrigger>
            <DropdownContent align="end" className="w-80">
              <div className="flex items-center justify-between p-3 border-b">
                <h3 className="font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" className="text-xs h-6">
                    Mark all read
                  </Button>
                )}
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 hover:bg-accent transition-colors border-b last:border-b-0 ${
                          notification.unread ? "bg-accent/50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{notification.title}</p>
                              {notification.unread && (
                                <div className="h-2 w-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="p-2 border-t">
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href="/dashboard/notifications">
                      View all notifications
                    </Link>
                  </Button>
                </div>
              )}
            </DropdownContent>
          </Dropdown>
        )}

        {/* User Menu */}
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || user.email}
                    className="h-6 w-6 rounded-full object-cover"
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
                {user.role && (
                  <Badge variant="secondary" className="text-xs w-fit">
                    {user.role}
                  </Badge>
                )}
              </div>
            </div>
            <DropdownSeparator />
            <DropdownItem asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </DropdownItem>
            <DropdownItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownItem>
            <DropdownItem asChild>
              <Link href="/billing">Billing</Link>
            </DropdownItem>
            {user.role === "admin" && (
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
    </header>
  );
}