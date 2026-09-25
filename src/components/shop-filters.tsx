"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { DIETARY, type Category, type Product } from "@/lib/types";
import { ProductCard } from "./product-card";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

export function ShopFilters({
  categories,
  products,
  initialCategory = "all",
  initialDiet = "all",
  initialSub = "all",
  lockCategory = false,
}: {
  categories: Category[];
  products: Product[];
  initialCategory?: string;
  initialDiet?: string;
  initialSub?: string;
  lockCategory?: boolean;
}) {
  const pathname = usePathname();
  const [category, setCategory] = useState(initialCategory);
  const [diet, setDiet] = useState(initialDiet);
  const [sub, setSub] = useState(initialSub);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const didMountRef = useRef(false);

  // Keep the URL in sync with the active filters using the History API directly.
  // We intentionally do NOT use router.replace here: on `force-dynamic` routes
  // that triggers a server round-trip which, combined with the effect re-running,
  // caused an infinite refresh loop. window.history.replaceState updates the URL
  // (so links stay shareable) without re-rendering the route tree.
  useEffect(() => {
    // Skip the first run so we don't rewrite the URL on hydration.
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const params = new URLSearchParams();
    if (!lockCategory && category !== "all") params.set("category", category);
    if (diet !== "all") params.set("diet", diet);
    if (sub !== "all") params.set("type", sub);
    const qs = params.toString();
    const next = qs ? `${pathname}?${qs}` : pathname;
    if (next !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(window.history.state, "", next);
    }
  }, [category, diet, sub, lockCategory, pathname]);

  const subcategories = useMemo(() => {
    const set = new Set<string>();
    products.filter((p) => category === "all" || p.categorySlug === category).forEach((p) => p.subcategory && set.add(p.subcategory));
    return Array.from(set).sort();
  }, [products, category]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (category === "all" || p.categorySlug === category) &&
        (diet === "all" || p.badges.includes(diet)) &&
        (sub === "all" || p.subcategory === sub) &&
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
    );
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.priceFrom - b.priceFrom);
    if (sort === "price-desc") sorted.sort((a, b) => b.priceFrom - a.priceFrom);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured") sorted.sort((a, b) => Number(b.isBestseller) - Number(a.isBestseller) || a.sortOrder - b.sortOrder);
    return sorted;
  }, [products, category, diet, sub, query, sort]);

  return (
    <div>
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2b1a13]/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brownies, keto, matcha..."
            className="w-full rounded-full border border-[#2b1a13]/15 bg-white/70 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#c9a24b]"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="w-full rounded-full border border-[#2b1a13]/15 bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#c9a24b] lg:w-auto"
          aria-label="Sort products"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="name">Name: A–Z</option>
        </select>
      </div>

      {!lockCategory && (
        <div className="mt-6 flex flex-wrap gap-2">
          <FilterPill active={category === "all"} onClick={() => { setCategory("all"); setSub("all"); }}>All</FilterPill>
          {categories.map((c) => (
            <FilterPill key={c.slug} active={category === c.slug} onClick={() => { setCategory(c.slug); setSub("all"); }}>
              {c.heroEmoji} {c.name}
            </FilterPill>
          ))}
        </div>
      )}

      {subcategories.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterPill small active={sub === "all"} onClick={() => setSub("all")}>All types</FilterPill>
          {subcategories.map((s) => (
            <FilterPill small key={s} active={sub === s} onClick={() => setSub(s)}>{s}</FilterPill>
          ))}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6f7d5c]">Dietary range</span>
        <FilterPill small sage active={diet === "all"} onClick={() => setDiet("all")}>Any</FilterPill>
        {DIETARY.map((d) => (
          <FilterPill small sage key={d} active={diet === d} onClick={() => setDiet(d)}>{d}</FilterPill>
        ))}
      </div>

      <p className="mt-6 text-xs text-[#2b1a13]/50">{filtered.length} {filtered.length === 1 ? "creation" : "creations"}</p>

      <motion.div layout className="mt-6 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div key={p.id} layout exit={{ opacity: 0, scale: 0.9 }}>
              <ProductCard product={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-[#2b1a13]/50">Nothing matches those filters yet. Try another combination.</p>
      )}
    </div>
  );
}

function FilterPill({
  children,
  active,
  onClick,
  small = false,
  sage = false,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  small?: boolean;
  sage?: boolean;
}) {
  const activeCls = sage ? "border-[#6f7d5c] bg-[#6f7d5c] text-[#faf3e7]" : "border-[#2b1a13] bg-[#2b1a13] text-[#faf3e7]";
  return (
    <button
      onClick={onClick}
      className={`rounded-full border font-medium uppercase tracking-wide transition-all ${small ? "px-3 py-1.5 text-[10px]" : "px-4 py-2 text-xs"} ${
        active ? activeCls : "border-[#2b1a13]/15 bg-white/60 text-[#2b1a13]/70 hover:border-[#c9a24b] hover:text-[#2b1a13]"
      }`}
    >
      {children}
    </button>
  );
}
