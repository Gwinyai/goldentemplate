"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Label,
  Alert,
  AlertDescription,
} from "@/components/ui";
import { PageContainer } from "@/components/layout";

// Helper function to validate redirect URLs for security
const isValidRedirectUrl = (url: string): boolean => {
  try {
    // Only allow relative URLs or same-origin URLs
    if (url.startsWith('/')) {
      return true;
    }
    
    // Check if it's a same-origin URL
    const redirectUrl = new URL(url);
    const currentOrigin = typeof window !== "undefined" ? window.location.origin : "";
    return redirectUrl.origin === currentOrigin;
  } catch {
    return false;
  }
};

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // Get redirect parameter from URL
  const redirectTo = React.useMemo(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("redirect") || params.get("callbackUrl");
    }
    return null;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Call the login API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed. Please try again.");
        return;
      }

      // Successful login - redirect based on priority:
      // 1. Redirect parameter from URL
      // 2. Role-based default (admin -> /admin, user -> /app)
      let destination = "/app";
      
      if (redirectTo && isValidRedirectUrl(redirectTo)) {
        destination = redirectTo;
      } else if (data.isAdmin) {
        destination = "/admin";
      }
      
      router.push(destination);
      router.refresh();
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider}`);
    // TODO: Implement social authentication
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <PageContainer maxWidth="sm" className="flex items-center justify-center min-h-screen py-section-mobile md:py-section">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="h-16 w-16 rounded-xl bg-gradient-primary shadow-lg flex items-center justify-center">
                <svg className="h-9 w-9 text-text-inverse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-heading font-extrabold text-gradient-primary mb-3">
              Welcome back
            </h1>
            <p className="text-text-secondary text-lg">
              Sign in to your VibeGuide account to continue building
            </p>
          </div>

          <Card className="card-base card-hover bg-surface/80 backdrop-blur-sm border border-border-light/50">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-heading font-bold text-text-primary">Sign In</CardTitle>
              <CardDescription className="text-text-secondary">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {error && (
                  <Alert variant="destructive" className="border-danger/20 bg-danger/5">
                    <AlertDescription className="text-danger">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-text-primary font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="bg-background border-border-light focus:border-primary focus:ring-primary/20"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-text-primary font-medium">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Enter your password"
                    className="bg-background border-border-light focus:border-primary focus:ring-primary/20"
                    required
                    disabled={isLoading}
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary text-text-inverse font-semibold hover:opacity-90 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                {/* Social Login */}
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border-light" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-surface px-4 text-text-muted font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-background border-border-light hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 text-text-secondary hover:text-primary"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isLoading}
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="bg-background border-border-light hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 text-text-secondary hover:text-primary"
                    onClick={() => handleSocialLogin("github")}
                    disabled={isLoading}
                  >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </Button>
                </div>

                <div className="text-center text-sm text-text-muted">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary hover:text-primary/80 transition-colors font-medium">
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Demo Notice */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-6 bg-gradient-primary/10 backdrop-blur-sm rounded-xl border border-primary/20 text-center shadow-sm">
              <p className="font-semibold text-primary mb-2">Demo Mode</p>
              <p className="text-text-secondary">Enter any email and password to continue</p>
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  );
}