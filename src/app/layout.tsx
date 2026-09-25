import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartDrawer } from "@/components/cart-drawer";
import { ScrollProgress } from "@/components/scroll-progress";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { SITE } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Cérémony Kitchen | Gourmet Gifts & Handcrafted Treats",
    template: "%s | Cérémony Kitchen",
  },
  description: SITE.description,
  openGraph: {
    title: "Cérémony Kitchen",
    description: SITE.description,
    type: "website",
    locale: "en_IN",
    siteName: "Cérémony Kitchen",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: SITE.legalName,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phoneE164,
  founder: { "@type": "Person", name: SITE.founder },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.line1,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: "IN",
  },
  sameAs: [SITE.instagramUrl],
  priceRange: "₹₹",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-[#faf3e7] text-[#2b1a13] antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <ScrollProgress />
        <SiteHeader />
        <CartDrawer />
        <main className="pt-[76px]">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
