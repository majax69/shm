'use client'

import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { HERO_IMAGES } from '@/lib/content'

// Marge au-delà du viewport : garantit que l'image couvre toujours l'écran,
// même pendant l'inclinaison et le panoramique (jamais de bord visible).
const OVERSCAN = 1.3

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

  // Valeur de scroll lissée : tout le mouvement en découle (aucune souris).
  const smooth = useRef(0)

  useFrame(({ viewport }) => {
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
    const scroll = window.scrollY / maxScroll // 0 → 1 sur toute la page
    smooth.current += (scroll - smooth.current) * 0.08
    const s = smooth.current

    // Dimensions « cover » : le plan remplit le viewport + la marge d'overscan.
    const coverW = viewport.width * OVERSCAN
    const coverH = viewport.height * OVERSCAN
    const planeAspect = coverW / coverH
    const marginX = (coverW - viewport.width) / 2
    const marginY = (coverH - viewport.height) / 2

    // Inclinaison 3D de l'ensemble au scroll : c'est la perspective.
    if (groupRef.current) {
      groupRef.current.rotation.x = (s - 0.5) * 0.14
      groupRef.current.rotation.y = Math.sin(s * Math.PI) * 0.08
    }

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

      // Échelle CONSTANTE = l'image ne rétrécit jamais, couvre toujours tout.
      mesh.scale.set(coverW, coverH, 1)

      material.opacity =
        index === lower && index === upper
          ? 1
          : index === lower
            ? 1 - fade
            : index === upper
              ? fade
              : 0

      // Panoramique doux dans la marge (jamais de bord révélé).
      mesh.position.x = Math.sin(s * Math.PI + index) * marginX * 0.4
      mesh.position.y = -(s - 0.5) * marginY * 0.7
      mesh.position.z = 0
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
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <BackgroundImage3D />
        </Suspense>
      </Canvas>
    </div>
  )
}
