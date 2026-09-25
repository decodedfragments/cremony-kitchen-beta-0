import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory } from "@/db/queries";
import { Reveal } from "@/components/reveal";
import { ShopFilters } from "@/components/shop-filters";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const match = (await getCategories()).find((c) => c.slug === category);
  return { title: match?.name ?? "Shop", description: match?.description };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ diet?: string; type?: string }>;
}) {
  const [{ category }, { diet, type }] = await Promise.all([params, searchParams]);
  const categories = await getCategories();
  const current = categories.find((c) => c.slug === category);
  if (!current) notFound();
  const products = await getProductsByCategory(category);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
      <Reveal className="max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{current.heroEmoji}</span>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">{current.tagline}</p>
        </div>
        <h1 className="font-display mt-3 text-4xl text-[#2b1a13] sm:text-5xl">{current.name}</h1>
        <p className="mt-4 text-[#2b1a13]/65">{current.description}</p>
      </Reveal>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/shop/${c.slug}`}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-all ${
              c.slug === category ? "border-[#2b1a13] bg-[#2b1a13] text-[#faf3e7]" : "border-[#2b1a13]/15 bg-white/60 text-[#2b1a13]/70 hover:border-[#c9a24b]"
            }`}
          >
            {c.heroEmoji} {c.name}
          </Link>
        ))}
      </div>

      <ShopFilters categories={categories} products={products} initialCategory={category} initialDiet={diet ?? "all"} initialSub={type ?? "all"} lockCategory />
    </div>
  );
}
