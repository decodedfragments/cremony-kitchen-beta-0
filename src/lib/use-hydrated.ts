"use client";

import { useEffect, useState } from "react";

/**
 * Returns false during SSR and the first client render, then true.
 * Use it to gate rendering of values that come from localStorage-backed
 * stores (e.g. the persisted cart) so server and client markup match and
 * we avoid hydration mismatches.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
