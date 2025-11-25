import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export type Database = {
  // TODO: Add your Supabase database types here
  // This will be generated from your Supabase schema
};

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  // Check if Supabase credentials are available
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file."
    );
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          // The `remove` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}

export async function getSupabaseSession() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Error getting session:", error);
      return null;
    }

    return session;
  } catch (error) {
    // Supabase not configured, return null
    console.warn("Supabase not configured:", error);
    return null;
  }
}

export async function getSupabaseUser() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error getting user:", error);
      return null;
    }

    return user;
  } catch (error) {
    // Supabase not configured, return null
    console.warn("Supabase not configured:", error);
    return null;
  }
}