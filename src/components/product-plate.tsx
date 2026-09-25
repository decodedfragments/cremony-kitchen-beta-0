import Image from "next/image";
import { getAccentGradient, categoryEmoji } from "@/lib/accent";

export function ProductPlate({
  image,
  accent,
  categorySlug,
  name,
  className = "",
  priority = false,
}: {
  image: string;
  accent: string;
  categorySlug: string;
  name: string;
  className?: string;
  priority?: boolean;
}) {
  const emoji = categoryEmoji[categorySlug] ?? "✦";

  if (image) {
    return (
      <div className={`relative overflow-hidden rounded-[28px] ${className}`}>
        <Image
          src={image}
          alt={name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 90vw, 400px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br ${getAccentGradient(
        accent,
      )} ${className}`}
    >
      <div className="absolute inset-0 ring-motif opacity-70" />
      <div className="absolute -inset-6 rounded-full border border-white/10" />
      <div className="absolute inset-8 rounded-full border border-white/15 transition-transform duration-700 ease-out group-hover:rotate-45" />
      <span className="relative text-6xl drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6">
        {emoji}
      </span>
    </div>
  );
}
