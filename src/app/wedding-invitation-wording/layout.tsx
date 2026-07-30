import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Invitation Wording - 50+ Examples & Templates",
  description:
    "Browse 50+ wedding invitation wording examples for Indian ceremonies. Traditional, modern, and fusion styles. Copy-paste ready templates for your cards.",
  alternates: { canonical: "/wedding-invitation-wording" },
  openGraph: {
    title: "Wedding Invitation Wording Examples",
    description:
      "Find the perfect wedding invitation wording for your ceremony. 50+ examples in traditional, modern, and fusion styles.",
  },
};

export default function WeddingWordingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
