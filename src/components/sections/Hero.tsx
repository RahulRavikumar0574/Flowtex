import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Shield } from 'lucide-react'
import gsap from 'gsap'

const WaterTank3D = lazy(() =>
  import('../three/WaterTank').then((m) => ({ default: m.WaterTank3D })),
)
import { Particles } from '../ui/Particles'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { HERO_STATS, PRODUCTS } from '../../data/site'
import { useMousePosition } from '../../hooks/useMousePosition'

export function Hero() {
  const mouse = useMousePosition()
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % PRODUCTS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        x: mouse.x * 20,
        y: mouse.y * 15,
        duration: 1.2,
        ease: 'power2.out',
      })
    }
  }, [mouse.x, mouse.y])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden gradient-bg"
    >
      <Particles count={50} />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${50 + mouse.x * 15}% ${40 + mouse.y * 15}%, rgba(77,163,255,0.25), transparent 55%)`,
        }}
      />

      {/* Cityscape depth blur */}
      <div
        ref={parallaxRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] opacity-30"
        style={{
          background:
            'linear-gradient(to top, rgba(10,22,40,0.15), transparent), url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 200\'%3E%3Cpath fill=\'%230a1628\' fill-opacity=\'0.08\' d=\'M0 200 L0 120 L80 100 L160 130 L240 90 L320 110 L400 70 L480 95 L560 60 L640 85 L720 50 L800 75 L880 45 L960 70 L1040 40 L1120 65 L1200 35 L1200 200 Z\'/%3E%3C/svg%3E") bottom center / cover no-repeat',
          filter: 'blur(1px)',
        }}
      />

      {/* Water splash simulation */}
      <div className="pointer-events-none absolute top-1/3 right-0 left-0 h-64 opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-flow-accent/30"
            style={{
              width: 80 + i * 40,
              height: 80 + i * 40,
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 15}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="section-pad relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 pt-28 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.span
            className="mb-4 inline-flex items-center gap-2 rounded-full glass-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-flow-accent"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Shield size={14} />
            15 Year Warranty · Made in India
          </motion.span>

          <h1 className="font-display text-4xl leading-[1.1] font-bold tracking-tight text-flow-deep md:text-6xl lg:text-7xl">
            India&apos;s Intelligent{' '}
            <span className="bg-linear-to-r from-flow-accent to-flow-glow bg-clip-text text-transparent">
              Water Storage
            </span>{' '}
            Solutions
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-flow-navy/75">
            Advanced 3, 4 & 6 Layer Tank Technology Engineered For Extreme Indian
            Conditions.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#products"
              className="glow-cta liquid-btn rounded-full bg-flow-deep px-8 py-4 font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Explore Tanks
            </a>
            <a
              href="#finder"
              className="liquid-btn rounded-full border border-flow-deep/20 bg-white/60 px-8 py-4 font-semibold text-flow-deep backdrop-blur-sm transition-all hover:border-flow-accent hover:bg-white"
            >
              Find My Perfect Tank
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 items-start gap-x-6 gap-y-10 sm:grid-cols-4">
            {HERO_STATS.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative h-[420px] md:h-[520px] lg:h-[600px]"
        >
          <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-flow-glow/10 to-transparent" />
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <div className="h-48 w-32 animate-pulse rounded-t-full rounded-b-2xl bg-flow-accent/20" />
              </div>
            }
          >
            <WaterTank3D className="h-full" />
          </Suspense>

          <motion.div
            className="absolute top-8 right-4 glass-light rounded-2xl px-4 py-3 shadow-xl md:right-8"
            animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-flow-accent">
              Warranty
            </p>
            <p className="font-display text-2xl font-bold text-flow-deep">15 Years</p>
          </motion.div>

          <motion.div
            className="absolute bottom-16 left-4 glass-light max-w-[200px] rounded-2xl p-4 md:left-8"
            key={carouselIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs text-flow-navy/60">Featured</p>
            <p className="font-display font-semibold text-flow-deep">
              {PRODUCTS[carouselIndex]?.name ?? PRODUCTS[0].name}
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#finder"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-flow-navy/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </motion.a>
    </section>
  )
}
