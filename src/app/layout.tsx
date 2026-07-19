import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://desidesign.me"),
  title: {
    default: "DesiDesign · Diwali Marketing Studio for Indian Businesses",
    template: "%s | DesiDesign",
  },
  description:
    "Create Diwali posters, banners, and greeting cards with AI. Made for Indian small businesses. Culturally accurate, text-perfect, ₹99 to unlock HD.",
  keywords: [
    "diwali card maker",
    "diwali poster maker",
    "diwali banner maker",
    "ai diwali image generator",
    "diwali marketing",
    "diwali sale poster",
    "happy diwali post for business",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "DesiDesign",
    url: "https://desidesign.me",
    title: "DesiDesign · Diwali Marketing Studio for Indian Businesses",
    description:
      "Create Diwali posters, banners, and greeting cards with AI. Culturally accurate, text-perfect, made for Indian small businesses.",
    // images: adding a branded OG image is a W30 task
  },
  twitter: {
    card: "summary_large_image",
    title: "DesiDesign · Diwali Marketing Studio",
    description:
      "AI Diwali design for Indian small businesses. Culturally accurate, text-perfect.",
    // images: adding a branded OG image is a W30 task
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>
        {children}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
