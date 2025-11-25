// Auth-related type definitions for the golden template

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AdminUser extends User {
  isAdmin: true;
  adminRole?: "super" | "moderator";
  permissions?: string[];
}

export interface Session {
  user: User;
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}

export interface AuthError {
  message: string;
  status?: number;
  code?: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  name?: string;
}

export interface ResetPasswordCredentials {
  email: string;
}

export interface UpdatePasswordCredentials {
  password: string;
  confirmPassword?: string;
}

// Provider-specific types
export interface SupabaseAuthUser {
  id: string;
  aud: string;
  role?: string;
  email?: string;
  email_confirmed_at?: string;
  phone?: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
  identities?: any[];
  created_at: string;
  updated_at: string;
}

export interface FirebaseAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  customClaims?: Record<string, any>;
}

// Auth provider configuration
export interface AuthConfig {
  provider: "supabase" | "firebase";
  redirectTo?: string;
  emailRedirectTo?: string;
}