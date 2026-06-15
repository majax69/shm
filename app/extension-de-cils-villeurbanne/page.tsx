import type { Metadata } from 'next'
import { BUSINESS } from '@/lib/content'
import { LOCAL_ROUTES } from '@/lib/seo'
import { LocalLandingPage } from '../components/local-landing-page'

const route = LOCAL_ROUTES[0]

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: route.slug },
  openGraph: {
    title: `${route.title} | SHM Cils & Ongles`,
    description: route.description,
    url: new URL(route.slug, BUSINESS.url).toString(),
  },
}

export default function Page() {
  return <LocalLandingPage route={route} />
}
