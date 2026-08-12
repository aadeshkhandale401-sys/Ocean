// ============================================
// Database Seeder for Ocean MGPS
// Automatically populates Firestore & LocalStorage with initial data
// ============================================

import { getDocuments, addDocument } from "./firestore";
import { INITIAL_PRODUCTS, INITIAL_PROJECTS, INITIAL_SERVICES } from "./seedData";
import { DEFAULT_SETTINGS } from "./constants";

export async function seedDatabase(force = false): Promise<{ products: number; projects: number; services: number }> {
  let seededProductsCount = 0;
  let seededProjectsCount = 0;
  let seededServicesCount = 0;

  try {
    // 1. Check & Seed Products
    const existingProducts = await getDocuments("products");
    if (force || existingProducts.length === 0) {
      for (const item of INITIAL_PRODUCTS) {
        await addDocument("products", item);
        seededProductsCount++;
      }
    }

    // 2. Check & Seed Projects
    const existingProjects = await getDocuments("projects");
    if (force || existingProjects.length === 0) {
      for (const item of INITIAL_PROJECTS) {
        await addDocument("projects", item);
        seededProjectsCount++;
      }
    }

    // 3. Check & Seed Services
    const existingServices = await getDocuments("services");
    if (force || existingServices.length === 0) {
      for (const item of INITIAL_SERVICES) {
        await addDocument("services", item);
        seededServicesCount++;
      }
    }

    // 4. Check & Seed Settings
    const existingSettings = await getDocuments("settings");
    if (force || existingSettings.length === 0) {
      const { doc, setDoc } = await import("firebase/firestore");
      const { db } = await import("./firebase");
      await setDoc(doc(db, "settings", "main"), {
        ...DEFAULT_SETTINGS,
        updatedAt: new Date(),
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("ocean_local_settings", JSON.stringify([{ id: "main", ...DEFAULT_SETTINGS }]));
      }
    }
  } catch (err) {
    console.warn("Database seeding notice (using local sync):", err);
  }

  return {
    products: seededProductsCount,
    projects: seededProjectsCount,
    services: seededServicesCount,
  };
}
