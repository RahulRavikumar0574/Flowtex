import { motion } from 'framer-motion'
import { Brain, Droplets, Gauge, Shield } from 'lucide-react'

const STEPS = [
  { icon: Droplets, label: 'Analyzing water usage profile' },
  { icon: Gauge, label: 'Calculating capacity requirements' },
  { icon: Shield, label: 'Matching layer technology' },
  { icon: Brain, label: 'Ranking compatible tanks' },
]

export function AnalyzingTransition() {
  return (
    <motion.div
      key="analyzing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[420px] flex-col items-center justify-center py-8 text-center"
    >
      <motion.div
        className="relative mb-8 flex h-24 w-24 items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-flow-accent/30" />
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flow-accent/15">
          <Brain className="text-flow-accent" size={32} />
        </div>
      </motion.div>

      <h3 className="font-display text-2xl font-bold text-flow-deep">Analyzing your needs...</h3>
      <p className="mt-2 max-w-sm text-flow-navy/60">
        Running compatibility analysis across capacity, climate, and durability factors.
      </p>

      <ul className="mt-10 w-full max-w-md space-y-3 text-left">
        {STEPS.map((step, i) => (
          <motion.li
            key={step.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.35, duration: 0.4 }}
            className="flex items-center gap-3 rounded-xl bg-flow-ice/60 px-4 py-3"
          >
            <step.icon size={18} className="shrink-0 text-flow-accent" />
            <span className="text-sm font-medium text-flow-deep">{step.label}</span>
            <motion.span
              className="ml-auto h-2 w-2 rounded-full bg-flow-accent"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
