import { Clock, Mail, MapPin, Star } from 'lucide-react'
import { PLANITY_URL } from '@/lib/content'

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
              <a href="#" className="flex size-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/80 transition-colors hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-400">
                <Star className="size-5" />
              </a>
              <a href="#" className="flex size-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/80 transition-colors hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-400">
                <Star className="size-5" />
              </a>
              <a href="#" className="flex size-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/80 transition-colors hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-400">
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
                <span>7j/7</span>
              </div>
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
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-white/40">
          <p>© 2024 SHM Cils & Ongles. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
