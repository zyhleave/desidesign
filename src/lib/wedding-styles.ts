export type WeddingStyleId = "boho-sage" | "classic-gold" | "modern-minimal" | "floral-bliss" | "rustic-kraft";

export interface WeddingStyle {
  id: WeddingStyleId;
  name: string;         // e.g. "Boho Sage"
  description: string;   // e.g. "Earthy greens, arch motifs, dried florals"
  gradient: string;     // CSS gradient for swatch
  seoTitle: string;     // e.g. "Boho Wedding Invitation Maker"
  longTail: string;     // 1-sentence description with long-tail keyword
}

export const WEDDING_STYLES: WeddingStyle[] = [
  {
    id: "boho-sage",
    name: "Boho Sage",
    description: "Earthy greens, arch motifs, dried florals",
    gradient: "linear-gradient(135deg, #7c8a6b 0%, #a4b89a 100%)",
    seoTitle: "Boho Wedding Invitation Maker",
    longTail: "Free boho wedding invitation maker — earthy sage tones, dried florals, and arch motifs for your rustic celebration.",
  },
  {
    id: "classic-gold",
    name: "Classic Gold",
    description: "Gold foil on cream, elegant serif elegance",
    gradient: "linear-gradient(135deg, #c9a24b 0%, #e8d5a3 100%)",
    seoTitle: "Classic Wedding Invitation Maker",
    longTail: "Free classic wedding invitation maker — gold foil on cream, timeless serif elegance for your traditional celebration.",
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean lines, sans-serif, monochrome chic",
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #f5f5f5 100%)",
    seoTitle: "Modern Wedding Invitation Maker",
    longTail: "Free modern wedding invitation maker — clean lines, sans-serif typography, and minimalist design for your contemporary wedding.",
  },
  {
    id: "floral-bliss",
    name: "Floral Bliss",
    description: "Watercolor florals, soft pinks, romantic",
    gradient: "linear-gradient(135deg, #e8b4c8 0%, #f5d0d9 100%)",
    seoTitle: "Floral Wedding Invitation Maker",
    longTail: "Free floral wedding invitation maker — watercolor blooms, soft pinks, and romantic touches for your garden or outdoor wedding.",
  },
  {
    id: "rustic-kraft",
    name: "Rustic Kraft",
    description: "Kraft texture, hand-lettered, twine warmth",
    gradient: "linear-gradient(135deg, #c4a882 0%, #d4c4a8 100%)",
    seoTitle: "Rustic Wedding Invitation Maker",
    longTail: "Free rustic wedding invitation maker — kraft paper texture, hand-lettered warmth, and twine details for your countryside celebration.",
  },
];
