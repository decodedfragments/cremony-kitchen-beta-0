export type Variant = {
  id: number;
  name: string;
  price: number;
  available: boolean;
  sortOrder: number;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  categorySlug: string;
  subcategory: string;
  tagline: string;
  description: string;
  story: string;
  priceFrom: number;
  image: string;
  images: string[];
  accent: string;
  badges: string[];
  isBestseller: boolean;
  isCorporate: boolean;
  isMadeToOrder: boolean;
  sortOrder: number;
  variants: Variant[];
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroEmoji: string;
  sortOrder: number;
};

export const DIETARY = ["Gluten Free", "Sugar Free", "Keto", "Vegan", "Eggless"] as const;
