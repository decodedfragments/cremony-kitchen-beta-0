import Link from "next/link";
import { notFound } from "next/navigation";
import policies from "@/lib/policies.json";
import { POLICY_LINKS } from "@/lib/site";

type Policy = { title: string; paragraphs: string[] };
const POLICIES = policies as Record<string, Policy>;


export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: POLICIES[slug]?.title ?? "Policy" };
}

function linkify(text: string) {
  const parts = text.split(/(https?:\/\/[^\s)]+?)(?=[.,;]?(?:\s|$))/g);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-all text-[#8a6a2c] underline">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <div className="flex flex-wrap gap-2">
        {POLICY_LINKS.map((p) => (
          <Link
            key={p.slug}
            href={`/policies/${p.slug}`}
            className={`rounded-full border px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide ${
              p.slug === slug ? "border-[#2b1a13] bg-[#2b1a13] text-[#faf3e7]" : "border-[#2b1a13]/15 text-[#2b1a13]/60 hover:border-[#c9a24b]"
            }`}
          >
            {p.label}
          </Link>
        ))}
      </div>
      <h1 className="font-display mt-10 text-4xl text-[#2b1a13]">{policy.title}</h1>
      <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-[#2b1a13]/75">
        {policy.paragraphs.map((p, i) =>
          /^SECTION \d+/.test(p) ? (
            <h2 key={i} className="font-display pt-4 text-xl text-[#2b1a13]">{p}</h2>
          ) : (
            <p key={i}>{linkify(p)}</p>
          ),
        )}
      </div>
    </div>
  );
}
