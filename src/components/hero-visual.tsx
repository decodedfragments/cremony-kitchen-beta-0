"use client";

import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@/lib/use-media-query";
import { HeroSceneLoader } from "./hero-scene-loader";
import { ChocolateMotif } from "./chocolate-motif";
import { formatINR } from "@/lib/format";

type Spotlight = { slug: string; name: string; priceFrom: number; image: string } | null;

/** Mobile: lightweight CSS chocolate motif. No Three.js bundle is shipped to phones. */
export function HeroVisualMobile() {
  return (
    <div className="mt-7 flex justify-center lg:hidden">
      <ChocolateMotif className="h-52 w-52" />
    </div>
  );
}

/** Desktop: full Three.js chocolate scene, only mounted at lg+ so mobile stays light. */
export function HeroVisualDesktop({ spotlight }: { spotlight: Spotlight }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="relative hidden h-[520px] lg:block lg:h-[620px]">
      {isDesktop ? <HeroSceneLoader /> : null}
      {spotlight && (
        <Link
          href={`/products/${spotlight.slug}`}
          className="absolute bottom-8 left-2 flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-2.5 pr-5 shadow-xl backdrop-blur-md transition hover:-translate-y-1 sm:left-6"
        >
          <span className="relative h-14 w-14 overflow-hidden rounded-xl">
            <Image src={spotlight.image} alt={spotlight.name} fill sizes="56px" className="object-cover" />
          </span>
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-[#c9a24b]">★ Bestseller</span>
            <span className="font-display block text-base text-[#2b1a13]">{spotlight.name}</span>
            <span className="block text-xs text-[#2b1a13]/60">From {formatINR(spotlight.priceFrom)}</span>
          </span>
        </Link>
      )}
    </div>
  );
}
