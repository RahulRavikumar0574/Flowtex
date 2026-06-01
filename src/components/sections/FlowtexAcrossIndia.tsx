import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, CloudSun, MapPin, Package, Users } from 'lucide-react'
import clsx from 'clsx'
import { SectionHeading } from '../ui/SectionHeading'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { Particles } from '../ui/Particles'
import { IndiaMap } from './india-map/IndiaMap'
import {
  STATE_INSTALLATIONS,
  STATES_COVERED,
  TOTAL_STATE_DEALERS,
  TOTAL_STATE_INSTALLATIONS,
  type StateInstallation,
} from '../../data/stateInstallations'

gsap.registerPlugin(ScrollTrigger)

function StateDetailPanel({ state }: { state: StateInstallation }) {
  return (
    <motion.div
      key={state.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className="glass-light overflow-hidden rounded-3xl shadow-xl shadow-flow-deep/8"
    >
      <div className="relative h-24 bg-gradient-to-br from-flow-accent/20 via-flow-ice to-flow-mist">
        {state.stateImage.startsWith('[') ? (
          <div className="flex h-full items-center justify-center text-xs font-medium text-flow-navy/40">
            {state.stateImage}
          </div>
        ) : (
          <img src={state.stateImage} alt="" className="h-full w-full object-cover opacity-80" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent" />
      </div>

      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-flow-accent">
              <MapPin size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">State Intelligence</span>
            </div>
            <h4 className="font-display mt-1.5 text-2xl font-bold text-flow-deep">{state.name}</h4>
          </div>
          <span className="shrink-0 rounded-full bg-flow-accent/10 px-2.5 py-1 text-[10px] font-semibold text-flow-accent">
            {state.installationData}
          </span>
        </div>

        <ul className="mt-5 space-y-3.5">
          <DetailRow
            icon={MapPin}
            label="Installations"
            value={`${state.installations.toLocaleString('en-IN')}+`}
          />
          <DetailRow
            icon={Users}
            label="Dealer Partners"
            value={`${state.dealers}+`}
            hint={state.dealerData}
          />
          <DetailRow icon={Building2} label="Featured Projects" value={state.featuredProjects} small />
          <DetailRow
            icon={Package}
            label="Recommended Product"
            value={state.recommendedProduct}
          />
          <DetailRow icon={CloudSun} label="Climate" value={state.climate} accent />
        </ul>
      </div>
    </motion.div>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
  hint,
  small,
  accent,
}: {
  icon: typeof MapPin
  label: string
  value: string
  hint?: string
  small?: boolean
  accent?: boolean
}) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={clsx(
          'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
          accent ? 'bg-flow-glow/20 text-flow-accent' : 'bg-flow-accent/10 text-flow-accent',
        )}
      >
        <Icon size={16} />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-flow-navy/50">{label}</p>
        <p
          className={clsx(
            'font-medium text-flow-deep',
            small ? 'text-sm leading-snug' : 'font-display text-lg font-bold',
          )}
        >
          {value}
          {hint && (
            <span className="ml-1 text-xs font-normal text-flow-navy/40">· {hint}</span>
          )}
        </p>
      </div>
    </li>
  )
}

function StateChips({
  selectedId,
  onSelect,
  className,
}: {
  selectedId: string
  onSelect: (id: string) => void
  className?: string
}) {
  return (
    <div className={clsx('hide-scrollbar flex flex-wrap gap-2', className)}>
      {STATE_INSTALLATIONS.map((state) => (
        <button
          key={state.id}
          type="button"
          onClick={() => onSelect(state.id)}
          className={clsx(
            'shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-all duration-300 md:text-sm',
            selectedId === state.id
              ? 'bg-flow-deep text-white shadow-lg shadow-flow-deep/25 ring-2 ring-flow-glow/40'
              : 'glass-light text-flow-navy/80 hover:shadow-md hover:shadow-flow-accent/10',
          )}
        >
          {state.name}
        </button>
      ))}
    </div>
  )
}

export function FlowtexAcrossIndia() {
  const [selectedId, setSelectedId] = useState(STATE_INSTALLATIONS[0].id)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const activeState =
    STATE_INSTALLATIONS.find((s) => s.id === (hoveredId ?? selectedId)) ?? STATE_INSTALLATIONS[0]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('[data-map-reveal]'), {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 78%' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="installations"
      ref={sectionRef}
      className="section-pad relative overflow-hidden bg-gradient-to-b from-white via-flow-mist/30 to-flow-ice/40"
    >
      <Particles count={18} className="opacity-30" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-flow-glow/10 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-flow-accent/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Pan-India Infrastructure"
          title="Flowtex Across India"
          subtitle="Delivering Pure, Safe & Long Lasting Water Storage Solutions Across India"
        />

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Map */}
          <div
            data-map-reveal
            className="relative overflow-hidden rounded-3xl border border-flow-ice/90 bg-white/70 shadow-xl shadow-flow-deep/5 backdrop-blur-sm lg:col-span-3 lg:min-h-[520px]"
          >
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-3">
              <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-flow-accent shadow-sm backdrop-blur-sm">
                Live Network Map
              </span>
              <span className="text-[10px] text-flow-navy/45">Accurate state boundaries</span>
            </div>
            <div className="h-full min-h-[340px] p-2 pt-12 sm:min-h-[420px] md:p-4 md:pt-14">
              <IndiaMap
                selectedId={selectedId}
                hoveredId={hoveredId}
                onSelect={setSelectedId}
                onHover={setHoveredId}
              />
            </div>
          </div>

          {/* Analytics panel */}
          <div data-map-reveal className="flex flex-col gap-5 lg:col-span-2">
            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-flow-ice bg-white/60 p-3 shadow-lg shadow-flow-deep/5 backdrop-blur-sm sm:gap-3 sm:p-4">
              <AnimatedCounter
                value={TOTAL_STATE_INSTALLATIONS}
                suffix="+"
                label="Total Installations"
              />
              <AnimatedCounter value={TOTAL_STATE_DEALERS} suffix="+" label="Dealer Partners" />
              <AnimatedCounter value={STATES_COVERED} label="States Covered" />
            </div>

            <div className="hidden rounded-2xl border border-flow-ice/80 bg-white/50 p-4 lg:block">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-flow-accent">
                Select State
              </p>
              <StateChips selectedId={selectedId} onSelect={setSelectedId} />
            </div>

            <AnimatePresence mode="wait">
              <StateDetailPanel state={activeState} />
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile state selector */}
        <div data-map-reveal className="mt-8 lg:hidden">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-flow-accent">
            Select State
          </p>
          <StateChips selectedId={selectedId} onSelect={setSelectedId} className="flex-nowrap overflow-x-auto pb-1" />
        </div>
      </div>
    </section>
  )
}
