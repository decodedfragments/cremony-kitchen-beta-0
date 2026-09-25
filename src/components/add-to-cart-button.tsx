"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Check, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import type { Product, Variant } from "@/lib/types";

export function AddToCartButton({
  product,
  variant,
  quantity = 1,
  className = "",
  fullWidth = false,
}: {
  product: Product;
  variant: Variant;
  quantity?: number;
  className?: string;
  fullWidth?: boolean;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const soldOut = !variant.available;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (soldOut) return;
    addItem(
      {
        key: `${product.id}-${variant.id}`,
        productId: product.id,
        variantId: variant.id,
        slug: product.slug,
        name: product.name,
        variantName: variant.name,
        price: variant.price,
        image: product.image,
        accent: product.accent,
      },
      quantity,
    );

    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      const rect = e.currentTarget.getBoundingClientRect();
      confetti({
        particleCount: 34,
        spread: 60,
        startVelocity: 28,
        gravity: 1.1,
        scalar: 0.7,
        colors: ["#c9a24b", "#e6cf94", "#c46a5a", "#faf3e7"],
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      });
    }

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <button
      onClick={handleClick}
      disabled={soldOut}
      className={`btn-magnetic group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#2b1a13] px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#faf3e7] transition-transform hover:scale-[1.03] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      {soldOut ? (
        <>Sold out</>
      ) : justAdded ? (
        <>
          <Check size={15} /> Added to bag
        </>
      ) : (
        <>
          <ShoppingBag size={15} /> Add to bag
        </>
      )}
    </button>
  );
}
