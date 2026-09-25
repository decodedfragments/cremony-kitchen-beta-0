import Image from "next/image";
import { Reveal, RevealStagger } from "@/components/reveal";
import { InstagramIcon } from "@/components/social-icons";

export const metadata = { title: "Brand World" };

const PALETTE = [
  { name: "Espresso", hex: "#1a100b", text: "#faf3e7", use: "Deep backgrounds, footers" },
  { name: "Cocoa", hex: "#2b1a13", text: "#faf3e7", use: "Primary text, buttons" },
  { name: "Caramel", hex: "#b9793f", text: "#1a100b", use: "Secondary accents" },
  { name: "Ceremony Gold", hex: "#c9a24b", text: "#1a100b", use: "Highlights, CTAs, borders" },
  { name: "Soft Gold", hex: "#e6cf94", text: "#1a100b", use: "Light accents, hover states" },
  { name: "Rose Clay", hex: "#c46a5a", text: "#faf3e7", use: "Alerts, playful accents" },
  { name: "Sage", hex: "#6f7d5c", text: "#faf3e7", use: "Pantry / wellness range" },
  { name: "Cream", hex: "#faf3e7", text: "#2b1a13", use: "Primary background" },
];

const VOICE = [
  { title: "Warm, not loud", text: "We speak like a chef plating for a guest — confident, unhurried, generous." },
  { title: "Sensory & specific", text: "Clean snap. Fudgy and creamy. Melts effortlessly on the palate. We describe texture and craft, not just taste." },
  { title: "Ritual over transaction", text: "We sell moments and ceremonies, never just SKUs — every caption earns its place." },
];

const SOCIAL_GRID = [
  { emoji: "🎂", label: "Signature Cake", bg: "from-[#5a3a26] to-[#2b1a13]" },
  { emoji: "✦", label: "Behind The Craft", bg: "from-[#c9a24b] to-[#8a6a2c]" },
  { emoji: "🍫", label: "Toffee Bark", bg: "from-[#3f281c] to-[#1a100b]" },
  { emoji: "🎁", label: "Gifting Edit", bg: "from-[#c46a5a] to-[#8a4a3d]" },
  { emoji: "🍯", label: "Pantry Ritual", bg: "from-[#8fa072] to-[#586647]" },
  { emoji: "💬", label: "Customer Love", bg: "from-[#e6cf94] to-[#b9793f]" },
];

