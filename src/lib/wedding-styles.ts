export type WeddingStyleId = "boho-sage" | "classic-gold" | "modern-minimal" | "floral-bliss" | "rustic-kraft";

export interface WeddingStyle {
  id: WeddingStyleId;
  name: string;
  description: string;
  gradient: string;
}

export const WEDDING_STYLES: WeddingStyle[] = [
  {
    id: "boho-sage",
    name: "Boho Sage",
    description: "Earthy greens, arch motifs, dried florals",
    gradient: "linear-gradient(135deg, #7c8a6b 0%, #a4b89a 100%)",
  },
  {
    id: "classic-gold",
    name: "Classic Gold",
    description: "Gold foil on cream, elegant serif elegance",
    gradient: "linear-gradient(135deg, #c9a24b 0%, #e8d5a3 100%)",
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean lines, sans-serif, monochrome chic",
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #f5f5f5 100%)",
  },
  {
    id: "floral-bliss",
    name: "Floral Bliss",
    description: "Watercolor florals, soft pinks, romantic",
    gradient: "linear-gradient(135deg, #e8b4c8 0%, #f5d0d9 100%)",
  },
  {
    id: "rustic-kraft",
    name: "Rustic Kraft",
    description: "Kraft texture, hand-lettered, twine warmth",
    gradient: "linear-gradient(135deg, #c4a882 0%, #d4c4a8 100%)",
  },
];
