import type { MetadataRoute } from "next";
import { getAllProducts } from "@/db/queries";
import { SITE, POLICY_LINKS } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts().catch(() => []);
  const staticPaths = ["", "/shop", "/bestsellers", "/shop/cakes", "/shop/chocolate", "/shop/pantry", "/shop/gifting", "/corporate", "/about", "/contact", "/brand"];
  return [
    ...staticPaths.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...products.map((p) => ({ url: `${SITE.url}/products/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...POLICY_LINKS.map((p) => ({ url: `${SITE.url}/policies/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
