import React, { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouseX = width / 2
    let mouseY = height / 2
    let targetMouseX = width / 2
    let targetMouseY = height / 2

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    // Particle pool with 3D z-depth
    const PARTICLE_COUNT = Math.min(width < 768 ? 32 : 65, 80)
    const particles = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5, // 3D depth layer: 0.5 to 2.5
        radius: Math.random() * 2.2 + 1.2,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseAlpha: Math.random() * 0.4 + 0.2,
        color: i % 3 === 0 ? '16, 185, 129' : i % 3 === 1 ? '5, 150, 105' : '52, 211, 153'
      })
    }

    const render = () => {
      // Smooth mouse follow interpolation
      mouseX += (targetMouseX - mouseX) * 0.04
      mouseY += (targetMouseY - mouseY) * 0.04

      const mouseDeltaX = (mouseX - width / 2) * 0.0006
      const mouseDeltaY = (mouseY - height / 2) * 0.0006

      ctx.clearRect(0, 0, width, height)

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18 * ((particles[i].z + particles[j].z) / 4)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`
            ctx.lineWidth = 0.85
            ctx.stroke()
          }
        }
      }

      // Update & render particles with 3D depth
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // 3D Parallax offset based on depth (z)
        p.x += p.vx + mouseDeltaX * p.z * 1.5
        p.y += p.vy + mouseDeltaY * p.z * 1.5

        // Boundary wrap
        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        const renderedRadius = p.radius * (p.z * 0.6 + 0.4)
        const pulse = Math.sin(Date.now() * 0.002 + i) * 0.15 + 0.85

        ctx.beginPath()
        ctx.arc(p.x, p.y, renderedRadius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.baseAlpha * pulse})`
        ctx.shadowBlur = 8 * p.z
        ctx.shadowColor = `rgba(${p.color}, 0.5)`
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-3d-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.85
      }}
    />
  )
}
