import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Users,
  Droplets,
  Sun,
  Building2,
  Home,
  Waves,
  Check,
  Sparkles,
} from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { FINDER_QUESTIONS } from '../../data/site'

const ICONS: Record<string, LucideIcon> = {
  users: Users,
  droplets: Droplets,
  sun: Sun,
  building: Building2,
  home: Home,
  waves: Waves,
}

function getRecommendation(answers: Record<string, string>) {
  const climate = answers.climate
  const usage = answers.usage
  if (climate === 'Extreme Heat' || usage === 'Very High') {
    return {
      name: 'Flowtex 6 Layer Pro',
      capacity: '1000–2000 L',
      reason: 'Maximum thermal insulation and antimicrobial protection for demanding conditions.',
    }
  }
  if (climate === 'Hot' || usage === 'High') {
    return {
      name: 'Flowtex 4 Layer',
      capacity: '750–1500 L',
      reason: 'Balanced performance for warm climates and medium-to-high consumption.',
    }
  }
  return {
    name: 'Flowtex 3 Layer',
    capacity: '500–1000 L',
    reason: 'Efficient solution for moderate climates and standard household usage.',
  }
}

export function SmartTankFinder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  const q = FINDER_QUESTIONS[step]
  const progress = done ? 100 : ((step + 1) / FINDER_QUESTIONS.length) * 100
  const rec = getRecommendation(answers)

  const select = (option: string) => {
    if (!q) return
    const next = { ...answers, [q.id]: option }
    setAnswers(next)
    if (step < FINDER_QUESTIONS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 400)
    } else {
      setTimeout(() => setDone(true), 400)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setDone(false)
  }

  const IconComponent = q ? (ICONS[q.icon as keyof typeof ICONS] ?? Sparkles) : Sparkles

  return (
    <section id="finder" className="section-pad relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-flow-ice/50 to-transparent" />
      <div className="relative mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Smart Tank Finder"
          title="Find Your Perfect Tank"
          subtitle="Answer a few questions — we'll match you with engineered Flowtex technology."
        />

        <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-flow-ice">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-flow-accent to-flow-glow"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>

        <div className="glass-light min-h-[380px] rounded-3xl p-8 shadow-xl shadow-flow-deep/5 md:p-12">
          <AnimatePresence mode="wait">
            {!done && q ? (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-flow-accent/10 text-flow-accent">
                    <IconComponent size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm text-flow-navy/60">
                      Step {step + 1} of {FINDER_QUESTIONS.length}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-flow-deep">{q.question}</h3>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {q.options.map((opt) => (
                    <motion.button
                      key={opt}
                      type="button"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => select(opt)}
                      className="rounded-2xl border border-flow-deep/10 bg-white px-6 py-4 text-left font-medium text-flow-deep transition-colors hover:border-flow-accent hover:bg-flow-ice/50"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-flow-accent/15 text-flow-accent"
                >
                  <Check size={40} />
                </motion.div>
                <p className="text-sm font-semibold uppercase tracking-wider text-flow-accent">
                  Your Recommendation
                </p>
                <h3 className="font-display mt-2 text-3xl font-bold text-flow-deep">{rec.name}</h3>
                <p className="mt-2 text-flow-accent font-semibold">{rec.capacity}</p>
                <p className="mx-auto mt-4 max-w-md text-flow-navy/70">{rec.reason}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href="#products"
                    className="glow-cta liquid-btn rounded-full bg-flow-deep px-8 py-3 font-semibold text-white"
                  >
                    View Product
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border border-flow-deep/20 px-8 py-3 font-semibold text-flow-deep hover:bg-flow-ice"
                  >
                    Start Over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
