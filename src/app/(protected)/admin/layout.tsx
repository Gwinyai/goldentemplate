import { requireAdmin } from "@/lib/auth/require-admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will redirect to dashboard if user is not an admin
  await requireAdmin();

  return <>{children}</>;
}