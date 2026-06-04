import { motion } from 'framer-motion'
import { SectionHeading } from '../ui/SectionHeading'
import { INDUSTRIES } from '../../data/site'

export function Industries() {
  return (
    <section id="industries" className="section-pad overflow-hidden bg-flow-mist">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Industries Served"
          title="Infrastructure For Every Sector"
          subtitle="From single homes to nationwide institutions — Flowtex scales with you."
        />
      </div>

      <div className="mt-4">
        <div className="flex gap-6 overflow-x-auto px-[max(1.25rem,5vw)] pb-4 hide-scrollbar">
          {INDUSTRIES.map((ind, i) => (
            <motion.article
              key={ind.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.04 }}
              className="group relative flex h-72 w-64 shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-3xl p-6 md:h-80 md:w-80"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-flow-navy to-flow-deep transition-transform duration-700 group-hover:scale-110" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_15%,rgba(77,163,255,0.18),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/5" />

              <div className="relative z-10">
                <motion.span
                  className="inline-block translate-y-1 opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-flow-glow">
                    Sector
                  </span>
                </motion.span>
              </div>

              <div className="relative z-10">
                <h3 className="font-display text-2xl font-bold leading-tight text-white md:text-3xl">
                  {ind.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65 transition-colors duration-500 group-hover:text-white/85 md:text-base">
                  {ind.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
