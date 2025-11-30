import { DashboardShell } from "@/components/layout/dashboard-shell";
import { 
  DefaultStatsCards, 
  DefaultActivityFeed
} from "@/components/dashboard";
import { requireUser } from "@/lib/auth/require-user";
import { PageHeader } from "@/components/layout/page-header";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <DashboardShell user={user}>
      <div className="p-6 space-y-8">
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's an overview of your account."
        />
        
        {/* Stats Cards */}
        <DefaultStatsCards />
        
        {/* Activity Feed */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <DefaultActivityFeed />
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <div className="space-y-3">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">Create New Project</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Start a new project with our templates
                </p>
                <button className="mt-3 text-sm font-medium text-primary hover:underline">
                  Get Started →
                </button>
              </div>
              
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">Invite Team Members</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Collaborate with your team
                </p>
                <button className="mt-3 text-sm font-medium text-primary hover:underline">
                  Send Invites →
                </button>
              </div>
              
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">Upgrade Plan</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Unlock more features and storage
                </p>
                <button className="mt-3 text-sm font-medium text-primary hover:underline">
                  View Plans →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}