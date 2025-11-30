import { requireUser } from "@/lib/auth/require-user";
import { getAdminUser } from "@/lib/auth/require-admin";
import { SiteHeader } from "@/components/layout/site-header";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will redirect to login if no user is authenticated
  const user = await requireUser();
  
  // Check if user is admin (non-blocking)
  const adminUser = await getAdminUser();
  
  // Transform user data for header component
  const userForHeader = {
    id: user.id,
    email: user.email || "",
    name: user.name || undefined,
    avatar: user.avatar_url || undefined,
    role: adminUser?.isAdmin ? "admin" : "user",
  };

  return (
    <>
      <SiteHeader user={userForHeader} />
      <main className="flex-1">
        {children}
      </main>
    </>
  );
}