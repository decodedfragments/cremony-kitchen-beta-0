"use client";

import { motion } from "framer-motion";

/**
 * A fluid chocolate-drizzle ribbon. Used as a lightweight, animated motif that
 * ties the header and hero together — replaces heavy 3D on small screens.
 */
export function ChocolateDrizzle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 200"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M0 90 C 150 30, 280 150, 430 90 S 720 30, 870 100 S 1080 150, 1200 80"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.19, 1, 0.22, 1] }}
      />
      <motion.path
        d="M0 120 C 180 70, 320 170, 500 120 S 780 70, 940 130 S 1100 170, 1200 110"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
      />
    </svg>
  );
}

/**
 * A slimmer, always-on animated drizzle line for the header — flows subtly
 * beneath the nav to give the header its own gentle motion on every page.
 */
export function HeaderDrizzle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1200 40" fill="none" preserveAspectRatio="none" aria-hidden>
      <motion.path
        d="M0 22 C 160 6, 300 34, 460 20 S 760 6, 920 24 S 1080 34, 1200 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
      />
    </svg>
  );
}
