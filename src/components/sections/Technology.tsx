import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { TANK_LAYERS } from '../../data/site'

gsap.registerPlugin(ScrollTrigger)

export function Technology() {
  const sectionRef = useRef<HTMLElement>(null)
  const tankRef = useRef<HTMLDivElement>(null)
  const [activeLayer, setActiveLayer] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const tank = tankRef.current
    if (!section || !tank) return

    const layers = tank.querySelectorAll('[data-layer]')
    const ctx = gsap.context(() => {
      gsap.from(layers, {
        x: -80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: tank,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=200%',
        pin: tank.parentElement,
        scrub: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            TANK_LAYERS.length - 1,
            Math.floor(self.progress * TANK_LAYERS.length),
          )
          setActiveLayer(idx)
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative bg-flow-deep text-white"
    >
      <div className="section-pad mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="6-Layer Engineering"
          title="Cross-Section Technology"
          subtitle="Scroll to explore each precision-engineered layer of the Flowtex tank."
          light
        />

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="relative min-h-[480px]">
            <div ref={tankRef} className="relative mx-auto w-full max-w-sm">
              {/* Tank cross-section */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-b from-flow-navy to-flow-deep shadow-2xl">
                {/* Water simulation */}
                <motion.div
                  className="absolute inset-x-4 bottom-8 top-1/3 rounded-b-[2rem] bg-gradient-to-b from-flow-glow/40 to-flow-accent/60"
                  animate={{ opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-x-6 bottom-12 h-8 rounded-full bg-white/10 blur-md"
                  animate={{ x: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {TANK_LAYERS.map((layer, i) => (
                  <div
                    key={layer.name}
                    data-layer
                    className="absolute inset-x-0 transition-all duration-500"
                    style={{
                      top: `${8 + i * 14}%`,
                      height: '12%',
                      opacity: activeLayer === i ? 1 : 0.35,
                      transform: activeLayer === i ? 'scaleX(1.02)' : 'scaleX(1)',
                    }}
                  >
                    <div
                      className="mx-4 h-full rounded-lg border transition-all duration-500"
                      style={{
                        borderColor:
                          activeLayer === i
                            ? 'rgba(77, 163, 255, 0.8)'
                            : 'rgba(255,255,255,0.1)',
                        background:
                          activeLayer === i
                            ? 'rgba(77, 163, 255, 0.25)'
                            : 'rgba(255,255,255,0.05)',
                        boxShadow:
                          activeLayer === i ? '0 0 24px rgba(77,163,255,0.4)' : 'none',
                      }}
                    />
                    {activeLayer === i && (
                      <motion.span
                        layoutId="hotspot"
                        className="absolute -right-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-flow-glow"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {TANK_LAYERS.map((layer, i) => (
              <motion.button
                key={layer.name}
                type="button"
                onClick={() => setActiveLayer(i)}
                className={`w-full rounded-2xl border p-5 text-left transition-all ${
                  activeLayer === i
                    ? 'border-flow-glow/50 bg-white/10 shadow-lg shadow-flow-glow/20'
                    : 'border-white/10 bg-white/5 hover:bg-white/8'
                }`}
                whileHover={{ x: 4 }}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-flow-glow">
                  Layer {i + 1}
                </span>
                <h4 className="font-display mt-1 text-lg font-bold">{layer.name}</h4>
                <p
                  className={`mt-2 text-sm leading-relaxed transition-all ${
                    activeLayer === i ? 'text-white/80' : 'text-white/40'
                  }`}
                >
                  {layer.desc}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
