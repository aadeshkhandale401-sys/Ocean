// ============================================
// Cloudinary Client Upload Helper
// Uploads images & videos directly to Cloudinary CDN
// Returns permanent, high-speed HTTPS URLs
// ============================================

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
  duration?: number;
  width?: number;
  height?: number;
}

export async function uploadToCloudinary(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // 1. Try Direct Unsigned Client-Side Upload (Recommended & Fastest)
  if (cloudName && uploadPreset) {
    const resourceType = file.type.startsWith("video/") ? "video" : "image";
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "ocean_mgps");

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", endpoint);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data: CloudinaryUploadResult = JSON.parse(xhr.responseText);
            resolve(data.secure_url);
          } catch (e) {
            reject(new Error("Failed to parse Cloudinary response"));
          }
        } else {
          console.error("Cloudinary upload failed:", xhr.responseText);
          reject(new Error(`Cloudinary upload failed: ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => reject(new Error("Network error during Cloudinary upload"));
      xhr.send(formData);
    });
  }

  // 2. Try Server-Side Next.js API Route (/api/upload)
  try {
    const formData = new FormData();
    formData.append("file", file);

    if (onProgress) onProgress(30);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      if (data.url) {
        if (onProgress) onProgress(100);
        return data.url;
      }
    }
  } catch (err) {
    console.warn("Server-side upload route not available or failed:", err);
  }

  throw new Error("Cloudinary credentials not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.");
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    (typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) ||
      process.env.CLOUDINARY_CLOUD_NAME
  );
}
