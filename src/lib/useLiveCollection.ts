import { useEffect, useState } from "react";
import { collection, onSnapshot, query, type QueryConstraint } from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";

/**
 * Subscribes to a Firestore collection in real time. If Firebase isn't configured,
 * or the collection is empty, or a permission/network error occurs, `items` falls
 * back to the provided static data — so the public site always renders something
 * sensible instead of a blank page.
 */
export function useLiveCollection<T extends { id: string }>(
  collectionName: string,
  fallback: T[],
  constraints: QueryConstraint[] = []
) {
  const [items, setItems] = useState<T[]>(fallback);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!firebaseConfigured) return;

    const q = constraints.length ? query(collection(db, collectionName), ...constraints) : collection(db, collectionName);
    const unsub = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) {
          setItems(fallback);
          setIsLive(false);
        } else {
          setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T));
          setIsLive(true);
        }
      },
      () => {
        setItems(fallback);
        setIsLive(false);
      }
    );
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  return { items, isLive };
}
