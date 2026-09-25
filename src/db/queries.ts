import { db } from "@/db";
import { categories, products, productVariants } from "@/db/schema";
import { asc, eq, sql } from "drizzle-orm";
import { seedCatalog } from "./seed-catalog";
import type { Category, Product } from "@/lib/types";

type ProductRow = typeof products.$inferSelect;
type VariantRow = typeof productVariants.$inferSelect;

function toProduct(p: ProductRow, variants: VariantRow[]): Product {
  return {
    ...p,
    badges: (p.badges as string[]) ?? [],
    images: ((p.images as string[]) ?? []).length ? (p.images as string[]) : p.image ? [p.image] : [],
    variants: variants.map((v) => ({
      id: v.id,
      name: v.name,
      price: v.price,
      available: v.available,
      sortOrder: v.sortOrder,
    })),
  };
}

let seeding: Promise<void> | null = null;
// Auto-populate the catalog on a fresh database (e.g. first deploy).
function ensureSeeded(): Promise<void> {
  if (!seeding) {
    seeding = (async () => {
      const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
      if (count === 0) await seedCatalog();
    })().catch((err) => {
      seeding = null;
      throw err;
    });
  }
  return seeding;
}

export async function getCategories(): Promise<Category[]> {
  await ensureSeeded();
  return db.select().from(categories).orderBy(asc(categories.sortOrder));
}

export async function getAllProducts(): Promise<Product[]> {
  await ensureSeeded();
  const [productRows, variantRows] = await Promise.all([
    db.select().from(products).orderBy(asc(products.sortOrder)),
    db.select().from(productVariants).orderBy(asc(productVariants.sortOrder)),
  ]);
  return productRows.map((p) => toProduct(p, variantRows.filter((v) => v.productId === p.id)));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await ensureSeeded();
  const [product] = await db.select().from(products).where(eq(products.slug, slug));
  if (!product) return null;
  const variants = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, product.id))
    .orderBy(asc(productVariants.sortOrder));
  return toProduct(product, variants);
}

export async function getBestsellers(): Promise<Product[]> {
  return (await getAllProducts()).filter((p) => p.isBestseller);
}

export async function getCorporateProducts(): Promise<Product[]> {
  return (await getAllProducts()).filter((p) => p.isCorporate);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return (await getAllProducts()).filter((p) => p.categorySlug === categorySlug);
}
