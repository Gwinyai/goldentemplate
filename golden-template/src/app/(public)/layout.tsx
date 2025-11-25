import React from "react";
import { SiteHeader, SiteFooter } from "@/components/layout";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  // TODO: Get user from auth context when implemented
  const user = null; // This will be replaced with actual auth integration

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader user={user} />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}