import { LandingPage, buildMetadata, type LandingPageData } from "@/components/landing/LandingPage";

const data: LandingPageData = {
  slug: "diwali-card-maker",
  h1: "Free Diwali Card Maker Online",
  metaTitle: "Diwali Card Maker Online — Free AI Design for Indian Businesses",
  metaDescription:
    "Create beautiful Diwali cards in 30 seconds. AI-generated scenes, pixel-perfect text, culturally accurate. Free preview, ₹99 to unlock HD.",
  heroSubtitle:
    "Design a Diwali card that looks made-in-India, not AI-plastic. Pick a scene, add your greeting, and download in seconds.",
  ctaLabel: "Start creating",
  bullets: [
    "Made for Indian small businesses, D2C brands, and creators",
    "Culturally accurate: real diyas, rangoli, marigolds — not generic clip-art",
    "Text is rendered separately, so no wrong Hindi and no AI garble",
    "Free preview, ₹99 to unlock high-resolution downloads",
  ],
  useCases: [
    {
      title: "Shop owners",
      desc: "Post Diwali greetings for customers on Instagram, WhatsApp, and shopfront prints.",
    },
    {
      title: "D2C brands",
      desc: "Warm brand cards for email newsletters and social channels.",
    },
    {
      title: "Individuals",
      desc: "Send family Diwali wishes with your own name and photo.",
    },
  ],
  faqs: [
    {
      q: "Is DesiDesign really free?",
      a: "Yes, you get free previews. To download the high-resolution version, unlock HD for ₹99 per card.",
    },
    {
      q: "Do I need design skills?",
      a: "No. Choose a scene, type your greeting, and DesiDesign handles the layout for you.",
    },
    {
      q: "Can I use it for my business?",
      a: "Yes, all cards created on DesiDesign are safe for business use, including sales, offers, and brand posts.",
    },
    {
      q: "Will the text look right in Hindi?",
      a: "Yes. Text is rendered by our own type system, not by the AI model, so there is no misspelling or AI garble.",
    },
    {
      q: "What resolution do I get?",
      a: "Free preview is web quality. The paid HD download is optimised for print, Instagram, and WhatsApp status.",
    },
  ],
  relatedSlugs: [
    "diwali-photo-frame-free",
    "happy-diwali-post-generator",
  ],
};

export const metadata = buildMetadata(data);

export default function Page() {
  return <LandingPage data={data} />;
}
