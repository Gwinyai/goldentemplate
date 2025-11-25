import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button, Badge, Input, Label, Textarea } from "@/components/ui";

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role?: string;
  title?: string;
  bio?: string;
  location?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  joinedAt: string;
  lastActive?: string;
  stats?: {
    projects: number;
    contributions: number;
    followers: number;
  };
}

interface UserProfileCardProps {
  user: User;
  showEditButton?: boolean;
  showStats?: boolean;
  compact?: boolean;
  onEdit?: () => void;
}

interface UserProfileFormProps {
  user: User;
  onSave?: (updatedUser: Partial<User>) => void;
  onCancel?: () => void;
}

const formatJoinDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

const formatLastActive = (dateString?: string) => {
  if (!dateString) return "Never";
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
  
  return date.toLocaleDateString();
};

export function UserProfileCard({
  user,
  showEditButton = false,
  showStats = true,
  compact = false,
  onEdit,
}: UserProfileCardProps) {
  return (
    <Card>
      <CardHeader className={compact ? "pb-4" : undefined}>
        <div className="flex items-start gap-4">
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || user.email}
                className={`rounded-full object-cover ${
                  compact ? "h-12 w-12" : "h-16 w-16"
                }`}
              />
            ) : (
              <div
                className={`rounded-full bg-primary/20 flex items-center justify-center ${
                  compact ? "h-12 w-12" : "h-16 w-16"
                }`}
              >
                <span className={compact ? "text-lg" : "text-2xl"}>
                  {(user.name || user.email)?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            {/* Online indicator */}
            {user.lastActive && (
              <div className="absolute -bottom-1 -right-1">
                <div className="h-4 w-4 rounded-full bg-green-500 ring-2 ring-background" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold ${compact ? "text-base" : "text-lg"}`}>
                {user.name || "Unnamed User"}
              </h3>
              {user.role && (
                <Badge variant="secondary" className="text-xs">
                  {user.role}
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-1">
              {user.email}
            </p>
            
            {user.title && (
              <p className="text-sm text-muted-foreground mb-1">
                {user.title}
              </p>
            )}

            {user.location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {user.location}
              </div>
            )}
          </div>

          {showEditButton && onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Button>
          )}
        </div>
      </CardHeader>

      {!compact && (
        <CardContent>
          {user.bio && (
            <p className="text-sm text-muted-foreground mb-4">
              {user.bio}
            </p>
          )}

          {/* Links */}
          <div className="flex gap-4 mb-4">
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Website
              </a>
            )}
            
            {user.twitter && (
              <a
                href={`https://twitter.com/${user.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </a>
            )}

            {user.linkedin && (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            )}
          </div>

          {/* Stats */}
          {showStats && user.stats && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-xl font-bold">
                  {user.stats.projects.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold">
                  {user.stats.contributions.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Contributions</div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold">
                  {user.stats.followers.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </div>
            </div>
          )}
        </CardContent>
      )}

      <CardFooter className="pt-0">
        <div className="text-xs text-muted-foreground">
          <div>Joined {formatJoinDate(user.joinedAt)}</div>
          {user.lastActive && (
            <div>Last active {formatLastActive(user.lastActive)}</div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export function UserProfileForm({
  user,
  onSave,
  onCancel,
}: UserProfileFormProps) {
  const [formData, setFormData] = React.useState({
    name: user.name || "",
    title: user.title || "",
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
    twitter: user.twitter || "",
    linkedin: user.linkedin || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Your display name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Your job title"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Tell us about yourself"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Your location"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter Username</Label>
              <Input
                id="twitter"
                value={formData.twitter}
                onChange={(e) => handleChange("twitter", e.target.value)}
                placeholder="username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                type="url"
                value={formData.linkedin}
                onChange={(e) => handleChange("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex gap-2">
          <Button type="submit">Save Changes</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

// Default user profile with mock data
export function DefaultUserProfile() {
  const mockUser: User = {
    id: "1",
    email: "john.doe@example.com",
    name: "John Doe",
    avatar: "__VG_USER_AVATAR__",
    role: "Admin",
    title: "Senior Frontend Developer",
    bio: "Passionate about creating beautiful and functional user interfaces. Love working with React, TypeScript, and modern web technologies.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    twitter: "johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    joinedAt: "2023-01-15T00:00:00Z",
    lastActive: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    stats: {
      projects: 24,
      contributions: 156,
      followers: 89,
    },
  };

  return (
    <UserProfileCard
      user={mockUser}
      showEditButton={true}
      showStats={true}
      compact={false}
      onEdit={() => console.log("Edit profile")}
    />
  );
}