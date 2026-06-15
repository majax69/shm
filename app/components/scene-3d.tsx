'use client'

import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { HERO_IMAGES } from '@/lib/content'

// Marge au-delà du viewport : absorbe le zoom, la rotation et le panoramique
// sans jamais révéler les bords des photos verticales.
const OVERSCAN = 1.08
const SCROLL_DAMPING = 5.5
const VELOCITY_DAMPING = 7

// Recadre la texture en mode « cover » (remplit le plan sans la déformer).
function applyCover(texture: THREE.Texture, planeAspect: number) {
  const image = texture.image as { width?: number; height?: number } | undefined
  if (!image?.width || !image?.height) return
  const imageAspect = image.width / image.height

  if (imageAspect > planeAspect) {
    texture.repeat.set(planeAspect / imageAspect, 1)
    texture.offset.set((1 - planeAspect / imageAspect) / 2, 0)
  } else {
    texture.repeat.set(1, imageAspect / planeAspect)
    texture.offset.set(0, (1 - imageAspect / planeAspect) / 2)
  }
}

function BackgroundImage3D() {
  const meshRefs = useRef<THREE.Mesh[]>([])
  const groupRef = useRef<THREE.Group>(null)
  const textures = useLoader(THREE.TextureLoader, HERO_IMAGES)
  const gl = useThree((state) => state.gl)
  const reducedMotion = useRef(false)

  // Qualité des textures : couleurs correctes (SRGB) + netteté (anisotropie).
  useEffect(() => {
    const maxAniso = gl.capabilities.getMaxAnisotropy()
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = maxAniso
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.generateMipmaps = true
      texture.needsUpdate = true
    })
  }, [gl, textures])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => {
      reducedMotion.current = media.matches
    }

    updatePreference()
    media.addEventListener('change', updatePreference)
    return () => media.removeEventListener('change', updatePreference)
  }, [])

  // Progression et vitesse sont lissées séparément. La progression positionne
  // la scène, tandis que la vitesse ajoute une courte impulsion de profondeur.
  const smooth = useRef(0)
  const previousScroll = useRef(0)
  const velocity = useRef(0)

  useFrame(({ viewport, camera }, delta) => {
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
    const scroll = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1)
    const safeDelta = Math.max(delta, 1 / 120)
    const rawVelocity = THREE.MathUtils.clamp(
      (scroll - previousScroll.current) / safeDelta,
      -0.7,
      0.7,
    )

    previousScroll.current = scroll
    smooth.current = THREE.MathUtils.damp(
      smooth.current,
      scroll,
      SCROLL_DAMPING,
      delta,
    )
    velocity.current = THREE.MathUtils.damp(
      velocity.current,
      rawVelocity,
      VELOCITY_DAMPING,
      delta,
    )

    const s = smooth.current
    const speed = reducedMotion.current ? 0 : velocity.current

    // Dimensions « cover » : le plan remplit le viewport + la marge d'overscan.
    const coverW = viewport.width * OVERSCAN
    const coverH = viewport.height * OVERSCAN
    const planeAspect = coverW / coverH
    const marginX = (coverW - viewport.width) / 2
    const marginY = (coverH - viewport.height) / 2

    // La caméra et le groupe ne bougent pas au même rythme : ce décalage crée
    // une vraie sensation de profondeur, renforcée brièvement quand on scrolle.
    if (groupRef.current) {
      const motion = reducedMotion.current ? 0 : 1
      groupRef.current.rotation.x = ((s - 0.5) * 0.16 - speed * 0.11) * motion
      groupRef.current.rotation.y = (Math.sin(s * Math.PI * 2) * 0.055 + speed * 0.08) * motion
      groupRef.current.rotation.z = Math.sin(s * Math.PI) * 0.012 * motion
      groupRef.current.position.y = Math.sin(s * Math.PI * 2) * 0.035 * motion
    }

    camera.position.x = Math.sin(s * Math.PI * 1.5) * 0.07 * (reducedMotion.current ? 0 : 1)
    camera.position.y = (0.04 - s * 0.08) * (reducedMotion.current ? 0 : 1)
    camera.position.z = 5 - Math.abs(speed) * 0.16
    camera.lookAt(0, 0, 0)

    // Timeline à parts strictement égales : chaque image reste affichée
    // pleine pendant la même durée H, et chaque fondu dure le même temps T,
    // avec n·H + (n-1)·T = 1. Aucune image (ni la 1re ni la dernière) n'est
    // privilégiée. P = part totale du scroll consacrée aux fondus.
    const n = HERO_IMAGES.length
    const P = 0.45
    const T = n > 1 ? P / (n - 1) : 1
    const H = (1 - P) / n
    const cycle = H + T

    const i = Math.min(Math.floor(s / cycle), n - 1)
    const within = s - i * cycle

    let lower = i
    let upper = i
    let fade = 0
    if (within > H && i < n - 1) {
      lower = i
      upper = i + 1
      const e = THREE.MathUtils.clamp((within - H) / T, 0, 1)
      fade = e * e * (3 - 2 * e)
    }

    meshRefs.current.forEach((mesh, index) => {
      if (!mesh) return
      const material = mesh.material as THREE.MeshBasicMaterial

      if (material.map) applyCover(material.map, planeAspect)

      const opacity =
        index === lower && index === upper
          ? 1
          : index === lower
            ? 1 - fade
            : index === upper
              ? fade
              : 0
      material.opacity = reducedMotion.current ? (index === 0 ? 1 : 0) : opacity

      // Chaque photo suit une trajectoire légèrement différente. Pendant le
      // fondu, la nouvelle image arrive de l'arrière et dépasse doucement la
      // précédente, ce qui rend le changement lisible sans effet de diaporama.
      const motion = reducedMotion.current ? 0 : 1
      const imagePhase = s * Math.PI * 1.8 + index * 1.35
      const depth = (opacity - 0.5) * 0.16 + speed * (index % 2 === 0 ? 0.16 : -0.12)
      const zoom = 1 + Math.abs(speed) * 0.018

      mesh.scale.set(coverW * zoom, coverH * zoom, 1)
      mesh.position.x = Math.sin(imagePhase) * marginX * 0.62 * motion
      mesh.position.y = (
        -(s - 0.5) * marginY * 0.9 +
        Math.cos(imagePhase * 0.72) * marginY * 0.18
      ) * motion
      mesh.position.z = depth * motion
      mesh.rotation.z = Math.sin(imagePhase * 0.55) * 0.008 * motion
    })
  })

  return (
    <group ref={groupRef}>
      {textures.map((texture, index) => (
        <mesh
          key={index}
          ref={(el) => {
            if (el) meshRefs.current[index] = el
          }}
          renderOrder={index}
        >
          <planeGeometry args={[1, 1]} />
          {/* depthTest/Write off => pas de z-fighting entre les deux calques.
              toneMapped off => contraste et couleurs fidèles à la photo. */}
          <meshBasicMaterial
            map={texture}
            transparent
            depthTest={false}
            depthWrite={false}
            toneMapped={false}
            opacity={index === 0 ? 1 : 0}
          />
        </mesh>
      ))}
    </group>
  )
}

export function Scene3D() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <BackgroundImage3D />
        </Suspense>
      </Canvas>
    </div>
  )
}
