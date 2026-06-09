'use client'

import { motion } from 'framer-motion'

type Particle = {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

// Deterministic PRNG (mulberry32) so the particle layout is identical on the
// server and the client. Using Math.random() here would compute different
// values in each environment and break hydration.
const mulberry32 = (seed: number) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const generateParticles = (): Particle[] => {
  const rand = mulberry32(0x5f3759df)
  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 3 + 1,
    duration: rand() * 20 + 10,
    delay: rand() * 5,
  }))
}

const PARTICLES = generateParticles()

export function FloatingParticles() {
  const particles = PARTICLES

  return (
    <div className="fixed inset-0 pointer-events-none z-2 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}
