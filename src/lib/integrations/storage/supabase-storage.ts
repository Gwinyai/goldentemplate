// Supabase Storage Integration
// Provides file upload, download, and management capabilities using Supabase Storage

import { getSupabaseClient } from "../../db/supabase-client";

export interface SupabaseStorageConfig {
  bucket: string;
  publicUrl?: string;
}

export interface SupabaseUploadOptions {
  fileName: string;
  contentType?: string;
  cacheControl?: string;
  upsert?: boolean;
}

export interface SupabaseUploadResult {
  url: string;
  path: string;
  fullPath: string;
}

export async function uploadFileToSupabase(
  file: File | Buffer,
  bucket: string,
  options: SupabaseUploadOptions
): Promise<SupabaseUploadResult> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(options.fileName, file, {
        contentType: options.contentType,
        cacheControl: options.cacheControl || "3600",
        upsert: options.upsert || false,
      });

    if (error) {
      throw new Error(`Supabase Storage upload error: ${error.message}`);
    }

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      url: publicUrl.publicUrl,
      path: data.path,
      fullPath: data.fullPath,
    };
  } catch (error) {
    console.error("Supabase Storage upload error:", error);
    throw new Error(`Failed to upload file to Supabase Storage: ${error}`);
  }
}

export async function deleteFileFromSupabase(
  bucket: string,
  filePath: string
): Promise<void> {
  try {
    const supabase = getSupabaseClient();

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      throw new Error(`Supabase Storage delete error: ${error.message}`);
    }
  } catch (error) {
    console.error("Supabase Storage delete error:", error);
    throw new Error(`Failed to delete file from Supabase Storage: ${error}`);
  }
}

export async function getSignedUrlFromSupabase(
  bucket: string,
  filePath: string,
  expiresIn: number = 3600
): Promise<string> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      throw new Error(`Supabase Storage signed URL error: ${error.message}`);
    }

    return data.signedUrl;
  } catch (error) {
    console.error("Supabase Storage signed URL error:", error);
    throw new Error(`Failed to generate signed URL: ${error}`);
  }
}

export async function listFilesInSupabase(
  bucket: string,
  folder?: string,
  options?: {
    limit?: number;
    offset?: number;
    sortBy?: { column: string; order: "asc" | "desc" };
  }
): Promise<any[]> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit: options?.limit || 100,
        offset: options?.offset || 0,
        sortBy: options?.sortBy || { column: "name", order: "asc" },
      });

    if (error) {
      throw new Error(`Supabase Storage list error: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error("Supabase Storage list error:", error);
    throw new Error(`Failed to list files from Supabase Storage: ${error}`);
  }
}

export async function getPublicUrlFromSupabase(
  bucket: string,
  filePath: string
): Promise<string> {
  try {
    const supabase = getSupabaseClient();

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error("Supabase Storage public URL error:", error);
    throw new Error(`Failed to get public URL: ${error}`);
  }
}

export async function downloadFileFromSupabase(
  bucket: string,
  filePath: string
): Promise<Blob> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase.storage
      .from(bucket)
      .download(filePath);

    if (error) {
      throw new Error(`Supabase Storage download error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Supabase Storage download error:", error);
    throw new Error(`Failed to download file: ${error}`);
  }
}

export async function createBucketInSupabase(
  bucketName: string,
  options?: {
    public?: boolean;
    allowedMimeTypes?: string[];
    fileSizeLimit?: number;
  }
): Promise<void> {
  try {
    const supabase = getSupabaseClient();

    const { error } = await supabase.storage.createBucket(bucketName, {
      public: options?.public || false,
      allowedMimeTypes: options?.allowedMimeTypes,
      fileSizeLimit: options?.fileSizeLimit,
    });

    if (error) {
      throw new Error(`Supabase Storage create bucket error: ${error.message}`);
    }
  } catch (error) {
    console.error("Supabase Storage create bucket error:", error);
    throw new Error(`Failed to create bucket: ${error}`);
  }
}