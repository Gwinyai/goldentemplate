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

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Client-side validation
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
      }

      if (!agreedToTerms) {
        setError("Please agree to the Terms of Service and Privacy Policy");
        return;
      }

      // Call the registration API endpoint
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed. Please try again.");
        return;
      }

      // Successful registration
      if (data.needsConfirmation) {
        // Redirect to confirmation page or show message
        router.push("/login?message=Please check your email to confirm your account");
      } else {
        // Auto-login and redirect to app
        router.push("/app");
        router.refresh();
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", err);
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

  const handleSocialSignup = (provider: string) => {
    console.log(`Social signup with ${provider}`);
    // TODO: Implement social authentication
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6) return { strength: 1, label: "Weak" };
    if (password.length < 10) return { strength: 2, label: "Medium" };
    if (password.length >= 10 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 3, label: "Strong" };
    }
    return { strength: 2, label: "Medium" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-background">
      <PageContainer maxWidth="sm" className="flex items-center justify-center min-h-screen py-section-mobile md:py-section">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="h-16 w-16 rounded-xl bg-gradient-primary shadow-lg flex items-center justify-center">
                <svg className="h-9 w-9 text-text-inverse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-heading font-extrabold text-gradient-primary mb-3">
              Create your account
            </h1>
            <p className="text-text-secondary text-lg">
              Join VibeGuide and start building amazing boilerplates
            </p>
          </div>

          <Card className="card-base card-hover bg-surface/80 backdrop-blur-sm border border-border-light/50">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-heading font-bold text-text-primary">Sign Up</CardTitle>
              <CardDescription className="text-text-secondary">
                Create your account to get started with VibeGuide
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-5">
                {error && (
                  <Alert variant="destructive" className="border-danger/20 bg-danger/5">
                    <AlertDescription className="text-danger">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-text-primary font-medium">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-background border-border-light focus:border-primary focus:ring-primary/20"
                    required
                    disabled={isLoading}
                  />
                </div>

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
                  <Label htmlFor="password" className="text-text-primary font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Create a password"
                    className="bg-background border-border-light focus:border-primary focus:ring-primary/20"
                    required
                    disabled={isLoading}
                  />
                  {formData.password && (
                    <div className="space-y-1.5">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                              level <= passwordStrength.strength
                                ? level === 1
                                  ? "bg-danger shadow-sm"
                                  : level === 2
                                  ? "bg-warning shadow-sm"
                                  : "bg-success shadow-sm"
                                : "bg-border-light"
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-xs font-medium ${
                        passwordStrength.strength === 1 ? "text-danger" :
                        passwordStrength.strength === 2 ? "text-warning" :
                        "text-success"
                      }`}>
                        Password strength: {passwordStrength.label}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-text-primary font-medium">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    placeholder="Confirm your password"
                    className="bg-background border-border-light focus:border-primary focus:ring-primary/20"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border-light text-primary focus:ring-primary/20"
                    disabled={isLoading}
                  />
                  <label htmlFor="terms" className="text-sm text-text-muted leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
            </CardContent>

              <CardFooter className="flex flex-col space-y-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary text-text-inverse font-semibold hover:opacity-90 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  disabled={isLoading || !agreedToTerms}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>

                {/* Social Signup */}
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
                    onClick={() => handleSocialSignup("google")}
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
                    onClick={() => handleSocialSignup("github")}
                    disabled={isLoading}
                  >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </Button>
                </div>

                <div className="text-center text-sm text-text-muted">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Demo Notice */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-6 bg-gradient-primary/10 backdrop-blur-sm rounded-xl border border-primary/20 text-center shadow-sm">
              <p className="font-semibold text-primary mb-2">Demo Mode</p>
              <p className="text-text-secondary">Fill out the form to continue to the dashboard</p>
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  );
}