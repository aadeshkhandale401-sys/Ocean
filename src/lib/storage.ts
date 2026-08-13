// ============================================
// Client-Side Storage & Upload Helpers
// (Pure client-side processing — No Firebase Storage required)
// ============================================

// Upload a single file with client-side progress tracking & local base64/blob conversion
export async function uploadFile(
  file: File,
  _path: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  if (onProgress) onProgress(30);

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
      if (onProgress) onProgress(100);
      try {
        resolve(URL.createObjectURL(file));
      } catch {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string) || "");
        reader.onerror = () => resolve("");
        reader.readAsDataURL(file);
      }
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

// Delete a file by URL (No-op for client-side blob/data URLs)
export async function deleteFile(_url: string): Promise<void> {
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
