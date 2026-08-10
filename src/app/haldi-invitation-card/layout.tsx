import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Haldi Ceremony Invitation Card — No Signup | desidesign.me",
  description:
    "Create beautiful haldi ceremony invitation cards online free. Golden turmeric theme, Indian wedding styles, instant download. No signup required.",
  alternates: { canonical: "/haldi-invitation-card" },
  openGraph: {
    title: "Free Haldi Ceremony Invitation Card",
    description:
      "Free haldi card maker — golden theme, Indian wedding invitation styles. Download instantly, no signup.",
  },
};

export default function HaldiInvitationCardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
