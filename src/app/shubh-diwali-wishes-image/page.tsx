import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shubh Diwali Wishes Image – Free AI Greeting Maker | DesiDesign",
  description:
    "Create stunning Shubh Diwali wishes images instantly with AI. Hindi & English greetings. Free, no signup. Download & share on WhatsApp, Instagram.",
  keywords: [
    "shubh diwali wishes image",
    "shubh deepavali image",
    "diwali greeting image free",
    "happy diwali image maker",
    "diwali wishes with name",
    "shubh diwali shayari image",
    "diwali whatsapp image",
  ],
  openGraph: {
    title: "Shubh Diwali Wishes Image – Free AI Greeting Maker",
    description:
      "Create beautiful Shubh Diwali wishes images with AI. Hindi & English. Free to download and share.",
  },
};

export default function ShubhDiwaliWishesImage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      {/* Hero */}
      <section className="px-4 py-16 max-w-4xl mx-auto text-center">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest uppercase bg-yellow-200 text-yellow-800 rounded-full">
          100% Free · No Signup · AI-Powered
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Shubh Diwali Wishes Image
          <br />
          <span className="text-orange-600">— Free AI Greeting Maker</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Create beautiful Shubh Diwali wishes images in seconds. Choose from Hindi and English
          greetings — Shubh Deepavali, Diwali Mubarak, and more. Free to download, ready to
          share on WhatsApp and Instagram.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/#generator"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition-colors"
          >
            Create Your Diwali Wishes Image — Free
          </a>
          <Link
            href="/diwali-card-maker"
            className="inline-block px-8 py-4 text-lg font-semibold text-orange-700 bg-white hover:bg-orange-50 rounded-xl border border-orange-200 transition-colors"
          >
            Browse More Tools →
          </Link>
        </div>
      </section>

      {/* Popular Hindi Greetings */}
      <section className="px-4 py-10 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 border border-yellow-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Most Popular Diwali Greetings in Hindi
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "शुभ दीवाली",
              "दीवाली की शुभकामनाएं",
              "हैप्पी दीपावली",
              "दीवाली मुबारक",
              "शुभ दीपावली",
              "खुशियों भरी दीवाली",
              "रोशनी का त्योहार",
              "प्रकाश की विजय",
            ].map((text) => (
              <span
                key={text}
                className="px-3 py-1.5 bg-yellow-50 text-yellow-800 text-sm rounded-full border border-yellow-200"
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            How to Create Your Free Diwali Wishes Image
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose a Greeting",
                desc: "Pick a Hindi or English greeting: Shubh Deepavali, Diwali Mubarak, or add your own personalized message.",
                icon: "🪔",
              },
              {
                step: "2",
                title: "Add Your Name",
                desc: "Type your name — it gets beautifully typeset onto the festive design as a personalized greeting.",
                icon: "✍️",
              },
              {
                step: "3",
                title: "Download & Share",
                desc: "Get your HD wishes image in one click. Share on WhatsApp Status, Instagram, Facebook, or send to family and friends.",
                icon: "📤",
              },
            ].map(({ step, title, desc, icon }) => (
              <div key={step} className="text-center p-6 bg-yellow-50 rounded-2xl">
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
          Why Use Our Free Diwali Wishes Image Maker?
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              title: "Free to Create & Download",
              desc: "Every wishes image is 100% free. No watermarks, no paywall, no signup required.",
            },
            {
              title: "Hindi & English Greetings",
              desc: "Choose from authentic Hindi greetings — शुभ दीवाली, दीपावली मुबारक — or English options. Both done in seconds.",
            },
            {
              title: "Personalized with Your Name",
              desc: "Add any name to the greeting. The AI types it beautifully into the festive design.",
            },
            {
              title: "Ready for WhatsApp & Instagram",
              desc: "Images are sized perfectly for WhatsApp Status (9:16) and Instagram posts. Square and portrait options.",
            },
            {
              title: "AI-Generated Festive Artwork",
              desc: "Every design features authentic Diwali elements — diyas, rangoli, gold accents — not generic stock clip art.",
            },
            {
              title: "Instant — No App Download",
              desc: "Open the page, create your image, download it. Works on iPhone, Android, and desktop browser.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="flex gap-3 p-4 bg-white rounded-xl border border-yellow-100">
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
              { href: "/diwali-card-maker", label: "Diwali Card Maker", desc: "Create full greeting cards with AI" },
              { href: "/diwali-photo-frame-free", label: "Diwali Photo Frame", desc: "Frame your photo with festive borders" },
              { href: "/happy-diwali-post-generator", label: "Diwali Post Generator", desc: "Make share-ready social media posts" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="block p-4 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition-colors border border-yellow-100"
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
              q: "Is the Diwali wishes image really free to download?",
              a: "Yes. Every image you create is free to download at full resolution with no watermarks. No signup, no app, no payment required.",
            },
            {
              q: "Can I add my name to the Hindi greeting?",
              a: "Yes. Type your name when prompted — the AI will beautifully integrate it into the festive Hindi or English greeting design.",
            },
            {
              q: "What greetings are available in Hindi?",
              a: "We offer a curated list of popular Hindi greetings including: शुभ दीवाली, दीपावली मुबारक, खुशियों भरी दीवाली, and more. You can also type your own custom message.",
            },
            {
              q: "What size are the images? Are they good for WhatsApp Status?",
              a: "Yes. Images are generated in WhatsApp Status size (9:16 aspect ratio) as well as square format for Instagram posts. Both are HD quality.",
            },
            {
              q: "Can I use these images for my business?",
              a: "Yes. Images created with DesiDesign are free for personal and small business use. No attribution required.",
            },
            {
              q: "Do I need to install anything?",
              a: "No. The tool runs entirely in your browser. Open the page on any device — iPhone, Android, or desktop — and create instantly.",
            },
          ].map(({ q, a }) => (
            <details
              key={q}
              className="group bg-white rounded-xl border border-yellow-100 open:ring-2 open:ring-yellow-200"
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
      <section className="px-4 py-16 text-center bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-2xl mx-auto text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Send Your Shubh Diwali Wishes Today
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of Indian families and small businesses who create beautiful Diwali
            greetings with DesiDesign — free, fast, and in Hindi or English.
          </p>
          <a
            href="/#generator"
            className="inline-block px-10 py-4 text-lg font-bold text-orange-600 bg-white hover:bg-orange-50 rounded-xl shadow-lg transition-colors"
          >
            Create Your Shubh Diwali Image — Free
          </a>
        </div>
      </section>
    </main>
  );
}
