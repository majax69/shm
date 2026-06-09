'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, Home, MapPin, Menu, Sparkles, X, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { categories, PLANITY_URL, type CategoryId } from '@/lib/content'

const EASE = [0.22, 1, 0.36, 1] as const

// Liens du header (desktop). Toutes les ancres existent dans la page.
const NAV_LINKS = [
  { label: 'Le studio', href: '#signature' },
  { label: 'Prestations', href: '#prestations' },
  { label: 'Déroulé', href: '#parcours' },
  { label: 'Contact', href: '#contact' },
]

type NavItem = {
  label: string
  href: string
  icon: LucideIcon
  color: string
  category?: CategoryId
}

// Tiroir mobile : reprend les catégories pour pouvoir les sélectionner.
const drawerItems: NavItem[] = [
  { label: 'Accueil', href: '#', icon: Home, color: 'text-rose-400' },
  ...categories.map((category) => ({
    label: category.name,
    href: '#prestations',
    icon: category.icon,
    color: category.color,
    category: category.id,
  })),
  { label: 'Contact', href: '#contact', icon: MapPin, color: 'text-rose-400' },
]

export function SiteMenu({ onSelectCategory }: { onSelectCategory: (category: CategoryId) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > 24
    setScrolled((prev) => (prev === next ? prev : next))
  })

  const goTo = (href: string) => {
    setIsOpen(false)
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDrawerClick = (item: NavItem) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (item.category) onSelectCategory(item.category)
    goTo(item.href)
  }

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.8, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled
            ? ' bg-black/20 backdrop-blur-xl border-white/5'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          {/* Marque */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              goTo('#')
            }}
            className="group flex items-center gap-2.5"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-rose-400/25 bg-rose-400/10 text-rose-400 transition-colors duration-300 group-hover:bg-rose-400/20">
              <Sparkles className="size-4" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-playfair text-lg font-semibold tracking-tight text-white text-legible">
                SHM
              </span>
              <span className="mt-1 text-[0.6rem] uppercase tracking-[0.28em] text-rose-400/80 text-legible">
                Cils &amp; Ongles
              </span>
            </span>
          </a>

          {/* Navigation desktop */}
          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  goTo(link.href)
                }}
                className="group relative text-sm text-white/75 text-legible transition-colors duration-300 hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-rose-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 text-xs text-white/60 text-legible lg:inline-flex">
              <MapPin className="size-3.5 text-rose-400" />
              Villeurbanne
              <span className="text-white/25">·</span>
              7j/7
            </span>
            <span className="hidden h-5 w-px bg-white/15 lg:block" />
            <a
              href={PLANITY_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-transform duration-300 hover:scale-105 md:inline-flex"
            >
              Réserver
              <ArrowRight className="size-4" />
            </a>
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Ouvrir le menu"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/20 hover:bg-black/10 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-rose-400/30 md:hidden"
            >
              <Menu className="size-5 text-white" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Tiroir mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 z-[70] h-full w-full max-w-sm border-l border-white/5 bg-black/95 backdrop-blur-3xl md:hidden"
            >
              <div className="flex h-full flex-col p-6">
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-full bg-rose-400/10 text-rose-400 ring-1 ring-rose-400/20">
                      <Sparkles className="size-4" />
                    </span>
                    <span className="font-playfair text-base font-semibold text-white">SHM</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    aria-label="Fermer le menu"
                    className="flex size-8 items-center justify-center rounded-full border border-white/5 bg-white/5"
                  >
                    <X className="size-4 text-white" />
                  </motion.button>
                </div>

                <nav className="flex flex-col gap-5">
                  {drawerItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ x: 24, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05, ease: EASE }}
                        onClick={handleDrawerClick(item)}
                        className="group flex items-center gap-3 text-base text-white/80 transition-colors hover:text-white"
                      >
                        <Icon className={`size-5 ${item.color}`} />
                        <span>{item.label}</span>
                      </motion.a>
                    )
                  })}
                </nav>

                <div className="mt-auto">
                  <a
                    href={PLANITY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
                  >
                    Réserver
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
