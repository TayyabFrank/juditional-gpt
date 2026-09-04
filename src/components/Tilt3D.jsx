import React, { useRef, useEffect } from 'react'

export default function Tilt3D({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1200,
  scale = 1.03,
  glare = true,
  depth = true,
  onClick,
  style = {}
}) {
  const cardRef = useRef(null)
  const glareRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
      cardRef.current.style.transition = 'transform 0.08s cubic-bezier(0.2, 0, 0.2, 1)'

      if (glare && glareRef.current) {
        const glareX = (x / rect.width) * 100
        const glareY = (y / rect.height) * 100
        glareRef.current.style.left = `${glareX}%`
        glareRef.current.style.top = `${glareY}%`
        glareRef.current.style.opacity = '0.35'
        glareRef.current.style.transform = 'translate(-50%, -50%) scale(1.2)'
        glareRef.current.style.transition = 'opacity 0.15s ease-out, transform 0.2s ease-out'
      }
    })
  }

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
      cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    }
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = '0'
      glareRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)'
      glareRef.current.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out'
    }
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-3d-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        transformStyle: depth ? 'preserve-3d' : 'flat',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        ...style
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="tilt-3d-glare"
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(52, 211, 153, 0.35) 45%, rgba(16, 185, 129, 0.05) 70%, transparent 85%)',
            pointerEvents: 'none',
            zIndex: 35,
            opacity: 0,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) scale(0.8)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
          }}
        />
      )}
    </div>
  )
}
