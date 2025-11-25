// Centralized database abstraction layer for the golden template
// This allows the generator to switch between different database providers

import { getSupabaseClient } from "./supabase-client";
import { getFirebaseClient } from "./firebase-client";

export type DatabaseProvider = "supabase" | "firebase";

export interface DatabaseConfig {
  provider: DatabaseProvider;
}

// Default to Supabase as the primary provider
const DEFAULT_PROVIDER: DatabaseProvider = "supabase";

export function getDatabaseProvider(): DatabaseProvider {
  const provider = process.env.NEXT_PUBLIC_DATABASE_PROVIDER as DatabaseProvider;
  return provider || DEFAULT_PROVIDER;
}

export function getDatabaseClient() {
  const provider = getDatabaseProvider();
  
  switch (provider) {
    case "supabase":
      return getSupabaseClient();
    case "firebase":
      return getFirebaseClient();
    default:
      throw new Error(`Unsupported database provider: ${provider}`);
  }
}

// Common database operations that work across providers
export interface DatabaseOperation<T = any> {
  data: T | null;
  error: Error | null;
  count?: number;
}

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
}

// Generic CRUD operations interface
export interface DatabaseTable<T = any> {
  // Create
  create(data: Partial<T>): Promise<DatabaseOperation<T>>;
  
  // Read
  findById(id: string): Promise<DatabaseOperation<T>>;
  findMany(options?: QueryOptions): Promise<DatabaseOperation<T[]>>;
  findByField(field: string, value: any): Promise<DatabaseOperation<T[]>>;
  
  // Update  
  updateById(id: string, data: Partial<T>): Promise<DatabaseOperation<T>>;
  
  // Delete
  deleteById(id: string): Promise<DatabaseOperation<null>>;
}

// Re-export client-specific utilities for direct usage when needed
export * from "./supabase-client";
export * from "./firebase-client";