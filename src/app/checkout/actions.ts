"use server";

import { inArray } from "drizzle-orm";
import { db } from "@/db";
import { orders, orderItems, products, productVariants } from "@/db/schema";

export type CheckoutPayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  preferredDate: string;
  fulfilment: "delivery" | "pickup";
  timeSlot: string;
  notes: string;
  lines: { variantId: number; quantity: number }[];
};

export type CheckoutResult = { ok: true; orderId: number } | { ok: false; error: string };

export async function placeOrder(payload: CheckoutPayload): Promise<CheckoutResult> {
  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const phone = payload.phone?.trim();

  if (!name || !email || !email.includes("@") || !phone) {
    return { ok: false, error: "Please share your name, a valid email and a reachable phone number." };
  }
  if (payload.fulfilment === "delivery" && (!payload.address?.trim() || !payload.pincode?.trim())) {
    return { ok: false, error: "Please add a delivery address and pincode, or choose pickup." };
  }
  if (!payload.preferredDate) {
    return { ok: false, error: "Please choose a delivery or pickup date." };
  }
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  if (payload.preferredDate < today) {
    return { ok: false, error: "Please choose today or a future date." };
  }

  const lines = (payload.lines ?? []).filter((l) => Number.isInteger(l.variantId) && l.quantity > 0 && l.quantity <= 50);
  if (lines.length === 0) return { ok: false, error: "Your bag is empty." };

  // Re-price every line from the database: never trust client prices.
  const variantRows = await db
    .select({
      id: productVariants.id,
      name: productVariants.name,
      price: productVariants.price,
      available: productVariants.available,
      productId: productVariants.productId,
    })
    .from(productVariants)
    .where(inArray(productVariants.id, lines.map((l) => l.variantId)));

  const productRows = variantRows.length
    ? await db
        .select({ id: products.id, name: products.name })
        .from(products)
        .where(inArray(products.id, variantRows.map((v) => v.productId)))
    : [];

  const priced = [];
  for (const line of lines) {
    const v = variantRows.find((r) => r.id === line.variantId);
    const p = v && productRows.find((r) => r.id === v.productId);
    if (!v || !p) return { ok: false, error: "An item in your bag is no longer available. Please refresh your bag." };
    if (!v.available) return { ok: false, error: `${p.name} (${v.name}) is currently sold out.` };
    priced.push({
      productId: p.id,
      productName: p.name,
      variantName: v.name,
      unitPrice: v.price,
      quantity: line.quantity,
      lineTotal: v.price * line.quantity,
    });
  }

  const subtotal = priced.reduce((s, l) => s + l.lineTotal, 0);

  const [order] = await db
    .insert(orders)
    .values({
      name,
      email,
      phone,
      address: payload.fulfilment === "pickup" ? "" : payload.address.trim(),
      city: payload.fulfilment === "pickup" ? "" : payload.city.trim(),
      pincode: payload.fulfilment === "pickup" ? "" : payload.pincode.trim(),
      preferredDate: payload.preferredDate,
      fulfilment: payload.fulfilment,
      timeSlot: payload.timeSlot,
      notes: payload.notes?.trim() ?? "",
      subtotal,
      status: "pending",
    })
    .returning({ id: orders.id });

  await db.insert(orderItems).values(priced.map((l) => ({ ...l, orderId: order.id })));

  return { ok: true, orderId: order.id };
}
