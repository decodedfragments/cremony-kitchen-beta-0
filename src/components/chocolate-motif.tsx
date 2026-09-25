"use client";

import { motion } from "framer-motion";

/**
 * Pure CSS/SVG chocolate praline motif — lightweight, used on mobile instead of
 * the Three.js canvas so we never ship the 3D bundle to small screens.
 */
export function ChocolateMotif({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* soft glow */}
      <div className="absolute h-40 w-40 rounded-full bg-[#c9a24b]/20 blur-2xl" />

      {/* orbiting ring of gold flecks */}
      <div className="absolute h-44 w-44 animate-spin-slow">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a24b]"
            style={{ transform: `rotate(${deg}deg) translateY(-88px)` }}
          />
        ))}
      </div>

      {/* the praline */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        className="relative h-32 w-32 animate-float-slow"
      >
        <div className="absolute inset-0 rounded-[42%_42%_46%_46%/_60%_60%_40%_40%] bg-gradient-to-br from-[#5a3a26] via-[#3a2318] to-[#2b1a13] shadow-[0_18px_40px_-12px_rgba(43,26,19,0.7),inset_-8px_-10px_20px_rgba(0,0,0,0.4),inset_8px_8px_18px_rgba(201,162,75,0.15)]" />
        {/* glossy highlight */}
        <div className="absolute left-6 top-5 h-8 w-10 rounded-full bg-white/20 blur-[3px]" />
        {/* gold leaf */}
        <div className="absolute -right-1 top-3 h-5 w-5 rotate-12 rounded-sm bg-gradient-to-br from-[#e6cf94] to-[#c9a24b] shadow-md" />
        {/* drizzle swirl */}
        <svg viewBox="0 0 100 60" className="absolute -top-3 left-1/2 h-8 w-16 -translate-x-1/2 text-[#c9a24b]">
          <path d="M8 40 C 25 10, 45 55, 60 25 S 90 15, 94 38" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* small floating truffles */}
      <span className="absolute -left-2 top-6 h-6 w-6 animate-float-slower rounded-full bg-gradient-to-br from-[#4a2e1f] to-[#2b1a13] shadow-md" />
      <span className="absolute bottom-6 right-0 h-8 w-8 animate-float-slow rounded-full bg-gradient-to-br from-[#c46a5a] to-[#8a4a3d] shadow-md" />
      <span className="absolute -bottom-1 left-8 h-4 w-4 animate-float-slower rounded-full bg-gradient-to-br from-[#e6cf94] to-[#c9a24b] shadow" />
    </div>
  );
}
