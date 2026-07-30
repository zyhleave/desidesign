import type { Metadata } from "next";

const FAQ_ITEMS = [
  {
    question: "Is the haldi invitation card maker really free?",
    answer:
      "Yes, our haldi ceremony invitation maker is completely free to use. You can generate unlimited previews at no cost. The HD print-ready version with AI enhancement is coming soon as a premium feature.",
  },
  {
    question: "Do I need to sign up or create an account?",
    answer:
      "No signup is required. Simply choose a style, enter your details, and click generate to see your haldi invitation instantly. An optional account lets you save your design history.",
  },
  {
    question: "Can I download the invitation as an image?",
    answer:
      "Absolutely. Once your invitation preview is generated, you can download it as a high-quality PNG image directly to your device — no watermarks on the preview version.",
  },
  {
    question: "What is a haldi ceremony and why is it important?",
    answer:
      "The haldi ceremony is a Hindu pre-wedding ritual where turmeric paste is applied to the bride and groom by family and friends. It symbolizes purification, blessing, warding off evil, and welcoming prosperity into the marriage.",
  },
  {
    question: "What styles of haldi invitations are available?",
    answer:
      "We offer three signature styles: Turmeric Gold for classic golden elegance, Marigold Bloom for vibrant orange floral energy, and Mandala Haldi for sacred geometric patterns. Each captures a different mood of the celebration.",
  },
  {
    question: "Can I use these invitations for a pithi ceremony too?",
    answer:
      "Yes, pithi is another name for the same haldi ceremony in different parts of India. Our invitation templates work perfectly for pithi ceremony announcements as well.",
  },
];

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
