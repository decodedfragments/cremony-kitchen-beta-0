"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "./social-icons";
import { SITE, whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with us on WhatsApp ${SITE.phoneDisplay}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08, rotate: -6 }}
      whileTap={{ scale: 0.92 }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_15px_35px_-10px_rgba(37,211,102,0.7)]"
    >
      <WhatsAppIcon size={24} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[160px] group-hover:pr-1">
        Chat with us
      </span>
    </motion.a>
  );
}
