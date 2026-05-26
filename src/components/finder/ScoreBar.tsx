import { motion } from 'framer-motion'

type Props = {
  label: string
  value: number
  delay?: number
  highlight?: boolean
}

export function ScoreBar({ label, value, delay = 0, highlight }: Props) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className={highlight ? 'font-semibold text-flow-deep' : 'text-flow-navy/70'}>
          {label}
        </span>
        <span className="font-semibold tabular-nums text-flow-accent">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-flow-ice">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-flow-accent to-flow-glow"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </div>
  )
}
