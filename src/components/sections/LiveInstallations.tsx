import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { MAP_REGIONS } from '../../data/site'

gsap.registerPlugin(ScrollTrigger)

export function LiveInstallations() {
  const [selected, setSelected] = useState<(typeof MAP_REGIONS)[number] | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mapRef.current
    if (!el) return
    const markers = el.querySelectorAll('[data-marker]')
    const ctx = gsap.context(() => {
      gsap.from(markers, {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  const totalInstalls = MAP_REGIONS.reduce((s, r) => s + r.installs, 0)

  return (
    <section id="installations" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Live Network"
          title="Installations Across India"
          subtitle="[DEALER_LOCATIONS] · [CASE_STUDIES] — Real presence, real impact."
        />

        <div className="grid gap-10 lg:grid-cols-3">
          <div
            ref={mapRef}
            className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-3xl border border-flow-ice bg-gradient-to-b from-flow-ice to-white lg:aspect-auto lg:min-h-[420px]"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full p-8 opacity-20">
              <path
                d="M20,25 Q35,15 50,22 T75,28 Q85,40 78,55 T65,75 Q50,88 35,78 T18,55 Q12,38 20,25"
                fill="currentColor"
                className="text-flow-accent"
              />
            </svg>

            {MAP_REGIONS.map((region) => (
              <button
                key={region.id}
                type="button"
                data-marker
                onClick={() => setSelected(region)}
                className="absolute group"
                style={{ left: `${region.x}%`, top: `${region.y}%`, transform: 'translate(-50%, -50%)' }}
                aria-label={region.name}
              >
                <motion.span
                  className="absolute inset-0 rounded-full bg-flow-accent/40"
                  animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 24, height: 24, margin: -4 }}
                />
                <span
                  className={`relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform ${
                    selected?.id === region.id
                      ? 'scale-150 bg-flow-glow'
                      : 'bg-flow-accent group-hover:scale-125'
                  }`}
                />
              </button>
            ))}

            <p className="absolute bottom-4 left-4 text-xs text-flow-navy/40">
              Interactive map · [DEALER_LOCATIONS]
            </p>
          </div>

          <div className="flex flex-col justify-center gap-8">
            <div className="grid grid-cols-2 gap-6">
              <AnimatedCounter value={totalInstalls} suffix="+" label="Total Installations" />
              <AnimatedCounter
                value={MAP_REGIONS.reduce((s, r) => s + r.dealers, 0)}
                suffix="+"
                label="Dealer Partners"
              />
            </div>

            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-light rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 text-flow-accent">
                  <MapPin size={18} />
                  <span className="text-sm font-semibold uppercase tracking-wider">Case Study</span>
                </div>
                <h4 className="font-display mt-2 text-xl font-bold">{selected.name}</h4>
                <p className="mt-2 text-flow-navy/70">
                  {selected.installs.toLocaleString('en-IN')} installations · {selected.dealers}{' '}
                  dealers
                </p>
                <p className="mt-3 text-sm text-flow-navy/50">[CASE_STUDIES]</p>
              </motion.div>
            ) : (
              <p className="text-flow-navy/60">Select a region on the map to view regional data.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
