"use client";

import React from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { userSchemas, validateSchema } from "@/lib/validations/schemas";
import type { User } from "@/lib/auth/require-user";

interface ProfileFormProps {
  user: User;
  onSave?: (data: any) => Promise<void>;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  bio: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
}

export function ProfileForm({ user, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: user.name?.split(" ")[0] || "",
    lastName: user.name?.split(" ").slice(1).join(" ") || "",
    email: user.email || "",
    phone: "",
    location: "",
    website: "",
    bio: "",
    socialLinks: {
      twitter: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("socialLinks.")) {
      const socialField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Transform data for validation
    const validationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || undefined,
      location: formData.location || undefined,
      website: formData.website || undefined,
      bio: formData.bio || undefined,
      socialLinks: {
        twitter: formData.socialLinks.twitter || undefined,
        linkedin: formData.socialLinks.linkedin || undefined,
        github: formData.socialLinks.github || undefined,
        website: formData.socialLinks.portfolio || undefined,
      },
    };

    const validation = validateSchema(userSchemas.profile, validationData);

    if (!validation.success) {
      setErrors(validation.errors || {});
      setIsLoading(false);
      return;
    }

    try {
      if (onSave) {
        await onSave(validation.data);
      } else {
        // Default save behavior - call API endpoint
        const response = await fetch("/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validation.data),
        });

        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
      }

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Profile update error:", error);
      setErrors({ _root: "Failed to update profile. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.name?.split(" ")[0] || "",
      lastName: user.name?.split(" ").slice(1).join(" ") || "",
      email: user.email || "",
      phone: "",
      location: "",
      website: "",
      bio: "",
      socialLinks: {
        twitter: "",
        linkedin: "",
        github: "",
        portfolio: "",
      },
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center space-y-3">
              <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.name || user.email || "User"}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-medium">
                    {(formData.firstName || formData.email || "U").charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <Button variant="outline" size="sm" type="button">
                Change Photo
              </Button>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-semibold">
                  {formData.firstName && formData.lastName 
                    ? `${formData.firstName} ${formData.lastName}`
                    : user.name || "User"
                  }
                </h3>
                <p className="text-muted-foreground">{formData.email}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Free Plan</Badge>
                <Badge variant="outline">Verified</Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Member since {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {errors._root && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive text-sm">{errors._root}</p>
          </CardContent>
        </Card>
      )}

      {/* Success Display */}
      {isSaved && (
        <Card className="border-green-500">
          <CardContent className="pt-6">
            <p className="text-green-600 text-sm">Profile updated successfully!</p>
          </CardContent>
        </Card>
      )}

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && (
                <p className="text-destructive text-xs">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <p className="text-destructive text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-destructive text-xs">{errors.email}</p>
            )}
            <p className="text-xs text-muted-foreground">
              This email is used for account notifications and login.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-destructive text-xs">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="City, Country"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={errors.location ? "border-destructive" : ""}
            />
            {errors.location && (
              <p className="text-destructive text-xs">{errors.location}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://your-website.com"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              className={errors.website ? "border-destructive" : ""}
            />
            {errors.website && (
              <p className="text-destructive text-xs">{errors.website}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              className="min-h-[100px] resize-none"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
            />
            {errors.bio && (
              <p className="text-destructive text-xs">{errors.bio}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Brief description for your profile. Maximum 1000 characters.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                placeholder="https://twitter.com/username"
                value={formData.socialLinks.twitter}
                onChange={(e) => handleInputChange("socialLinks.twitter", e.target.value)}
                className={errors["socialLinks.twitter"] ? "border-destructive" : ""}
              />
              {errors["socialLinks.twitter"] && (
                <p className="text-destructive text-xs">{errors["socialLinks.twitter"]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={formData.socialLinks.linkedin}
                onChange={(e) => handleInputChange("socialLinks.linkedin", e.target.value)}
                className={errors["socialLinks.linkedin"] ? "border-destructive" : ""}
              />
              {errors["socialLinks.linkedin"] && (
                <p className="text-destructive text-xs">{errors["socialLinks.linkedin"]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                placeholder="https://github.com/username"
                value={formData.socialLinks.github}
                onChange={(e) => handleInputChange("socialLinks.github", e.target.value)}
                className={errors["socialLinks.github"] ? "border-destructive" : ""}
              />
              {errors["socialLinks.github"] && (
                <p className="text-destructive text-xs">{errors["socialLinks.github"]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio</Label>
              <Input
                id="portfolio"
                placeholder="https://your-portfolio.com"
                value={formData.socialLinks.portfolio}
                onChange={(e) => handleInputChange("socialLinks.portfolio", e.target.value)}
                className={errors["socialLinks.portfolio"] ? "border-destructive" : ""}
              />
              {errors["socialLinks.portfolio"] && (
                <p className="text-destructive text-xs">{errors["socialLinks.portfolio"]}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}