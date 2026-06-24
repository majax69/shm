import type { Metadata } from 'next'
import { BUSINESS, SEO_IMAGES } from '@/lib/content'
import { localPageJsonLd, LOCAL_ROUTES } from '@/lib/seo'
import { LocalLandingPage } from '../components/local-landing-page'

const route = LOCAL_ROUTES[0]
const pageUrl = new URL(route.slug, BUSINESS.url).toString()

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.slug },
  openGraph: {
    title: `${route.title} | SHM Cils & Ongles`,
    description: route.description,
    url: pageUrl,
    images: SEO_IMAGES.map((image) => ({
      url: new URL(image, BUSINESS.url).toString(),
      width: 1200,
      height: 1600,
      alt: 'Extensions de cils à Villeurbanne — SHM Cils & Ongles',
    })),
  },
  twitter: {
    card: 'summary_large_image',
    title: `${route.title} | SHM Cils & Ongles`,
    description: route.description,
    images: [new URL(SEO_IMAGES[0], BUSINESS.url).toString()],
  },
}

export default function Page() {
  return (
    <>
      <LocalLandingPage route={route} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localPageJsonLd(route)) }} />
    </>
  )
}
