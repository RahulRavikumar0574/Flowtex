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
              className="group relative h-72 w-64 shrink-0 cursor-pointer overflow-hidden rounded-3xl md:w-80 md:h-80"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-flow-navy to-flow-deep transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `linear-gradient(180deg, transparent 40%, rgba(10,22,40,0.9) 100%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm">
                {ind.image}
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <motion.div
                  className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <span className="text-xs uppercase tracking-wider text-flow-glow">
                    Sector
                  </span>
                </motion.div>
                <h3 className="font-display text-2xl font-bold text-white">{ind.name}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/70 transition-all duration-500 group-hover:max-h-20">
                  Trusted installations across India
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
