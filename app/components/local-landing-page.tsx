import Link from 'next/link'
import { ArrowRight, Check, MapPin } from 'lucide-react'
import { BUSINESS, PLANITY_URL, services } from '@/lib/content'
import type { LOCAL_ROUTES } from '@/lib/seo'

type LocalRoute = (typeof LOCAL_ROUTES)[number]

export function LocalLandingPage({ route }: { route: LocalRoute }) {
  const relevantServices = route.slug.includes('ongles')
    ? services.filter((service) => service.category === 'ongles')
    : services.filter((service) => service.category === 'cils' || service.category === 'sourcils')

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-28 md:px-12">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-rose-300">
          <MapPin className="size-4" />
          {BUSINESS.city} · près de Lyon
        </p>
        <h1 className="mt-6 font-playfair text-5xl font-semibold leading-tight md:text-7xl">
          {route.heading}
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72">{route.intro}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={PLANITY_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            Réserver sur Planity
            <ArrowRight className="size-4" />
          </a>
          <Link
            href="/#prestations"
            className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 text-sm font-medium text-white transition-colors hover:border-rose-400/40 hover:bg-white/5"
          >
            Voir tous les tarifs
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 md:px-12">
        <h2 className="font-playfair text-4xl text-white">Pourquoi choisir SHM ?</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            'Diagnostic selon la morphologie du regard',
            'Prestations cils, sourcils et ongles au même endroit',
            `Adresse pratique à ${BUSINESS.city}, proche de Lyon`,
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Check className="size-5 text-rose-300" />
              <p className="mt-4 text-sm leading-6 text-white/72">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 md:px-12">
        <h2 className="font-playfair text-4xl text-white">Prestations populaires</h2>
        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {relevantServices.map((service) => (
            <a
              key={service.name}
              href={PLANITY_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-baseline justify-between gap-6 py-5 transition-colors hover:text-rose-200"
            >
              <span className="font-playfair text-2xl">{service.name}</span>
              <span className="shrink-0 text-white/70">{service.price}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
