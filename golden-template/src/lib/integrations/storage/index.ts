// Centralized Storage Abstraction Layer
// Allows the golden template to work with multiple storage providers

import { uploadFile as uploadToS3, deleteFile as deleteFromS3, getSignedUrl as getS3SignedUrl } from "./aws-s3";
import { uploadFileToGCS, deleteFileFromGCS, getSignedUrlFromGCS } from "./gcs";
import { uploadFileToSupabase, deleteFileFromSupabase, getSignedUrlFromSupabase } from "./supabase-storage";

export type StorageProvider = "aws-s3" | "gcs" | "supabase";

export interface StorageConfig {
  provider: StorageProvider;
  bucket: string;
  publicUrl?: string;
}

export interface StorageUploadOptions {
  fileName: string;
  contentType?: string;
  isPublic?: boolean;
  metadata?: Record<string, string>;
}

export interface StorageUploadResult {
  url: string;
  key: string;
  provider: StorageProvider;
}

// Default to Supabase Storage as it's most integrated with the auth system
const DEFAULT_STORAGE_PROVIDER: StorageProvider = "supabase";

export function getStorageProvider(): StorageProvider {
  const provider = process.env.NEXT_PUBLIC_STORAGE_PROVIDER as StorageProvider;
  return provider || DEFAULT_STORAGE_PROVIDER;
}

export function getStorageBucket(): string {
  const provider = getStorageProvider();
  
  switch (provider) {
    case "aws-s3":
      return process.env.AWS_S3_BUCKET_NAME || "default-bucket";
    case "gcs":
      return process.env.GOOGLE_CLOUD_STORAGE_BUCKET || "default-bucket";
    case "supabase":
      return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "uploads";
    default:
      return "default-bucket";
  }
}

export async function uploadFile(
  file: File | Buffer,
  options: StorageUploadOptions
): Promise<StorageUploadResult> {
  const provider = getStorageProvider();
  const bucket = getStorageBucket();

  try {
    switch (provider) {
      case "aws-s3":
        const s3Result = await uploadToS3(file, {
          key: options.fileName,
          contentType: options.contentType,
          metadata: options.metadata,
          isPublic: options.isPublic,
        });
        return {
          url: s3Result.url,
          key: s3Result.key,
          provider: "aws-s3",
        };

      case "gcs":
        const gcsResult = await uploadFileToGCS(file, {
          fileName: options.fileName,
          contentType: options.contentType,
          metadata: options.metadata,
          isPublic: options.isPublic,
        });
        return {
          url: gcsResult.url,
          key: gcsResult.fileName,
          provider: "gcs",
        };

      case "supabase":
        const supabaseResult = await uploadFileToSupabase(file, bucket, {
          fileName: options.fileName,
          contentType: options.contentType,
        });
        return {
          url: supabaseResult.url,
          key: supabaseResult.path,
          provider: "supabase",
        };

      default:
        throw new Error(`Unsupported storage provider: ${provider}`);
    }
  } catch (error) {
    console.error(`Storage upload error (${provider}):`, error);
    
    // In development, return a mock result if storage is not configured
    if (process.env.NODE_ENV === "development") {
      console.warn("Storage not configured. Using mock upload result for development.");
      return {
        url: `https://mock-storage.example.com/${options.fileName}`,
        key: options.fileName,
        provider,
      };
    }
    
    throw error;
  }
}

export async function deleteFile(fileName: string): Promise<void> {
  const provider = getStorageProvider();

  try {
    switch (provider) {
      case "aws-s3":
        await deleteFromS3(fileName);
        break;

      case "gcs":
        await deleteFileFromGCS(fileName);
        break;

      case "supabase":
        const bucket = getStorageBucket();
        await deleteFileFromSupabase(bucket, fileName);
        break;

      default:
        throw new Error(`Unsupported storage provider: ${provider}`);
    }
  } catch (error) {
    console.error(`Storage delete error (${provider}):`, error);
    
    if (process.env.NODE_ENV === "development") {
      console.warn("Storage not configured. Mock delete operation for development.");
      return;
    }
    
    throw error;
  }
}

export async function getSignedUrl(fileName: string, expiresIn: number = 3600): Promise<string> {
  const provider = getStorageProvider();

  try {
    switch (provider) {
      case "aws-s3":
        return await getS3SignedUrl(fileName, expiresIn);

      case "gcs":
        return await getSignedUrlFromGCS(fileName, expiresIn);

      case "supabase":
        const bucket = getStorageBucket();
        return await getSignedUrlFromSupabase(bucket, fileName, expiresIn);

      default:
        throw new Error(`Unsupported storage provider: ${provider}`);
    }
  } catch (error) {
    console.error(`Storage signed URL error (${provider}):`, error);
    
    if (process.env.NODE_ENV === "development") {
      console.warn("Storage not configured. Using mock signed URL for development.");
      return `https://mock-storage.example.com/${fileName}?signature=mock`;
    }
    
    throw error;
  }
}

// Utility function to generate unique file names
export function generateFileName(originalName: string, prefix?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const extension = originalName.split(".").pop();
  const baseName = originalName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "-");
  
  const fileName = `${baseName}-${timestamp}-${random}.${extension}`;
  
  return prefix ? `${prefix}/${fileName}` : fileName;
}

// Utility function to validate file types
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

// Utility function to validate file size
export function validateFileSize(file: File, maxSizeBytes: number): boolean {
  return file.size <= maxSizeBytes;
}

// Re-export provider-specific functions for direct usage when needed
export * from "./aws-s3";
export * from "./gcs";
export * from "./supabase-storage";