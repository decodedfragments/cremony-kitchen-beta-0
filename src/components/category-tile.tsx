"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/lib/types";

const ACCENTS: Record<string, string> = {
  cakes: "from-[#5a3a26] to-[#2b1a13]",
  chocolate: "from-[#3f281c] to-[#1a100b]",
  pantry: "from-[#8fa072] to-[#586647]",
  gifting: "from-[#c9a24b] to-[#8a6a2c]",
};

export function CategoryTile({ category, index = 0 }: { category: Category; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
    >
      <Link
        href={`/shop/${category.slug}`}
        className={`group relative flex h-64 flex-col justify-between overflow-hidden rounded-[32px] bg-gradient-to-br p-7 text-[#faf3e7] shadow-[0_25px_50px_-25px_rgba(26,16,11,0.6)] transition-transform duration-500 hover:-translate-y-2 ${
          ACCENTS[category.slug] ?? ACCENTS.cakes
        }`}
      >
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full border border-white/10 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110" />
        <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full border border-white/10" />
        <span className="relative text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          {category.heroEmoji}
        </span>
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e6cf94]">{category.tagline}</p>
          <h3 className="font-display mt-1 text-2xl">{category.name}</h3>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-[#faf3e7]/70 transition-all group-hover:gap-2 group-hover:text-[#faf3e7]">
            Explore →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
