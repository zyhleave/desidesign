import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export type FAQItem = { q: string; a: string };

export type LandingPageData = {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  ctaLabel: string;
  bullets: string[];
  useCases: { title: string; desc: string }[];
  faqs: FAQItem[];
  relatedSlugs?: string[];
};

export function buildMetadata(data: LandingPageData): Metadata {
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `/${data.slug}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `/${data.slug}`,
      type: "website",
    },
  };
}

function FaqJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LandingPage({ data }: { data: LandingPageData }) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <FaqJsonLd faqs={data.faqs} />

      <section className="pb-16 pt-6">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {data.h1}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">{data.heroSubtitle}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          <Sparkles className="h-4 w-4" />
          {data.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="border-t border-slate-200 py-12">
        <h2 className="text-2xl font-semibold text-slate-900">Why DesiDesign</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {data.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-slate-700">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-slate-200 py-12">
        <h2 className="text-2xl font-semibold text-slate-900">Made for</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {data.useCases.map((u) => (
            <div key={u.title}>
              <h3 className="font-medium text-slate-900">{u.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 py-12">
        <h2 className="text-2xl font-semibold text-slate-900">How it works</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          <li className="rounded-lg border border-slate-200 p-5">
            <div className="text-xs font-semibold text-slate-500">STEP 1</div>
            <div className="mt-1 font-medium text-slate-900">Pick a scene</div>
            <p className="mt-1 text-sm text-slate-600">
              Fireworks, diyas, or rangoli. Pick the mood that fits your brand.
            </p>
          </li>
          <li className="rounded-lg border border-slate-200 p-5">
            <div className="text-xs font-semibold text-slate-500">STEP 2</div>
            <div className="mt-1 font-medium text-slate-900">Add your text</div>
            <p className="mt-1 text-sm text-slate-600">
              Greeting, name, offer. Text is rendered pixel-perfect, no AI garble.
            </p>
          </li>
          <li className="rounded-lg border border-slate-200 p-5">
            <div className="text-xs font-semibold text-slate-500">STEP 3</div>
            <div className="mt-1 font-medium text-slate-900">Generate & download</div>
            <p className="mt-1 text-sm text-slate-600">
              Free preview, ₹99 to unlock HD. Ready to post in seconds.
            </p>
          </li>
        </ol>
      </section>

      <section className="border-t border-slate-200 py-12">
        <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
        <div className="mt-6 divide-y divide-slate-200">
          {data.faqs.map((f) => (
            <details key={f.q} className="py-4">
              <summary className="cursor-pointer font-medium text-slate-900">
                {f.q}
              </summary>
              <p className="mt-2 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {data.relatedSlugs && data.relatedSlugs.length > 0 && (
        <section className="border-t border-slate-200 py-12">
          <h2 className="text-2xl font-semibold text-slate-900">Related tools</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {data.relatedSlugs.map((s) => (
              <li key={s}>
                <Link
                  href={`/${s}`}
                  className="rounded-full border border-slate-300 px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                  {s.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="border-t border-slate-200 py-8 text-sm text-slate-500">
        © 2026 DesiDesign · Diwali marketing studio for Indian small businesses.
      </footer>
    </main>
  );
}
