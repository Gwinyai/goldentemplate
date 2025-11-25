import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "user" | "system" | "payment" | "project" | "team";
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
  metadata?: {
    status?: "success" | "warning" | "error" | "info";
    link?: {
      href: string;
      label: string;
    };
  };
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  showTimestamps?: boolean;
  showUserAvatars?: boolean;
  maxItems?: number;
  className?: string;
}

const getActivityIcon = (type: ActivityItem["type"], status?: string) => {
  const iconClass = "h-4 w-4";
  
  switch (type) {
    case "user":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case "system":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "payment":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case "project":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case "team":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

const getStatusColor = (status?: string) => {
  switch (status) {
    case "success":
      return "text-green-600 bg-green-100 dark:bg-green-900/20";
    case "warning":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
    case "error":
      return "text-red-600 bg-red-100 dark:bg-red-900/20";
    case "info":
      return "text-blue-600 bg-blue-100 dark:bg-blue-900/20";
    default:
      return "text-muted-foreground bg-muted";
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
  
  return date.toLocaleDateString();
};

export function ActivityFeed({
  activities,
  title = "Recent Activity",
  showTimestamps = true,
  showUserAvatars = true,
  maxItems,
  className,
}: ActivityFeedProps) {
  const displayActivities = maxItems ? activities.slice(0, maxItems) : activities;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {displayActivities.length > 0 ? (
          <div className="space-y-4">
            {displayActivities.map((activity, index) => (
              <div
                key={activity.id}
                className={cn(
                  "flex gap-3 pb-4",
                  index !== displayActivities.length - 1 && "border-b"
                )}
              >
                {/* Icon */}
                <div className={cn(
                  "flex-shrink-0 p-2 rounded-full",
                  getStatusColor(activity.metadata?.status)
                )}>
                  {getActivityIcon(activity.type, activity.metadata?.status)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      
                      {/* User info */}
                      {showUserAvatars && activity.user && (
                        <div className="flex items-center gap-2 mt-2">
                          {activity.user.avatar ? (
                            <img
                              src={activity.user.avatar}
                              alt={activity.user.name}
                              className="h-5 w-5 rounded-full"
                            />
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-xs font-medium">
                                {activity.user.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {activity.user.name}
                          </span>
                        </div>
                      )}

                      {/* Link */}
                      {activity.metadata?.link && (
                        <Link
                          href={activity.metadata.link.href}
                          className="inline-flex items-center text-xs text-primary hover:underline mt-2"
                        >
                          {activity.metadata.link.label}
                          <svg className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      )}
                    </div>

                    {/* Timestamp */}
                    {showTimestamps && (
                      <div className="flex-shrink-0">
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(activity.timestamp)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="h-12 w-12 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        )}

        {maxItems && activities.length > maxItems && (
          <div className="pt-4 border-t">
            <Link
              href="/dashboard/activity"
              className="text-sm text-primary hover:underline"
            >
              View all activity ({activities.length - maxItems} more)
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Default activity feed with mock data
export function DefaultActivityFeed() {
  const mockActivities: ActivityItem[] = [
    {
      id: "1",
      type: "user",
      title: "New user registration",
      description: "Sarah Wilson created an account",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      user: {
        name: "Sarah Wilson",
        avatar: "__VG_USER_AVATAR_1__",
      },
      metadata: {
        status: "success",
        link: {
          href: "/dashboard/users/sarah-wilson",
          label: "View profile",
        },
      },
    },
    {
      id: "2", 
      type: "project",
      title: "Project deployment completed",
      description: "Website Redesign project has been successfully deployed",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      user: {
        name: "Deploy Bot",
      },
      metadata: {
        status: "success",
        link: {
          href: "/dashboard/projects/website-redesign",
          label: "View project",
        },
      },
    },
    {
      id: "3",
      type: "payment",
      title: "Payment received",
      description: "Monthly subscription payment processed successfully",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      metadata: {
        status: "success",
        link: {
          href: "/billing",
          label: "View billing",
        },
      },
    },
    {
      id: "4",
      type: "team",
      title: "Team member added",
      description: "John Smith was added to the Marketing team",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      user: {
        name: "Admin",
      },
      metadata: {
        status: "info",
        link: {
          href: "/dashboard/team",
          label: "View team",
        },
      },
    },
    {
      id: "5",
      type: "system",
      title: "System maintenance",
      description: "Scheduled maintenance completed successfully",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        status: "info",
      },
    },
    {
      id: "6",
      type: "project",
      title: "Build failed",
      description: "Mobile app build failed due to configuration error",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: {
        status: "error",
        link: {
          href: "/dashboard/projects/mobile-app",
          label: "View logs",
        },
      },
    },
  ];

  return (
    <ActivityFeed
      activities={mockActivities}
      title="Recent Activity"
      showTimestamps={true}
      showUserAvatars={true}
      maxItems={5}
    />
  );
}