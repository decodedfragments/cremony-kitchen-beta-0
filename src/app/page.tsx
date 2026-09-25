import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getCategories } from "@/db/queries";
import { HeroVisualMobile, HeroVisualDesktop } from "@/components/hero-visual";
import { ChocolateDrizzle } from "@/components/chocolate-drizzle";
import { CategoryTile } from "@/components/category-tile";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic-button";
import { InstagramIcon } from "@/components/social-icons";
import { DIETARY } from "@/lib/types";
import { SITE } from "@/lib/site";
import { formatINR } from "@/lib/format";

export const dynamic = "force-dynamic";

const MARQUEE = ["Chef-crafted", "Le Cordon Bleu Paris", "No unnecessary preservatives", "Gluten free", "Sugar free", "Keto", "Vegan", "Eggless", "Handcrafted in New Delhi"];

const DIET_META: Record<string, { emoji: string; blurb: string }> = {
  "Gluten Free": { emoji: "🌾", blurb: "Cloud cakes, tiramisu, tortes & more" },
  "Sugar Free": { emoji: "🍃", blurb: "Truffles, bars, barks & granola" },
  Keto: { emoji: "🥑", blurb: "Keto cloud cakes, tortes & truffles" },
  Vegan: { emoji: "🌱", blurb: "Almond rocks, crackers, granola & cake" },
  Eggless: { emoji: "🥚", blurb: "Barks, bon bons, spreads & more" },
};

