import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Happy Diwali Post Generator – AI-Powered | DesiDesign",
  description:
    "Create share-ready Happy Diwali posts for Instagram, WhatsApp & Facebook in seconds. Free online tool — no signup. Hindu calendar accurate. Try it now.",
  keywords: [
    "happy diwali post generator",
    "happy diwali post maker",
    "diwali social media post",
    "diwali post for business",
    "diwali greeting post online",
    "diwali wishes post free",
  ],
  openGraph: {
    title: "Free Happy Diwali Post Generator – AI-Powered",
    description:
      "Generate festive Diwali posts for any platform. Free, no signup, Hindu calendar accurate.",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }],
  },
};

export default function HappyDiwaliPostGenerator() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero */}
      <section className="px-4 py-16 max-w-4xl mx-auto text-center">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest uppercase bg-orange-200 text-orange-800 rounded-full">
          100% Free · No Signup
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Free Happy Diwali Post Generator
          <br />
          <span className="text-orange-600">— For Instagram, WhatsApp & Facebook</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Type your Diwali wish, pick a festive template, and download a post
          sized for any platform. No app to install, no account to create.
          Hindu calendar accurate designs — every diya, rangoli, and motif placed
          respectfully.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/#generator"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition-colors"
          >
            Generate Your Diwali Post — Free
          </a>
          <Link
            href="/diwali-photo-frame-free"
            className="inline-block px-8 py-4 text-lg font-semibold text-orange-700 bg-white hover:bg-orange-50 rounded-xl border border-orange-200 transition-colors"
          >
            Browse More Tools →
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            How to Generate a Happy Diwali Post
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Pick a Platform & Template",
                desc: "Choose Instagram square, WhatsApp Status, or Facebook cover. Browse festive templates: diya borders, gold accents, rangoli backgrounds.",
                icon: "🎨",
              },
              {
                step: "2",
                title: "Write Your Diwali Wish",
                desc: "Type your greeting in English or Hindi. Our AI typesets it cleanly — no broken fonts, no awkward spacing.",
                icon: "✍️",
              },
              {
                step: "3",
                title: "Download & Share",
                desc: "Get your post in platform-perfect size. Share instantly or schedule it for Diwali morning. No watermark on your download.",
                icon: "📤",
              },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="text-center p-6 bg-orange-50 rounded-2xl">
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
          Why Use Our Free Diwali Post Generator?
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              title: "Completely Free — No Hidden Charges",
              desc: "Every Diwali post is free to create and download. No 'pro' paywall to unlock HD quality or remove watermarks.",
            },
            {
              title: "Platform-Perfect Sizes",
              desc: "Instagram 1080×1080, WhatsApp Status 1080×1920, Facebook 1200×630 — auto-sized, no manual cropping.",
            },
            {
              title: "Hindu Calendar Accurate",
              desc: "Every template reflects real Diwali elements: diyas, rangoli, lotus, mangal kalash. Not generic festival clip art.",
            },
            {
              title: "No Signup, No Account",
              desc: "Open the page and start creating. Your posts are generated and returned — we do not store them.",
            },
            {
              title: "HD Downloads, No Watermark",
              desc: "Your finished post comes in high resolution, clean and ready to share. No DesiDesign watermark unless you choose to include it.",
            },
            {
              title: "10+ Festive Templates",
              desc: "From minimal gold text to full rangoli backgrounds. New templates added each festive season.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="flex gap-3 p-4 bg-white rounded-xl border border-orange-100">
              <span className="text-orange-500 text-lg mt-0.5">✓</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
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
              { href: "/diwali-card-maker", label: "Diwali Card Maker", desc: "Create greeting cards with AI" },
              { href: "/diwali-photo-frame-free", label: "Diwali Photo Frame", desc: "Add festive frames to photos" },
              { href: "/diwali-banner-maker", label: "Diwali Banner Maker", desc: "Shop banners & social headers" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="block p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors border border-orange-100"
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
              q: "Is this Diwali post generator really free?",
              a: "Yes. Every post is free to create and download at full resolution. There is no paywall, no watermark, and no trial period.",
            },
            {
              q: "Do I need to install an app?",
              a: "No. The tool runs entirely in your browser — on iPhone, Android, or desktop. Just open the page and start creating.",
            },
            {
              q: "What sizes are supported?",
              a: "Instagram square (1080×1080), WhatsApp Status (1080×1920), and Facebook cover (1200×630). The tool auto-sizes your post for the platform you pick.",
            },
            {
              q: "Can I write my wish in Hindi?",
              a: "Yes. The generator supports both English and Hindi greetings. Text is typeset cleanly with proper Devanagari rendering — no broken fonts.",
            },
            {
              q: "Are the designs accurate to the Hindu festival?",
              a: "Yes. We design every template based on actual Diwali elements: diyas, rangoli patterns, lotus, and gold accents. Nothing is randomly generated clip art.",
            },
            {
              q: "Can businesses use this for Diwali promotions?",
              a: "Absolutely. Many Indian small businesses use DesiDesign to create Diwali sale posts, festival greetings for customers, and social media campaigns — all free.",
            },
          ].map(({ q, a }) => (
            <details
              key={q}
              className="group bg-white rounded-xl border border-orange-100 open:ring-2 open:ring-orange-200"
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
      <section className="px-4 py-16 text-center bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-2xl mx-auto text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Diwali Post Is One Wish Away
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of Indian small businesses who create festive posts with DesiDesign — free, fast, and respectful to your culture.
          </p>
          <a
            href="/#generator"
            className="inline-block px-10 py-4 text-lg font-bold text-orange-600 bg-white hover:bg-orange-50 rounded-xl shadow-lg transition-colors"
          >
            Start Creating — It&apos;s Free
          </a>
        </div>
      </section>
    </main>
  );
}
