import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { BUSINESS, faqs, SEO_IMAGES } from '@/lib/content'
import { businessJsonLd, SITE_KEYWORDS } from '@/lib/seo'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
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
    title: 'Extension de cils Villeurbanne & Lyon | SHM',
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
