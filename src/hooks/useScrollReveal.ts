import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal<T extends HTMLElement>(
  options?: Partial<{
    y: number
    opacity: number
    duration: number
    stagger: number
    start: string
    childSelector: string
  }>,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = options?.childSelector
      ? el.querySelectorAll(options.childSelector)
      : el

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: options?.y ?? 60,
        opacity: options?.opacity ?? 0,
        duration: options?.duration ?? 1,
        stagger: options?.stagger ?? 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [options?.y, options?.opacity, options?.duration, options?.stagger, options?.start, options?.childSelector])

  return ref
}
