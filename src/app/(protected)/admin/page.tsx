import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdmin } from "@/lib/auth/require-admin";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isBlogEnabled, isUserAccountsEnabled } from "@/lib/config";
import Link from "next/link";

export default async function AdminPage() {
  const user = await requireAdmin();

  // Dynamic quick actions based on feature flags
  const quickActions = [
    // Users management (only if user accounts enabled)
    ...(isUserAccountsEnabled() ? [{
      label: "Manage Users",
      href: "/admin/users",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    }] : []),
    
    // Blog management (only if blog enabled)
    ...(isBlogEnabled() ? [{
      label: "Manage Blog Posts",
      href: "/admin/blog", 
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }] : []),
    
    // Analytics (always available)
    {
      label: "View Analytics",
      href: "/admin/analytics",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
  ];

  // Mock admin stats
  const adminStats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive" as const,
      description: "Active users this month"
    },
    {
      title: "Total Posts",
      value: "156",
      change: "+5.2%", 
      changeType: "positive" as const,
      description: "Published blog posts"
    },
    {
      title: "Revenue",
      value: "$24,569",
      change: "+8.1%",
      changeType: "positive" as const,
      description: "Monthly recurring revenue"
    },
    {
      title: "Support Tickets",
      value: "23",
      change: "-15.3%",
      changeType: "positive" as const,
      description: "Open support tickets"
    }
  ];

  // Mock recent activity
  const recentActivity = [
    {
      id: "1",
      type: "user",
      title: "New user registration",
      description: "john.doe@example.com registered",
      timestamp: "2 minutes ago",
      status: "info"
    },
    {
      id: "2", 
      type: "blog",
      title: "Blog post published",
      description: "Getting Started with Next.js 14",
      timestamp: "15 minutes ago",
      status: "success"
    },
    {
      id: "3",
      type: "payment",
      title: "Payment failed",
      description: "Subscription payment for user@example.com",
      timestamp: "1 hour ago", 
      status: "error"
    },
    {
      id: "4",
      type: "system",
      title: "Database backup completed",
      description: "Automated backup finished successfully",
      timestamp: "2 hours ago",
      status: "success"
    }
  ];

  return (
    <AdminShell user={user}>
      <div className="p-6 space-y-8">
        <PageHeader
          title="Admin Dashboard"
          description="System overview and administration tools"
        />

        {/* Admin Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">from last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <div className={`p-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-100 text-green-600' :
                        activity.status === 'error' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {activity.type === 'user' && (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                        {activity.type === 'blog' && (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {activity.type === 'payment' && (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        )}
                        {activity.type === 'system' && (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.href}
                    className="w-full justify-start"
                    variant="outline"
                    asChild
                  >
                    <Link href={action.href}>
                      <span className="mr-2">{action.icon}</span>
                      {action.label}
                    </Link>
                  </Button>
                ))}
                {quickActions.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    No actions available. Enable features in configuration.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database</span>
                  <Badge variant="secondary" className="text-green-600">Healthy</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Services</span>
                  <Badge variant="secondary" className="text-green-600">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Background Jobs</span>
                  <Badge variant="secondary" className="text-green-600">Running</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage</span>
                  <Badge variant="outline">78% Used</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}