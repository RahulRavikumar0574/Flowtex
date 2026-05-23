import { motion } from 'framer-motion'
import clsx from 'clsx'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', light }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={clsx('mb-12 max-w-3xl', align === 'center' && 'mx-auto text-center')}
    >
      {eyebrow && (
        <span
          className={clsx(
            'mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em]',
            light ? 'text-flow-glow' : 'text-flow-accent',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={clsx(
          'font-display text-3xl font-bold tracking-tight md:text-5xl',
          light ? 'text-white' : 'text-flow-deep',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'mt-4 text-lg leading-relaxed',
            light ? 'text-white/70' : 'text-flow-navy/70',
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
