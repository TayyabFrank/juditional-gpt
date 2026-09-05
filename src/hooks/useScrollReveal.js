import { useEffect } from 'react'

/**
 * Custom hook to initialize IntersectionObserver for elements with
 * `.reveal-on-scroll` or `.reveal-init` classes.
 * Automatically adds `.is-revealed` class when elements enter viewport.
 */
export function useScrollReveal(dependencies = []) {
  useEffect(() => {
    // Check for browser support
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback for environments without IntersectionObserver
      document.querySelectorAll('.reveal-on-scroll, .reveal-init').forEach((el) => {
        el.classList.add('is-revealed')
      })
      return
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          // Once revealed, unobserve to optimize performance
          obs.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-init')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
      observer.disconnect()
    }
  }, dependencies)
}

export default useScrollReveal
