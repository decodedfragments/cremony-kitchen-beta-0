"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "./social-icons";
import { SITE, POLICY_LINKS, fullAddress, mailtoUrl, mapsUrl, whatsappUrl } from "@/lib/site";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const iconBtn = "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-[#c9a24b] hover:text-[#c9a24b]";

  return (
    <footer className="relative overflow-hidden bg-[#1a100b] text-[#faf3e7]">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c9a24b]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#c46a5a]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.3fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative h-9 w-9">
                <Image src="/images/logo-mark.png" alt="" fill sizes="36px" className="object-contain" />
              </span>
              <span className="font-display text-xl">Cérémony Kitchen</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#faf3e7]/60">
              Cérémony is a textural and sensory experience that pays homage to slow, intentional living. Food isn't just consumed, it's experienced.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[#faf3e7]/60">
              <li>
                <a href={mailtoUrl()} className="inline-flex items-center gap-2 hover:text-[#faf3e7]"><Mail size={14} /> {SITE.email}</a>
              </li>
              <li>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 hover:text-[#faf3e7]">
                  <MapPin size={14} className="mt-0.5 shrink-0" /> {fullAddress}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-3">
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${SITE.instagramHandle}`} className={iconBtn}>
                <InstagramIcon size={16} />
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${SITE.phoneDisplay}`} className={iconBtn}>
                <WhatsAppIcon size={16} />
              </a>
              <a href={mailtoUrl()} aria-label="Email" className={iconBtn}>
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c9a24b]">Shop</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-[#faf3e7]/70">
              <li><Link href="/shop/cakes" className="hover:text-[#faf3e7]">Cakes</Link></li>
              <li><Link href="/shop/chocolate" className="hover:text-[#faf3e7]">Chocolate</Link></li>
              <li><Link href="/shop/pantry" className="hover:text-[#faf3e7]">Pantry</Link></li>
              <li><Link href="/shop/gifting" className="hover:text-[#faf3e7]">Gifting</Link></li>
              <li><Link href="/corporate" className="hover:text-[#faf3e7]">Corporate</Link></li>
              <li><Link href="/bestsellers" className="hover:text-[#faf3e7]">Bestsellers</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c9a24b]">Info</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-[#faf3e7]/70">
              <li><Link href="/about" className="hover:text-[#faf3e7]">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-[#faf3e7]">Contact</Link></li>
              <li><Link href="/brand" className="hover:text-[#faf3e7]">Brand World</Link></li>
              {POLICY_LINKS.slice(0, 4).map((p) => (
                <li key={p.slug}><Link href={`/policies/${p.slug}`} className="hover:text-[#faf3e7]">{p.label} Policy</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c9a24b]">Stay close to Cérémony</p>
            <p className="mt-4 text-sm text-[#faf3e7]/60">Seasonal desserts. Thoughtful gifts. Stories from our kitchen.</p>
            <form onSubmit={handleSubmit} className="mt-4 flex overflow-hidden rounded-full border border-white/20 bg-white/5">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
                className="w-full bg-transparent px-4 py-3 text-sm text-[#faf3e7] placeholder:text-[#faf3e7]/40 focus:outline-none"
              />
              <button type="submit" disabled={status === "loading"} className="shrink-0 px-5 text-xs font-semibold uppercase tracking-wide text-[#c9a24b] transition hover:text-[#faf3e7] disabled:opacity-50">
                {status === "loading" ? "..." : "Join"}
              </button>
            </form>
            {status === "done" && <p className="mt-2 text-xs text-[#aab897]">Welcome to the ceremony ✦</p>}
            {status === "error" && <p className="mt-2 text-xs text-[#c46a5a]">Something went wrong, try again.</p>}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366]/15 px-4 py-2 text-xs font-semibold text-[#7fe0a4] hover:bg-[#25D366]/25"
            >
              <WhatsAppIcon size={14} /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#faf3e7]/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Ceremony Kitchen · New Delhi, India</p>
          <p>Founded by {SITE.founder} · Trained at Le Cordon Bleu Paris</p>
        </div>
      </div>
    </footer>
  );
}
