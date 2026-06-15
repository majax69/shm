import Link from 'next/link'
import { BUSINESS } from '@/lib/content'
import { LOCAL_ROUTES } from '@/lib/seo'
import { SectionHeading } from './section-heading'

export function LocalSeoSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
      <SectionHeading
        eyebrow="Institut beauté Lyon · Villeurbanne"
        title="Extensions de cils et ongles près de Lyon."
        description={`Situé ${BUSINESS.street}, ${BUSINESS.name} accompagne les clientes de Villeurbanne, Lyon 3, Lyon 6, Lyon 7 et des communes voisines pour des poses de cils, sourcils et ongles soignées.`}
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {LOCAL_ROUTES.map((route) => (
          <Link
            key={route.slug}
            href={route.slug}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-rose-400/35 hover:bg-white/8"
          >
            <h3 className="font-playfair text-2xl text-white transition-colors group-hover:text-rose-200">
              {route.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/60">{route.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
