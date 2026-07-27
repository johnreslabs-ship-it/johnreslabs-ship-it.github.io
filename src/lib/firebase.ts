import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

const app = firebaseConfigured ? (getApps().length ? getApps()[0] : initializeApp(firebaseConfig)) : null;

/**
 * `db` is only usable when `firebaseConfigured` is true. Every call site in this app
 * checks `firebaseConfigured` first and falls back to static data otherwise, so the
 * public site never breaks just because Firebase isn't set up yet.
 */
export const db = app ? getFirestore(app) : (null as unknown as ReturnType<typeof getFirestore>);
