import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSupabaseUser } from "./supabase-server";

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
  // Add other user fields as needed
}

export async function requireUser(): Promise<User> {
  try {
    // Try Supabase first (default provider)
    const supabaseUser = await getSupabaseUser();
    
    if (supabaseUser) {
      // Convert Supabase user to our User interface
      return {
        id: supabaseUser.id,
        email: supabaseUser.email || null,
        name: supabaseUser.user_metadata?.name || supabaseUser.email || null,
        avatar_url: supabaseUser.user_metadata?.avatar_url || null,
        created_at: supabaseUser.created_at,
        updated_at: supabaseUser.updated_at,
      };
    }

    // TODO: Add Firebase fallback when needed
    // const firebaseUser = await getFirebaseUserFromCookie();
    // if (firebaseUser) { ... }

    // No authenticated user found - redirect to login with current URL as redirect parameter
    try {
      const headersList = await headers();
      const fullUrl = headersList.get("x-pathname") || headersList.get("referer") || "";
      const currentPath = fullUrl.includes("://") ? new URL(fullUrl).pathname : fullUrl || "/app";
      const loginUrl = `/login?redirect=${encodeURIComponent(currentPath)}`;
      redirect(loginUrl);
    } catch {
      // Fallback if headers are not available
      redirect("/login");
    }
  } catch (error) {
    console.error("Error in requireUser:", error);
    
    // If auth providers are not configured, return a mock user for development
    if (process.env.NODE_ENV === "development") {
      console.warn("Auth providers not configured. Using mock user for development.");
      return {
        id: "mock-user-id",
        email: "developer@example.com",
        name: "Mock Developer User",
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    // In production, redirect to login if auth is not configured
    redirect("/login");
  }
}

export async function getUser(): Promise<User | null> {
  try {
    return await requireUser();
  } catch {
    // Don't redirect, just return null if no user
    return null;
  }
}