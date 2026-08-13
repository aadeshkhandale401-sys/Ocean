// ============================================
// useMediaUpload Hook — File Upload with Progress
// ============================================

"use client";

import { useState } from "react";
import { uploadFile, compressImage } from "@/lib/storage";
import { addDocument } from "@/lib/firestore";
import { MediaItem } from "@/types";

interface UploadState {
  upload: (file: File, folder: string) => Promise<string>;
  uploadMultiple: (files: File[], folder: string) => Promise<string[]>;
  progress: number;
  uploading: boolean;
  error: string | null;
}

export function useMediaUpload(): UploadState {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File, folder: string): Promise<string> => {
    try {
      setUploading(true);
      setError(null);
      setProgress(0);

      // Safe image compression
      let processedFile = file;
      if (file.type.startsWith("image/")) {
        try {
          processedFile = await compressImage(file);
        } catch {
          processedFile = file;
        }
      }

      const url = await uploadFile(processedFile, folder, setProgress);

      // Save media metadata
      try {
        await addDocument<Omit<MediaItem, "id" | "createdAt">>("media", {
          url: url || "",
          name: file.name || "Uploaded Media",
          type: file.type.startsWith("image/") ? "image" : "video",
          size: processedFile.size || file.size || 0,
          folder: folder || "general",
        } as Omit<MediaItem, "id" | "createdAt">);
      } catch (docErr) {
        console.warn("Failed to record media document:", docErr);
      }

      return url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      throw new Error(message);
    } finally {
      setUploading(false);
    }
  };

  const uploadMultiple = async (files: File[], folder: string): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const url = await upload(file, folder);
      urls.push(url);
    }
    return urls;
  };

  return { upload, uploadMultiple, progress, uploading, error };
}
