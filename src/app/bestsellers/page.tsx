import { getBestsellers } from "@/db/queries";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";

export const dynamic = "force-dynamic";
export const metadata = { title: "Bestsellers", description: "The most-loved cakes, chocolates and pantry creations from Cérémony Kitchen." };

export default async function BestsellersPage() {
  const products = await getBestsellers();
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Most loved</p>
        <h1 className="font-display mt-3 text-4xl text-[#2b1a13] sm:text-5xl">Bestsellers</h1>
        <p className="mt-4 text-[#2b1a13]/65">The creations our guests come back for, again and again.</p>
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
}
