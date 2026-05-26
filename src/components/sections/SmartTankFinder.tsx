import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Users,
  Droplets,
  Sun,
  Building2,
  Home,
  Waves,
  Wallet,
  Sparkles,
} from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { FINDER_QUESTIONS } from '../../data/site'
import { getRecommendations, type UserAnswers } from '../../lib/recommendation'
import type { AnswerKey } from '../../lib/recommendation/types'
import { AnalyzingTransition } from '../finder/AnalyzingTransition'
import { RecommendationDashboard } from '../finder/RecommendationDashboard'

const ICONS: Record<string, LucideIcon> = {
  users: Users,
  droplets: Droplets,
  sun: Sun,
  building: Building2,
  home: Home,
  waves: Waves,
  wallet: Wallet,
}

type Phase = 'quiz' | 'analyzing' | 'results'

const ANALYZE_DURATION_MS = 2200

export function SmartTankFinder() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<UserAnswers>({})
  const [phase, setPhase] = useState<Phase>('quiz')

  const q = FINDER_QUESTIONS[step]
  const progress =
    phase === 'results' ? 100 : phase === 'analyzing' ? 100 : ((step + 1) / FINDER_QUESTIONS.length) * 100

  const result = useMemo(
    () => (phase === 'results' ? getRecommendations(answers) : null),
    [phase, answers],
  )

  const runAnalysis = useCallback((finalAnswers: UserAnswers) => {
    setPhase('analyzing')
    setTimeout(() => {
      setAnswers(finalAnswers)
      setPhase('results')
    }, ANALYZE_DURATION_MS)
  }, [])

  const select = (option: string) => {
    if (!q) return
    const next = { ...answers, [q.id]: option } as UserAnswers
    setAnswers(next)

    if (step < FINDER_QUESTIONS.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 400)
    } else {
      setTimeout(() => runAnalysis(next), 400)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setPhase('quiz')
  }

  const IconComponent = q ? (ICONS[q.icon as keyof typeof ICONS] ?? Sparkles) : Sparkles

  return (
    <section id="finder" className="section-pad relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-flow-ice/50 to-transparent" />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Smart Tank Finder"
          title="Find Your Perfect Tank"
          subtitle="Answer a few questions — our weighted compatibility engine ranks the best Flowtex systems for your needs."
        />

        <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-flow-ice">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-flow-accent to-flow-glow"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>

        <div className="glass-light min-h-[420px] rounded-3xl p-6 shadow-xl shadow-flow-deep/5 md:p-10">
          <AnimatePresence mode="wait">
            {phase === 'quiz' && q && (
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
                      className={`rounded-2xl border px-6 py-4 text-left font-medium transition-colors ${
                        answers[q.id as AnswerKey] === opt
                          ? 'border-flow-accent bg-flow-accent/10 text-flow-deep'
                          : 'border-flow-deep/10 bg-white text-flow-deep hover:border-flow-accent hover:bg-flow-ice/50'
                      }`}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="mt-6 text-sm font-medium text-flow-navy/60 hover:text-flow-accent"
                  >
                    ← Previous question
                  </button>
                )}
              </motion.div>
            )}

            {phase === 'analyzing' && <AnalyzingTransition />}

            {phase === 'results' && result && (
              <RecommendationDashboard result={result} onReset={reset} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
