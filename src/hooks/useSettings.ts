// ============================================
// useSettings Hook — Dynamic Live Site Settings
// ============================================

"use client";

import { useState, useEffect } from "react";
import { getDocument } from "@/lib/firestore";
import { SiteSettings } from "@/types";
import { DEFAULT_SETTINGS } from "@/lib/constants";

export function useSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    async function load() {
      try {
        const doc = await getDocument<SiteSettings & { id: string }>("settings", "main");
        if (doc && doc.companyName) {
          setSettings(doc);
        }
      } catch {
        /* fallback to DEFAULT_SETTINGS */
      }
    }
    load();

    const handleUpdate = (e?: Event) => {
      const customEvt = e as CustomEvent;
      if (!customEvt?.detail?.collectionName || customEvt.detail.collectionName === "settings") {
        load();
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
  }, []);

  return settings;
}
