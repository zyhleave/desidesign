import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Invitation Maker - Free Online Card Generator | desidesign.me",
  description:
    "Create beautiful wedding invitation cards online free. Choose from Boho Sage, Classic Gold, Floral Bliss, Modern Minimal & Rustic Kraft designs. Instant download, no signup.",
  alternates: { canonical: "/wedding-invitation-maker" },
  openGraph: {
    title: "Free Wedding Invitation Maker — Online & Instant",
    description:
      "Free wedding card maker — elegant Indian designs, instant download, no design skills needed.",
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
      "We offer five wedding card styles: Boho Sage for earthy elegance, Classic Gold for traditional grandeur, Modern Minimal for clean contemporary vibes, Floral Bliss for soft romantic gardens, and Rustic Kraft for countryside celebrations.",
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

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
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
