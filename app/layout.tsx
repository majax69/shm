import type { Metadata } from 'next'
import { Geist, Playfair_Display } from 'next/font/google'
import { BUSINESS, faqs, SEO_IMAGES } from '@/lib/content'
import { businessJsonLd, SITE_KEYWORDS } from '@/lib/seo'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: 'Extension de cils Villeurbanne & Lyon | SHM Cils & Ongles',
    template: '%s | SHM Cils & Ongles',
  },
  description:
    'Institut de beauté à Villeurbanne près de Lyon spécialisé en extensions de cils, volume russe, pose wispy, browlift, rehaussement et ongles. Réservation en ligne 7j/7.',
  keywords: [...SITE_KEYWORDS],
  applicationName: BUSINESS.name,
  category: 'Beauty salon',
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  alternates: { canonical: '/', languages: { 'fr-FR': '/' } },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: 'Extension de cils Villeurbanne & Lyon | SHM Cils & Ongles',
    description:
      'Extensions de cils, volume russe, browlift, rehaussement et ongles à Villeurbanne, près de Lyon. Réservation en ligne 7j/7.',
    images: SEO_IMAGES.map((image) => ({
      url: image,
      width: 1200,
      height: 1600,
      alt: 'Résultat cils et ongles chez SHM à Villeurbanne',
    })),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Extension de cils Villeurbanne & Lyon | SHM Cils & Ongles',
    description:
      'Institut beauté à Villeurbanne près de Lyon — cils, ongles, sourcils. Réservation en ligne 7j/7.',
    images: [SEO_IMAGES[0]],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const jsonLd = {
  ...businessJsonLd,
  '@graph': [
    ...businessJsonLd['@graph'],
    {
      '@type': 'FAQPage',
      '@id': `${BUSINESS.url}/#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Aller au contenu
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
