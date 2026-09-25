"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bike, Store, Info } from "lucide-react";
import { useCartStore, cartTotal } from "@/lib/cart-store";
import { formatINR } from "@/lib/format";
import { SITE } from "@/lib/site";
import { useHydrated } from "@/lib/use-hydrated";
import { placeOrder } from "./actions";

const TIME_SLOTS = ["10 AM – 1 PM", "1 PM – 4 PM", "4 PM – 7 PM", "7 PM – 9 PM"];

function istToday() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}
function istHour() {
  return Number(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false }));
}

export default function CheckoutPage() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);
  const total = cartTotal(lines);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hydrated = useHydrated();

  const today = useMemo(istToday, []);
  const pastCutoff = useMemo(() => istHour() >= 15, []);
  const minDate = useMemo(() => {
    if (!pastCutoff) return today;
    const d = new Date(`${today}T00:00:00`);
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString("en-CA");
  }, [today, pastCutoff]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "New Delhi",
    pincode: "",
    preferredDate: "",
    fulfilment: "delivery" as "delivery" | "pickup",
    timeSlot: TIME_SLOTS[0],
    notes: "",
  });

  function update<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (lines.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await placeOrder({
        ...form,
        lines: lines.map((l) => ({
          variantId: l.variantId ?? Number(l.key.split("-")[1]),
          quantity: l.quantity,
        })),
      });
      if (!result.ok) {
        setError(result.error);
        setSubmitting(false);
        return;
      }
      clear();
      router.push(`/order-confirmed/${result.orderId}`);
    } catch {
      setError("Something went wrong placing your order. Please try again or WhatsApp us.");
      setSubmitting(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-32 text-center">
        <span className="animate-float-slow text-5xl text-[#c9a24b]">✦</span>
        <p className="text-[#2b1a13]/60">Loading your bag…</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-32 text-center">
        <span className="text-5xl">🕊️</span>
        <h1 className="font-display text-3xl text-[#2b1a13]">Your bag is empty</h1>
        <p className="text-[#2b1a13]/60">Add a little ceremony to your day before checking out.</p>
        <Link href="/shop" className="rounded-full bg-[#2b1a13] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#faf3e7]">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.3fr_1fr]">
      <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Reserve your order</p>
          <h1 className="font-display mt-2 text-4xl text-[#2b1a13]">Checkout</h1>
          <p className="mt-2 text-sm text-[#2b1a13]/60">
            Every order is made fresh. Once you place it, our kitchen will call or WhatsApp you on the number you give us to confirm and take payment.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {([
            { key: "delivery", label: "Delivery", sub: "Third-party courier, in your chosen time slot", icon: Bike },
            { key: "pickup", label: "Pickup", sub: "Dalmia Vihar, New Delhi. Best for urgent orders.", icon: Store },
          ] as const).map((opt) => (
            <button
              type="button"
              key={opt.key}
              onClick={() => update("fulfilment", opt.key)}
              className={`flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition ${
                form.fulfilment === opt.key ? "border-[#2b1a13] bg-[#2b1a13] text-[#faf3e7]" : "border-[#2b1a13]/15 bg-white/60 hover:border-[#c9a24b]"
              }`}
            >
              <opt.icon size={18} />
              <span className="font-display text-lg">{opt.label}</span>
              <span className={`text-xs ${form.fulfilment === opt.key ? "text-[#faf3e7]/70" : "text-[#2b1a13]/55"}`}>{opt.sub}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full name" value={form.name} onChange={(v) => update("name", v)} required />
          <Field label="Phone (reachable)" value={form.phone} onChange={(v) => update("phone", v)} required type="tel" />
          <Field label="Email" value={form.email} onChange={(v) => update("email", v)} required type="email" className="sm:col-span-2" />
          {form.fulfilment === "delivery" && (
            <>
              <Field label="Delivery address" value={form.address} onChange={(v) => update("address", v)} required className="sm:col-span-2" />
              <Field label="City" value={form.city} onChange={(v) => update("city", v)} />
              <Field label="Pincode" value={form.pincode} onChange={(v) => update("pincode", v)} required />
            </>
          )}
          <Field
            label={form.fulfilment === "pickup" ? "Pickup date" : "Delivery date"}
            value={form.preferredDate}
            onChange={(v) => update("preferredDate", v)}
            type="date"
            min={minDate}
            required
          />
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-[#2b1a13]/50">Time slot</span>
            <select
              value={form.timeSlot}
              onChange={(e) => update("timeSlot", e.target.value)}
              className="rounded-2xl border border-[#2b1a13]/15 bg-white/70 px-4 py-3 text-sm text-[#2b1a13] outline-none focus:border-[#c9a24b]"
            >
              {TIME_SLOTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <Field
            label="Notes for the kitchen (message on cake, gift note, recipient's number for surprises)"
            value={form.notes}
            onChange={(v) => update("notes", v)}
            className="sm:col-span-2"
            textarea
          />
        </div>

        <div className="flex gap-3 rounded-2xl border border-[#c9a24b]/30 bg-[#c9a24b]/10 p-4 text-xs leading-relaxed text-[#2b1a13]/75">
          <Info size={16} className="mt-0.5 shrink-0 text-[#8a6a2c]" />
          <p>
            We take orders a day in advance. Order before {SITE.sameDayCutoff} for same-day pickup or delivery, subject to availability.
            {pastCutoff && " It's past 3 PM, so the earliest date is tomorrow."} Delivery can arrive at any point within your slot. Because everything is perishable, sales are final and complaints can only be taken within 30 minutes of drop-off.{" "}
            <Link href="/policies/shipping-policy" className="underline">Shipping</Link> ·{" "}
            <Link href="/policies/refund-policy" className="underline">Refunds</Link>
          </p>
        </div>

        {error && <p className="rounded-xl bg-[#c46a5a]/10 px-4 py-3 text-sm text-[#a2493b]">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="btn-magnetic rounded-full bg-[#2b1a13] py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#faf3e7] transition hover:scale-[1.02] hover:bg-[#c9a24b] hover:text-[#2b1a13] disabled:opacity-50"
        >
          {submitting ? "Placing your order..." : `Place order · ${formatINR(total)}`}
        </button>
      </motion.form>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-fit rounded-[28px] border border-[#2b1a13]/10 bg-[#f0e4d0]/50 p-7 lg:sticky lg:top-28">
        <h2 className="font-display text-xl text-[#2b1a13]">Order summary</h2>
        <ul className="mt-5 flex flex-col gap-4">
          {lines.map((l) => (
            <li key={l.key} className="flex items-center gap-3 text-sm">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#2b1a13]/10">
                {l.image && <Image src={l.image} alt={l.name} fill sizes="56px" className="object-cover" />}
              </div>
              <span className="flex-1 text-[#2b1a13]/80">
                {l.name} <span className="text-[#2b1a13]/40">× {l.quantity}</span>
                <br />
                <span className="text-xs text-[#2b1a13]/45">{l.variantName}</span>
              </span>
              <span className="font-medium text-[#2b1a13]">{formatINR(l.price * l.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-between border-t border-[#2b1a13]/10 pt-4 font-display text-lg text-[#2b1a13]">
          <span>Subtotal</span>
          <span>{formatINR(total)}</span>
        </div>
        <p className="mt-2 text-xs text-[#2b1a13]/50">We'll confirm the delivery charge, if any, when we call you.</p>
      </motion.div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required = false,
  type = "text",
  className = "",
  textarea = false,
  min,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  className?: string;
  textarea?: boolean;
  min?: string;
}) {
  const cls = "rounded-2xl border border-[#2b1a13]/15 bg-white/70 px-4 py-3 text-sm text-[#2b1a13] outline-none transition focus:border-[#c9a24b]";
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-medium uppercase tracking-wide text-[#2b1a13]/50">
        {label} {required && <span className="text-[#c46a5a]">*</span>}
      </span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} required={required} type={type} min={min} className={cls} />
      )}
    </label>
  );
}
