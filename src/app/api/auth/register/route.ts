import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/auth/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    try {
      const supabase = await createSupabaseServerClient();
      
      // Attempt to sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          return NextResponse.json(
            { error: "An account with this email already exists" },
            { status: 409 }
          );
        }
        return NextResponse.json(
          { error: error.message || "Registration failed" },
          { status: 400 }
        );
      }

      if (!data.user) {
        return NextResponse.json(
          { error: "Registration failed" },
          { status: 400 }
        );
      }

      // Check if email confirmation is required
      const needsConfirmation = !data.session;

      return NextResponse.json({
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          name,
        },
        needsConfirmation,
      });

    } catch (supabaseError) {
      console.warn("Supabase not configured, using mock registration");
      
      // Mock registration for development when Supabase is not configured
      if (process.env.NODE_ENV === "development") {
        // For demo purposes, accept any valid registration
        const isValidEmail = email.includes("@");
        const isValidPassword = password.length >= 8;
        const isValidName = name.trim().length > 0;
        
        if (isValidEmail && isValidPassword && isValidName) {
          return NextResponse.json({
            success: true,
            user: {
              id: "mock-user-id",
              email,
              name,
            },
            needsConfirmation: false,
          });
        } else {
          return NextResponse.json(
            { error: "Invalid registration data" },
            { status: 400 }
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
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}