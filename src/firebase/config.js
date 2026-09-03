import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || "";
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || "";

const firebaseConfig = {
  apiKey: apiKey || "dummy-api-key-to-prevent-crash",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "judicialgpt.firebaseapp.com",
  projectId: projectId || "judicialgpt",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "judicialgpt.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "730455090304",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:730455090304:web:fef9608afe7c40d7e2b265",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-M2N60TERME"
};

// Check if valid credentials are provided
export const isFirebaseConfigured = Boolean(
  apiKey && apiKey.length > 5 && projectId && projectId !== "dummy"
);

let app;
let auth;
let db;
let storage;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.error("[JudicialGPT Firebase] Safe Init caught error:", error);
}

export { app, auth, db, storage };
export default app;