'use client'

import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { AboutSection } from './components/about-section'
import { CtaSection } from './components/cta-section'
import { CustomCursor } from './components/custom-cursor'
import { FloatingParticles } from './components/floating-particles'
import { HeroSection } from './components/hero-section'
import { InfoSection } from './components/info-section'
import { Loader } from './components/loader'
import { ProcessSection } from './components/process-section'
import { Scene3D } from './components/scene-3d'
import { ServicesSection } from './components/services-section'
import { SiteFooter } from './components/site-footer'
import { SiteMenu } from './components/site-menu'
import { StatsBand } from './components/stats-band'
import type { CategoryId } from '@/lib/content'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<CategoryId>('cils')

  return (
    <main className="relative min-h-screen bg-black text-white font-sans antialiased">
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <FloatingParticles />
      <Scene3D />

      <div className="fixed inset-0 z-1 bg-black/85" />

      <div className="relative z-10">
        <SiteMenu onSelectCategory={setActiveCategory} />
        <HeroSection />
        <AboutSection />
        <ServicesSection activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
        <StatsBand />
        <ProcessSection />
        <InfoSection />
        <CtaSection />
        <SiteFooter />
      </div>
    </main>
  )
}
