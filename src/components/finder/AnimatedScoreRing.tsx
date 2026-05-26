import { motion } from 'framer-motion'

type Props = {
  score: number
  size?: number
  delay?: number
}

export function AnimatedScoreRing({ score, size = 88, delay = 0 }: Props) {
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-flow-ice"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
          transition={{ duration: 1.2, delay, ease: [0.23, 1, 0.32, 1] }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2b7fd4" />
            <stop offset="100%" stopColor="#4da3ff" />
          </linearGradient>
        </defs>
      </svg>
      <motion.span
        className="absolute font-display text-xl font-bold text-flow-deep"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.4 }}
      >
        {score}%
      </motion.span>
    </div>
  )
}
