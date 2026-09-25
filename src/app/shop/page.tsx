import { getAllProducts, getCategories } from "@/db/queries";
import { Reveal } from "@/components/reveal";
import { ShopFilters } from "@/components/shop-filters";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop All",
  description: "Cakes, chocolate, pantry and gifting from Cérémony Kitchen, with gluten free, sugar free, keto, vegan and eggless options.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; diet?: string; type?: string }>;
}) {
  const [{ category, diet, type }, products, categories] = await Promise.all([searchParams, getAllProducts(), getCategories()]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">The full collection</p>
        <h1 className="font-display mt-3 text-4xl text-[#2b1a13] sm:text-5xl">Shop Cérémony</h1>
        <p className="mt-4 text-[#2b1a13]/65">
          {products.length} chef-crafted creations across cakes, chocolate, pantry and gifting, all handmade in small batches in New Delhi.
        </p>
      </Reveal>

      <ShopFilters
        categories={categories}
        products={products}
        initialCategory={category ?? "all"}
        initialDiet={diet ?? "all"}
        initialSub={type ?? "all"}
      />
    </div>
  );
}
