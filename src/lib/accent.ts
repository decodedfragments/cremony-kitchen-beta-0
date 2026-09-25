export type AccentKey = "cocoa" | "gold" | "sage" | string;

export const accentGradient: Record<string, string> = {
  cocoa: "from-[#5a3a26] via-[#3f281c] to-[#1a100b]",
  gold: "from-[#e6cf94] via-[#c9a24b] to-[#8a6a2c]",
  sage: "from-[#c3d0ae] via-[#8fa072] to-[#586647]",
};

export const accentSolid: Record<string, string> = {
  cocoa: "#3f281c",
  gold: "#c9a24b",
  sage: "#6f7d5c",
};

export const accentText: Record<string, string> = {
  cocoa: "text-[#f0e4d0]",
  gold: "text-[#3f281c]",
  sage: "text-[#f0e4d0]",
};

export function getAccentGradient(accent: string): string {
  return accentGradient[accent] ?? accentGradient.cocoa;
}

export function getAccentSolid(accent: string): string {
  return accentSolid[accent] ?? accentSolid.cocoa;
}

export function getAccentText(accent: string): string {
  return accentText[accent] ?? accentText.cocoa;
}

export const categoryEmoji: Record<string, string> = {
  cakes: "🎂",
  chocolate: "🍫",
  pantry: "🍯",
  gifting: "🎁",
};
