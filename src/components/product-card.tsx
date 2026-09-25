"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { ProductPlate } from "./product-plate";
import { formatINR } from "@/lib/format";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const soldOut = product.variants.length > 0 && product.variants.every((v) => !v.available);
  const hasRange = new Set(product.variants.map((v) => v.price)).size > 1;
  const [primary, secondary] = product.images;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setTilt({ x: ((e.clientY - rect.top) / rect.height - 0.5) * -8, y: ((e.clientX - rect.left) / rect.width - 0.5) * 10 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.19, 1, 0.22, 1] }}
      className="perspective-1000 group"
    >
      <Link href={`/products/${product.slug}`}>
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          className="relative transition-transform duration-300 ease-out"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-[#f0e4d0] shadow-[0_20px_45px_-20px_rgba(43,26,19,0.4)]">
            {primary ? (
              <>
                <Image
                  src={primary}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
                  className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${secondary ? "group-hover:opacity-0" : ""}`}
                />
                {secondary && (
                  <Image
                    src={secondary}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 280px"
                    className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                  />
                )}
              </>
            ) : (
              <ProductPlate image="" accent={product.accent} categorySlug={product.categorySlug} name={product.name} className="h-full w-full" />
            )}
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {product.isBestseller && (
                <span className="rounded-full bg-[#2b1a13] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#e6cf94]">Bestseller</span>
              )}
              {product.badges.slice(0, product.isBestseller ? 1 : 2).map((badge) => (
                <span key={badge} className="rounded-full bg-[#faf3e7]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#2b1a13] backdrop-blur">
                  {badge}
                </span>
              ))}
            </div>
            {soldOut && (
              <span className="absolute bottom-3 right-3 rounded-full bg-[#c46a5a] px-3 py-1 text-[10px] font-semibold uppercase text-white">Sold out</span>
            )}
          </div>
          <div className="mt-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              {product.subcategory && <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c9a24b]">{product.subcategory}</p>}
              <h3 className="font-display text-lg leading-tight text-[#2b1a13] transition-colors group-hover:text-[#b9793f]">{product.name}</h3>
            </div>
            <span className="whitespace-nowrap pt-3 text-sm font-semibold text-[#2b1a13]">
              {hasRange && <span className="text-[11px] font-normal text-[#2b1a13]/50">From </span>}
              {formatINR(product.priceFrom)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
