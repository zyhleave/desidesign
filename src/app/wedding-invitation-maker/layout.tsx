import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Invitation Maker - Free Online Card Generator",
  description:
    "Create stunning wedding invitation cards online free. Choose from elegant, traditional, and modern Indian wedding designs. Instant preview, download in seconds.",
  alternates: { canonical: "/wedding-invitation-maker" },
  openGraph: {
    title: "Wedding Invitation Maker",
    description:
      "Free wedding card maker for Indian weddings — browse styles, preview designs, and download your perfect invitation.",
  },
};

const FAQ_ITEMS = [
  {
    question: "Is the wedding invitation maker completely free?",
    answer:
      "Yes, our wedding invitation maker is 100% free to use. You can generate unlimited previews, personalise your card, and download the image — all at no cost.",
  },
  {
    question: "Do I need to sign up to create an invitation?",
    answer:
      "No signup is required. Simply open the page, pick a style, fill in the names and date, and generate your invitation instantly.",
  },
  {
    question: "What wedding styles are available?",
    answer:
      "We offer four wedding card styles: Boho Sage for earthy elegance, Royal Burgundy for traditional grandeur, Floral Blush for soft romantic vibes, and Modern Gold for minimalist luxury.",
  },
  {
    question: "Can I use this for Indian or Hindu wedding invitations?",
    answer:
      "Absolutely. Our invitation maker is designed for Indian weddings — from Hindu ceremonies to Christian weddings to modern fusion celebrations.",
  },
  {
    question: "What sizes and formats can I download?",
    answer:
      "Invitations are generated as high-resolution PNG images, perfect for sharing on WhatsApp, Instagram, or printing as a card.",
  },
  {
    question: "Can I add my own custom text to the invitation?",
    answer:
      "Yes. You can personalise the bride and groom names, wedding date, venue, and add a short greeting message. All fields are editable before you generate.",
  },
];

export default function WeddingMakerLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
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
