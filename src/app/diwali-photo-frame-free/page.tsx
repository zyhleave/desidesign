import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Diwali Photo Frame Online – AI-Powered | DesiDesign",
  description:
    "Add stunning Diwali photo frames to your pictures in seconds. Free online tool — no signup, no app download. Hindu calendar accurate. Try it now.",
  keywords: [
    "diwali photo frame free",
    "diwali photo frame online",
    "diwali photo frame editor",
    "diwali photo frame generator",
    "diwali frame with name",
    "happy diwali photo frame",
    "diwali photo decoration",
  ],
  openGraph: {
    title: "Free Diwali Photo Frame Online – AI-Powered",
    description:
      "Create beautiful Diwali photo frames instantly. No signup required. Hindu calendar accurate.",
  },
};

export default function DiwaliPhotoFrameFree() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero */}
      <section className="px-4 py-16 max-w-4xl mx-auto text-center">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest uppercase bg-orange-200 text-orange-800 rounded-full">
          100% Free · No Signup
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Free Diwali Photo Frame Online
          <br />
          <span className="text-orange-600">— Add Festive Magic in Seconds</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Upload your photo, pick a Diwali frame, and download a share-ready image.
          No app to install, no account to create. Hindu calendar accurate designs —
          every rangoli, diya, and motif placed respectfully.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/#generator"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition-colors"
          >
            Create Your Diwali Photo Frame — Free
          </a>
          <a
            href="/diwali-card-maker"
            className="inline-block px-8 py-4 text-lg font-semibold text-orange-700 bg-white hover:bg-orange-50 rounded-xl border border-orange-200 transition-colors"
          >
            Browse More Tools →
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            How to Use This Free Diwali Photo Frame Tool
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Your Photo",
                desc: "Pick any portrait or group photo from your gallery. JPG, PNG, or WEBP — works with all.",
                icon: "📷",
              },
              {
                step: "2",
                title: "Choose a Diwali Frame",
                desc: "Browse festive frames: rangoli borders, diya corners, gold mangalsutra accents. Pick the one that fits your mood.",
                icon: "🪔",
              },
              {
                step: "3",
                title: "Download & Share",
                desc: "Get your framed photo in HD. Share on Instagram, WhatsApp Status, or Facebook. No watermarks on your download.",
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
          Why Use Our Free Diwali Photo Frame Generator?
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              title: "Completely Free — No Hidden Charges",
              desc: "Every Diwali photo frame is free to create and download. No 'pro' paywall to unlock HD quality.",
            },
            {
              title: "Works on Any Device",
              desc: "Phone, tablet, or desktop. Open the tool, upload, and frame — no app download needed.",
            },
            {
              title: "Hindu Calendar Accurate Designs",
              desc: "Every frame reflects authentic Diwali elements — diyas, rangoli, mangal kalash, and lotus motifs. Not generic festival clip art.",
            },
            {
              title: "No Signup, No Account",
              desc: "Open the page and start creating. Your photos are processed and returned — we do not store them.",
            },
            {
              title: "HD Downloads, No Watermark",
              desc: "Your finished photo comes in high resolution, clean and ready to share. No DesiDesign watermark unless you choose to include it.",
            },
            {
              title: "10+ Diwali Frame Styles",
              desc: "From simple gold borders to full rangoli backgrounds. New frames added each festive season.",
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
              { href: "/happy-diwali-post-generator", label: "Diwali Post Generator", desc: "Make share-ready posts for Instagram" },
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
              q: "Is this Diwali photo frame tool really free?",
              a: "Yes. Every photo frame is free to create and download at full resolution. There is no paywall, no watermark, and no trial period.",
            },
            {
              q: "Do I need to install an app?",
              a: "No. The tool runs entirely in your browser — on iPhone, Android, or desktop. Just open the page and start creating.",
            },
            {
              q: "Are the Diwali designs accurate to the Hindu festival?",
              a: "Yes. We design every frame based on actual Diwali elements: diyas, rangoli patterns, lotus, mangal kalash, and gold accents. Nothing is randomly generated clip art.",
            },
            {
              q: "What photo formats are supported?",
              a: "JPG, PNG, and WEBP. Square, portrait, or landscape — the tool will automatically fit your photo into the frame.",
            },
            {
              q: "Can I add text or my name to the Diwali frame?",
              a: "The current version frames your photo beautifully. Text customization is on our roadmap — sign up for updates on the homepage.",
            },
            {
              q: "How do I share my framed Diwali photo?",
              a: "Download the HD image and share it on Instagram, WhatsApp Status, Facebook, or send it directly to friends and family via any messaging app.",
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
            Your Diwali Photo Is Waiting for Its Frame
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of Indian small businesses who create festive designs with DesiDesign — free, fast, and respectful to your culture.
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
