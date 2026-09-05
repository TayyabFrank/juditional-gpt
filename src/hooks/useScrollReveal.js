import { useEffect } from 'react'

/**
 * Continuous Scroll Reveal Hook
 * Replays animations every time elements scroll into view (scrolling down OR scrolling up),
 * continuously and repeatedly without requiring page reloads.
 */
export function useScrollReveal(dependencies = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Fallback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll, .reveal-init').forEach((el) => {
        el.classList.add('is-revealed')
      })
      return
    }

    let lastScrollY = window.scrollY || window.pageYOffset

    // Track scroll direction on root html element
    const handleScrollDir = () => {
      const currentScrollY = window.scrollY || window.pageYOffset
      const direction = currentScrollY >= lastScrollY ? 'down' : 'up'
      document.documentElement.setAttribute('data-scroll-direction', direction)
      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY
    }

    window.addEventListener('scroll', handleScrollDir, { passive: true })
    handleScrollDir()

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
        } else {
          // Re-arm animation every time element leaves viewport so it replays on both scroll up and down
          // Only remove if it's completely out of view
          const rect = entry.boundingClientRect
          const windowHeight = window.innerHeight || document.documentElement.clientHeight
          if (rect.top > windowHeight || rect.bottom < 0) {
            entry.target.classList.remove('is-revealed')
          }
        }
      })
    }, observerOptions)

    const observeAll = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-init')
      elements.forEach((el) => observer.observe(el))
    }

    observeAll()

    // Observe any newly mounted DOM elements dynamically
    const mutationObserver = new MutationObserver(() => {
      observeAll()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('scroll', handleScrollDir)
      mutationObserver.disconnect()
      const elements = document.querySelectorAll('.reveal-on-scroll, .reveal-init')
      elements.forEach((el) => observer.unobserve(el))
      observer.disconnect()
    }
  }, dependencies)
}

export default useScrollReveal
