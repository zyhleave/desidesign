import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Sangeet Ceremony Invitation Card — No Signup | desidesign.me",
  description:
    "Create beautiful sangeet ceremony invitation cards online free. Bollywood theme, Indian wedding styles, instant download. No signup required.",
  alternates: { canonical: "/sangeet-invitation-card" },
  openGraph: {
    title: "Free Sangeet Ceremony Invitation Card",
    description:
      "Free sangeet card maker — Bollywood theme, Indian wedding invitation styles. Download instantly, no signup.",
  },
};

export default function SangeetInvitationCardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
