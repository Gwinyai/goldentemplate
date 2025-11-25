import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { cn } from "@/lib/utils";

interface StatCard {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  color?: "default" | "primary" | "success" | "warning" | "danger";
}

interface StatsCardsProps {
  cards: StatCard[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const colorClasses = {
  default: "text-foreground",
  primary: "text-primary",
  success: "text-green-600",
  warning: "text-yellow-600", 
  danger: "text-red-600",
};

const iconBgClasses = {
  default: "bg-muted",
  primary: "bg-primary/10",
  success: "bg-green-100 dark:bg-green-900/20",
  warning: "bg-yellow-100 dark:bg-yellow-900/20",
  danger: "bg-red-100 dark:bg-red-900/20",
};

const columnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export function StatsCards({ cards, columns = 4, className }: StatsCardsProps) {
  return (
    <div className={cn(`grid gap-6 ${columnClasses[columns]}`, className)}>
      {cards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={cn("p-2 rounded-lg", iconBgClasses[card.color || "default"])}>
              <div className={cn("h-4 w-4", colorClasses[card.color || "default"])}>
                {card.icon}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className={cn("text-2xl font-bold", colorClasses[card.color || "default"])}>
              {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
            </div>
            
            {card.trend && (
              <div className="flex items-center gap-1 mt-2">
                <div className={cn(
                  "flex items-center text-xs font-medium",
                  card.trend.isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {card.trend.isPositive ? (
                    <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 14l9-9 3 3L7 20l-4-4z" />
                    </svg>
                  ) : (
                    <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l-9-9-3 3L17 20l4-4z" />
                    </svg>
                  )}
                  {card.trend.value > 0 ? '+' : ''}{card.trend.value}%
                </div>
                <span className="text-xs text-muted-foreground">
                  {card.trend.label}
                </span>
              </div>
            )}
            
            {card.description && (
              <p className="text-xs text-muted-foreground mt-2">
                {card.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Default stats cards with mock data
export function DefaultStatsCards() {
  const mockStats: StatCard[] = [
    {
      title: "Total Users",
      value: 2847,
      description: "Active users this month",
      color: "primary",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      trend: {
        value: 12.5,
        isPositive: true,
        label: "from last month"
      }
    },
    {
      title: "Revenue",
      value: "$24,569",
      description: "Monthly recurring revenue",
      color: "success",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      trend: {
        value: 8.2,
        isPositive: true,
        label: "from last month"
      }
    },
    {
      title: "Projects", 
      value: 143,
      description: "Active projects",
      color: "default",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      trend: {
        value: 3.1,
        isPositive: true,
        label: "from last week"
      }
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      description: "Visitor to customer conversion",
      color: "warning", 
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      trend: {
        value: -1.2,
        isPositive: false,
        label: "from last month"
      }
    }
  ];

  return <StatsCards cards={mockStats} columns={4} />;
}

// Minimal stats cards for smaller sections
export function MiniStatsCards() {
  const miniStats: StatCard[] = [
    {
      title: "Active Users",
      value: "1,234",
      color: "primary",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: "Revenue",
      value: "$12.5K",
      color: "success",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
    },
    {
      title: "Growth",
      value: "+12.5%",
      color: "success",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  return <StatsCards cards={miniStats} columns={3} />;
}