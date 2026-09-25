"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCartStore, cartTotal, cartCount } from "@/lib/cart-store";
import { formatINR } from "@/lib/format";
import { getAccentGradient, categoryEmoji } from "@/lib/accent";
import { useBodyLock } from "@/lib/use-body-lock";
import { useEffect } from "react";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = cartTotal(lines);
  const count = cartCount(lines);

  useBodyLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-[#1a100b]/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-[#faf3e7] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#2b1a13]/10 px-6 py-5">
              <h2 className="font-display text-2xl text-[#2b1a13]">
                Your Ceremony Bag
                {count > 0 && <span className="ml-2 align-middle text-sm font-normal text-[#2b1a13]/50">({count})</span>}
              </h2>
              <button onClick={close} className="rounded-full p-2 transition hover:bg-[#2b1a13]/5" aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <ShoppingBag size={40} strokeWidth={1.2} className="text-[#c9a24b]" />
                <p className="font-display text-xl text-[#2b1a13]">Your bag is waiting for its first ritual.</p>
                <Link
                  href="/shop"
                  onClick={close}
                  className="rounded-full bg-[#2b1a13] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#faf3e7] transition hover:bg-[#c9a24b] hover:text-[#2b1a13]"
                >
                  Browse the shop
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="flex flex-col gap-5">
                    {lines.map((line) => (
                      <motion.li
                        key={line.key}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        className="flex gap-4"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                          {line.image ? (
                            <Image src={line.image} alt={line.name} fill className="object-cover" />
                          ) : (
                            <div
                              className={`flex h-full w-full items-center justify-center bg-gradient-to-br text-2xl ${getAccentGradient(
                                line.accent,
                              )}`}
                            >
                              {categoryEmoji[line.slug.split("-")[0]] ?? "✦"}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="font-display text-base leading-tight text-[#2b1a13]">{line.name}</p>
                            <p className="mt-0.5 text-xs uppercase tracking-wide text-[#2b1a13]/50">{line.variantName}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-[#2b1a13]/15 px-2 py-1">
                              <button
                                onClick={() => updateQuantity(line.key, line.quantity - 1)}
                                className="flex h-5 w-5 items-center justify-center text-[#2b1a13]"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="min-w-[1rem] text-center text-xs font-semibold">{line.quantity}</span>
                              <button
                                onClick={() => updateQuantity(line.key, line.quantity + 1)}
                                className="flex h-5 w-5 items-center justify-center text-[#2b1a13]"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="text-sm font-semibold text-[#2b1a13]">
                              {formatINR(line.price * line.quantity)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(line.key)}
                          className="self-start text-[#2b1a13]/30 hover:text-[#c46a5a]"
                          aria-label="Remove item"
                        >
                          <X size={16} />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#2b1a13]/10 px-6 py-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-display text-lg text-[#2b1a13]">Subtotal</span>
                    <span className="font-display text-xl text-[#2b1a13]">{formatINR(total)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="btn-magnetic block w-full rounded-full bg-[#2b1a13] py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#faf3e7] transition hover:scale-[1.02] hover:bg-[#c9a24b] hover:text-[#2b1a13]"
                  >
                    Checkout
                  </Link>
                  <p className="mt-3 text-center text-[11px] text-[#2b1a13]/50">
                    Made fresh · order before 3 PM for same-day, subject to availability
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
