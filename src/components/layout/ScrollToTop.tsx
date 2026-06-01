import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to top on route change (works with Lenis smooth scroll). */
export function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    const lenis = window.__flowtexLenis
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, search, hash])

  return null
}
