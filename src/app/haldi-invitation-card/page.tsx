"use client";

import { useEffect, useState, useRef } from "react";
import { Download, RefreshCw } from "lucide-react";
import AuthButton from "@/components/AuthButton";
import LoginModal from "@/components/LoginModal";
import WaitlistModal from "@/components/WaitlistModal";
import { WEDDING_STYLES, type WeddingStyleId } from "@/lib/wedding-styles";

type HistoryItem = { id: string; url: string; createdAt?: string };
const HISTORY_KEY = "haldi-card-history";

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

export default function HaldiInvitationCard() {
  const [styleId, setStyleId] = useState<WeddingStyleId>("boho-sage");
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

  // Sync document title
  useEffect(() => {
    document.title = "Free Haldi Ceremony Invitation Card — No Signup | desidesign.me";
  }, []);

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
    if (!prevHasImage.current && generatedImage && !sessionStorage.getItem("haldi_card_waitlist_shown")) {
      sessionStorage.setItem("haldi_card_waitlist_shown", "1");
      setShowWaitlist(true);
    }
    prevHasImage.current = !!generatedImage;
  }, [generatedImage]);

  async function triggerPreview() {
    setIsLoading(true);
    try {
      const style = WEDDING_STYLES.find((s) => s.id === styleIdRef.current) ?? WEDDING_STYLES[0];
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
          kind: "wedding",
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
    link.download = `haldi-invitation-card-${styleId}.png`;
    link.click();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
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
            <a href="/haldi-ceremony-invitation" className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors">
              Haldi Studio
            </a>
            <a href="/" className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Diwali Studio
            </a>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Page Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-base">✨</span>
            <span className="text-xs font-medium text-stone-700">Golden Haldi theme — no signup required</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-base">🛡️</span>
            <span className="text-xs font-medium text-stone-700">No ads, no coins, no subscriptions — one time $2.99</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-base">💻</span>
            <span className="text-xs font-medium text-stone-700">Works in your browser — no app to download</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:grid lg:grid-cols-[340px_1fr] lg:gap-8">
        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Feature bar */}
          <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">✨</span>
              <span className="text-xs font-medium text-stone-700">Golden Haldi theme — no signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">🛡️</span>
              <span className="text-xs font-medium text-stone-700">No ads, no coins, no subscriptions — one time $2.99</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">💻</span>
              <span className="text-xs font-medium text-stone-700">Works in your browser — no app to download</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest text-amber-500 mb-1">HALDI INVITATION CARD MAKER</p>
            <h1 className="text-xl font-bold text-stone-900 mb-2">Free Haldi Ceremony Invitation Card — No Signup</h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              Create beautiful golden haldi ceremony invitation cards in seconds. Choose an Indian wedding style, add your names and venue, download instantly.
            </p>
          </div>

          {/* Style picker */}
          <section>
            <h2 className="text-xs font-bold tracking-widest text-stone-400 mb-3">CHOOSE YOUR STYLE</h2>
            <div className="space-y-2">
              {WEDDING_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setStyleId(style.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                    styleId === style.id
                      ? "border-amber-500 bg-amber-50"
                      : "border-stone-200 bg-white hover:border-amber-300"
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
                Pick a style, personalize your details, and click <strong>Generate Free Preview</strong> to see your haldi invitation card.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Haldi Studio cross-link */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="p-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl text-center border border-yellow-200">
          <p className="text-amber-900 font-medium mb-3">
            Want more Haldi design options? Try our full Haldi Studio with turmeric, marigold, and mandala styles.
          </p>
          <a
            href="/haldi-ceremony-invitation"
            className="inline-block px-6 py-3 bg-amber-600 text-white font-bold rounded-xl shadow-md hover:bg-amber-700 transition-colors"
          >
            Open Haldi Studio →
          </a>
        </div>
      </section>

      {/* CTA banner */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl text-center shadow-lg">
          <p className="text-white font-medium mb-3">
            Also need Diwali marketing posters for your business?
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-white text-orange-700 font-bold rounded-xl shadow-md hover:bg-orange-50 transition-colors"
          >
            Create Diwali Posts Free →
          </a>
        </div>
      </section>

      {/* Modals */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}
    </main>
  );
}
