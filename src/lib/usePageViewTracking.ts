import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { doc, setDoc, increment } from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";

function sanitizePath(pathname: string): { path: string; docId: string } {
  const path = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const docId = path === "/" ? "_home" : path.replace(/^\//, "").replace(/\//g, "__");
  return { path, docId };
}

/**
 * Increments a per-path view counter in Firestore on every route change.
 * Each page gets its own document (`pageviews/{sanitizedPath}`) rather than a single
 * document with slash-containing field names, since Firestore field names can't
 * safely contain forward slashes. Silently no-ops if Firebase isn't configured.
 * This powers the "Most viewed pages" panel in the admin dashboard.
 */
export function usePageViewTracking() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!firebaseConfigured) return;
    const { path, docId } = sanitizePath(pathname);
    setDoc(doc(db, "pageviews", docId), { path, count: increment(1) }, { merge: true }).catch(() => {
      // Non-critical — never block rendering on analytics failing.
    });
  }, [pathname]);
}
