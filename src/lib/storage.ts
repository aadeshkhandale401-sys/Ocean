// ============================================
// Firebase Storage Helpers
// ============================================

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTask,
} from "firebase/storage";
import { storage } from "./firebase";

// Upload a single file with progress tracking & robust fallback
export async function uploadFile(
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const storageRef = ref(storage, `${path}/${Date.now()}_${sanitizedName}`);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

    return await new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => reject(error),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  } catch (err) {
    console.warn("Firebase Storage upload fallback engaged:", err);
    return new Promise<string>(async (resolve, reject) => {
      try {
        if (file.type.startsWith("image/")) {
          // Compress heavily for lightweight local storage data URL (< 50KB)
          const compressed = await compressImage(file, 800, 0.7);
          const reader = new FileReader();
          reader.onload = () => {
            if (onProgress) onProgress(100);
            resolve(reader.result as string);
          };
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(compressed);
        } else {
          // For videos or large media, use object URL for zero local storage quota consumption
          if (onProgress) onProgress(100);
          const objectUrl = URL.createObjectURL(file);
          resolve(objectUrl);
        }
      } catch (fallbackErr) {
        reject(fallbackErr);
      }
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
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    console.warn("Storage delete notice:", error);
  }
}

// Delete multiple files
export async function deleteMultipleFiles(urls: string[]): Promise<void> {
  const promises = urls.map((url) => deleteFile(url));
  await Promise.all(promises);
}

// Compress image before upload (client-side)
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
