'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    // Groupe fusée
    const rocket = new THREE.Group()

    // Corps
    const bodyGeo = new THREE.CylinderGeometry(0.3, 0.3, 2, 16)
    const bodyMat = new THREE.MeshBasicMaterial({ color: 0xDDA853, wireframe: true, transparent: true, opacity: 0.6 })
    const body = new THREE.Mesh(bodyGeo, bodyMat)
    rocket.add(body)

    // Nez
    const noseGeo = new THREE.ConeGeometry(0.3, 0.8, 16)
    const noseMat = new THREE.MeshBasicMaterial({ color: 0xEC4899, wireframe: true, transparent: true, opacity: 0.6 })
    const nose = new THREE.Mesh(noseGeo, noseMat)
    nose.position.y = 1.4
    rocket.add(nose)

    // Ailes
    const wingShape = new THREE.Shape()
    wingShape.moveTo(0, 0)
    wingShape.lineTo(0.6, -0.8)
    wingShape.lineTo(0, -0.8)
    wingShape.lineTo(0, 0)

    const wingGeo = new THREE.ShapeGeometry(wingShape)
    const wingMat = new THREE.MeshBasicMaterial({ color: 0x6366F1, transparent: true, opacity: 0.5, side: THREE.DoubleSide })

    for (let i = 0; i < 4; i++) {
      const wing = new THREE.Mesh(wingGeo, wingMat)
      wing.position.y = -1
      wing.rotation.y = (Math.PI / 2) * i
      wing.position.x = Math.sin((Math.PI / 2) * i) * 0.3
      wing.position.z = Math.cos((Math.PI / 2) * i) * 0.3
      rocket.add(wing)
    }

    // Tuyère
    const nozzleGeo = new THREE.CylinderGeometry(0.15, 0.25, 0.3, 16)
    const nozzleMat = new THREE.MeshBasicMaterial({ color: 0x6366F1, wireframe: true, transparent: true, opacity: 0.5 })
    const nozzle = new THREE.Mesh(nozzleGeo, nozzleMat)
    nozzle.position.y = -1.15
    rocket.add(nozzle)

    rocket.position.set(2.5, 0, 0)
    rocket.rotation.z = -0.3
    scene.add(rocket)

    // Particules
    const geometry = new THREE.BufferGeometry()
    const count = 800
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({ color: 0xDDA853, size: 0.04, transparent: true, opacity: 0.5, sizeAttenuation: true })
    const particles = new THREE.Points(geometry, particleMat)
    scene.add(particles)

    // Scroll — disparition
    let scrollY = 0
    const handleScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', handleScroll)

    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)

      // Disparition au scroll
      const opacity = Math.max(0, 1 - scrollY / 300)
      bodyMat.opacity = opacity * 0.6
      noseMat.opacity = opacity * 0.6
      wingMat.opacity = opacity * 0.5
      nozzleMat.opacity = opacity * 0.5
      particleMat.opacity = opacity * 0.5

      // Fusée monte au scroll
      rocket.position.y = scrollY * 0.01

      rocket.rotation.y += 0.005
      particles.rotation.y += 0.0003
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}