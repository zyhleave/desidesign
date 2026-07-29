import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Invitation Maker - Free Online Card Generator",
  description:
    "Create stunning wedding invitation cards online free. Choose from elegant, traditional, and modern Indian wedding designs. Instant preview, download in seconds.",
  openGraph: {
    title: "Wedding Invitation Maker",
    description:
      "Free wedding card maker for Indian weddings — browse styles, preview designs, and download your perfect invitation.",
  },
};

export default function WeddingMakerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
