import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { BUSINESS, PLANITY_URL } from '@/lib/content'
import { LOCAL_ROUTES } from '@/lib/seo'

// lucide ne fournit plus d'icône de marque : SVG Instagram inline.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-black/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">SHM Cils & Ongles</h3>
            <p className="text-sm text-white/60">
              Extensions de cils, volume russe, browlift, rehaussement et ongles dans un univers élégant.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de SHM"
                className="flex size-11 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/80 transition-colors hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-400"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                aria-label="Envoyer un e-mail à SHM"
                className="flex size-11 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/80 transition-colors hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-400"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-rose-400 mt-0.5" />
                <span>68 Rue Léon Blum<br />69100 Villeurbanne</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-rose-400" />
                <span>Ouvert 7j/7 · 08:00 – 21:30</span>
              </div>
              <a
                href={`tel:${BUSINESS.phoneHref}`}
                className="flex items-center gap-3 transition-colors hover:text-rose-400"
              >
                <Phone className="size-5 text-rose-400" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Liens rapides</h3>
            <div className="space-y-3 text-sm">
              <a href="#prestations" className="block text-white/60 transition-colors hover:text-rose-400">
                Prestations
              </a>
              <a href={PLANITY_URL} target="_blank" rel="noreferrer" className="block text-white/60 transition-colors hover:text-rose-400">
                Réserver en ligne
              </a>
              {LOCAL_ROUTES.map((route) => (
                <a key={route.slug} href={route.slug} className="block text-white/60 transition-colors hover:text-rose-400">
                  {route.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/5 pt-8 text-center text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} SHM Cils &amp; Ongles. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href="/mentions-legales" className="transition-colors hover:text-rose-400">
              Mentions légales
            </a>
            <span className="text-white/25">·</span>
            <a href="/confidentialite" className="transition-colors hover:text-rose-400">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
