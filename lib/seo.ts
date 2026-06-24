import { BUSINESS, categories, PLANITY_URL, SEO_IMAGES, services } from '@/lib/content'

export const SITE_KEYWORDS = [
  'extension de cils Villeurbanne',
  'extensions de cils Lyon',
  'volume russe Villeurbanne',
  'volume russe Lyon',
  'pose cil à cil Villeurbanne',
  'pose wispy Lyon',
  'rehaussement de cils Villeurbanne',
  'browlift Villeurbanne',
  'browlift Lyon',
  'ongles Villeurbanne',
  'pose gel Villeurbanne',
  'institut de beauté Villeurbanne',
  'salon de beauté Lyon',
  'cils et ongles Lyon',
] as const

export const LOCAL_ROUTES = [
  {
    slug: '/extension-de-cils-villeurbanne',
    title: 'Extension de cils à Villeurbanne',
    description:
      'Extensions de cils à Villeurbanne chez SHM : cil à cil, pose mixte, volume russe soft ou intense et pose wispy. Réservation en ligne près de Lyon.',
    heading: 'Extension de cils à Villeurbanne',
    intro:
      'SHM Cils & Ongles accueille les clientes de Villeurbanne et de Lyon pour des extensions de cils précises, confortables et adaptées à la forme du regard.',
  },
  {
    slug: '/extension-de-cils-lyon',
    title: 'Extension de cils à Lyon',
    description:
      'Institut spécialisé en extensions de cils près de Lyon : volume russe, cil à cil, pose mixte, wispy, rehaussement et browlift à Villeurbanne.',
    heading: 'Extension de cils près de Lyon',
    intro:
      'Situé à Villeurbanne, aux portes de Lyon, SHM propose des poses de cils pensées pour un rendu naturel, sophistiqué ou plus intense selon vos envies.',
  },
  {
    slug: '/ongles-villeurbanne',
    title: 'Ongles à Villeurbanne',
    description:
      'Pose gel couleur unie et French à Villeurbanne chez SHM Cils & Ongles. Institut beauté pour cils, sourcils et ongles près de Lyon.',
    heading: 'Ongles à Villeurbanne',
    intro:
      'Pour des mains nettes et élégantes, SHM réalise vos poses gel couleur unie et French dans un studio calme à Villeurbanne.',
  },
] as const

export type LocalRoute = (typeof LOCAL_ROUTES)[number]

const absoluteUrl = (path: string) => new URL(path, BUSINESS.url).toString()

export const businessJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['BeautySalon', 'LocalBusiness'],
      '@id': `${BUSINESS.url}/#business`,
      name: BUSINESS.name,
      url: BUSINESS.url,
      image: SEO_IMAGES.map((image) => absoluteUrl(image)),
      logo: absoluteUrl('/favicon.ico'),
      telephone: BUSINESS.phoneHref,
      email: BUSINESS.email,
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.street,
        postalCode: BUSINESS.postalCode,
        addressLocality: BUSINESS.city,
        addressRegion: BUSINESS.region,
        addressCountry: BUSINESS.country,
      },
      areaServed: BUSINESS.areasServed.map((area) => ({
        '@type': 'City',
        name: area,
      })),
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '21:30',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday'],
          opens: '08:00',
          closes: '23:00',
        },
      ],
      sameAs: [BUSINESS.instagram],
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${BUSINESS.name} ${BUSINESS.street} ${BUSINESS.postalCode} ${BUSINESS.city}`,
      )}`,
      makesOffer: services.map((service) => ({
        '@type': 'Offer',
        name: service.name,
        price: service.price.replace(/[^\d.,]/g, ''),
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: PLANITY_URL,
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          serviceType: categories.find((category) => category.id === service.category)?.name,
          provider: { '@id': `${BUSINESS.url}/#business` },
          areaServed: [...BUSINESS.areasServed],
        },
      })),
      potentialAction: {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: PLANITY_URL,
          actionPlatform: [
            'https://schema.org/DesktopWebPlatform',
            'https://schema.org/MobileWebPlatform',
          ],
        },
        result: {
          '@type': 'Reservation',
          name: 'Réservation SHM Cils & Ongles',
        },
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${BUSINESS.url}/#website`,
      url: BUSINESS.url,
      name: BUSINESS.name,
      inLanguage: 'fr-FR',
      publisher: { '@id': `${BUSINESS.url}/#business` },
    },
  ],
} as const

export function localPageJsonLd(route: LocalRoute) {
  const pageUrl = absoluteUrl(route.slug)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${route.title} | ${BUSINESS.name}`,
        description: route.description,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${BUSINESS.url}/#website` },
        about: { '@id': `${BUSINESS.url}/#business` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: BUSINESS.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: route.title,
            item: pageUrl,
          },
        ],
      },
    ],
  }
}
