// ============================================
// Client-Side Storage & Upload Helpers
// Prioritizes Cloudinary (for live CDN URLs) with IndexedDB fallback
// ============================================

import { storeBlobInIdb, deleteBlobFromIdb } from "./indexedDbMedia";
import { uploadToCloudinary, isCloudinaryConfigured } from "./cloudinary";

// Upload a single file with client-side progress tracking & Cloudinary / IndexedDB storage
export async function uploadFile(
  file: File,
  _path: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  // 1. Try Cloudinary first if configured (Production CDN - permanent HTTPS URLs)
  if (isCloudinaryConfigured()) {
    try {
      const cloudinaryUrl = await uploadToCloudinary(file, onProgress);
      return cloudinaryUrl;
    } catch (cloudinaryErr) {
      console.warn("Cloudinary upload failed, falling back to IndexedDB:", cloudinaryErr);
    }
  }

  // 2. Local fallback: Store in IndexedDB for development
  if (onProgress) onProgress(30);
  const fileId = `media_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  if (typeof window !== "undefined" && window.indexedDB) {
    try {
      if (file.type.startsWith("image/")) {
        const compressed = await compressImage(file, 1200, 0.8).catch(() => file);
        await storeBlobInIdb(fileId, compressed);
      } else {
        await storeBlobInIdb(fileId, file);
      }
      if (onProgress) onProgress(100);
      return `idb://${fileId}`;
    } catch (err) {
      console.warn("IndexedDB upload fallback:", err);
    }
  }

  // Fallback to FileReader if IndexedDB is not available
  return new Promise<string>((resolve) => {
    if (file.type.startsWith("image/")) {
      compressImage(file, 800, 0.7)
        .then((compressed) => {
          if (onProgress) onProgress(70);
          const reader = new FileReader();
          reader.onload = () => {
            if (onProgress) onProgress(100);
            resolve((reader.result as string) || URL.createObjectURL(file));
          };
          reader.onerror = () => {
            if (onProgress) onProgress(100);
            resolve(URL.createObjectURL(file));
          };
          reader.readAsDataURL(compressed);
        })
        .catch(() => {
          if (onProgress) onProgress(70);
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
    } else {
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
    }
  });
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

// Delete a file by URL (cleans up from IndexedDB if applicable)
export async function deleteFile(url: string): Promise<void> {
  if (url && url.startsWith("idb://")) {
    const id = url.replace("idb://", "");
    await deleteBlobFromIdb(id);
  }
  return Promise.resolve();
}

// Delete multiple files
export async function deleteMultipleFiles(urls: string[]): Promise<void> {
  const promises = urls.map((url) => deleteFile(url));
  await Promise.all(promises);
}

// Compress image client-side before storing
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
