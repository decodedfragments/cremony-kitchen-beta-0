import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { formatINR } from "@/lib/format";
import { SITE, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "@/components/social-icons";

export const dynamic = "force-dynamic";
export const metadata = { title: "Order received", robots: { index: false } };

export default async function OrderConfirmedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderId = Number(id);
  if (!Number.isInteger(orderId)) notFound();

  const [order] = await db.select().from(orders).where(eq(orders.id, orderId));
  if (!order) notFound();
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  const ref = `CK-${order.id.toString().padStart(4, "0")}`;

  const waMessage = [
    `Hello Ceremony Kitchen! I've just placed order ${ref}.`,
    ...items.map((i) => `• ${i.productName} (${i.variantName}) × ${i.quantity}`),
    `Total: ${formatINR(order.subtotal)}`,
    `${order.fulfilment === "pickup" ? "Pickup" : "Delivery"}: ${order.preferredDate}${order.timeSlot ? `, ${order.timeSlot}` : ""}`,
    `Name: ${order.name}`,
  ].join("\n");

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <span className="animate-float-slow text-6xl text-[#c9a24b]">✦</span>
      <h1 className="font-display mt-6 text-4xl text-[#2b1a13]">Thank you, {order.name.split(" ")[0]}.</h1>
      <p className="mt-4 text-[#2b1a13]/65">
        We've received order <span className="font-semibold text-[#2b1a13]">{ref}</span>. Our team will contact you on {order.phone} to confirm the details and payment.
      </p>

      <a
        href={whatsappUrl(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition hover:scale-105"
      >
        <WhatsAppIcon size={16} /> Send order on WhatsApp for faster confirmation
      </a>

      <div className="mt-10 w-full rounded-[28px] border border-[#2b1a13]/10 bg-[#f0e4d0]/50 p-7 text-left">
        <div className="flex flex-wrap justify-between gap-2 text-xs uppercase tracking-wide text-[#2b1a13]/50">
          <span>{order.fulfilment === "pickup" ? "Pickup" : "Delivery"} · {order.preferredDate}</span>
          <span>{order.timeSlot}</span>
        </div>
        <ul className="mt-5 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 text-sm">
              <span className="text-[#2b1a13]/75">
                {item.productName} <span className="text-[#2b1a13]/40">× {item.quantity}</span>
                <br />
                <span className="text-xs text-[#2b1a13]/40">{item.variantName}</span>
              </span>
              <span className="font-medium text-[#2b1a13]">{formatINR(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex justify-between border-t border-[#2b1a13]/10 pt-4 font-display text-lg">
          <span>Subtotal</span>
          <span>{formatINR(order.subtotal)}</span>
        </div>
        {order.fulfilment === "delivery" && order.address && (
          <p className="mt-4 text-xs text-[#2b1a13]/55">Delivering to: {order.address}, {order.city} {order.pincode}</p>
        )}
      </div>

      <p className="mt-6 text-xs text-[#2b1a13]/50">
        Questions? WhatsApp or call {SITE.phoneDisplay}, or email {SITE.email}.
      </p>

      <Link href="/shop" className="mt-8 inline-flex rounded-full bg-[#2b1a13] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#faf3e7] transition hover:bg-[#c9a24b] hover:text-[#2b1a13]">
        Continue shopping
      </Link>
    </div>
  );
}
