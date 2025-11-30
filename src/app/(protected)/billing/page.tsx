import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireUser } from "@/lib/auth/require-user";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function BillingPage() {
  const user = await requireUser();

  return (
    <DashboardShell user={user}>
      <div className="p-6 space-y-8">
        <PageHeader
          title="Billing & Subscription"
          description="Manage your subscription, billing information, and usage."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Current Plan & Usage */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Current Plan
                  <Badge variant="secondary">Free Plan</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Monthly Price</div>
                    <div className="text-2xl font-bold">$0</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Billing Period</div>
                    <div className="text-lg font-medium">Monthly</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm font-medium">Plan Features:</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Up to 3 projects</li>
                    <li>• 5GB storage</li>
                    <li>• 1,000 API calls/month</li>
                    <li>• Community support</li>
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Button>Upgrade Plan</Button>
                  <Button variant="outline">Compare Plans</Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Details */}
            <Card>
              <CardHeader>
                <CardTitle>Current Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Projects</div>
                      <div className="text-sm text-muted-foreground">3 of 3 used</div>
                    </div>
                    <Badge variant="destructive">Limit Reached</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: "100%"}}></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Storage</div>
                      <div className="text-sm text-muted-foreground">1.2GB of 5GB used</div>
                    </div>
                    <Badge variant="secondary">24% Used</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: "24%"}}></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">API Calls</div>
                      <div className="text-sm text-muted-foreground">847 of 1,000 used this month</div>
                    </div>
                    <Badge variant="outline">84.7% Used</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: "84.7%"}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <div className="text-lg font-medium">No billing history</div>
                  <div className="text-sm">You're currently on the free plan</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upgrade Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade Your Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">$19</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                  <Badge className="mt-2">Most Popular</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium">Pro Plan includes:</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Unlimited projects</li>
                    <li>• 100GB storage</li>
                    <li>• 50,000 API calls/month</li>
                    <li>• Priority support</li>
                    <li>• Advanced analytics</li>
                    <li>• Team collaboration</li>
                  </ul>
                </div>
                
                <Button className="w-full">Upgrade to Pro</Button>
                <Button variant="outline" className="w-full">Try 14 Days Free</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">$99</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium">Everything in Pro, plus:</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Unlimited everything</li>
                    <li>• Dedicated support</li>
                    <li>• Custom integrations</li>
                    <li>• SLA guarantee</li>
                    <li>• Advanced security</li>
                  </ul>
                </div>
                
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4 text-muted-foreground">
                  <div className="text-sm">No payment method on file</div>
                </div>
                <Button variant="outline" className="w-full">Add Payment Method</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4 text-muted-foreground">
                  <div className="text-sm">No billing address set</div>
                </div>
                <Button variant="outline" className="w-full">Update Address</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Subscription Management */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="h-8 w-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="font-medium">Invoice History</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Download past invoices
                </div>
                <Button variant="outline" size="sm">View Invoices</Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="h-8 w-8 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="font-medium">Usage Reports</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Detailed usage analytics
                </div>
                <Button variant="outline" size="sm">View Reports</Button>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="h-8 w-8 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="font-medium">Add Credits</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Purchase additional credits
                </div>
                <Button variant="outline" size="sm">Add Credits</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}