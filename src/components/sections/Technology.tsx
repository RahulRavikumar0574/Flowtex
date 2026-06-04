import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { SectionHeading } from '../ui/SectionHeading'
import { TANK_LAYERS } from '../../data/site'

gsap.registerPlugin(ScrollTrigger)

const LAYER_COUNT = TANK_LAYERS.length
const LAYER_ZONE_TOP = 11
const LAYER_ZONE_HEIGHT = 76

function layerCenterPercent(index: number) {
  return LAYER_ZONE_TOP + ((index + 0.5) / LAYER_COUNT) * LAYER_ZONE_HEIGHT
}

function TankCrossSection({
  activeLayer,
  showConnector,
}: {
  activeLayer: number
  showConnector?: boolean
}) {
  return (
    <div className="relative h-full w-full">
      <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-flow-navy to-flow-deep shadow-2xl shadow-black/40">
        {/* Liquid */}
        <motion.div
          className="absolute inset-x-[10%] bottom-[9%] top-[38%] rounded-b-[2rem] bg-gradient-to-b from-flow-glow/35 to-flow-accent/55"
          animate={{ opacity: activeLayer >= 3 ? [0.5, 0.75, 0.5] : [0.4, 0.65, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-x-[14%] bottom-[12%] h-6 rounded-full bg-white/10 blur-md"
          animate={{ x: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {TANK_LAYERS.map((layer, i) => {
          const center = layerCenterPercent(i)
          const isActive = activeLayer === i
          const isAdjacent = Math.abs(i - activeLayer) === 1

          return (
            <motion.div
              key={layer.name}
              data-layer
              className="absolute left-0 right-0 z-[1]"
              style={{ top: `${center}%`, height: '12%' }}
              animate={{
                y: '-50%',
                scale: isActive ? 1.06 : isAdjacent ? 0.98 : 0.94,
                opacity: isActive ? 1 : isAdjacent ? 0.45 : 0.22,
              }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="relative mx-[10%] h-full">
                <motion.div
                  className="relative h-full overflow-hidden rounded-lg border-2"
                  animate={{
                    borderColor: isActive
                      ? 'rgba(77, 163, 255, 1)'
                      : 'rgba(255,255,255,0.1)',
                    background: isActive
                      ? 'rgba(77, 163, 255, 0.35)'
                      : 'rgba(255,255,255,0.04)',
                    boxShadow: isActive
                      ? '0 0 28px rgba(77,163,255,0.65), inset 0 0 20px rgba(77,163,255,0.2)'
                      : 'none',
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {isActive && (
                    <motion.div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.8 }}
                    />
                  )}
                </motion.div>

                <span
                  className={clsx(
                    'absolute -left-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300',
                    isActive
                      ? 'bg-flow-glow text-flow-deep shadow-[0_0_12px_rgba(77,163,255,0.9)]'
                      : 'bg-white/10 text-white/40',
                  )}
                >
                  {i + 1}
                </span>

                {isActive && (
                  <motion.span
                    className="absolute right-[4%] top-1/2 z-[2] h-3 w-3 -translate-y-1/2 rounded-full bg-flow-glow"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ boxShadow: '0 0 14px rgba(77,163,255,0.95)' }}
                  />
                )}
              </div>
            </motion.div>
          )
        })}

        {showConnector && (
          <motion.div
            className="pointer-events-none absolute right-0 z-20 hidden w-8 lg:block"
            animate={{ top: `${layerCenterPercent(activeLayer)}%` }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            style={{ transform: 'translateY(-50%)' }}
          >
            <div className="h-0.5 w-full bg-gradient-to-r from-flow-glow to-flow-glow/0" />
            <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-flow-glow shadow-[0_0_10px_rgba(77,163,255,0.8)]" />
          </motion.div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-[10%] rounded-t-[2.5rem] bg-gradient-to-b from-white/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[9%] rounded-b-[2.5rem] bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    </div>
  )
}

function LayerCard({
  layer,
  index,
  active,
  onActivate,
}: {
  layer: (typeof TANK_LAYERS)[number]
  index: number
  active: boolean
  onActivate: () => void
}) {
  return (
    <motion.button
      type="button"
      onClick={onActivate}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={clsx(
        'relative z-10 w-full rounded-2xl border p-4 text-left transition-colors duration-300 md:p-5',
        active
          ? 'border-flow-glow/60 bg-white/12 shadow-lg shadow-flow-glow/20'
          : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]',
      )}
      animate={{
        scale: active ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {active && (
        <motion.span
          layoutId="layer-card-glow"
          className="pointer-events-none absolute -inset-px rounded-2xl bg-flow-glow/10"
        />
      )}
      <span
        className={clsx(
          'text-xs font-semibold uppercase tracking-wider',
          active ? 'text-flow-glow' : 'text-flow-glow/70',
        )}
      >
        Layer {index + 1}
      </span>
      <h4 className="font-display relative mt-1 text-base font-bold md:text-lg">{layer.name}</h4>
      <p
        className={clsx(
          'relative mt-1.5 text-sm leading-relaxed transition-colors duration-300',
          active ? 'text-white/85' : 'text-white/45',
        )}
      >
        {layer.desc}
      </p>
    </motion.button>
  )
}

export function Technology() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeLayer, setActiveLayer] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll('[data-layer]'), {
        opacity: 0,
        scaleX: 0.92,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!rows.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          const idx = Number((visible[0].target as HTMLElement).dataset.layerIndex)
          if (!Number.isNaN(idx)) setActiveLayer(idx)
        }
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    rows.forEach((row) => observer.observe(row))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-flow-deep text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(77,163,255,0.08),transparent_55%)]" />

      <div className="section-pad relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="6-Layer Engineering"
          title="Cross-Section Technology"
          subtitle="Scroll to explore each precision-engineered layer of the Flowtex tank."
          light
        />

        <div className="flex flex-col gap-8 md:gap-10 lg:grid lg:min-h-[40rem] lg:grid-cols-[minmax(280px,38%)_1fr] lg:items-stretch lg:gap-x-12 lg:gap-y-0 xl:grid-cols-[minmax(300px,40%)_1fr] xl:gap-x-16">
          <div className="relative z-0 mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:mx-0 lg:max-w-none lg:self-stretch">
            <div className="lg:sticky lg:top-28 lg:flex lg:h-[40rem] lg:items-center lg:justify-center">
              <div className="aspect-[3/4] w-full lg:h-[40rem] lg:max-w-[340px] lg:shrink-0">
                <TankCrossSection activeLayer={activeLayer} showConnector />
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-3 lg:grid lg:min-h-[40rem] lg:grid-rows-6 lg:gap-2 lg:py-1 xl:gap-3">
            {TANK_LAYERS.map((layer, i) => (
              <div
                key={layer.name}
                ref={(el) => {
                  rowRefs.current[i] = el
                }}
                data-layer-index={i}
                className="flex min-h-0 items-center"
              >
                <LayerCard
                  layer={layer}
                  index={i}
                  active={activeLayer === i}
                  onActivate={() => setActiveLayer(i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
