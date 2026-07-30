"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { Download, RefreshCw } from "lucide-react";
import AuthButton from "@/components/AuthButton";
import LoginModal from "@/components/LoginModal";
import WaitlistModal from "@/components/WaitlistModal";
import { HALDI_STYLES, type HaldiStyleId } from "@/lib/haldi-styles";

type HistoryItem = { id: string; url: string; createdAt?: string };
const HISTORY_KEY = "haldi-history";

function readHistory(): HistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function pushHistory(item: HistoryItem) {
  const items = readHistory().filter((h) => h.id !== item.id);
  items.unshift(item);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, 50)));
  } catch { /* quota */ }
}

export default function HaldiCeremonyInvitation() {
  const [styleId, setStyleId] = useState<HaldiStyleId>("turmeric-gold");
  const [partner1, setPartner1] = useState("Aarav");
  const [partner2, setPartner2] = useState("Diya");
  const [dateText, setDateText] = useState("December 10, 2026");
  const [venue, setVenue] = useState("Family Residence, Mumbai");
  const [greeting, setGreeting] = useState("Haldi Ceremony");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Refs to avoid stale closures
  const styleIdRef = useRef(styleId);
  const partner1Ref = useRef(partner1);
  const partner2Ref = useRef(partner2);
  const dateTextRef = useRef(dateText);
  const venueRef = useRef(venue);
  const greetingRef = useRef(greeting);

  // Keep refs in sync
  styleIdRef.current = styleId;
  partner1Ref.current = partner1;
  partner2Ref.current = partner2;
  dateTextRef.current = dateText;
  venueRef.current = venue;
  greetingRef.current = greeting;

  // Sync document title & meta with selected style (SEO)
  const currentStyle = HALDI_STYLES.find((s) => s.id === styleId) ?? HALDI_STYLES[0];
  useEffect(() => {
    document.title = `Free Haldi Ceremony Invitation Maker — Online & Instant | desidesign.me`;
  }, [styleId, currentStyle]);

  // Custom Haldi view event
  useEffect(() => {
    const win = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof win.gtag === "function") {
      win.gtag("event", "haldi_view", {
        style: currentStyle.id,
        page_title: currentStyle.seoTitle,
        page_path: "/haldi-ceremony-invitation",
      });
    }
  }, [currentStyle]);

  // Generate a default preview on mount
  useEffect(() => {
    const timer = setTimeout(() => { void triggerPreview(); }, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load history on mount
  useEffect(() => {
    setHistory(readHistory());
  }, []);

  // Show waitlist after first successful generation
  const prevHasImage = useRef(false);
  useEffect(() => {
    if (!prevHasImage.current && generatedImage && !sessionStorage.getItem("haldi_waitlist_shown")) {
      sessionStorage.setItem("haldi_waitlist_shown", "1");
      setShowWaitlist(true);
    }
    prevHasImage.current = !!generatedImage;
  }, [generatedImage]);

  async function triggerPreview() {
    setIsLoading(true);
    try {
      const style = HALDI_STYLES.find((s) => s.id === styleIdRef.current) ?? HALDI_STYLES[0];
      const response = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          background: style.id,
          greeting: greetingRef.current,
          name: `${partner1Ref.current} & ${partner2Ref.current}`,
          partner1: partner1Ref.current,
          partner2: partner2Ref.current,
          dateText: dateTextRef.current,
          venue: venueRef.current,
          kind: "haldi",
        }),
      });
      const data = await response.json();
      if (data.url) {
        setGeneratedImage(data.url);
        const item: HistoryItem = { id: crypto.randomUUID(), url: data.url, createdAt: new Date().toISOString() };
        pushHistory(item);
        setHistory(readHistory());
      }
    } finally {
      setIsLoading(false);
    }
  }

  function downloadImage() {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `haldi-invitation-${styleId}.png`;
    link.click();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      {/* Topbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-stone-900">
            Desi<span className="text-orange-600">Design</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/wedding-invitation-maker" className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Wedding Studio
            </a>
            <a href="/" className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Diwali Studio
            </a>
            <AuthButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:grid lg:grid-cols-[340px_1fr] lg:gap-8">
        {/* Sidebar */}
        <aside className="space-y-6">
          <div>
            <p className="text-xs font-bold tracking-widest text-amber-600 mb-1">HALDI CEREMONY INVITATION MAKER</p>
            <h1 className="text-xl font-bold text-stone-900 mb-2">Free Haldi Ceremony Invitation Maker — Online &amp; Instant</h1>
            <p className="text-sm text-stone-600 leading-relaxed">{currentStyle.longTail}</p>
          </div>

          {/* Style picker */}
          <section>
            <h2 className="text-xs font-bold tracking-widest text-stone-400 mb-3">CHOOSE YOUR STYLE</h2>
            <div className="space-y-2">
              {HALDI_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    setStyleId(style.id);
                    const win = window as unknown as { gtag?: (...args: unknown[]) => void };
                    if (typeof win.gtag === "function") {
                      win.gtag("event", "style_click", { style: style.id, style_name: style.seoTitle, page: "haldi" });
                    }
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                    styleId === style.id
                      ? "border-amber-500 bg-amber-50"
                      : "border-stone-200 bg-white hover:border-stone-300"
                  }`}
                >
                  <span
                    className="w-11 h-11 rounded-lg flex-shrink-0"
                    style={{ background: style.gradient }}
                  />
                  <span className="min-w-0">
                    <strong className="block text-sm font-semibold text-stone-900">{style.name}</strong>
                    <small className="block text-xs text-stone-500 truncate">{style.description}</small>
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Personalize */}
          <section>
            <h2 className="text-xs font-bold tracking-widest text-stone-400 mb-3">PERSONALIZE</h2>
            <div className="space-y-3">
              <label className="block">
                <span className="text-xs font-medium text-stone-600 mb-1 block">Bride / Groom Name</span>
                <input
                  type="text"
                  value={partner1}
                  onChange={(e) => setPartner1(e.target.value)}
                  maxLength={30}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-stone-600 mb-1 block">Partner Name</span>
                <input
                  type="text"
                  value={partner2}
                  onChange={(e) => setPartner2(e.target.value)}
                  maxLength={30}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-stone-600 mb-1 block">Haldi Ceremony Date</span>
                <input
                  type="text"
                  value={dateText}
                  onChange={(e) => setDateText(e.target.value)}
                  maxLength={40}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-stone-600 mb-1 block">Venue</span>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  maxLength={60}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-stone-600 mb-1 block">Short Message (optional)</span>
                <input
                  type="text"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  maxLength={72}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                  placeholder="Haldi Ceremony"
                />
              </label>
            </div>
          </section>

          {/* Generate */}
          <section className="space-y-2">
            <button
              onClick={triggerPreview}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 transition-all"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Generate Free Preview
            </button>
            <button
              disabled
              className="w-full px-4 py-3 border-2 border-dashed border-stone-300 text-stone-400 font-medium rounded-lg cursor-not-allowed"
            >
              AI Enhance - 2K Print Ready - Coming soon
            </button>
          </section>

          {/* Waitlist banner */}
          <section className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
            <p className="text-sm font-medium text-amber-900 mb-3">
              Want HD print-ready haldi cards? Join the waitlist — we&apos;ll notify you first.
            </p>
            <button
              onClick={() => setShowWaitlist(true)}
              className="px-6 py-2 bg-amber-600 text-white text-sm font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              Join Waitlist
            </button>
          </section>
        </aside>

        {/* Canvas area */}
        <section className="mt-8 lg:mt-0 flex flex-col items-center gap-6">
          {generatedImage ? (
            <>
              <div className="relative w-full max-w-md aspect-[5/7] rounded-2xl overflow-hidden shadow-2xl bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={generatedImage} alt="Haldi ceremony invitation preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-3 text-xs text-white/50 tracking-wide">desidesign.me</div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={triggerPreview}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium hover:bg-stone-50 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                <button
                  onClick={downloadImage}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </>
          ) : (
            <div className="w-full max-w-md aspect-[5/7] rounded-2xl bg-white border-2 border-dashed border-amber-300 flex items-center justify-center text-stone-400">
              <p className="text-center px-8">
                Pick a style, personalize your details, and click <strong>Generate Free Preview</strong> to see your haldi invitation.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* SEO content section */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Create Your Haldi Ceremony Invitation Online</h2>
        <div className="prose prose-stone max-w-none text-sm leading-relaxed text-stone-600 space-y-4">
          <p>
            The <strong>Haldi ceremony</strong> is one of the most vibrant and joyful pre-wedding rituals in Indian weddings.
            Families gather to apply turmeric paste on the bride and groom, symbolizing blessings, purification, and prosperity.
            Now you can create beautiful <strong>haldi ceremony invitation cards</strong> online — free and in seconds.
          </p>
          <p>
            Our <strong>haldi card maker</strong> lets you choose from traditional turmeric-gold themes, marigold flower designs,
            and mandala patterns. Simply enter the names, date, and venue, then click generate to see your invitation instantly.
          </p>
          <p>
            Whether you call it <em>haldi ceremony</em>, <em>haldi function</em>, or <em>pithi ceremony</em>, our invitation
            generator creates cards that capture the warmth and golden glow of this beloved tradition.
          </p>
          <h3 className="text-lg font-semibold text-stone-800 mt-6 mb-2">What is a Haldi Ceremony?</h3>
          <p>
            A haldi ceremony is a pre-wedding Hindu ritual rooted in South Asian wedding traditions. The word <em>haldi</em> means
            turmeric in Hindi, and the ceremony involves applying a paste made from turmeric, sandalwood, and rose water to the
            bride and groom before their wedding day. Family members, especially elders, smear the paste as a way of seeking
            divine blessings, symbolizing purification, and wishing the couple a prosperous married life.
          </p>
          <p>
            The paste also has practical benefits — turmeric is a natural antiseptic and skin cleanser, so the ritual was
            originally meant to purify and beautify the skin before the wedding. In modern celebrations, the haldi function
            has become a colorful, joyful event filled with music, dancing, and flower petals. Many families now choose to theme
            their haldi invitation cards around the golden-yellow aesthetic of turmeric, creating beautiful digital invites
            that reflect the warmth and happiness of the occasion.
          </p>
          <h3 className="text-lg font-semibold text-stone-800 mt-6 mb-2">How to Use Our Free Haldi Invitation Card Maker</h3>
          <p>
            Creating your <strong>haldi ceremony invitation</strong> with our free online tool takes less than two minutes.
            Start by choosing one of our three beautifully designed haldi card styles — each one captures a different facet
            of Indian wedding aesthetics. The <strong>Turmeric Gold</strong> style uses rich golden tones with elegant borders
            for a classic look. The <strong>Marigold Bloom</strong> style celebrates the bright orange and yellow marigold flowers
            that are essential to Indian celebrations. The <strong>Mandala Haldi</strong> style incorporates sacred geometric
            patterns that represent unity, eternity, and the cosmic cycle.
          </p>
          <p>
            After selecting your haldi invitation style, simply fill in the personalization fields: the names of the bride
            and groom, the date and time of the haldi function, the venue, and an optional short greeting message. Our AI
            generator instantly creates a beautiful invitation card that you can preview, regenerate with a different design
            variation, or download as a PNG image to share on WhatsApp, Instagram, or via email.
          </p>
          <h3 className="text-lg font-semibold text-stone-800 mt-6 mb-2">Why Send a Haldi Ceremony Invitation Card?</h3>
          <p>
            Sending a dedicated <strong>haldi ceremony invitation</strong> ensures your guests know exactly when and where to
            join this special pre-wedding event. Unlike the main wedding card, which covers the full ceremony, a haldi
            invitation specifically invites people to the turmeric ritual. This is important because the haldi function
            often takes place on a different day or at a different venue than the main wedding, sometimes even at a separate
            home or outdoor garden.
          </p>
          <p>
            Digital haldi invitation cards are especially popular in modern Indian weddings because they are quick to create,
            easy to share on messaging apps, and environmentally friendly compared to printed cards. They also allow you
            to express your personal style — whether you prefer a traditional haldi invitation with Sanskrit mantras or
            a modern minimalist design with clean typography.
          </p>
          <h3 className="text-lg font-semibold text-stone-800 mt-6 mb-2">Haldi Ceremony Across Indian Wedding Traditions</h3>
          <p>
            While the haldi ceremony is most commonly associated with North Indian and Marathi Hindu weddings, similar
            turmeric-based pre-wedding rituals exist across India under different names. In Tamil weddings, it is called
            <em>pellikuthuru</em> or <em>manjan</em>. In Kannada weddings, the ritual is known as <em>uggubanti</em>.
            In Bengali weddings, it is part of the <em>Gaye holud</em> ceremony. The yellow turmeric paste is a common
            thread across all these traditions, symbolizing the same themes of purification, auspiciousness, and joy.
          </p>
          <p>
            In South Indian weddings, particularly in Tamil and Telugu traditions, the haldi ceremony may be more subdued
            but still involves applying turmeric paste to the bride and groom. The visual language of golden-yellow haldi
            cards resonates across all these regional traditions, making our haldi invitation maker a versatile tool
            for couples from any Indian cultural background.
          </p>
          <h3 className="text-lg font-semibold text-stone-800 mt-6 mb-2">Designing Tips for Your Haldi Invitation Card</h3>
          <p>
            When creating your haldi ceremony invitation card, consider the following design tips to make it truly memorable.
            First, choose a color palette that reflects the golden hue of turmeric — rich golds, warm yellows, and soft
            saffron tones work best. Second, incorporate traditional elements like marigold flowers, paisley patterns,
            or mandala designs to give the card an authentic Indian wedding feel. Third, make sure the text is legible
            and includes all essential details: the couple's names, the haldi date, the time, and the venue address.
          </p>
          <p>
            Our haldi card maker handles all of this for you. We have pre-designed invitation templates that balance
            beautiful visual elements with clean, readable text layouts. The card is optimized for both mobile screens
            and print, so it looks great whether your guests view it on their phone or you choose to print it.
          </p>
          <h3 className="text-lg font-semibold text-stone-800 mt-6 mb-2">Share Your Haldi Invitation Online</h3>
          <p>
            Once your haldi invitation card is generated, you can download it instantly and share it directly with your
            guests. The most popular way to share a haldi invitation in 2024 and beyond is through WhatsApp, because it
            reaches guests immediately and supports high-quality image sharing. You can also share it on Instagram
            Stories, send it via email, or post it on a wedding website.
          </p>
          <p>
            Using our free haldi card maker, you can generate unlimited variations of your invitation card — try different
            styles, adjust your greeting message, or regenerate until you find the perfect design. Unlike traditional
            printed haldi cards, there is no limit to how many times you can refine your digital invitation. It is
            completely free, requires no design software skills, and takes just seconds to produce a stunning result.
          </p>
        </div>

        {/* FAQ visible section */}
        <div className="mt-10 border-t border-stone-200 pt-8">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Is the haldi invitation card maker really free?",
                a: "Yes, our haldi ceremony invitation maker is completely free to use. You can generate unlimited previews at no cost. The HD print-ready version with AI enhancement is coming soon as a premium feature.",
              },
              {
                q: "Do I need to sign up or create an account?",
                a: "No signup is required. Simply choose a style, enter your details, and click generate to see your haldi invitation instantly. An optional account lets you save your design history.",
              },
              {
                q: "Can I download the invitation as an image?",
                a: "Absolutely. Once your invitation preview is generated, you can download it as a high-quality PNG image directly to your device — no watermarks on the preview version.",
              },
              {
                q: "What is a haldi ceremony and why is it important?",
                a: "The haldi ceremony is a Hindu pre-wedding ritual where turmeric paste is applied to the bride and groom by family and friends. It symbolizes purification, blessing, warding off evil, and welcoming prosperity into the marriage.",
              },
              {
                q: "What styles of haldi invitations are available?",
                a: "We offer three signature styles: Turmeric Gold for classic golden elegance, Marigold Bloom for vibrant orange floral energy, and Mandala Haldi for sacred geometric patterns. Each captures a different mood of the celebration.",
              },
              {
                q: "Can I use these invitations for a pithi ceremony too?",
                a: "Yes, pithi is another name for the same haldi ceremony in different parts of India. Our invitation templates work perfectly for pithi ceremony announcements as well.",
              },
            ].map((item, i) => (
              <details key={i} className="group border border-stone-200 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-stone-800 font-medium hover:bg-amber-50 transition-colors list-none">
                  {item.q}
                  <span className="ml-4 flex-shrink-0 text-amber-600 group-open:rotate-180 transition-transform">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-4 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="p-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-center shadow-lg">
          <p className="text-white font-medium mb-3">
            Also need wedding invitations or Diwali posts?
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="/wedding-invitation-maker"
              className="inline-block px-6 py-3 bg-white text-orange-700 font-bold rounded-xl shadow-md hover:bg-amber-50 transition-colors"
            >
              Wedding Invitations →
            </a>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-white text-orange-700 font-bold rounded-xl shadow-md hover:bg-amber-50 transition-colors"
            >
              Diwali Posts →
            </a>
          </div>
        </div>
      </section>

      {/* Modals */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}
    </main>
  );
}
