import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  value: number
  suffix?: string
  label: string
  duration?: number
}

export function AnimatedCounter({ value, suffix = '', label, duration = 2 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => setDisplay(Math.floor(obj.val)),
    })

    return () => {
      tween.kill()
    }
  }, [value, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-3xl font-bold text-flow-deep md:text-4xl">
        {display.toLocaleString('en-IN')}
        <span className="text-flow-accent">{suffix}</span>
      </div>
      <p className="mt-1 text-sm text-flow-navy/70">{label}</p>
    </div>
  )
}