export default async function HomePage() {
  const [categories, products] = await Promise.all([getCategories(), getAllProducts()]);
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 8);
  const giftBoxes = products.filter((p) => p.categorySlug === "gifting").slice(0, 4);
  const dietCounts = Object.fromEntries(DIETARY.map((d) => [d, products.filter((p) => p.badges.includes(d)).length]));
  const spotlight =
    products.find((p) => p.slug === "bark" && p.images.length > 0) ??
    products.find((p) => p.isBestseller && p.images.length > 0);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-[#faf3e7] lg:min-h-[92vh]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image src="/images/hero-ceremony.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-[0.16]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf3e7] via-[#faf3e7]/85 to-[#faf3e7]" />
        </div>

        {/* Fluid chocolate-drizzle motif — flows behind the hero, ties into the header ribbon */}
        <ChocolateDrizzle className="pointer-events-none absolute inset-x-0 top-0 -z-[5] h-40 w-full text-[#c9a24b]/20 lg:h-56" />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-8 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:pt-10">
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2b1a13]/15 bg-white/50 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3f281c] backdrop-blur sm:text-[11px] sm:tracking-[0.2em]">
                ✦ By Ruchi Vaish · Le Cordon Bleu Paris
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display mt-5 text-[clamp(2.35rem,8vw,5rem)] leading-[1.04] text-[#2b1a13] lg:mt-6 lg:leading-[1.02]">
                Every gathering deserves a little
                <span className="relative ml-2 inline-block italic text-[#c9a24b] sm:ml-3">
                  ceremony
                  <svg viewBox="0 0 200 20" className="absolute -bottom-1.5 left-0 w-full text-[#c9a24b] sm:-bottom-2" preserveAspectRatio="none">
                    <path d="M2 15 Q100 2 198 15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                .
              </h1>
            </Reveal>

            {/* Lightweight CSS chocolate motif — mobile only (no 3D bundle shipped to phones) */}
            <HeroVisualMobile />

            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-[#2b1a13]/70 sm:text-lg lg:mx-0 lg:mt-6">
                Chef-crafted desserts, chocolates, pantry essentials and gifting collections, made with exceptional ingredients and without unnecessary preservatives or shortcuts.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:mt-9 lg:justify-start lg:gap-4">
                <Magnetic className="cursor-pointer">
                  <Link
                    href="/shop"
                    className="btn-magnetic inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2b1a13] px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#faf3e7] shadow-[0_20px_40px_-15px_rgba(43,26,19,0.5)] transition hover:bg-[#c9a24b] hover:text-[#2b1a13] sm:w-auto"
                  >
                    Shop the collection
                  </Link>
                </Magnetic>
                <Link href="/bestsellers" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2b1a13]/70 underline decoration-[#c9a24b] decoration-2 underline-offset-8 transition hover:text-[#2b1a13]">
                  See bestsellers
                </Link>
              </div>
            </Reveal>

            {/* Bestseller spotlight — inline on mobile, floating on desktop */}
            {spotlight && (
              <Reveal delay={0.32}>
                <Link
                  href={`/products/${spotlight.slug}`}
                  className="mx-auto mt-7 flex max-w-sm items-center gap-3 rounded-2xl border border-[#2b1a13]/10 bg-white/70 p-2.5 pr-5 shadow-lg backdrop-blur-md transition hover:-translate-y-1 lg:hidden"
                >
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <Image src={spotlight.images[0]} alt={spotlight.name} fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="text-left">
                    <span className="block text-[10px] font-semibold uppercase tracking-wide text-[#c9a24b]">★ Bestseller</span>
                    <span className="font-display block text-base text-[#2b1a13]">{spotlight.name}</span>
                    <span className="block text-xs text-[#2b1a13]/60">From {formatINR(spotlight.priceFrom)}</span>
                  </span>
                </Link>
              </Reveal>
            )}

            <Reveal delay={0.36}>
              <p className="mt-7 text-xs text-[#2b1a13]/50 lg:mt-8">
                🕒 Order before {SITE.sameDayCutoff} for same-day pickup or delivery in Delhi, subject to availability.
              </p>
            </Reveal>
          </div>

          {/* Full 3D chocolate scene — desktop only, only mounted at lg+ */}
          <HeroVisualDesktop
            spotlight={spotlight ? { slug: spotlight.slug, name: spotlight.name, priceFrom: spotlight.priceFrom, image: spotlight.images[0] } : null}
          />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="grain-overlay relative overflow-hidden border-y border-[#2b1a13]/10 bg-[#2b1a13] py-4">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="font-display flex items-center gap-8 text-lg italic text-[#e6cf94]">
              {w} <span className="text-[#c9a24b]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
        <Reveal className="mb-12 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">The collection</p>
          <h2 className="font-display mt-3 text-4xl text-[#2b1a13] sm:text-5xl">Four rituals, one kitchen.</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {categories.map((c, i) => (
            <CategoryTile key={c.id} category={c} index={i} />
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Most loved</p>
            <h2 className="font-display mt-3 text-4xl text-[#2b1a13] sm:text-5xl">Bestsellers</h2>
          </div>
          <Link href="/bestsellers" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2b1a13]/70 underline decoration-[#c9a24b] decoration-2 underline-offset-8 hover:text-[#2b1a13]">
            View all bestsellers →
          </Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {bestsellers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* DIETARY RANGE */}
      <section className="bg-[#eef0e6] py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <Reveal className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6f7d5c]">Crafted for special dietary needs</p>
            <h2 className="font-display mt-3 text-4xl text-[#2b1a13] sm:text-5xl">Indulgence, without compromise.</h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {DIETARY.map((d, i) => (
              <Reveal key={d} delay={i * 0.06}>
                <Link
                  href={`/shop?diet=${encodeURIComponent(d)}`}
                  className="group flex h-full flex-col rounded-[24px] border border-[#6f7d5c]/20 bg-white/70 p-6 transition hover:-translate-y-1.5 hover:border-[#6f7d5c]/60 hover:shadow-[0_20px_40px_-20px_rgba(111,125,92,0.6)]"
                >
                  <span className="text-3xl transition-transform group-hover:scale-110 group-hover:-rotate-6">{DIET_META[d].emoji}</span>
                  <span className="font-display mt-4 text-xl text-[#2b1a13]">{d}</span>
                  <span className="mt-1 text-xs text-[#2b1a13]/55">{DIET_META[d].blurb}</span>
                  <span className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-[#6f7d5c]">{dietCounts[d]} creations →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NOTE FROM RUCHI */}
      <section className="relative bg-[#2b1a13] py-24 text-[#faf3e7]">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <Image src="/images/texture-pattern.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-[32px] shadow-2xl">
              <Image src="/images/about-story.webp" alt="Hands finishing a chocolate cake in the kitchen" fill sizes="(max-width: 1024px) 90vw, 450px" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">A note from Ruchi</p>
            <h2 className="font-display mt-4 text-3xl leading-snug sm:text-4xl">&ldquo;Food has always been my way of bringing people together.&rdquo;</h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#faf3e7]/70 sm:text-base">
              After training at Le Cordon Bleu Paris, I returned with a simple belief: exceptional ingredients, thoughtful craftsmanship, and honest food never go out of style. That belief became Cérémony Kitchen: chef-crafted desserts, chocolates, pantry creations and gifts designed to bring people together and make everyday moments a little more special.
            </p>
            <p className="font-display mt-6 text-xl italic text-[#e6cf94]">Ruchi Vaish, Founder</p>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#c9a24b]/50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#e6cf94] transition hover:bg-[#c9a24b] hover:text-[#2b1a13]">
              Know more →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* GIFT COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Gift collections</p>
            <h2 className="font-display mt-3 text-4xl text-[#2b1a13] sm:text-5xl">Boxed for the moments that matter</h2>
          </div>
          <Link href="/shop/gifting" className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2b1a13]/70 underline decoration-[#c9a24b] decoration-2 underline-offset-8 hover:text-[#2b1a13]">
            All gifting →
          </Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {giftBoxes.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* HOW ORDERING WORKS */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10">
        <Reveal className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">How ordering works</p>
          <h2 className="font-display mt-3 text-3xl text-[#2b1a13] sm:text-4xl">Fresh, made for your date</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            { n: "01", title: "Order a day ahead", text: `We take orders a day in advance. Need it today? Order before ${SITE.sameDayCutoff} for same-day, subject to availability.` },
            { n: "02", title: "Pickup or delivery", text: "Choose a date and time slot. For urgent orders, pickup gives you the most timing flexibility." },
            { n: "03", title: "Surprising someone?", text: "Add the recipient's reachable number so our delivery partner can coordinate the drop-off." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="group h-full rounded-[28px] border border-[#2b1a13]/10 bg-white/60 p-8 transition-all hover:-translate-y-1.5 hover:border-[#c9a24b]/50">
                <span className="font-display text-4xl text-[#c9a24b] transition-transform group-hover:scale-110">{s.n}</span>
                <h3 className="font-display mt-3 text-xl text-[#2b1a13]">{s.title}</h3>
                <p className="mt-2 text-sm text-[#2b1a13]/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-[#2b1a13]/50">
          Read our full <Link href="/policies/shipping-policy" className="underline">shipping</Link> and <Link href="/policies/refund-policy" className="underline">refund</Link> policies.
        </p>
      </section>

      {/* CORPORATE + INSTAGRAM */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 pb-24 sm:px-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-[32px] bg-gradient-to-br from-[#c9a24b] via-[#b9793f] to-[#8a6a2c] p-10 text-[#2b1a13] sm:p-12">
            <div className="absolute -right-10 -top-10 h-48 w-48 animate-float-slow rounded-full border border-[#2b1a13]/15" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2b1a13]/70">Corporate gifting</p>
            <h2 className="font-display mt-3 max-w-md text-3xl leading-snug sm:text-4xl">Diwali, client gifts and celebrations, boxed beautifully.</h2>
            <p className="mt-4 max-w-md text-sm text-[#2b1a13]/75">Two-tier acrylic boxes, curated collections and a dedicated corporate range. Customisation is available to suit your needs.</p>
            <Link href="/corporate" className="mt-8 inline-flex rounded-full bg-[#2b1a13] px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#faf3e7] transition hover:scale-105">
              Explore corporate
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[32px] bg-[#1a100b] p-10 text-[#faf3e7]"
          >
            <Image src="/images/choc-toffee-bark.jpg" alt="" fill sizes="(max-width: 1024px) 90vw, 450px" className="object-cover opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-55" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur transition group-hover:rotate-12"><InstagramIcon size={22} /></span>
            <span className="relative">
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#e6cf94]">Follow the kitchen</span>
              <span className="font-display mt-2 block text-3xl">{SITE.instagramHandle}</span>
            </span>
          </a>
        </Reveal>
      </section>
    </div>
  );
}
