import { motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Info,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import type { RecommendationResult } from '../../lib/recommendation'
import { AnimatedScoreRing } from './AnimatedScoreRing'
import { ScoreBar } from './ScoreBar'

type Props = {
  result: RecommendationResult
  onReset: () => void
}

const ROLE_STYLES = {
  bestMatch: {
    border: 'border-flow-accent/40',
    badge: 'bg-flow-accent text-white',
    glow: 'shadow-flow-accent/20',
  },
  alternative: {
    border: 'border-flow-deep/15',
    badge: 'bg-flow-navy/10 text-flow-navy',
    glow: 'shadow-flow-deep/5',
  },
  premiumUpgrade: {
    border: 'border-amber-400/40',
    badge: 'bg-amber-500/15 text-amber-700',
    glow: 'shadow-amber-400/15',
  },
} as const

export function RecommendationDashboard({ result, onReset }: Props) {
  const { recommendations, reasons, conflicts, ranked, isCloseCall } = result
  const best = recommendations.find((r) => r.role === 'bestMatch') ?? recommendations[0]

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-flow-accent/15"
        >
          <CheckCircle2 className="text-flow-accent" size={28} />
        </motion.div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-flow-accent">
          Analysis Complete
        </p>
        <h3 className="font-display mt-2 text-2xl font-bold text-flow-deep md:text-3xl">
          Your Personalized Tank Match
        </h3>
        {isCloseCall && (
          <p className="mt-2 text-sm text-flow-navy/60">
            Multiple tanks scored highly — review comparisons below.
          </p>
        )}
      </div>

      {/* Conflict / insight notes */}
      {conflicts.length > 0 && (
        <div className="space-y-2">
          {conflicts.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="flex gap-3 rounded-2xl border border-flow-accent/20 bg-flow-ice/50 px-4 py-3 text-sm text-flow-navy/80"
            >
              {note.type === 'conflict' ? (
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />
              ) : note.type === 'closeScores' ? (
                <Info size={18} className="mt-0.5 shrink-0 text-flow-accent" />
              ) : (
                <TrendingUp size={18} className="mt-0.5 shrink-0 text-flow-accent" />
              )}
              {note.message}
            </motion.div>
          ))}
        </div>
      )}

      {/* Recommendation cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {recommendations.map((rec, i) => {
          const style = ROLE_STYLES[rec.role]
          return (
            <motion.article
              key={rec.product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className={`relative rounded-2xl border bg-white p-5 shadow-lg ${style.border} ${style.glow} ${
                rec.role === 'bestMatch' ? 'lg:scale-[1.02] lg:shadow-xl' : ''
              }`}
            >
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
              >
                {rec.roleLabel}
              </span>
              <h4 className="font-display mt-3 text-lg font-bold text-flow-deep">
                {rec.product.name}
              </h4>
              <p className="text-sm font-medium text-flow-accent">{rec.product.capacityRange}</p>
              <div className="mt-4 flex items-center gap-4">
                <AnimatedScoreRing score={rec.overallScore} size={72} delay={0.3 + i * 0.15} />
                <div className="min-w-0 flex-1 space-y-2">
                  {rec.breakdown.slice(0, 3).map((b, j) => (
                    <ScoreBar
                      key={b.dimension}
                      label={b.label}
                      value={b.matchPercent}
                      delay={0.4 + i * 0.1 + j * 0.06}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {rec.suitabilityTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-flow-ice px-2.5 py-0.5 text-xs font-medium text-flow-navy/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="#products"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-flow-accent hover:underline"
              >
                View details <ArrowUpRight size={14} />
              </a>
            </motion.article>
          )
        })}
      </div>

      {/* Why this tank */}
      {best && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-flow-accent/25 bg-gradient-to-br from-flow-ice/80 to-white p-6 md:p-8"
        >
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="text-flow-accent" size={20} />
            <h4 className="font-display text-lg font-bold text-flow-deep">
              Why {best.product.name}?
            </h4>
          </div>
          <ul className="space-y-3">
            {reasons.map((reason, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="flex gap-3 text-sm leading-relaxed text-flow-navy/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flow-accent" />
                {reason}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Full comparison dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="rounded-2xl border border-flow-deep/10 bg-white p-6 md:p-8"
      >
        <h4 className="font-display mb-6 text-lg font-bold text-flow-deep">
          Compatibility Breakdown — {best?.product.name}
        </h4>
        <div className="grid gap-4 sm:grid-cols-2">
          {best?.breakdown.map((b, i) => (
            <ScoreBar
              key={b.dimension}
              label={b.label}
              value={b.matchPercent}
              delay={0.7 + i * 0.06}
              highlight={b.matchPercent >= 85}
            />
          ))}
        </div>
        <p className="mt-4 text-xs text-flow-navy/50">
          Scores are weighted by family size, usage, climate, water source, and budget — same inputs
          always produce the same result.
        </p>
      </motion.div>

      {/* Ranked list compact */}
      <div className="rounded-2xl bg-flow-ice/40 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-flow-navy/50">
          Full ranking
        </p>
        <div className="space-y-2">
          {ranked.map((r, i) => (
            <div
              key={r.product.id}
              className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 text-sm"
            >
              <span className="font-medium text-flow-deep">
                {i + 1}. {r.product.name}
              </span>
              <span className="font-semibold tabular-nums text-flow-accent">{r.overallScore}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-2">
        <a
          href="#products"
          className="glow-cta liquid-btn rounded-full bg-flow-deep px-8 py-3 font-semibold text-white"
        >
          Explore All Tanks
        </a>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-flow-deep/20 px-8 py-3 font-semibold text-flow-deep hover:bg-flow-ice"
        >
          Start Over
        </button>
      </div>
    </motion.div>
  )
}
