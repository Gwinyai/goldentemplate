import { requireUser } from "@/lib/auth/require-user";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tokens } from "@/design-tokens";

export default async function AppPage() {
  const user = await requireUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
          <h1 className="text-4xl font-bold tracking-tight relative">
            <span className="text-gradient-primary">
              Welcome to {tokens.brandName}
            </span>
          </h1>
          <p className="text-muted-foreground mt-3 text-lg relative">
            Hello <span className="font-semibold text-foreground">{user.name || user.email}</span>, this is your main application dashboard.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-primary">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Quick Actions</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-primary hover:shadow-primary-lg shadow-primary">
                  Get Started
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
                <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
                  View Tutorial
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-md">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Recent Activity</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="h-16 w-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-3">
                  <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">
                  No recent activity to show.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your app activity will appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="border-accent/20 bg-gradient-to-br from-background to-muted/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-accent">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Getting Started</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Welcome to your {tokens.brandName} application! Here are some next steps:
                </p>
                
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-foreground">Complete your profile setup</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-foreground">Explore available features</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-foreground">Connect with our support team if you need help</span>
                  </li>
                </ul>

                <div className="flex gap-3 pt-2">
                  <Button size="sm" className="bg-gradient-primary hover:shadow-primary shadow-primary">
                    Complete Profile
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                    Contact Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}