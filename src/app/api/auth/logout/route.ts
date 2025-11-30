import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/auth/supabase-server";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  try {
    try {
      const supabase = await createSupabaseServerClient();
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Supabase logout error:", error);
        return NextResponse.json(
          { error: "Logout failed" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });

    } catch (supabaseError) {
      // Supabase not configured, just return success for mock auth
      console.warn("Supabase not configured, mock logout successful");
      return NextResponse.json({ success: true });
    }

  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Allow GET requests for logout as well (for direct navigation)
  const response = await POST(request);
  
  if (response.ok) {
    // Redirect to home page after logout
    return redirect("/");
  }
  
  return response;
}