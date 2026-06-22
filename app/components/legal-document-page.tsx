import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Scene3D } from './scene-3d'
import { MarkSiteVisited } from './mark-site-visited'
import { SiteFooter } from './site-footer'
import { SiteMenu } from './site-menu'

export type LegalSection = {
  eyebrow: string
  title: string
  body?: string
  rows?: readonly (readonly [string, string])[]
  icon?: LucideIcon
}

type LegalDocumentPageProps = {
  eyebrow: string
  title: string
  description: string
  sections: readonly LegalSection[]
  finalNote?: string
}

export function LegalDocumentPage({
  eyebrow,
  title,
  description,
  sections,
  finalNote,
}: LegalDocumentPageProps) {
  return (
    <main className="relative min-h-screen bg-black text-white font-sans antialiased">
      <Scene3D />
      <div className="fixed inset-0 z-1 bg-black/84" />
      <div className="pointer-events-none fixed inset-0 z-1 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),#000_86%)]" />

      <div className="relative z-10">
        <MarkSiteVisited />
        <SiteMenu navigationMode="home" />

        <section className="relative flex min-h-screen items-center px-6 md:px-10 lg:px-32">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
              <div className="col-span-3 flex flex-col justify-center">
                <div className="mb-8 inline-flex items-center gap-2.5 self-start text-white/80 text-legible">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-400 opacity-60" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-rose-400" />
                  </span>
                  <span>{eyebrow}</span>
                </div>

                <h1 className="font-playfair text-4xl font-semibold leading-[1.1] tracking-tight text-white text-legible md:text-5xl lg:text-6xl">
                  <span className="block overflow-hidden pb-[0.1em]">{title}</span>
                </h1>

                <p className="mt-6 max-w-lg text-base text-white/80 text-legible md:text-lg">
                  {description}
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
                  >
                    Accueil
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white transition-colors hover:border-rose-400/30 hover:bg-white/5"
                  >
                    Contact
                    <ArrowRight className="size-4" />
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70 text-legible">
                  <span>{title}</span>
                  <span className="hidden h-3 w-px bg-white/20 sm:block" />
                  <span>{eyebrow}</span>
                  <span className="hidden h-3 w-px bg-white/20 sm:block" />
                  <span>SHM Cils &amp; Ongles</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[17rem_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-rose-400/70" />
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-400 text-legible-strong">
                {eyebrow}
              </span>
            </div>
            <p className="font-playfair text-3xl font-semibold leading-[1.1] tracking-tight text-white text-legible md:text-4xl lg:text-5xl">
              Informations claires,
              <br />
              lecture rapide.
            </p>
            <p className="mt-6 text-sm leading-6 text-white/52">
              Ces pages restent sobres volontairement : l’information légale doit être
              facile à scanner sur mobile comme sur desktop.
            </p>
          </aside>

          <div className="border-t border-white/12">
            {sections.map((section, index) => {
              const Icon = section.icon
              const number = String(index + 1).padStart(2, '0')

              return (
                <article
                  key={section.title}
                  className="grid gap-6 border-b border-white/12 py-10 md:grid-cols-[7rem_1fr] md:gap-10 md:py-14"
                >
                  <div className="flex items-center gap-4 md:block">
                    <span className="font-playfair text-3xl font-semibold leading-[1.1] tracking-tight text-rose-300/80 md:text-4xl lg:text-5xl">
                      {number}
                    </span>
                    {Icon && (
                      <span className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-rose-300 md:mt-5">
                        <Icon className="size-4" />
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/38">
                      {section.eyebrow}
                    </p>
                    <h2 className="mt-3 font-playfair text-3xl font-semibold leading-[1.1] tracking-tight text-white text-legible md:text-4xl lg:text-5xl">
                      {section.title}
                    </h2>

                    {section.body && (
                      <p className="mt-6 max-w-3xl text-sm leading-7 text-white/68 md:text-base md:leading-8">
                        {section.body}
                      </p>
                    )}

                    {section.rows && (
                      <dl className="mt-7 divide-y divide-white/10 border-y border-white/10">
                        {section.rows.map(([label, value]) => (
                          <div
                            key={label}
                            className="grid gap-2 py-4 sm:grid-cols-[14rem_1fr] sm:gap-8"
                          >
                            <dt className="text-sm text-white/45">{label}</dt>
                            <dd className="text-sm leading-6 text-white/82">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </article>
              )
            })}

            {finalNote && (
              <div className="py-10 md:py-12">
                <p className="max-w-3xl text-sm leading-7 text-white/56 md:text-base md:leading-8">
                  {finalNote}
                </p>
              </div>
            )}
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
