import { useRef, useCallback, useState } from 'react'
import { motion } from 'framer-motion'

type Ripple = { id: number; x: number; y: number }

export function WaterRipple({
  className = '',
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const idRef = useRef(0)

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const id = ++idRef.current
    const ripple = { id, x: e.clientX - rect.left, y: e.clientY - rect.top }
    setRipples((prev) => [...prev, ripple])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1000)
  }, [])

  return (
    <div ref={ref} onClick={handleClick} className={`relative overflow-hidden ${className}`}>
      {children}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute z-10 rounded-full border border-flow-glow/40 bg-flow-accent/10"
          style={{ left: r.x, top: r.y, transform: 'translate(-50%, -50%)' }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
