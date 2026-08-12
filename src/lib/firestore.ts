// ============================================
// Firestore CRUD Helpers
// ============================================

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  WhereFilterOp,
  OrderByDirection,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { clearFirestoreCache } from "@/hooks/useFirestore";
import { db } from "./firebase";

// Helper for local storage persistence fallback
function getLocalCollection<T>(collectionName: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`ocean_local_${collectionName}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalCollection<T>(collectionName: string, items: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`ocean_local_${collectionName}`, JSON.stringify(items));
  } catch (err) {
    console.warn(`QuotaExceededError for ${collectionName}, pruning items:`, err);
    try {
      const pruned = items.slice(0, 20);
      localStorage.setItem(`ocean_local_${collectionName}`, JSON.stringify(pruned));
    } catch {
      // Ignore fallback storage error
    }
  }
}

// Get all documents from a collection with local fallback
export async function getDocuments<T>(
  collectionName: string
): Promise<T[]> {
  const localItems = getLocalCollection<T>(collectionName);
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    const remoteItems = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];

    // Merge remote items with local items (avoiding duplicates)
    const remoteIds = new Set(remoteItems.map((item: any) => item.id));
    const uniqueLocals = localItems.filter((item: any) => !remoteIds.has(item.id));
    const merged = [...remoteItems, ...uniqueLocals];
    saveLocalCollection(collectionName, merged);
    return merged;
  } catch (err) {
    console.warn(`Firestore getDocs failed for ${collectionName}, returning local items:`, err);
    return localItems;
  }
}

// Get a single document by ID
export async function getDocument<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
  } catch (err) {
    console.warn(`Firestore getDoc failed for ${collectionName}/${id}:`, err);
  }

  const localItems = getLocalCollection<T>(collectionName);
  const found = localItems.find((item: any) => item.id === id);
  return found || null;
}

function notifyDbUpdated(collectionName?: string) {
  clearFirestoreCache(collectionName);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ocean_db_updated", { detail: { collectionName } }));
  }
}

// Add a new document with local fallback
export async function addDocument<T extends object>(
  collectionName: string,
  data: T
): Promise<string> {
  notifyDbUpdated(collectionName);
  const generatedId = "loc_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
  const newItem = {
    id: generatedId,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Update local cache first for instant feedback
  const localItems = getLocalCollection<any>(collectionName);
  saveLocalCollection(collectionName, [newItem, ...localItems]);
  notifyDbUpdated(collectionName);

  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (err) {
    console.warn(`Firestore addDoc failed for ${collectionName}, persisted locally:`, err);
    return generatedId;
  }
}

// Update an existing document with local fallback
export async function updateDocument<T extends object>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  notifyDbUpdated(collectionName);
  const localItems = getLocalCollection<any>(collectionName);
  const updatedLocals = localItems.map((item) =>
    item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item
  );
  saveLocalCollection(collectionName, updatedLocals);
  notifyDbUpdated(collectionName);

  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn(`Firestore updateDoc failed for ${collectionName}/${id}, updated locally:`, err);
  }
}

// Delete a document with local fallback
export async function deleteDocument(
  collectionName: string,
  id: string
): Promise<void> {
  notifyDbUpdated(collectionName);
  const localItems = getLocalCollection<any>(collectionName);
  const filteredLocals = localItems.filter((item) => item.id !== id);
  saveLocalCollection(collectionName, filteredLocals);
  notifyDbUpdated(collectionName);

  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn(`Firestore deleteDoc failed for ${collectionName}/${id}, deleted locally:`, err);
  }
}

// Get documents with a filter
export async function getDocumentsByQuery<T>(
  collectionName: string,
  field: string,
  operator: WhereFilterOp,
  value: unknown
): Promise<T[]> {
  const q = query(
    collection(db, collectionName),
    where(field, operator, value)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

// Get documents ordered by a field
export async function getOrderedDocuments<T>(
  collectionName: string,
  orderField: string,
  direction: OrderByDirection = "asc",
  limitCount?: number
): Promise<T[]> {
  let q = query(
    collection(db, collectionName),
    orderBy(orderField, direction)
  );
  if (limitCount) {
    q = query(q, limit(limitCount));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

// Get featured documents
export async function getFeaturedDocuments<T>(
  collectionName: string,
  limitCount?: number
): Promise<T[]> {
  let q = query(
    collection(db, collectionName),
    where("featured", "==", true),
    where("status", "==", "published")
  );
  if (limitCount) {
    q = query(q, limit(limitCount));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

// Get published documents
export async function getPublishedDocuments<T>(
  collectionName: string,
  orderField: string = "createdAt",
  direction: OrderByDirection = "desc"
): Promise<T[]> {
  const q = query(
    collection(db, collectionName),
    where("status", "==", "published"),
    orderBy(orderField, direction)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}
