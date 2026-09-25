"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { ChocolateMotif } from "./chocolate-motif";

function HeroPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-56 w-56">
        <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-[#c9a24b]/30" />
        <div className="absolute inset-6 animate-float-slow rounded-full border border-[#c9a24b]/20" />
        <div className="absolute inset-0 flex items-center justify-center text-4xl">🍫</div>
      </div>
    </div>
  );
}

/** Graceful fallback if the 3D scene fails for any reason (WebGL, chunk load, runtime). */
function HeroFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ChocolateMotif className="h-80 w-80" />
    </div>
  );
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") console.error("Hero 3D scene failed, showing fallback:", error);
  }
  render() {
    return this.state.failed ? <HeroFallback /> : this.props.children;
  }
}

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => <HeroPlaceholder />,
});

export function HeroSceneLoader() {
  return (
    <div className="absolute inset-0">
      <SceneErrorBoundary>
        <HeroScene />
      </SceneErrorBoundary>
    </div>
  );
}
