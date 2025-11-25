import { redirect } from "next/navigation";
import { requireUser, type User } from "./require-user";

export interface AdminUser extends User {
  isAdmin: true;
  adminRole?: "super" | "moderator";
  permissions?: string[];
}

export async function requireAdmin(): Promise<AdminUser> {
  // First ensure we have an authenticated user
  const user = await requireUser();

  try {
    // TODO: Check admin status from database
    // This could be:
    // 1. A field in the users table
    // 2. A separate admin_users table
    // 3. Role-based permissions system
    // 4. Custom claims in JWT token
    
    const isAdmin = await checkAdminStatus(user.id);
    
    if (!isAdmin) {
      // User is authenticated but not an admin
      redirect("/dashboard");
    }

    return {
      ...user,
      isAdmin: true,
      adminRole: "super", // TODO: Get actual role from database
      permissions: ["read", "write", "delete"], // TODO: Get actual permissions
    };
  } catch (error) {
    console.error("Error checking admin status:", error);
    
    // If admin checking is not configured, mock admin access in development
    if (process.env.NODE_ENV === "development") {
      console.warn("Admin role checking not configured. Granting mock admin access in development.");
      return {
        ...user,
        isAdmin: true,
        adminRole: "super",
        permissions: ["read", "write", "delete"],
      };
    }

    // In production, redirect to dashboard if admin checking fails
    redirect("/dashboard");
  }
}

async function checkAdminStatus(userId: string): Promise<boolean> {
  // TODO: Implement actual admin checking logic
  // Examples:
  
  // Option 1: Check Supabase database
  // const supabase = await createSupabaseServerClient();
  // const { data } = await supabase
  //   .from('users')
  //   .select('is_admin')
  //   .eq('id', userId)
  //   .single();
  // return data?.is_admin || false;

  // Option 2: Check custom claims in JWT
  // const session = await getSupabaseSession();
  // return session?.user?.app_metadata?.role === 'admin';

  // Option 3: Check separate admin table
  // const { data } = await supabase
  //   .from('admin_users')
  //   .select('*')
  //   .eq('user_id', userId)
  //   .single();
  // return !!data;

  // For now, return false (no admin access) unless in development
  if (process.env.NODE_ENV === "development") {
    // In development, treat all users as admins for easier testing
    return true;
  }

  return false;
}

export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    return await requireAdmin();
  } catch {
    // Don't redirect, just return null if not admin
    return null;
  }
}