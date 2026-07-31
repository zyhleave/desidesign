import type { Metadata } from "next";
import Link from "next/link";
import CtaButton from "./cta-button";

export const metadata: Metadata = {
  title: "Wedding Invitation Wording Examples (2026)",
  description:
    "50+ wedding invitation wording examples for every style. Formal, casual, Indian, destination & more.",
  openGraph: {
    title: "Wedding Invitation Wording Examples (2026)",
    description:
      "50+ wording examples for every style — formal, casual, Indian, destination & more.",
  },
};

const scenarios = [
  {
    id: "formal",
    icon: "🤵",
    title: "Formal & Traditional",
    tagline: "Classic wording that works for church weddings, upscale venues, and traditional ceremonies.",
    items: [
      "Together with their families, [Partner 1] and [Partner 2] request the honour of your presence at their marriage celebration.",
      "By the grace of God and with the blessings of their parents, [Partner 1] and [Partner 2] are delighted to invite you to witness their union.",
      "Mr. and Mrs. [Groom's Parents] together with Mr. and Mrs. [Bride's Parents] request the pleasure of your company at the wedding of their children.",
      "You are cordially invited to celebrate the marriage of [Partner 1] and [Partner 2] on [Date] at [Venue]. Create your own →",
    ],
  },
  {
    id: "casual",
    icon: "💍",
    title: "Casual & Modern",
    tagline: "Relaxed, warm wording for outdoor celebrations, garden weddings, or laid-back couples.",
    items: [
      "We're getting married! Join us for a celebration of love, laughter, and happily ever after.",
      "After years of adventures together, [Partner 1] & [Partner 2] are finally saying 'I do.' Come celebrate with us!",
      "Less formal, more fun — that's our vibe. We want you there when we tie the knot on [Date] at [Venue].",
      "Two hearts, one big party. Help us make it official — you're on the guest list. Create your own →",
    ],
  },
  {
    id: "parents",
    icon: "👨‍👩‍👧",
    title: "Parents Hosting",
    tagline: "Traditional wording where the parents of the bride or groom formally host and invite guests.",
    items: [
      "Mr. and Mrs. [Last Name] request the honour of your presence at the wedding of their daughter [Partner 1] to [Partner 2].",
      "With full hearts and great joy, Mr. and Mrs. [Last Name] invite you to celebrate the wedding of their son [Partner 1].",
      "The families of Mr. and Mrs. [Groom's Last Name] and Mr. and Mrs. [Bride's Last Name] are delighted to invite you to witness this joyous union.",
      "Your presence is requested at the marriage of their daughter [Partner 1] to [Partner 2]. Create your own →",
    ],
  },
  {
    id: "couple",
    icon: "💕",
    title: "Couple Hosting",
    tagline: "Modern wording where the couple themselves invites guests — perfect for intimate or destination weddings.",
    items: [
      "[Partner 1] and [Partner 2] invite you to celebrate their wedding day. We can't wait to share it with you!",
      "We're writing our own story — and we'd love for you to be part of it. Join us on [Date] at [Venue].",
      "No stuffy formalities, just us, our favourite people, and a whole lot of love. Will you be there?",
      "Help us start our forever. You're invited to the wedding of [Partner 1] & [Partner 2]. Create your own →",
    ],
  },
  {
    id: "destination",
    icon: "✈️",
    title: "Destination Wedding",
    tagline: "For couples getting married somewhere special — beach resorts, foreign cities, or faraway places.",
    items: [
      "Pack your bags! We're getting married in [Location]. Your presence would make our destination celebration complete.",
      "Leave the ordinary behind. [Partner 1] & [Partner 2] are flying to [Location] to say 'I do' — and you're on the guest list.",
      "It's not a vacation, it's our wedding — in [Location]! We know it's a journey, but we promise it's worth every mile.",
      "Say goodbye to routine and hello to [Location] — where we're getting married on [Date]. Create your own →",
    ],
  },
  {
    id: "second",
    icon: "🌅",
    title: "Second Marriage",
    tagline: "Dignified, hopeful wording for couples celebrating a new chapter together with grace and warmth.",
    items: [
      "Love is sweeter the second time around. [Partner 1] and [Partner 2] are grateful to have found each other and invite you to celebrate.",
      "Having found new love later in life, [Partner 1] and [Partner 2] are joyfully beginning their forever — and they'd love you to be there.",
      "Not all love stories are the same, and that's the beauty of it. We invite you to witness our new beginning.",
      "Life gave us a second chance at happiness. Help us celebrate it. Create your own →",
    ],
  },
  {
    id: "short",
    icon: "📱",
    title: "Short & Sweet",
    tagline: "Bite-sized wording for WhatsApp forwards, Instagram captions, or save-the-date cards.",
    items: [
      "Save the date: [Date]. More details to come! 💍",
      "We're getting married! Join us on [Date] at [Venue].",
      "Save the date — [Partner 1] & [Partner 2] are tying the knot on [Date]!",
      "He said yes. So will you come? [Date] · [Venue]. Create your own →",
    ],
  },
  {
    id: "indian",
    icon: "🪔",
    title: "Indian & Hindu Wedding",
    tagline: "Traditional Hindi/English bilingual wording rooted in Hindu ceremony customs — your cultural edge.",
    items: [
      "With the blessings of Lord Ganesh, the families of [Groom's Family] and [Bride's Family] invite you to the wedding of their children.",
      "Om Mangalam — By the grace of God, we invite you to celebrate the sacred union of [Partner 1] and [Partner 2] in holy matrimony.",
      "As per Hindu tradition, we seek your blessed presence at the wedding ceremony of our son/daughter [Partner 1] with [Partner 2] on [Date] at [Venue].",
      "Shubh Vivah — With the permission of the almighty, [Partner 1] and [Partner 2] seek your blessings for a beautiful wedding ceremony. Create your own →",
    ],
  },
];

