"use client";

export default function CtaButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="inline-block px-10 py-4 text-lg font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-lg transition-colors"
      onClick={() => {
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "cta_click", {
            page: "wedding-wording",
            position: "bottom",
          });
        }
      }}
    >
      Start Designing — Free
    </a>
  );
}
