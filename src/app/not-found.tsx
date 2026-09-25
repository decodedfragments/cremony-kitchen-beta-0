import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-32 text-center">
      <span className="font-display animate-float-slow text-7xl text-[#c9a24b]">404</span>
      <h1 className="font-display mt-6 text-3xl text-[#2b1a13]">This page wandered off the table.</h1>
      <p className="mt-3 text-[#2b1a13]/60">It may have moved when we redesigned. Try the shop or our bestsellers.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/shop" className="rounded-full bg-[#2b1a13] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#faf3e7]">Shop</Link>
        <Link href="/bestsellers" className="rounded-full border border-[#2b1a13]/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#2b1a13]">Bestsellers</Link>
      </div>
    </div>
  );
}
