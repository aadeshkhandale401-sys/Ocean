// ============================================
// Media Storage & Upload Helpers
// - Videos -> Cloudinary CDN (Free 25GB, permanent stream URLs)
// - Images -> Client-Side Compressed WebP Base64 (Instant, zero cloud limits)
// ============================================

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTask,
} from "firebase/storage";
import { storage } from "./firebase";
import { storeBlobInIdb, deleteBlobFromIdb } from "./indexedDbMedia";
import { uploadToCloudinary, isCloudinaryConfigured } from "./cloudinary";

// Upload a single file with progress tracking
export async function uploadFile(
  file: File,
  path: string = "general",
  onProgress?: (progress: number) => void
): Promise<string> {
  const isVideo =
    file.type.startsWith("video/") ||
    /\.(mp4|webm|ogg|mov|m4v|avi|mkv)$/i.test(file.name);

  // ----------------------------------------------------
  // 1. VIDEOS -> Use Cloudinary CDN
  // ----------------------------------------------------
  if (isVideo) {
    if (isCloudinaryConfigured()) {
      try {
        const cloudinaryUrl = await uploadToCloudinary(file, onProgress);
        if (cloudinaryUrl) {
          return cloudinaryUrl;
        }
      } catch (cloudinaryErr) {
        console.warn("Cloudinary video upload error, using local fallback:", cloudinaryErr);
      }
    }

    // Local IndexedDB fallback for videos in development
    if (onProgress) onProgress(30);
    const fileId = `media_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    if (typeof window !== "undefined" && window.indexedDB) {
      try {
        await storeBlobInIdb(fileId, file);
        if (onProgress) onProgress(100);
        return `idb://${fileId}`;
      } catch (err) {
        console.warn("IndexedDB video fallback:", err);
      }
    }

    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (onProgress) onProgress(100);
        resolve((reader.result as string) || URL.createObjectURL(file));
      };
      reader.onerror = () => {
        if (onProgress) onProgress(100);
        resolve(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    });
  }

  // ----------------------------------------------------
  // 2. IMAGES -> Client-side Compressed WebP Base64 (Instant & Works Everywhere)
  // ----------------------------------------------------
  if (onProgress) onProgress(50);
  try {
    const compressed = await compressImage(file, 800, 0.7).catch(() => file);
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (onProgress) onProgress(100);
        resolve(reader.result as string);
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(compressed);
    });
  } catch (err) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (onProgress) onProgress(100);
        resolve(reader.result as string);
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }
}

// Upload multiple files
export async function uploadMultipleFiles(
  files: File[],
  path: string,
  onProgress?: (fileIndex: number, progress: number) => void
): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const url = await uploadFile(files[i], path, (progress) => {
      if (onProgress) onProgress(i, progress);
    });
    urls.push(url);
  }
  return urls;
}

// Delete a file by URL
export async function deleteFile(url: string): Promise<void> {
  if (!url || url.startsWith("data:") || url.startsWith("blob:") || url.startsWith("/")) {
    return;
  }
  if (url.startsWith("idb://")) {
    const id = url.replace("idb://", "");
    await deleteBlobFromIdb(id);
    return;
  }
  if (url.includes("firebasestorage.googleapis.com")) {
    try {
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
    } catch (error) {
      console.warn("Firebase storage delete notice:", error);
    }
  }
}

// Delete multiple files
export async function deleteMultipleFiles(urls: string[]): Promise<void> {
  const promises = urls.map((url) => deleteFile(url));
  await Promise.all(promises);
}

// Compress image client-side before storing/uploading
export function compressImage(
  file: File,
  maxWidth: number = 1200,
  quality: number = 0.75
): Promise<File> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => {
      resolve(file);
    };

    img.src = URL.createObjectURL(file);
  });
}

