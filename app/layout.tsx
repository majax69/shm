import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { BUSINESS, faqs, PLANITY_URL } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "SHM · Extension de cils & ongles à Villeurbanne (Lyon)",
    template: "%s · SHM Cils & Ongles",
  },
  description:
    "Institut de beauté à Villeurbanne spécialisé en extensions de cils (volume russe, wispi), rehaussement, browlift et ongles. Prise de rendez-vous en ligne 7j/7.",
  keywords: [
    "extension de cils Villeurbanne",
    "volume russe Lyon",
    "rehaussement de cils Villeurbanne",
    "browlift Lyon",
    "pose d'ongles Villeurbanne",
    "institut de beauté Villeurbanne",
  ],
  authors: [{ name: BUSINESS.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: "SHM · Extension de cils & ongles à Villeurbanne",
    description:
      "Extensions de cils, volume russe, browlift, rehaussement et ongles dans un écrin élégant au cœur de Villeurbanne. Réservation en ligne 7j/7.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHM · Extension de cils & ongles à Villeurbanne",
    description:
      "Institut beauté à Villeurbanne — cils, ongles, sourcils. Réservation en ligne 7j/7.",
  },
  robots: { index: true, follow: true },
};

// Données structurées pour le référencement local (rich results Google).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BeautySalon",
      "@id": `${BUSINESS.url}/#business`,
      name: BUSINESS.name,
      image: `${BUSINESS.url}/opengraph-image`,
      url: BUSINESS.url,
      telephone: BUSINESS.phoneHref,
      email: BUSINESS.email,
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.street,
        postalCode: BUSINESS.postalCode,
        addressLocality: BUSINESS.city,
        addressRegion: BUSINESS.region,
        addressCountry: BUSINESS.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS.geo.lat,
        longitude: BUSINESS.geo.lng,
      },
      openingHours: [
        "Mo-Fr 08:00-21:30",
        "Sa 08:00-23:00",
        "Su 08:00-23:00",
      ],
      sameAs: [BUSINESS.instagram],
      potentialAction: {
        "@type": "ReserveAction",
        target: PLANITY_URL,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "50",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${BUSINESS.url}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
