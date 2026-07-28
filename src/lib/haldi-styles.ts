export type HaldiStyleId = "turmeric-gold" | "marigold-bloom" | "mandala-haldi";

export interface HaldiStyle {
  id: HaldiStyleId;
  name: string;
  description: string;
  gradient: string;     // CSS gradient for swatch
  seoTitle: string;
  longTail: string;
}

export const HALDI_STYLES: HaldiStyle[] = [
  {
    id: "turmeric-gold",
    name: "Turmeric Gold",
    description: "Golden turmeric tones, elegant border, festive warmth",
    gradient: "linear-gradient(135deg, #d4a017 0%, #f9d976 100%)",
    seoTitle: "Haldi Ceremony Invitation Maker",
    longTail: "Free haldi ceremony invitation maker — golden turmeric tones, traditional borders, and festive warmth for your haldi celebration.",
  },
  {
    id: "marigold-bloom",
    name: "Marigold Bloom",
    description: "Marigold flowers, orange petals, vibrant celebration",
    gradient: "linear-gradient(135deg, #ff9800 0%, #ffcc80 100%)",
    seoTitle: "Haldi Card Maker with Marigold Designs",
    longTail: "Free haldi card maker — marigold flower motifs, vibrant orange petals, and festive designs for your haldi ceremony.",
  },
  {
    id: "mandala-haldi",
    name: "Mandala Haldi",
    description: "Mandala patterns, turmeric yellow, sacred geometry",
    gradient: "linear-gradient(135deg, #d4a017 0%, #e63946 100%)",
    seoTitle: "Haldi Invitation Card Generator",
    longTail: "Free haldi invitation card generator — mandala patterns, turmeric yellow backgrounds, and sacred geometry for your traditional haldi ceremony.",
  },
];
