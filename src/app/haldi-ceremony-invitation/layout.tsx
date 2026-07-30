import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haldi Ceremony Invitation Maker - Free Online Generator",
  description:
    "Create beautiful haldi ceremony invitation cards online free. Choose from turmeric gold, marigold, and mandala designs. Instant download, no signup.",
  alternates: { canonical: "/haldi-ceremony-invitation" },
  openGraph: {
    title: "Haldi Ceremony Invitation Maker",
    description:
      "Free haldi card maker — golden turmeric tones, marigold blooms, and mandala patterns for your haldi ceremony.",
  },
};

export default function HaldiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
