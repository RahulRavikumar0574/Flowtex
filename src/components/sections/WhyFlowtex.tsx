import { motion } from 'framer-motion'
import { Shield, Sparkles, Leaf, Flame, Zap } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { WHY_FEATURES } from '../../data/site'

const ICON_MAP = {
  shield: Shield,
  sparkles: Sparkles,
  leaf: Leaf,
  flame: Flame,
  zap: Zap,
} as const

export function WhyFlowtex() {
  return (
    <section className="section-pad relative overflow-hidden bg-white">
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-flow-glow/10 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Flowtex"
          title="Built For Indian Reality"
          subtitle="Every layer, every test, every installation is designed for durability you can trust."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {WHY_FEATURES.map((f, i) => {
            const Icon = ICON_MAP[f.icon as keyof typeof ICON_MAP] ?? Shield
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <motion.div
                  className="glass-light relative overflow-hidden rounded-3xl p-6 text-center"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="absolute inset-0 scale-0 rounded-full bg-flow-accent/10 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-flow-accent/10 text-flow-accent transition-colors group-hover:bg-flow-accent group-hover:text-white">
                    <Icon size={26} />
                  </div>
                  <h3 className="relative font-display font-bold text-flow-deep">{f.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-flow-navy/70">
                    {f.desc}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        <p className="mt-10 text-center text-sm text-flow-navy/50">
          [CERTIFICATIONS] — ISO · Food Grade · UV Tested
        </p>
      </div>
    </section>
  )
}