export default function BrandPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#faf3e7] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Brand World</p>
            <h1 className="font-display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-tight text-[#2b1a13]">
              One ceremony, everywhere it shows up.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[#2b1a13]/65">
              This is the visual and verbal system behind Cérémony Kitchen — built once here, and
              reusable across the website, Instagram, packaging, WhatsApp catalogues and print.
            </p>
          </Reveal>
        </div>
      </section>

      {/* LOGO */}
      <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <Reveal className="mb-10">
          <h2 className="font-display text-3xl text-[#2b1a13]">Mark &amp; Wordmark</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] bg-[#2b1a13] p-10">
            <span className="relative h-16 w-16"><Image src="/images/logo-mark.webp" alt="Mark" fill className="object-contain" /></span>
            <span className="font-display text-2xl text-[#faf3e7]">Cérémony<span className="text-[#c9a24b]"> Kitchen</span></span>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] border border-[#2b1a13]/10 bg-white p-10">
            <span className="relative h-16 w-16"><Image src="/images/logo-mark.webp" alt="Mark" fill className="object-contain" /></span>
            <span className="font-display text-2xl text-[#2b1a13]">Cérémony<span className="text-[#c9a24b]"> Kitchen</span></span>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] bg-gradient-to-br from-[#c9a24b] to-[#8a6a2c] p-10">
            <span className="relative h-16 w-16 rounded-full bg-[#2b1a13] p-3"><Image src="/images/logo-mark.webp" alt="Mark" fill className="object-contain p-3" /></span>
            <span className="font-display text-2xl text-[#2b1a13]">Cérémony</span>
          </div>
        </div>
        <p className="mt-5 text-sm text-[#2b1a13]/55">
          The ring mark represents the ceremonial circle — used alone as an avatar/favicon, or paired
          with the wordmark for full lockups. Keep clear space equal to the ring&apos;s radius on all sides.
        </p>
      </section>

      {/* PALETTE */}
      <section className="bg-[#f0e4d0]/50 py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <Reveal className="mb-10">
            <h2 className="font-display text-3xl text-[#2b1a13]">Colour Palette</h2>
            <p className="mt-2 text-[#2b1a13]/60">Warm, editorial, a little indulgent — never neon, never cold.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {PALETTE.map((c) => (
              <div key={c.hex} className="overflow-hidden rounded-2xl border border-[#2b1a13]/10">
                <div className="flex h-28 items-end p-4" style={{ backgroundColor: c.hex, color: c.text }}>
                  <span className="text-xs font-semibold uppercase tracking-wide">{c.hex}</span>
                </div>
                <div className="bg-white p-4">
                  <p className="font-display text-lg text-[#2b1a13]">{c.name}</p>
                  <p className="mt-1 text-xs text-[#2b1a13]/50">{c.use}</p>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* TYPOGRAPHY */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <Reveal className="mb-10">
          <h2 className="font-display text-3xl text-[#2b1a13]">Typography</h2>
          <p className="mt-2 text-[#2b1a13]/60">Fraunces for voice and personality, Manrope for clarity.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-[#2b1a13]/10 bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#c9a24b]">Display — Fraunces</p>
            <p className="font-display mt-4 text-5xl italic text-[#2b1a13]">Aa</p>
            <p className="font-display mt-4 text-2xl text-[#2b1a13]">Every gathering deserves a little ceremony</p>
          </div>
          <div className="rounded-[28px] border border-[#2b1a13]/10 bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#c9a24b]">Body — Manrope</p>
            <p className="mt-4 text-5xl font-semibold text-[#2b1a13]">Aa</p>
            <p className="mt-4 text-base text-[#2b1a13]/75">
              Clean, warm and highly legible for product descriptions, UI and captions across every
              channel — from the website to WhatsApp order confirmations.
            </p>
          </div>
        </div>
      </section>

      {/* VOICE */}
      <section className="bg-[#2b1a13] py-24 text-[#faf3e7]">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <Reveal className="mb-10">
            <h2 className="font-display text-3xl">Voice &amp; Tone</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VOICE.map((v) => (
              <div key={v.title} className="rounded-[24px] border border-white/10 bg-white/5 p-7">
                <h3 className="font-display text-xl text-[#e6cf94]">{v.title}</h3>
                <p className="mt-2 text-sm text-[#faf3e7]/65">{v.text}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* SOCIAL TEMPLATES */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
        <Reveal className="mb-10">
          <h2 className="font-display text-3xl text-[#2b1a13]">Social &amp; Marketing Templates</h2>
          <p className="mt-2 text-[#2b1a13]/60">
            The same ring motif, gradients and type carry across Instagram grids, story highlights,
            packaging and ad creative — so every touchpoint feels unmistakably Cérémony.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="mx-auto w-full max-w-[280px] rounded-[36px] border-8 border-[#2b1a13] bg-[#faf3e7] p-3 shadow-2xl">
              <div className="flex items-center gap-2 px-2 pb-3 pt-1">
                <span className="relative h-7 w-7"><Image src="/images/logo-mark.webp" alt="" fill className="object-contain" /></span>
                <div>
                  <p className="text-xs font-semibold text-[#2b1a13]">ceremonykitchen_</p>
                  <p className="text-[10px] text-[#2b1a13]/50">Chef-crafted · New Delhi</p>
                </div>
                <InstagramIcon size={14} />
              </div>
              <div className="grid grid-cols-3 gap-1">
                {SOCIAL_GRID.map((tile) => (
                  <div
                    key={tile.label}
                    className={`flex aspect-square flex-col items-center justify-center gap-1 bg-gradient-to-br text-center ${tile.bg}`}
                  >
                    <span className="text-lg">{tile.emoji}</span>
                    <span className="px-1 text-[7px] font-semibold uppercase tracking-wide text-white/90">{tile.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                <Image src="/images/cake-signature.jpg" alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a100b] via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-[#faf3e7]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e6cf94]">New Drop</p>
                  <p className="font-display text-xl">Signature Chocolate Cake</p>
                </div>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#c9a24b] to-[#8a6a2c] p-6">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-[#2b1a13]/10" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2b1a13]/70">Festive Edit</p>
                <p className="font-display mt-3 text-2xl text-[#2b1a13]">Two-tier gift boxes, made for Diwali.</p>
                <p className="mt-3 text-xs text-[#2b1a13]/70">Customisation available for corporate gifting.</p>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#1a100b] p-6 text-[#faf3e7] sm:col-span-2">
                <div className="absolute inset-0 opacity-20">
                  <Image src="/images/texture-pattern.jpg" alt="" fill className="object-cover" />
                </div>
                <div className="relative flex h-full flex-col justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Reel Cover Template</p>
                  <div>
                    <p className="font-display text-3xl italic">&ldquo;Every gathering, however small, deserves a little ceremony.&rdquo;</p>
                    <p className="mt-2 text-xs text-[#faf3e7]/60">Consistent caption sign-off across every platform.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PLATFORM RECOMMENDATION */}
      <section className="bg-[#f0e4d0]/50 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-10">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Beyond Shopify</p>
            <h2 className="font-display mt-3 text-3xl text-[#2b1a13] sm:text-4xl">
              A flexible, headless foundation
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[#2b1a13]/65">
              This entire experience is built on Next.js with a real database — the same brand system
              you see here can extend into a fully composable commerce backend such as{" "}
              <strong>Medusa.js</strong> or <strong>Shopify Hydrogen</strong>, giving you complete design
              freedom while keeping secure checkout, inventory and order management.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
