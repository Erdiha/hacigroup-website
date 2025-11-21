import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Check if we're in a browser environment and have valid Firebase config
const isBrowser = typeof window !== "undefined";
const hasValidConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                       process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "placeholder-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "placeholder.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "placeholder-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "placeholder.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:000000000000:web:placeholder",
};

// Initialize Firebase only if not already initialized and we have valid config
// During build time (SSG), this will use placeholder values to prevent errors
let app;
let auth;
let db;
let storage;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);

// Log warning if Firebase is initialized without proper credentials (build time)
if (!isBrowser && !hasValidConfig) {
  console.warn("Firebase initialized with placeholder config during build. This is expected during static generation.");
}

export { auth, db, storage };
