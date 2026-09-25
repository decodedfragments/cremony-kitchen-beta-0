import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/db/queries";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: { title: product.name, description: product.tagline, images: product.images.slice(0, 1) },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const all = await getAllProducts();
  const related = all.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { "@type": "Brand", name: "Ceremony Kitchen" },
    category: product.subcategory || product.categorySlug,
    offers: product.variants.map((v) => ({
      "@type": "Offer",
      name: v.name,
      price: v.price.toFixed(2),
      priceCurrency: "INR",
      availability: v.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${SITE.url}/products/${product.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mt-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">You Might Also Love</p>
            <h2 className="font-display mt-3 text-3xl text-[#2b1a13] sm:text-4xl">More from this ritual</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
