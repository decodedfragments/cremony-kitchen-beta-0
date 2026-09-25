import { db } from "./index";
import { categories, products, productVariants } from "./schema";

type CatalogItem = {
  handle: string;
  name: string;
  category: string;
  subcategory: string;
  dietary: string[];
  description: string;
  variants: { name: string; price: number; available: boolean }[];
  images: string[];
  isBestseller: boolean;
  isCorporate: boolean;
  isMadeToOrder: boolean;
  sortOrder: number;
};

// Catalog exported from the live ceremonykitchen.com product feed.
import catalogData from "./catalog.json";
const catalog = catalogData as CatalogItem[];

// Items that sit outside the live collections but clearly belong in a category.
const CATEGORY_OVERRIDES: Record<string, { category: string; subcategory: string }> = {
  "keto-gf-chocolate-cotton-cake-with-coffee-cloud": { category: "cakes", subcategory: "Celebration Cakes" },
  "marble-cake-with-rocher-glaze": { category: "cakes", subcategory: "Tea Cakes" },
  "concerto-chocolate-cake": { category: "cakes", subcategory: "Celebration Cakes" },
};

const ACCENT: Record<string, string> = { cakes: "cocoa", chocolate: "cocoa", pantry: "sage", gifting: "gold" };

function tagline(description: string): string {
  const first = description.split(/\n|(?<=[.!?])\s/)[0]?.replace(/^.*?~\s*/, "").trim() ?? "";
  return first.length > 90 ? `${first.slice(0, 87).trimEnd()}…` : first;
}

export async function seedCatalog(): Promise<number> {

  await db.delete(productVariants);
  await db.delete(products);
  await db.delete(categories);

  await db.insert(categories).values([
    {
      slug: "cakes",
      name: "Cakes",
      tagline: "Celebration & tea cakes",
      description:
        "Celebration cakes, tea cakes and ceremonial showpieces, including gluten free, sugar free, keto, vegan and eggless options. Order a day ahead, or before 3 PM for same-day.",
      heroEmoji: "🎂",
      sortOrder: 1,
    },
    {
      slug: "chocolate",
      name: "Chocolate",
      tagline: "Chocolate rituals",
      description:
        "Toffee barks, almond rocks, bon bons, truffles, honeycomb, brownies, sugar free bars and drinking chocolate, all tempered and finished by hand.",
      heroEmoji: "🍫",
      sortOrder: 2,
    },
    {
      slug: "pantry",
      name: "Pantry",
      tagline: "Morning rituals & gathering essentials",
      description:
        "Granolas, crackers, cookies, spreads, sauces and jams for slow breakfasts, cheese boards and everyday cooking.",
      heroEmoji: "🍯",
      sortOrder: 3,
    },
    {
      slug: "gifting",
      name: "Gifting",
      tagline: "Gift collections",
      description:
        "Curated boxes and two-tier acrylic hampers for festivals, celebrations and corporate gifting. Every box can be customised to suit you.",
      heroEmoji: "🎁",
      sortOrder: 4,
    },
  ]);

  for (const item of catalog) {
    const override = CATEGORY_OVERRIDES[item.handle];
    const category = override?.category ?? item.category;
    const variants = item.variants.length ? item.variants : [{ name: "Standard", price: 0, available: false }];
    const priceFrom = Math.min(...variants.map((v) => v.price));

    const [inserted] = await db
      .insert(products)
      .values({
        slug: item.handle,
        name: item.name,
        categorySlug: category,
        subcategory: override?.subcategory ?? item.subcategory,
        tagline: tagline(item.description),
        description: item.description,
        story: "",
        priceFrom,
        image: item.images[0] ?? "",
        images: item.images,
        accent: ACCENT[category] ?? "cocoa",
        badges: item.dietary,
        isBestseller: item.isBestseller,
        isCorporate: item.isCorporate,
        isMadeToOrder: item.isMadeToOrder,
        sortOrder: item.sortOrder,
      })
      .returning({ id: products.id });

    await db.insert(productVariants).values(
      variants.map((v, idx) => ({
        productId: inserted.id,
        name: v.name,
        price: v.price,
        available: v.available,
        sortOrder: idx,
      })),
    );
  }

  return catalog.length;
}

