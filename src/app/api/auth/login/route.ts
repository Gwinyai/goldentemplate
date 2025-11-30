import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/auth/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    try {
      const supabase = await createSupabaseServerClient();
      
      // Attempt to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }

      if (!data.user) {
        return NextResponse.json(
          { error: "Login failed" },
          { status: 401 }
        );
      }

      // Check if user is admin
      // For now, we'll check the email or user metadata
      // In production, this should be stored in the database
      const isAdmin = 
        data.user.email?.endsWith("@admin.com") || 
        data.user.user_metadata?.role === "admin" ||
        data.user.app_metadata?.role === "admin";

      return NextResponse.json({
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email,
        },
        isAdmin,
      });

    } catch (supabaseError) {
      console.warn("Supabase not configured, using mock authentication");
      
      // Mock authentication for development when Supabase is not configured
      if (process.env.NODE_ENV === "development") {
        // For demo purposes, accept any valid email/password combo
        const isValidEmail = email.includes("@");
        const isValidPassword = password.length >= 6;
        
        if (isValidEmail && isValidPassword) {
          // Mock admin check - admin@example.com or any email with admin
          const isAdmin = email.includes("admin");
          
          return NextResponse.json({
            success: true,
            user: {
              id: "mock-user-id",
              email,
              name: email.split("@")[0],
            },
            isAdmin,
          });
        } else {
          return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 401 }
          );
        }
      }

      // In production without Supabase, return error
      return NextResponse.json(
        { error: "Authentication service not configured" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}