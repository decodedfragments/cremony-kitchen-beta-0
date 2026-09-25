"use client";

import { useEffect, useState } from "react";

/**
 * Returns whether the given media query currently matches.
 * Starts as `false` on the server / first render to avoid hydration mismatch,
 * then updates on the client. Use it to avoid mounting heavy components
 * (e.g. the Three.js hero) on small screens.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
