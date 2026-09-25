import { getCorporateProducts, getProductsByCategory } from "@/db/queries";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/social-icons";
import { SITE, whatsappUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Corporate Gifting",
  description: "Corporate and festive gifting from Cérémony Kitchen: barks, truffles, brownies, cookies and custom two-tier gift boxes.",
};

export default async function CorporatePage() {
  const [corporate, boxes] = await Promise.all([getCorporateProducts(), getProductsByCategory("gifting")]);

  return (
    <div>
      <section className="relative overflow-hidden bg-[#2b1a13] py-24 text-[#faf3e7]">
        <div className="absolute -right-20 -top-20 h-80 w-80 animate-spin-slow rounded-full border border-[#c9a24b]/20" />
        <div className="absolute -left-10 bottom-0 h-52 w-52 animate-float-slow rounded-full border border-[#c9a24b]/15" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Corporate</p>
            <h1 className="font-display mt-4 text-[clamp(2.3rem,5vw,4rem)] leading-tight">Gifting that feels like a ceremony</h1>
            <p className="mx-auto mt-6 max-w-2xl text-[#faf3e7]/70">
              For Diwali, client appreciation, team celebrations and events. Choose from our gift collections or build a box from our corporate range. Customisation is available to suit your preferences and gifting needs.
            </p>
            <a
              href={whatsappUrl("Hello! I'd like to discuss a corporate gifting order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c9a24b] px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#2b1a13] transition hover:scale-105"
            >
              <WhatsAppIcon size={15} /> WhatsApp {SITE.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <Reveal className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Gift collections</p>
          <h2 className="font-display mt-2 text-3xl text-[#2b1a13] sm:text-4xl">Ready-to-gift boxes</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {boxes.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10">
        <Reveal className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">The corporate range</p>
          <h2 className="font-display mt-2 text-3xl text-[#2b1a13] sm:text-4xl">Build your own box</h2>
          <p className="mt-2 max-w-xl text-sm text-[#2b1a13]/60">Our most-gifted chocolates, bakes and pantry pieces. Mix them into branded boxes for your team or clients.</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {corporate.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <section className="bg-[#1a100b] py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Enquire</p>
            <h2 className="font-display mt-3 text-3xl text-[#faf3e7] sm:text-4xl">Tell us about your gifting</h2>
            <ul className="mt-6 space-y-3 text-sm text-[#faf3e7]/65">
              <li>✦ Occasion and date needed</li>
              <li>✦ Number of boxes and budget per box</li>
              <li>✦ Dietary needs: gluten free, sugar free, keto, vegan or eggless</li>
              <li>✦ Branding, ribbons or custom tags</li>
            </ul>
            <p className="mt-6 text-sm text-[#faf3e7]/50">Or email <a href={`mailto:${SITE.email}?subject=Corporate%20gifting`} className="text-[#e6cf94] underline">{SITE.email}</a></p>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm defaultTopic="corporate" dark />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
