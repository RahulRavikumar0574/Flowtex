import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react'
import { TESTIMONIALS } from '../../data/site'

const COUNT = TESTIMONIALS.length
const AUTO_MS = 4500

/** Shortest signed index distance on the ring */
function ringOffset(i: number, active: number) {
  let diff = i - active
  if (diff > COUNT / 2) diff -= COUNT
  if (diff < -COUNT / 2) diff += COUNT
  return diff
}

function getOrbitPosition(i: number, active: number, radius: number) {
  const relAngle = (ringOffset(i, active) / COUNT) * Math.PI * 2
  const depth = Math.cos(relAngle)

  const x = Math.sin(relAngle) * radius
  const y = (1 - depth) * 28

  const frontness = (depth + 1) / 2
  const scale = 0.72 + frontness * 0.28
  const opacity = 0.4 + frontness * 0.6
  const zIndex = Math.round(10 + frontness * 40)

  return {
    x,
    y,
    scale,
    opacity,
    zIndex,
    isActive: i === active,
    depth,
  }
}

type CardProps = {
  testimonial: (typeof TESTIMONIALS)[number]
  index: number
  activeIndex: number
  radius: number
  onSelect: () => void
}

function TestimonialCard({ testimonial: t, index, activeIndex, radius, onSelect }: CardProps) {
  const { x, y, scale, opacity, zIndex, isActive } = getOrbitPosition(index, activeIndex, radius)

  return (
    <motion.article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      className="glass-light absolute left-1/2 top-1/2 w-[min(88vw,300px)] cursor-pointer rounded-3xl p-6 outline-none sm:w-[320px] md:w-[340px] md:p-8"
      style={{ zIndex, opacity }}
      animate={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
      }}
      transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
    >
      {isActive && (
        <div className="pointer-events-none absolute -inset-1 rounded-[1.75rem] bg-flow-glow/20 blur-xl" />
      )}
      <div className="relative">
        <div className="mb-4 flex gap-1">
          {Array.from({ length: t.rating }).map((_, j) => (
            <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="leading-relaxed text-flow-navy/80">&ldquo;{t.text}&rdquo;</p>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-flow-accent/20 font-bold text-flow-accent">
            {t.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-flow-deep">{t.name}</p>
            <p className="text-sm text-flow-navy/60">{t.role}</p>
          </div>
          {t.video && (
            <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-flow-deep px-3 py-1 text-xs text-white">
              <Play size={12} /> Video
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function useOrbitRadius() {
  const [radius, setRadius] = useState(260)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w >= 1024) setRadius(300)
      else if (w >= 640) setRadius(240)
      else setRadius(170)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return radius
}

export function TestimonialSphereCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const radius = useOrbitRadius()

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + COUNT) % COUNT)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => go(1), AUTO_MS)
    return () => window.clearInterval(id)
  }, [paused, go])

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 48
    if (info.offset.x < -threshold || info.velocity.x < -400) go(1)
    else if (info.offset.x > threshold || info.velocity.x > 400) go(-1)
  }

  const sortedIndices = [...TESTIMONIALS.keys()].sort(
    (a, b) => getOrbitPosition(a, index, radius).zIndex - getOrbitPosition(b, index, radius).zIndex,
  )

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto h-[min(440px,72vw)] w-full max-w-5xl sm:h-[460px] md:h-[480px]">
        <motion.div
          className="relative h-full w-full cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
          style={{ touchAction: 'pan-y' }}
        >
          {sortedIndices.map((i) => (
            <TestimonialCard
              key={TESTIMONIALS[i].name}
              testimonial={TESTIMONIALS[i]}
              index={i}
              activeIndex={index}
              radius={radius}
              onSelect={() => setIndex(i)}
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-flow-ice bg-white shadow-md transition-colors hover:border-flow-accent hover:bg-flow-ice"
        >
          <ChevronLeft size={22} className="text-flow-deep" />
        </button>

        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-flow-accent shadow-[0_0_12px_rgba(43,127,212,0.45)]' : 'w-2 bg-flow-deep/20'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-flow-ice bg-white shadow-md transition-colors hover:border-flow-accent hover:bg-flow-ice"
        >
          <ChevronRight size={22} className="text-flow-deep" />
        </button>
      </div>
    </div>
  )
}
