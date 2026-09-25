"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { sendContactMessage } from "@/app/contact/actions";

const TOPICS = [
  { value: "general", label: "General enquiry" },
  { value: "bespoke", label: "Bespoke / custom order" },
  { value: "corporate", label: "Corporate gifting" },
  { value: "dietary", label: "Dietary question" },
  { value: "order", label: "Existing order" },
];

export function ContactForm({ defaultTopic = "general", dark = false }: { defaultTopic?: string; dark?: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: defaultTopic, message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const input = `rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-[#c9a24b] ${
    dark ? "border-white/15 bg-white/5 text-[#faf3e7] placeholder:text-[#faf3e7]/35" : "border-[#2b1a13]/15 bg-white/70 text-[#2b1a13]"
  }`;
  const label = `text-xs font-medium uppercase tracking-wide ${dark ? "text-[#faf3e7]/50" : "text-[#2b1a13]/50"}`;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const res = await sendContactMessage(form).catch(() => ({ ok: false as const, error: "Something went wrong. Please try again." }));
    if (!res.ok) {
      setError(res.error);
      setStatus("idle");
      return;
    }
    setStatus("sent");
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      confetti({ particleCount: 60, spread: 70, colors: ["#c9a24b", "#e6cf94", "#c46a5a"], origin: { y: 0.7 } });
    }
  }

  if (status === "sent") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[28px] border border-[#c9a24b]/40 bg-[#c9a24b]/10 p-10 text-center">
        <span className="text-4xl">✦</span>
        <p className={`font-display mt-3 text-2xl ${dark ? "text-[#faf3e7]" : "text-[#2b1a13]"}`}>Thank you, {form.name.split(" ")[0]}.</p>
        <p className={`mt-2 text-sm ${dark ? "text-[#faf3e7]/65" : "text-[#2b1a13]/65"}`}>We've got your message and will get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className="flex flex-col gap-1.5">
        <span className={label}>Name *</span>
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className={label}>Email *</span>
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className={label}>Phone number</span>
        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={input} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className={label}>Topic</span>
        <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className={input}>
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value} className="text-[#2b1a13]">{t.label}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5 sm:col-span-2">
        <span className={label}>Comment *</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={form.topic === "corporate" ? "Occasion, number of boxes, budget per box, date needed, branding..." : ""}
          className={input}
        />
      </label>
      {error && <p className="text-sm text-[#c46a5a] sm:col-span-2">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className={`btn-magnetic rounded-full py-4 text-xs font-semibold uppercase tracking-[0.18em] transition hover:scale-[1.02] disabled:opacity-50 sm:col-span-2 ${
          dark ? "bg-[#c9a24b] text-[#2b1a13] hover:bg-[#e6cf94]" : "bg-[#2b1a13] text-[#faf3e7] hover:bg-[#c9a24b] hover:text-[#2b1a13]"
        }`}
      >
        {status === "sending" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
