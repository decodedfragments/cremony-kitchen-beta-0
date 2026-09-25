"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Gift, Leaf, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/format";
import { SITE, whatsappUrl } from "@/lib/site";
import { AddToCartButton } from "./add-to-cart-button";
import { ProductPlate } from "./product-plate";
import { WhatsAppIcon } from "./social-icons";

const CATEGORY_LABEL: Record<string, string> = { cakes: "Cakes", chocolate: "Chocolate", pantry: "Pantry", gifting: "Gifting" };

export function ProductDetail({ product }: { product: Product }) {
  const firstAvailable = product.variants.find((v) => v.available) ?? product.variants[0];
  const [variantId, setVariantId] = useState(firstAvailable?.id);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const variant = product.variants.find((v) => v.id === variantId) ?? firstAvailable;
  const images = product.images;
  const paragraphs = product.description.split("\n").filter(Boolean);

  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-wide text-[#2b1a13]/45">
        <Link href="/" className="transition-colors hover:text-[#2b1a13]">Home</Link>
        <span aria-hidden className="text-[#2b1a13]/25">/</span>
        <Link href="/shop" className="transition-colors hover:text-[#2b1a13]">Shop</Link>
        <span aria-hidden className="text-[#2b1a13]/25">/</span>
        <Link href={`/shop/${product.categorySlug}`} className="transition-colors hover:text-[#2b1a13]">
          {CATEGORY_LABEL[product.categorySlug] ?? product.categorySlug}
        </Link>
        <span aria-hidden className="text-[#2b1a13]/25">/</span>
        <span className="text-[#2b1a13]/70">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="self-start lg:sticky lg:top-28">
          <div className="relative aspect-square w-full overflow-hidden rounded-[28px] bg-[#f0e4d0]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                {images[activeImage] ? (
                  <Image src={images[activeImage]} alt={`${product.name}, photo ${activeImage + 1}`} fill priority sizes="(max-width: 1024px) 90vw, 560px" className="object-cover" />
                ) : (
                  <ProductPlate image="" accent={product.accent} categorySlug={product.categorySlug} name={product.name} className="h-full w-full" />
                )}
              </motion.div>
            </AnimatePresence>
            {product.isBestseller && (
              <span className="absolute left-4 top-4 rounded-full bg-[#2b1a13] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#e6cf94]">★ Bestseller</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 w-20 overflow-hidden rounded-2xl border-2 transition ${i === activeImage ? "border-[#c9a24b]" : "border-transparent opacity-60 hover:opacity-100"}`}
                  aria-label={`Show photo ${i + 1}`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.subcategory && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">{product.subcategory}</p>}
          <h1 className="font-display mt-2 text-4xl leading-tight text-[#2b1a13] sm:text-5xl">{product.name}</h1>

          {product.badges.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.badges.map((b) => (
                <Link
                  key={b}
                  href={`/shop?diet=${encodeURIComponent(b)}`}
                  className="inline-flex items-center gap-1 rounded-full border border-[#6f7d5c]/40 bg-[#6f7d5c]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#4d5840] hover:bg-[#6f7d5c]/20"
                >
                  <Leaf size={10} /> {b}
                </Link>
              ))}
            </div>
          )}

          <p className="mt-6 text-3xl font-semibold text-[#2b1a13]">{formatINR(variant?.price ?? product.priceFrom)}</p>
          <p className="text-xs text-[#2b1a13]/45">Price includes all taxes</p>

          <div className="mt-6 space-y-3 text-[15px] leading-relaxed text-[#2b1a13]/75">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {product.variants.length > 1 && (
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#2b1a13]/50">Choose size / flavour</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => v.available && setVariantId(v.id)}
                    disabled={!v.available}
                    className={`rounded-full border px-4 py-2 text-sm transition-all ${
                      v.id === variant?.id
                        ? "border-[#2b1a13] bg-[#2b1a13] text-[#faf3e7]"
                        : v.available
                          ? "border-[#2b1a13]/20 text-[#2b1a13]/75 hover:border-[#c9a24b]"
                          : "cursor-not-allowed border-dashed border-[#2b1a13]/15 text-[#2b1a13]/30 line-through"
                    }`}
                  >
                    {v.name} <span className="opacity-60">· {formatINR(v.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex shrink-0 items-center gap-3 rounded-full border border-[#2b1a13]/20 px-4 py-3 sm:gap-4">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="text-lg leading-none text-[#2b1a13]" aria-label="Decrease">−</button>
              <span className="w-5 text-center font-semibold">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(50, q + 1))} className="text-lg leading-none text-[#2b1a13]" aria-label="Increase">+</button>
            </div>
            {variant && <AddToCartButton product={product} variant={variant} quantity={quantity} className="flex-1 !px-4" />}
          </div>

          <a
            href={whatsappUrl(`Hello! I'd like to ask about ${product.name}${variant ? ` (${variant.name})` : ""}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/50 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#128C4B] transition hover:bg-[#25D366]/10"
          >
            <WhatsAppIcon size={15} />
            <span className="sm:hidden">Ask on WhatsApp</span>
            <span className="hidden sm:inline">Ask about customisation on WhatsApp</span>
          </a>

          <div className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-3">
            {[
              { icon: Clock, title: "Same-day", text: "Before 3 PM, else next day" },
              { icon: Gift, title: "Gift-ready", text: product.categorySlug === "gifting" ? "Customisation available" : "Packed in the Ceremony box" },
              { icon: ShieldCheck, title: "Honest", text: "No unnecessary preservatives" },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-[#2b1a13]/10 bg-white/60 p-3 sm:p-4">
                <f.icon size={16} className="text-[#c9a24b]" />
                <p className="mt-2 text-xs font-semibold text-[#2b1a13] sm:text-sm">{f.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-[#2b1a13]/55 sm:text-xs">{f.text}</p>
              </div>
            ))}
          </div>

          {product.isMadeToOrder && (
            <p className="mt-5 rounded-2xl bg-[#c9a24b]/10 p-4 text-xs text-[#2b1a13]/70">
              ✦ The croquembouche is made to order. We recommend ordering well ahead and confirming your date with us on {SITE.phoneDisplay}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
