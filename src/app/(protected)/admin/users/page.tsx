import { AdminShell } from "@/components/layout/admin-shell";
import { requireAdmin } from "@/lib/auth/require-admin";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function AdminUsersPage() {
  const user = await requireAdmin();

  // Mock users data
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: null,
      role: "user",
      status: "active",
      joinedAt: "2024-01-15T10:30:00Z",
      lastActive: "2024-01-20T14:25:00Z",
      subscription: "pro",
      totalProjects: 5
    },
    {
      id: "2", 
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: null,
      role: "admin",
      status: "active", 
      joinedAt: "2024-01-10T09:15:00Z",
      lastActive: "2024-01-20T16:45:00Z",
      subscription: "enterprise",
      totalProjects: 12
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      avatar: null,
      role: "user",
      status: "inactive",
      joinedAt: "2024-01-05T11:20:00Z", 
      lastActive: "2024-01-18T10:30:00Z",
      subscription: "free",
      totalProjects: 2
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      avatar: null,
      role: "moderator",
      status: "active",
      joinedAt: "2024-01-12T14:45:00Z",
      lastActive: "2024-01-20T12:15:00Z", 
      subscription: "pro",
      totalProjects: 8
    },
    {
      id: "5",
      name: "David Brown",
      email: "david.brown@example.com",
      avatar: null,
      role: "user", 
      status: "suspended",
      joinedAt: "2024-01-08T16:30:00Z",
      lastActive: "2024-01-19T09:45:00Z",
      subscription: "free",
      totalProjects: 1
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      case "moderator":
        return <Badge className="bg-blue-100 text-blue-800">Moderator</Badge>;
      case "user":
        return <Badge variant="outline">User</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getSubscriptionBadge = (subscription: string) => {
    switch (subscription) {
      case "enterprise":
        return <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>;
      case "pro":
        return <Badge className="bg-blue-100 text-blue-800">Pro</Badge>;
      case "free":
        return <Badge variant="outline">Free</Badge>;
      default:
        return <Badge variant="secondary">{subscription}</Badge>;
    }
  };

  return (
    <AdminShell user={user}>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <PageHeader
            title="User Management"
            description="Manage users, roles, and permissions"
          />
          <Button>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Invite User
          </Button>
        </div>

        {/* User Stats */}
        <div className="grid gap-6 md:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+12% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,654</div>
              <p className="text-xs text-muted-foreground">93% of total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pro Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,203</div>
              <p className="text-xs text-muted-foreground">42% of total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                New This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">189</div>
              <p className="text-xs text-muted-foreground">+8% growth</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Suspended
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">0.8% of total</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input placeholder="Search users..." className="max-w-sm" />
              <select className="px-3 py-2 border border-input rounded-md bg-background text-sm">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
              <select className="px-3 py-2 border border-input rounded-md bg-background text-sm">
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>
              <select className="px-3 py-2 border border-input rounded-md bg-background text-sm">
                <option value="all">All Plans</option>
                <option value="enterprise">Enterprise</option>
                <option value="pro">Pro</option>
                <option value="free">Free</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">User</th>
                    <th className="text-left py-3 px-4 font-medium">Role</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Plan</th>
                    <th className="text-left py-3 px-4 font-medium">Projects</th>
                    <th className="text-left py-3 px-4 font-medium">Joined</th>
                    <th className="text-left py-3 px-4 font-medium">Last Active</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                            {u.avatar ? (
                              <img
                                src={u.avatar}
                                alt={u.name}
                                className="h-8 w-8 rounded-full"
                              />
                            ) : (
                              <span className="text-sm font-medium">
                                {u.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{u.name}</div>
                            <div className="text-sm text-muted-foreground">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">{getRoleBadge(u.role)}</td>
                      <td className="py-4 px-4">{getStatusBadge(u.status)}</td>
                      <td className="py-4 px-4">{getSubscriptionBadge(u.subscription)}</td>
                      <td className="py-4 px-4 text-sm">{u.totalProjects}</td>
                      <td className="py-4 px-4 text-sm">{formatDate(u.joinedAt)}</td>
                      <td className="py-4 px-4 text-sm">{formatDate(u.lastActive)}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                            </svg>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-muted-foreground">
                Showing 1-5 of 2,847 users
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Bulk Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Send Email to Selected
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Export User Data
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-red-600">
                Suspend Selected
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Role Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Manage Permissions
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Create Custom Role
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Role Assignments
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">User Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                User Activity Report
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Registration Trends
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Engagement Metrics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}