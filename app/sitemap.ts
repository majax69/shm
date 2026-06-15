import type { MetadataRoute } from 'next'
import { BUSINESS, SEO_IMAGES } from '@/lib/content'
import { LOCAL_ROUTES } from '@/lib/seo'

const url = (path: string) => new URL(path, BUSINESS.url).toString()

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: url('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      images: SEO_IMAGES.map(url),
    },
    ...LOCAL_ROUTES.map((route) => ({
      url: url(route.slug),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      images: SEO_IMAGES.map(url),
    })),
  ]
}
