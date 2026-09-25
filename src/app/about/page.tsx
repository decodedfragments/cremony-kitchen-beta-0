import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Our Story",
  description: "Cérémony Kitchen was founded by Ruchi Vaish, trained at Le Cordon Bleu Paris, on the belief that the most memorable food is often the most honest.",
};

const CHAPTERS = [
  {
    label: "Roots",
    title: "Food as a language of love",
    text: "Ruchi was raised in a family where food was a language of love, surrounded by generations of passionate home cooks and chefs who understood the power of gathering people around a table.",
  },
  {
    label: "Craft",
    title: "Le Cordon Bleu Paris & beyond",
    text: "To deepen her craft, Ruchi trained at Le Cordon Bleu Paris, then refined her skills through international culinary experiences and extensive research into ingredients, flavour and technique.",
  },
  {
    label: "Philosophy",
    title: "The most memorable food is honest",
    text: "Despite time in some of the world's most celebrated kitchens, she stayed drawn to a simple idea: the most memorable food is often the most honest. That idea became the foundation of Cérémony Kitchen.",
  },
];

const VALUES = [
  { emoji: "🌾", title: "Exceptional ingredients", text: "Every recipe is developed with an uncompromising focus on flavour, texture and quality." },
  { emoji: "✋", title: "No shortcuts", text: "We avoid unnecessary preservatives and shortcuts. Everything is chef-crafted in small batches." },
  { emoji: "🕯️", title: "A little ceremony", text: "Birthdays, festivals, shared meals, thoughtful gifts and the everyday rituals that become lasting memories." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#2b1a13] py-28 text-[#faf3e7]">
        <div className="pointer-events-none absolute inset-0 opacity-15">
          <Image src="/images/texture-pattern.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-[#c9a24b]/15" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Our story</p>
            <h1 className="font-display mt-4 text-[clamp(2.4rem,5vw,4.2rem)] leading-tight">Food is memory, connection and celebration.</h1>
            <p className="mt-6 text-lg leading-relaxed text-[#faf3e7]/75">
              At Cérémony Kitchen, we believe food is more than nourishment. The brand was founded by {SITE.founder}, whose culinary journey began long before professional training.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 py-24 sm:px-10 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-2xl">
            <Image src="/images/about-story.webp" alt="Finishing a chocolate cake by hand" fill sizes="(max-width: 1024px) 90vw, 520px" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">A note from Ruchi</p>
          <h2 className="font-display mt-3 text-3xl text-[#2b1a13] sm:text-4xl">&ldquo;Food has always been my way of bringing people together.&rdquo;</h2>
          <p className="mt-6 leading-relaxed text-[#2b1a13]/70">
            &ldquo;After training at Le Cordon Bleu Paris, I returned with a simple belief: exceptional ingredients, thoughtful craftsmanship, and honest food never go out of style.
          </p>
          <p className="mt-4 leading-relaxed text-[#2b1a13]/70">
            That belief became Cérémony Kitchen: chef-crafted desserts, chocolates, pantry creations and gifts designed to bring people together and make everyday moments a little more special.&rdquo;
          </p>
          <p className="font-display mt-6 text-xl italic text-[#b9793f]">{SITE.founder}, Founder</p>
        </Reveal>
      </section>

      <section className="bg-[#f0e4d0]/50 py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <Reveal className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">The journey</p>
            <h2 className="font-display mt-3 text-4xl text-[#2b1a13]">From a family table to Cérémony</h2>
          </Reveal>
          <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
            {CHAPTERS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <div className="h-full rounded-[24px] border border-[#2b1a13]/10 bg-white/70 p-7 transition-transform hover:-translate-y-1.5">
                  <span className="font-display text-3xl text-[#c9a24b]">0{i + 1}</span>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2b1a13]/45">{step.label}</p>
                  <h3 className="font-display mt-1 text-xl text-[#2b1a13]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#2b1a13]/65">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <Reveal className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Today</p>
          <h2 className="font-display mx-auto mt-3 max-w-2xl text-4xl text-[#2b1a13]">More than a food brand, a celebration of the moments that bring us together</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="group h-full rounded-[28px] border border-[#2b1a13]/10 bg-white/60 p-8 text-center transition-all hover:-translate-y-1.5 hover:border-[#c9a24b]/50">
                <span className="inline-block text-4xl transition-transform group-hover:scale-110 group-hover:rotate-6">{v.emoji}</span>
                <h3 className="font-display mt-4 text-xl text-[#2b1a13]">{v.title}</h3>
                <p className="mt-2 text-sm text-[#2b1a13]/60">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 text-center">
          <p className="font-display mx-auto max-w-2xl text-2xl italic text-[#2b1a13]">
            &ldquo;Good food has the power to transform ordinary occasions into meaningful ones. And every gathering, however small, deserves a little ceremony!&rdquo;
          </p>
          <Link href="/shop" className="mt-10 inline-flex rounded-full bg-[#2b1a13] px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#faf3e7] transition hover:bg-[#c9a24b] hover:text-[#2b1a13]">
            Explore the collection
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
