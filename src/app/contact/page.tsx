import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { InstagramIcon, WhatsAppIcon } from "@/components/social-icons";
import { SITE, fullAddress, mailtoUrl, mapsUrl, telUrl, whatsappUrl } from "@/lib/site";

export const metadata = {
  title: "Contact Us",
  description: `Get in touch with Cérémony Kitchen on WhatsApp ${SITE.phoneDisplay} or email ${SITE.email}.`,
};

export default function ContactPage() {
  const channels = [
    { icon: WhatsAppIcon, label: "WhatsApp", value: SITE.phoneDisplay, href: whatsappUrl(), external: true },
    { icon: Phone, label: "Call", value: SITE.phoneDisplay, href: telUrl, external: false },
    { icon: Mail, label: "Email", value: SITE.email, href: mailtoUrl(), external: false },
    { icon: InstagramIcon, label: "Social media", value: SITE.instagramHandle, href: SITE.instagramUrl, external: true },
    { icon: MapPin, label: "Kitchen", value: fullAddress, href: mapsUrl, external: true },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a24b]">Contact us</p>
        <h1 className="font-display mt-3 text-4xl text-[#2b1a13] sm:text-5xl">We'd love to hear from you</h1>
        <p className="mt-4 text-[#2b1a13]/65">
          Whether you have questions about our artisanal chocolate collections, need help with a bespoke order, or want to know more about our dietary options, our team is here to help.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <ul className="flex flex-col gap-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-[#2b1a13]/10 bg-white/60 p-5 transition hover:-translate-y-0.5 hover:border-[#c9a24b]/60"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2b1a13] text-[#e6cf94] transition group-hover:rotate-12">
                    <c.icon size={18} />
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2b1a13]/45">{c.label}</span>
                    <span className="block text-sm text-[#2b1a13]">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-[#2b1a13]/50">
            Orders are taken a day in advance. Order before {SITE.sameDayCutoff} for same-day pickup or delivery, subject to availability.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[32px] border border-[#2b1a13]/10 bg-[#f0e4d0]/50 p-7 sm:p-9">
            <h2 className="font-display mb-6 text-2xl text-[#2b1a13]">Send us a note</h2>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
