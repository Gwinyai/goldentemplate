export type AuthDbPreset = "supabase" | "firebase" | "none";
export type PaymentsProvider = "stripe" | "lemonsqueezy" | "none";
export type StorageProvider = "aws_s3" | "gcs" | "supabase" | "none";
export type EmailProvider = "resend" | "mailgun" | "none";
export type AnalyticsProvider = "ga" | "pulser" | "none";

export const integrations = {
  authDbPreset: "__VG_AUTHDB_PRESET__" as AuthDbPreset,
  payments: "__VG_PAYMENTS_PROVIDER__" as PaymentsProvider,
  storage: "__VG_STORAGE_PROVIDER__" as StorageProvider,
  email: "__VG_EMAIL_PROVIDER__" as EmailProvider,
  analytics: "__VG_ANALYTICS_PROVIDER__" as AnalyticsProvider,
};
