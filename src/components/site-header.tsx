"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCartStore, cartCount } from "@/lib/cart-store";
import { useHydrated } from "@/lib/use-hydrated";
import { useBodyLock } from "@/lib/use-body-lock";
import { Magnetic } from "./magnetic-button";
import { HeaderDrizzle } from "./chocolate-drizzle";

const NAV_LINKS = [
  { href: "/shop/cakes", label: "Cakes" },
  { href: "/shop/chocolate", label: "Chocolate" },
  { href: "/shop/pantry", label: "Pantry" },
  { href: "/shop/gifting", label: "Gifting" },
  { href: "/corporate", label: "Corporate" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lines = useCartStore((s) => s.lines);
  const toggleCart = useCartStore((s) => s.toggle);
  const hydrated = useHydrated();
  const count = hydrated ? cartCount(lines) : 0;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useBodyLock(menuOpen);

  // Close the mobile menu after a route change so it never gets "stuck" open.
  const pathname = usePathname();
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#faf3e7]/90 backdrop-blur-md shadow-[0_10px_30px_-15px_rgba(43,26,19,0.3)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative h-9 w-9 shrink-0">
            <Image src="/images/logo-mark.png" alt="Cérémony" fill className="object-contain transition-transform duration-500 group-hover:rotate-45" />
          </span>
          <span className={`font-display text-xl tracking-wide ${scrolled ? "text-[#2b1a13]" : "text-[#2b1a13]"}`}>
            Cérémony<span className="text-[#c9a24b]"> Kitchen</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-[13px] font-medium uppercase tracking-[0.14em] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:bg-[#c9a24b] after:transition-all after:duration-300 hover:text-[#c9a24b] hover:after:w-full ${
                  active ? "text-[#c9a24b] after:w-full" : "text-[#2b1a13]/80 after:w-0"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic
            onClick={toggleCart}
            className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#2b1a13]/15 bg-[#faf3e7] text-[#2b1a13] shadow-sm transition-colors hover:border-[#c9a24b]"
          >
            <ShoppingBag size={18} strokeWidth={1.6} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c46a5a] text-[10px] font-bold text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Magnetic>

          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2b1a13]/15 text-[#2b1a13] lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Fluid chocolate-drizzle accent beneath the bar — appears once scrolled */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-2.5 overflow-hidden transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      >
        <HeaderDrizzle className="h-2.5 w-full text-[#c9a24b]/60" />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-[#1a100b]/97 backdrop-blur-md lg:hidden"
          >
            <HeaderDrizzle className="pointer-events-none absolute inset-x-0 top-24 h-24 w-full text-[#c9a24b]/25" />

            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-lg text-[#faf3e7]">
                Cérémony<span className="text-[#c9a24b]"> Kitchen</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#c9a24b] hover:text-[#c9a24b]"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="relative flex flex-1 flex-col justify-center gap-1 px-6">
              {NAV_LINKS.map((link, i) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`font-display flex items-center justify-between border-b border-white/5 py-3.5 text-[2rem] leading-tight transition-colors ${
                        active ? "text-[#c9a24b]" : "text-[#faf3e7] hover:text-[#e6cf94]"
                      }`}
                    >
                      {link.label}
                      <span className={`text-lg transition-transform ${active ? "translate-x-0 text-[#c9a24b]" : "-translate-x-2 text-[#faf3e7]/30"}`}>→</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative flex items-center gap-3 px-6 pb-8 pt-4"
            >
              <a
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-full border border-white/20 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#faf3e7]"
              >
                Contact
              </a>
              <a
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="flex-1 rounded-full bg-[#c9a24b] py-3.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#2b1a13]"
              >
                Shop now
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
