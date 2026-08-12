// ============================================
// useFirestore Hook — Collection Data Fetching
// ============================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { getDocuments, getPublishedDocuments, getFeaturedDocuments } from "@/lib/firestore";

interface FirestoreState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// In-memory cache for instant loads
const firestoreCache: Record<string, any[]> = {};

export function clearFirestoreCache(collectionName?: string) {
  if (collectionName) {
    Object.keys(firestoreCache).forEach((key) => {
      if (key.startsWith(collectionName)) {
        delete firestoreCache[key];
      }
    });
  } else {
    Object.keys(firestoreCache).forEach((key) => delete firestoreCache[key]);
  }
}

export function useFirestore<T>(
  collectionName: string,
  mode: "all" | "published" | "featured" = "all"
): FirestoreState<T> {
  const cacheKey = `${collectionName}_${mode}`;
  const [data, setData] = useState<T[]>(() => firestoreCache[cacheKey] || []);
  const [loading, setLoading] = useState(() => !firestoreCache[cacheKey]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      if (!firestoreCache[cacheKey]) {
        setLoading(true);
      }
      setError(null);
      let result: T[];

      switch (mode) {
        case "published":
          result = await getPublishedDocuments<T>(collectionName);
          break;
        case "featured":
          result = await getFeaturedDocuments<T>(collectionName);
          break;
        default:
          result = await getDocuments<T>(collectionName);
      }

      // Auto-seed if empty
      if (result.length === 0) {
        const { seedDatabase } = await import("@/lib/seed");
        await seedDatabase();
        result = await getDocuments<T>(collectionName);
      }

      firestoreCache[cacheKey] = result;
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [collectionName, mode, cacheKey]);

  useEffect(() => {
    fetchData();

    const handleUpdate = (e?: Event) => {
      const customEvt = e as CustomEvent;
      if (!customEvt?.detail?.collectionName || customEvt.detail.collectionName === collectionName) {
        clearFirestoreCache(collectionName);
        fetchData();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("ocean_db_updated", handleUpdate);
      window.addEventListener("storage", handleUpdate);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("ocean_db_updated", handleUpdate);
        window.removeEventListener("storage", handleUpdate);
      }
    };
  }, [collectionName, fetchData]);

  return { data, loading, error, refetch: fetchData };
}
