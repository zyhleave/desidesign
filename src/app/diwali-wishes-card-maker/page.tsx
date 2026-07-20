import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Diwali Wishes Card Maker – Free AI Greeting Generator | DesiDesign",
  description:
    "Make beautiful Diwali wishes cards with AI. Personalized greeting cards in seconds. Free, no signup. Download & share on WhatsApp, Instagram, or print.",
  keywords: [
    "diwali wishes card maker",
    "diwali greeting card maker",
    "diwali wishes card",
    "diwali card online",
    "diwali greeting card generator",
    "create diwali card",
    "diwali invitation card",
  ],
  openGraph: {
    title: "Diwali Wishes Card Maker – Free AI Greeting Generator",
    description:
      "Create personalized Diwali wishes cards instantly. AI-powered, free, no signup required.",
  },
};

export default function DiwaliWishesCardMaker() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      {/* Hero */}
      <section className="px-4 py-16 max-w-4xl mx-auto text-center">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest uppercase bg-pink-200 text-pink-800 rounded-full">
          100% Free · No Signup · AI-Powered
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Diwali Wishes Card Maker
          <br />
          <span className="text-orange-600">— Free AI Greeting Generator</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Create personalized Diwali wishes cards in seconds with AI. Choose from authentic
          Hindi and English greetings, add your name, and download a share-ready card. Free,
          no signup, no app to install.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/#generator"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition-colors"
          >
            Create Your Diwali Card — Free
          </a>
          <Link
            href="/diwali-card-maker"
            className="inline-block px-8 py-4 text-lg font-semibold text-orange-700 bg-white hover:bg-orange-50 rounded-xl border border-orange-200 transition-colors"
          >
            Browse More Tools →
          </Link>
        </div>
      </section>

      {/* Card Use Cases */}
      <section className="px-4 py-10 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 border border-pink-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Perfect For Every Diwali Occasion
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Family Greeting Cards", icon: "👨‍👩‍👧‍👦" },
              { label: "Business Diwali Wishes", icon: "🏢" },
              { label: "WhatsApp Share Cards", icon: "📱" },
              { label: "Instagram Story Cards", icon: "📸" },
              { label: "Printable Invitations", icon: "✉️" },
              { label: "Customer Thank-You Notes", icon: "🙏" },
            ].map(({ label, icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg"
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-sm font-medium text-gray-800">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            How to Make Your Free Diwali Wishes Card
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Pick a Card Style",
                desc: "Browse our festive card templates: traditional, modern, minimalist, or corporate. All designed for Diwali.",
                icon: "🎨",
              },
              {
                step: "2",
                title: "Personalize Your Greeting",
                desc: "Add your greeting message in Hindi or English, include your name, and customize the colors.",
                icon: "✍️",
              },
              {
                step: "3",
                title: "Download & Share",
                desc: "Get your HD card in seconds. Share on WhatsApp, post to Instagram, or print as a physical card.",
                icon: "📤",
              },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="text-center p-6 bg-pink-50 rounded-2xl">
                <div className="text-4xl mb-3">{icon}</div>
                <div className="inline-block w-8 h-8 leading-8 text-sm font-bold bg-orange-600 text-white rounded-full mb-2">
                  {step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-14 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Why Use Our Diwali Wishes Card Maker?
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              title: "100% Free — No Hidden Charges",
              desc: "Every Diwali card is free to create and download at HD quality. No watermark, no paywall, no signup.",
            },
            {
              title: "AI-Personalized Greetings",
              desc: "Type your name and a greeting — the AI places them beautifully into the card design. Feels handmade, not templated.",
            },
            {
              title: "Authentic Diwali Designs",
              desc: "Every template features real Diwali elements: diyas, rangoli patterns, lotus, gold accents. Designed with cultural accuracy.",
            },
            {
              title: "Hindi & English Greetings",
              desc: "Pre-written greetings in both Hindi (शुभ दीवाली, दीपावली मुबारक) and English. Or write your own custom message.",
            },
            {
              title: "Print-Ready & Web-Ready",
              desc: "Cards come in HD resolution — perfect for printing as physical cards or sharing digitally on social media.",
            },
            {
              title: "Mobile, Tablet, Desktop",
              desc: "Create cards from any device. No app to install, no software to download. Open the page and start designing.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="flex gap-3 p-4 bg-white rounded-xl border border-pink-100">
              <span className="text-orange-500 text-lg mt-0.5">✓</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Greetings */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Sample Diwali Greetings to Get You Started
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { lang: "Hindi", text: "शुभ दीवाली! इस दिवाली आपके जीवन में सुख, समृद्धि और खुशियाँ हमेशा बनी रहें।" },
              { lang: "Hindi", text: "दीपावली मुबारक! रोशनी का यह त्योहार आपके घर में सुख-शांति लेकर आए।" },
              { lang: "English", text: "May the lights of Diwali fill your home with happiness, prosperity, and warmth. Happy Diwali!" },
              { lang: "English", text: "Wishing you and your family a Diwali full of light, laughter, and love. Shubh Deepavali!" },
            ].map(({ lang, text }, idx) => (
              <div
                key={idx}
                className="p-4 bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl border border-pink-100"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">
                  {lang}
                </div>
                <p className="text-gray-800 italic">&ldquo;{text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            More Free Diwali Design Tools
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { href: "/diwali-photo-frame-free", label: "Diwali Photo Frame", desc: "Frame your photo with festive borders" },
              { href: "/happy-diwali-post-generator", label: "Diwali Post Generator", desc: "Make social-media-ready Diwali posts" },
              { href: "/shubh-diwali-wishes-image", label: "Shubh Diwali Wishes", desc: "Quick Hindi wishes images" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="block p-4 bg-pink-50 hover:bg-pink-100 rounded-xl transition-colors border border-pink-100"
              >
                <div className="font-semibold text-orange-700 mb-1">{label}</div>
                <div className="text-sm text-gray-600">{desc} →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-14 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5">
          {[
            {
              q: "Is the Diwali wishes card maker really free?",
              a: "Yes. Every card is free to create and download in HD. No watermark, no signup, no payment needed. You can create unlimited cards.",
            },
            {
              q: "Can I add my name to the card?",
              a: "Yes. When you create a card, you can type your name and the AI will beautifully typeset it into the design as a personalized greeting.",
            },
            {
              q: "What Hindi greetings are available?",
              a: "We offer popular Hindi greetings including: शुभ दीवाली, दीवाली की शुभकामनाएं, दीपावली मुबारक, and more. You can also type your own custom message in Hindi or English.",
            },
            {
              q: "Can I use the card for my business?",
              a: "Yes. Cards are free for personal and small business use. Perfect for sending Diwali wishes to your customers, employees, or business partners.",
            },
            {
              q: "What size are the cards? Can I print them?",
              a: "Cards are HD quality and come in formats suitable for both digital sharing and printing. Standard 5x7 inches print size works well.",
            },
            {
              q: "Do I need to install any app?",
              a: "No. The tool runs entirely in your browser. Open the page on any device — iPhone, Android, tablet, or desktop — and start creating.",
            },
          ].map(({ q, a }) => (
            <details
              key={q}
              className="group bg-white rounded-xl border border-pink-100 open:ring-2 open:ring-pink-200"
            >
              <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-gray-900 list-none">
                {q}
                <span className="ml-4 text-orange-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="px-5 pb-5 text-gray-600 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 text-center bg-gradient-to-r from-pink-500 to-orange-500">
        <div className="max-w-2xl mx-auto text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Diwali Wishes Card Is Ready to Be Made
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of Indian families and small businesses who create personalized
            Diwali cards with DesiDesign — free, fast, and in Hindi or English.
          </p>
          <a
            href="/#generator"
            className="inline-block px-10 py-4 text-lg font-bold text-orange-600 bg-white hover:bg-orange-50 rounded-xl shadow-lg transition-colors"
          >
            Make Your Diwali Card Now — Free
          </a>
        </div>
      </section>
    </main>
  );
}
