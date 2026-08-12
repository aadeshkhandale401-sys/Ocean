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

      // Compress images before upload
      let processedFile = file;
      if (file.type.startsWith("image/")) {
        processedFile = await compressImage(file);
      }

      const url = await uploadFile(processedFile, folder, setProgress);

      // Save media metadata to Firestore
      await addDocument<Omit<MediaItem, "id" | "createdAt">>("media", {
        url,
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : "video",
        size: processedFile.size,
        folder,
      } as Omit<MediaItem, "id" | "createdAt">);

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
