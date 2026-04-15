'use client'

// --------------------------- HeroScene ---------------------------
// Scène Three.js en fond fixe
// Particules multicolores + constellation (lignes entre points proches)
// Charte Sunset Gold : or #DDA853 · rose #EC4899 · indigo #6366F1
// Disparition progressive au scroll
// -----------------------------------------------------------------

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// --------------------------- Types ---------------------------

interface ParticlePoint {
  x: number
  y: number
  z: number
}

// --------------------------- Constantes ---------------------------

const PARTICLE_COUNT  = 800
const MAX_DIST_LINES  = 2.5   // Distance max pour tracer une ligne de constellation
const SCROLL_FADE_END = 400   // Scroll en px auquel les particules disparaissent complètement

const COLORS = [
  new THREE.Color(0xDDA853), // or
  new THREE.Color(0xEC4899), // rose
  new THREE.Color(0x6366F1), // indigo
]

// --------------------------- Composant ---------------------------

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scène & caméra
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 6

    // Renderer transparent (alpha) pour superposition sur le fond CSS
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    // --------------------------- Particules ---------------------------

    const positions:    number[]        = []
    const colors:       number[]        = []
    const particleData: ParticlePoint[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 10

      positions.push(x, y, z)
      particleData.push({ x, y, z })

      // Couleur aléatoire parmi les 3 de la charte
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      colors.push(color.r, color.g, color.b)
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
    particleGeo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(colors), 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // --------------------------- Constellation ---------------------------

    const linePositions: number[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx   = particleData[i].x - particleData[j].x
        const dy   = particleData[i].y - particleData[j].y
        const dz   = particleData[i].z - particleData[j].z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < MAX_DIST_LINES) {
          linePositions.push(
            particleData[i].x, particleData[i].y, particleData[i].z,
            particleData[j].x, particleData[j].y, particleData[j].z
          )
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3))

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xDDA853,
      transparent: true,
      opacity: 0.08,
    })

    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    // --------------------------- Scroll ---------------------------

    let scrollY = 0
    const handleScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', handleScroll)

    // --------------------------- Animation ---------------------------

    let animId: number

    const animate = () => {
      animId = requestAnimationFrame(animate)

      // Opacité inversement proportionnelle au scroll
      const opacity       = Math.max(0, 1 - scrollY / SCROLL_FADE_END)
      particleMat.opacity = opacity * 0.7
      lineMat.opacity     = opacity * 0.08

      // Rotation lente pour donner vie à la scène
      particles.rotation.y += 0.0003
      lines.rotation.y     += 0.0003

      renderer.render(scene, camera)
    }

    animate()

    // --------------------------- Resize ---------------------------

    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    // --------------------------- Cleanup ---------------------------

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  // Div conteneur — position fixed, couvre toute la page, non interactif
  return (
    <div
      ref={mountRef}
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         '100%',
        height:        '100%',
        zIndex:        0,
        pointerEvents: 'none',
      }}
    />
  )
}