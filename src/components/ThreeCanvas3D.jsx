import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeCanvas3D() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    
    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || window.innerHeight

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 18)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const primaryLight = new THREE.DirectionalLight(0x10b981, 2.8)
    primaryLight.position.set(10, 15, 10)
    scene.add(primaryLight)

    const accentLight = new THREE.PointLight(0x34d399, 4, 30)
    accentLight.position.set(-10, -5, 8)
    scene.add(accentLight)

    const blueRimLight = new THREE.PointLight(0x06b6d4, 3, 25)
    blueRimLight.position.set(12, -8, 5)
    scene.add(blueRimLight)

    // Master Group for Mouse Parallax
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // Position main group towards the right side of the hero (where visual focus sits)
    const isMobile = width < 768
    mainGroup.position.set(isMobile ? 0 : 3.8, isMobile ? -0.5 : 0.2, 0)
    mainGroup.scale.setScalar(isMobile ? 0.72 : 1.05)

    // -------------------------------------------------------------------------
    // 1. 3D HOLOGRAPHIC SCALES OF JUSTICE
    // -------------------------------------------------------------------------
    const scalesGroup = new THREE.Group()
    mainGroup.add(scalesGroup)

    // Materials
    const emeraldMetalMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x047857,
      emissiveIntensity: 0.45
    })

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x10b981,
      emissiveIntensity: 0.6
    })

    const wireframeEmeraldMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    })

    // Central Pillar
    const pillarGeo = new THREE.CylinderGeometry(0.12, 0.18, 7.2, 32)
    const pillar = new THREE.Mesh(pillarGeo, emeraldMetalMat)
    scalesGroup.add(pillar)

    // Base Pedestal (Layered 3D discs)
    const base1Geo = new THREE.CylinderGeometry(1.6, 1.8, 0.35, 32)
    const base1 = new THREE.Mesh(base1Geo, emeraldMetalMat)
    base1.position.y = -3.6
    scalesGroup.add(base1)

    const base2Geo = new THREE.CylinderGeometry(1.2, 1.4, 0.25, 32)
    const base2 = new THREE.Mesh(base2Geo, goldAccentMat)
    base2.position.y = -3.3
    scalesGroup.add(base2)

    // Top Finial Crown Sphere
    const topSphereGeo = new THREE.SphereGeometry(0.42, 32, 32)
    const topSphere = new THREE.Mesh(topSphereGeo, goldAccentMat)
    topSphere.position.y = 3.7
    scalesGroup.add(topSphere)

    // Horizontal Balance Beam (Rotating Pivot)
    const beamGroup = new THREE.Group()
    beamGroup.position.y = 2.9
    scalesGroup.add(beamGroup)

    const beamGeo = new THREE.CylinderGeometry(0.09, 0.09, 6.4, 32)
    const beam = new THREE.Mesh(beamGeo, emeraldMetalMat)
    beam.rotation.z = Math.PI / 2
    beamGroup.add(beam)

    const beamCenterSphereGeo = new THREE.SphereGeometry(0.3, 24, 24)
    const beamCenterSphere = new THREE.Mesh(beamCenterSphereGeo, goldAccentMat)
    beamGroup.add(beamCenterSphere)

    // Balance Pans (Left and Right)
    const createPan = (xPos) => {
      const panHolder = new THREE.Group()
      panHolder.position.set(xPos, 0, 0)

      // Strings
      const stringMat = new THREE.LineBasicMaterial({
        color: 0x34d399,
        transparent: true,
        opacity: 0.75
      })

      const stringPoints1 = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(-0.9, -2.4, -0.5)]
      const stringPoints2 = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.9, -2.4, -0.5)]
      const stringPoints3 = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -2.4, 0.9)]

      const stringGeo1 = new THREE.BufferGeometry().setFromPoints(stringPoints1)
      const stringGeo2 = new THREE.BufferGeometry().setFromPoints(stringPoints2)
      const stringGeo3 = new THREE.BufferGeometry().setFromPoints(stringPoints3)

      panHolder.add(new THREE.Line(stringGeo1, stringMat))
      panHolder.add(new THREE.Line(stringGeo2, stringMat))
      panHolder.add(new THREE.Line(stringGeo3, stringMat))

      // Pan Bowl (Lathed 3D curve)
      const points = []
      for (let i = 0; i <= 10; i++) {
        points.push(new THREE.Vector2(Math.sin((i * Math.PI) / 20) * 1.15, -Math.cos((i * Math.PI) / 20) * 0.35))
      }
      const panGeo = new THREE.LatheGeometry(points, 32)
      const pan = new THREE.Mesh(panGeo, goldAccentMat)
      pan.position.y = -2.4
      panHolder.add(pan)

      // Pan Wireframe Hologram Rim
      const panWire = new THREE.Mesh(panGeo, wireframeEmeraldMat)
      panWire.position.y = -2.4
      panWire.scale.setScalar(1.03)
      panHolder.add(panWire)

      return panHolder
    }

    const leftPan = createPan(-3.1)
    const rightPan = createPan(3.1)
    beamGroup.add(leftPan)
    beamGroup.add(rightPan)

    // -------------------------------------------------------------------------
    // 2. GYROSCOPIC 3D ORBITAL NEON RINGS
    // -------------------------------------------------------------------------
    const ringGroup = new THREE.Group()
    mainGroup.add(ringGroup)

    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    })
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    })
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.55
    })

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(4.8, 0.04, 16, 100), ringMat1)
    ring1.rotation.x = Math.PI / 3
    ringGroup.add(ring1)

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5.4, 0.03, 16, 100), ringMat2)
    ring2.rotation.y = Math.PI / 4
    ring2.rotation.x = Math.PI / 6
    ringGroup.add(ring2)

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.035, 16, 100), ringMat3)
    ring3.rotation.x = -Math.PI / 4
    ring3.rotation.z = Math.PI / 5
    ringGroup.add(ring3)

    // -------------------------------------------------------------------------
    // 3. FLOATING 3D CRYSTALS & POLYHEDRONS
    // -------------------------------------------------------------------------
    const crystalGroup = new THREE.Group()
    mainGroup.add(crystalGroup)

    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x10b981,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
      ior: 1.6,
      transparent: true,
      opacity: 0.85,
      emissive: 0x059669,
      emissiveIntensity: 0.4
    })

    const crystals = []
    const crystalGeometries = [
      new THREE.IcosahedronGeometry(0.55, 0),
      new THREE.OctahedronGeometry(0.65, 0),
      new THREE.DodecahedronGeometry(0.5, 0),
      new THREE.TetrahedronGeometry(0.6, 0)
    ]

    const crystalConfigs = [
      { pos: [-4.5, 3.2, 1.8], geoIdx: 0, rotSpeed: [0.01, 0.015, 0.005] },
      { pos: [4.8, 2.5, 2.2], geoIdx: 1, rotSpeed: [-0.012, 0.008, 0.01] },
      { pos: [-3.8, -2.8, 2.5], geoIdx: 2, rotSpeed: [0.008, -0.014, 0.006] },
      { pos: [4.2, -2.5, 1.5], geoIdx: 3, rotSpeed: [0.015, 0.01, -0.01] },
      { pos: [0, 4.6, -1.5], geoIdx: 0, rotSpeed: [-0.01, 0.012, 0.008] }
    ]

    crystalConfigs.forEach((cfg) => {
      const mesh = new THREE.Mesh(crystalGeometries[cfg.geoIdx], crystalMat)
      mesh.position.set(...cfg.pos)
      const wire = new THREE.Mesh(
        crystalGeometries[cfg.geoIdx],
        new THREE.MeshBasicMaterial({ color: 0x6ee7b7, wireframe: true, transparent: true, opacity: 0.4 })
      )
      wire.scale.setScalar(1.05)
      mesh.add(wire)
      crystalGroup.add(mesh)
      crystals.push({ mesh, basePos: [...cfg.pos], rotSpeed: cfg.rotSpeed, offset: Math.random() * Math.PI * 2 })
    })

    // -------------------------------------------------------------------------
    // 4. 3D DYNAMIC NEURAL POINT CLOUD
    // -------------------------------------------------------------------------
    const particleCount = 200
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleVelocities = []
    const baseParticlePos = []

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = 3.5 + Math.random() * 5.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      particlePositions[i3] = x
      particlePositions[i3 + 1] = y
      particlePositions[i3 + 2] = z

      baseParticlePos.push(new THREE.Vector3(x, y, z))
      particleVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008
        )
      )
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.16,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    })

    const pointCloud = new THREE.Points(particleGeo, particleMat)
    mainGroup.add(pointCloud)

    // -------------------------------------------------------------------------
    // 5. MOUSE INTERACTION & ANIMATION LOOP
    // -------------------------------------------------------------------------
    let targetRotX = 0
    let targetRotY = 0
    let currentRotX = 0
    let currentRotY = 0

    const handleMouseMove = (e) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1
      const normalizedY = -(e.clientY / window.innerHeight) * 2 + 1

      targetRotY = normalizedX * 0.4
      targetRotX = -normalizedY * 0.25
    }

    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      if (!container) return
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)

      const mobileCheck = width < 768
      mainGroup.position.set(mobileCheck ? 0 : 3.8, mobileCheck ? -0.5 : 0.2, 0)
      mainGroup.scale.setScalar(mobileCheck ? 0.72 : 1.05)
    }

    window.addEventListener('resize', handleResize)

    // Clock for smooth trigonometric animations
    const clock = new THREE.Clock()
    let animationFrameId

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse interpolation (Damping)
      currentRotX += (targetRotX - currentRotX) * 0.05
      currentRotY += (targetRotY - currentRotY) * 0.05

      mainGroup.rotation.x = currentRotX
      mainGroup.rotation.y = currentRotY

      // Oscillate Scales Beam gently like real judicial balances
      const beamOscillation = Math.sin(elapsedTime * 1.2) * 0.08
      beamGroup.rotation.z = beamOscillation
      leftPan.rotation.z = -beamOscillation // Counter-rotate pans to stay vertical
      rightPan.rotation.z = -beamOscillation

      // Rotate Gyro Rings
      ring1.rotation.z += 0.003
      ring1.rotation.x += 0.002
      ring2.rotation.y += 0.004
      ring3.rotation.z -= 0.003

      // Animate Crystals (Floating float + spin)
      crystals.forEach(({ mesh, basePos, rotSpeed, offset }) => {
        mesh.rotation.x += rotSpeed[0]
        mesh.rotation.y += rotSpeed[1]
        mesh.rotation.z += rotSpeed[2]
        mesh.position.y = basePos[1] + Math.sin(elapsedTime * 1.5 + offset) * 0.35
      })

      // Animate Neural Point Cloud
      const positions = particleGeo.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3] += particleVelocities[i].x
        positions[i3 + 1] += particleVelocities[i].y
        positions[i3 + 2] += particleVelocities[i].z

        // Keep within bounds
        const dist = Math.sqrt(
          positions[i3] * positions[i3] +
          positions[i3 + 1] * positions[i3 + 1] +
          positions[i3 + 2] * positions[i3 + 2]
        )
        if (dist > 9 || dist < 2.5) {
          positions[i3] = baseParticlePos[i].x
          positions[i3 + 1] = baseParticlePos[i].y
          positions[i3 + 2] = baseParticlePos[i].z
        }
      }
      particleGeo.attributes.position.needsUpdate = true

      // Slow idle rotation
      scalesGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.15

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }

      // Dispose Geometries and Materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) {
          if (object.geometry) object.geometry.dispose()
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose())
            } else {
              object.material.dispose()
            }
          }
        }
      })
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="three-canvas-3d-wrapper"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden'
      }}
    />
  )
}
