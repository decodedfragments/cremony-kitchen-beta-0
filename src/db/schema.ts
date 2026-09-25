import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  tagline: text("tagline").notNull().default(""),
  description: text("description").notNull().default(""),
  heroEmoji: varchar("hero_emoji", { length: 8 }).notNull().default("✦"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  categorySlug: varchar("category_slug", { length: 64 }).notNull(),
  tagline: text("tagline").notNull().default(""),
  description: text("description").notNull().default(""),
  story: text("story").notNull().default(""),
  priceFrom: integer("price_from").notNull(),
  image: text("image").notNull(),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  subcategory: varchar("subcategory", { length: 64 }).notNull().default(""),
  isCorporate: boolean("is_corporate").notNull().default(false),
  accent: varchar("accent", { length: 32 }).notNull().default("cocoa"),
  badges: jsonb("badges").$type<string[]>().notNull().default([]),
  isBestseller: boolean("is_bestseller").notNull().default(false),
  isMadeToOrder: boolean("is_made_to_order").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 120 }).notNull(),
  price: integer("price").notNull(),
  available: boolean("available").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  topic: varchar("topic", { length: 60 }).notNull().default("general"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  address: text("address").notNull().default(""),
  city: varchar("city", { length: 120 }).notNull().default(""),
  pincode: varchar("pincode", { length: 20 }).notNull().default(""),
  preferredDate: varchar("preferred_date", { length: 40 }).notNull().default(""),
  fulfilment: varchar("fulfilment", { length: 20 }).notNull().default("delivery"),
  timeSlot: varchar("time_slot", { length: 40 }).notNull().default(""),
  notes: text("notes").notNull().default(""),
  subtotal: integer("subtotal").notNull(),
  status: varchar("status", { length: 32 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id"),
  productName: varchar("product_name", { length: 160 }).notNull(),
  variantName: varchar("variant_name", { length: 120 }).notNull().default(""),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
  lineTotal: integer("line_total").notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
