import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Object.values(firebaseConfig).every((value) => Boolean(value));

export const firebaseEnabled = hasFirebaseConfig;

export const app = hasFirebaseConfig && getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0] || null;
export const db = app ? getFirestore(app) : null;

function withTimeout(promise, timeoutMs = 5000) {
  return Promise.race([
    promise,
    new Promise((resolve) => window.setTimeout(() => resolve(null), timeoutMs)),
  ]);
}

export async function fetchProductsFromDb() {
  if (!db) return null;

  try {
    const snapshot = await withTimeout(getDocs(collection(db, "products")));
    if (!snapshot) return null;
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn("Firebase products fetch failed:", error);
    return null;
  }
}

export async function fetchOrdersFromDb() {
  if (!db) return null;

  try {
    const snapshot = await withTimeout(getDocs(collection(db, "orders")));
    if (!snapshot) return null;
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn("Firebase orders fetch failed:", error);
    return null;
  }
}

export async function saveOrderToDb(orderPayload) {
  if (!db) return null;

  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderPayload,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id };
  } catch (error) {
    console.warn("Firebase order save failed:", error);
    return null;
  }
}