export default function WeddingInvitationWording() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50">
      {/* Hero */}
      <section className="px-4 py-16 max-w-4xl mx-auto text-center">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest uppercase bg-amber-100 text-amber-800 rounded-full">
          50+ Examples · Free to Use
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Wedding Invitation Wording
          <br />
          <span className="text-amber-700">Examples & Ideas</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Finding the right words for your wedding invitation? Browse examples
          for every style — from formal church ceremonies to Hindu rituals, casual
          beach parties to WhatsApp save-the-dates. Pick one, personalise it, done.
        </p>
      </section>

      {/* Scenarios */}
      <section className="px-4 pb-20 max-w-4xl mx-auto space-y-16">
        {scenarios.map((scenario) => (
          <div key={scenario.id}>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{scenario.icon}</span>
              <h2 className="text-2xl font-bold text-gray-900">
                {scenario.title}
              </h2>
            </div>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              {scenario.tagline}
            </p>

            {/* Wording cards */}
            <div className="space-y-3">
              {scenario.items.map((text, i) => {
                const isLast = i === scenario.items.length - 1;
                return (
                  <div
                    key={i}
                    className={`relative rounded-xl p-5 ${
                      isLast
                        ? "bg-amber-50 border-2 border-amber-200"
                        : "bg-white border border-gray-100"
                    }`}
                  >
                    <p className="text-gray-800 text-sm leading-relaxed italic">
                      &ldquo;{text}&rdquo;
                    </p>
                    {isLast && (
                      <Link
                        href="/wedding-invitation-maker"
                        className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                      >
                        Create your own →
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="bg-white border-t border-gray-100 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4 uppercase tracking-widest font-semibold">
            Your invitation, your way
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Design Your Free Wedding Invitation
          </h2>
          <p className="text-gray-600 mb-8">
            Choose a style, add your names and date, and download a beautiful
            wedding card in minutes. No signup, no cost — just pick and personalise.
          </p>
          <CtaButton href="/wedding-invitation-maker" />
        </div>
      </section>

      {/* Other tools */}
      <section className="py-12 px-4 bg-stone-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6 font-semibold">
            More free tools on DesiDesign
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-5 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-amber-400 hover:text-amber-700 transition-colors"
            >
              ← Back to Home
            </Link>
            <Link
              href="/haldi-ceremony-invitation"
              className="px-5 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-yellow-400 hover:text-yellow-700 transition-colors"
            >
              Haldi Invitation Maker
            </Link>
            <Link
              href="/happy-diwali-post-generator"
              className="px-5 py-2 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:border-orange-400 hover:text-orange-700 transition-colors"
            >
              Diwali Post Generator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
