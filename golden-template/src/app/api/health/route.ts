// Health Check API Route
// Basic health check endpoint for monitoring and deployment verification

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Basic health check - you can extend this to check database connections, etc.
    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "unknown",
      environment: process.env.NODE_ENV || "unknown",
      uptime: process.uptime(),
    };

    // Optional: Check database connectivity
    // try {
    //   const db = await getDatabaseClient();
    //   // Perform a simple query to verify database connection
    //   health.database = "connected";
    // } catch (error) {
    //   health.database = "disconnected";
    //   health.status = "degraded";
    // }

    // Optional: Check external service connectivity
    // const services = {
    //   supabase: checkSupabaseHealth(),
    //   stripe: checkStripeHealth(),
    //   resend: checkResendHealth(),
    // };

    return NextResponse.json(health, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Health check failed:", error);
    
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// HEAD method for simple uptime checks
export async function HEAD(request: NextRequest) {
  return new NextResponse(null, { status: 200 });
}