'use client'

import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { AboutSection } from './components/about-section'
import { CtaSection } from './components/cta-section'
import { CustomCursor } from './components/custom-cursor'
import { FaqSection } from './components/faq-section'
import { HeroSection } from './components/hero-section'
import { InfoSection } from './components/info-section'
import { Loader } from './components/loader'
import { LocalSeoSection } from './components/local-seo-section'
import { MobileBookingBar } from './components/mobile-booking-bar'
import { ProcessSection } from './components/process-section'
import { ResultsSection } from './components/results-section'
import { ServicesSection } from './components/services-section'
import { SiteFooter } from './components/site-footer'
import { SiteMenu } from './components/site-menu'
import { StatsBand } from './components/stats-band'
import type { CategoryId } from '@/lib/content'

// Three.js utilise window/WebGL — exclure du SSR pour éviter un crash en build
const Scene3D = dynamic(() => import('./components/scene-3d').then((m) => m.Scene3D), {
  ssr: false,
  loading: () => null,
})

const LOADER_STORAGE_KEY = 'shm-loader-seen'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState<CategoryId>('cils')

  useEffect(() => {
    const hasSeenLoader = window.sessionStorage.getItem(LOADER_STORAGE_KEY) === '1'
    setIsLoading(!hasSeenLoader)
  }, [])

  const handleLoaderComplete = useCallback(() => {
    window.sessionStorage.setItem(LOADER_STORAGE_KEY, '1')
    setIsLoading(false)
  }, [])

  return (
    <main id="main-content" className="relative min-h-screen bg-black text-white font-sans antialiased">
      <AnimatePresence>
        {isLoading && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <CustomCursor />
      <Scene3D />

      <div className="fixed inset-0 z-1 bg-black/80" />

      <div className="relative z-10">
        <SiteMenu onSelectCategory={setActiveCategory} />
        <HeroSection />
        <StatsBand />
        <AboutSection />
        <ServicesSection activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        <ResultsSection />
        <ProcessSection />
        <FaqSection />
        <LocalSeoSection />
        <InfoSection />
        <CtaSection />
        <SiteFooter />
      </div>

      <MobileBookingBar />
    </main>
  )
}
