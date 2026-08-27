// ============================================
// Ocean MGPS — IndexedDB Media Storage for Offline & Large Files
// Provides unlimited storage for uploaded video & image files
// ============================================

const DB_NAME = "OceanMediaDB";
const STORE_NAME = "media_blobs";
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;
const blobUrlCache = new Map<string, string>();

function getDB(): Promise<IDBDatabase> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("IndexedDB is only available in browser"));
  }
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: "id" });
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      } catch (e) {
        reject(e);
      }
    });
  }
  return dbPromise;
}

export async function storeBlobInIdb(id: string, blob: Blob): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put({ id, blob, type: blob.type, updatedAt: Date.now() });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("Failed to store blob in IndexedDB:", err);
  }
}

export async function getBlobFromIdb(id: string): Promise<Blob | null> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => {
        if (req.result && req.result.blob) {
          resolve(req.result.blob);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("Failed to get blob from IndexedDB:", err);
    return null;
  }
}

export async function deleteBlobFromIdb(id: string): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("Failed to delete blob from IndexedDB:", err);
  }
}

export function dataUrlToBlob(dataUrl: string): Blob | null {
  try {
    if (!dataUrl.startsWith("data:")) return null;
    const arr = dataUrl.split(",");
    if (arr.length < 2) return null;
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "video/mp4";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    console.error("Error converting Data URL to Blob:", e);
    return null;
  }
}

export async function resolveMediaBlobUrl(url: string): Promise<string> {
  if (!url) return "";

  // 1. Check in-memory cache
  if (blobUrlCache.has(url)) {
    return blobUrlCache.get(url)!;
  }

  // 2. Handle IndexedDB URLs (idb://media_12345)
  if (url.startsWith("idb://")) {
    const id = url.replace("idb://", "");
    const blob = await getBlobFromIdb(id);
    if (blob) {
      const blobUrl = URL.createObjectURL(blob);
      blobUrlCache.set(url, blobUrl);
      return blobUrl;
    }
    // Blob not found — data was lost, signal error
    return "";
  }

  // 3. Handle base64 Data URLs (data:video/mp4;base64,...)
  if (url.startsWith("data:video/") || url.startsWith("data:audio/")) {
    const blob = dataUrlToBlob(url);
    if (blob) {
      const blobUrl = URL.createObjectURL(blob);
      blobUrlCache.set(url, blobUrl);
      // Asynchronously persist to IDB for faster future lookups
      const tempId = `cached_${Math.random().toString(36).substring(2, 9)}`;
      storeBlobInIdb(tempId, blob).catch(() => {});
      return blobUrl;
    }
  }

  // 4. Stale blob: URLs from previous sessions or different origins are dead
  //    They cannot be resolved — the data is gone. Return empty to signal error.
  if (url.startsWith("blob:")) {
    // Only current-origin blob URLs created in this session are alive,
    // and those would already be working directly. If we reach here,
    // it means this is a persisted blob: URL from Firestore which is dead.
    return "";
  }

  return url;
}
