import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Play } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { TESTIMONIALS } from '../../data/site'

export function Testimonials() {
  const [index, setIndex] = useState(0)

  return (
    <section className="section-pad overflow-hidden bg-flow-mist">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted By Thousands"
          subtitle="[CUSTOMER_TESTIMONIALS] — Real voices from homes and industries across India."
        />

        <div className="relative">
          <motion.div
            drag="x"
            dragConstraints={{ left: -400, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) setIndex((i) => (i + 1) % TESTIMONIALS.length)
              else if (info.offset.x > 80)
                setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
            }}
            className="flex cursor-grab gap-6 active:cursor-grabbing"
          >
            {TESTIMONIALS.map((t, i) => {
              const offset = (i - index + TESTIMONIALS.length) % TESTIMONIALS.length
              const isActive = offset === 0
              return (
                <motion.article
                  key={t.name}
                  animate={{
                    scale: isActive ? 1 : 0.92,
                    opacity: isActive ? 1 : 0.5,
                    x: offset * 20,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`glass-light min-w-[min(100%,340px)] shrink-0 rounded-3xl p-8 md:min-w-[400px] ${
                    isActive ? 'shadow-xl' : ''
                  }`}
                  onClick={() => setIndex(i)}
                >
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="leading-relaxed text-flow-navy/80">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-flow-accent/20 font-bold text-flow-accent">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-flow-deep">{t.name}</p>
                      <p className="text-sm text-flow-navy/60">{t.role}</p>
                    </div>
                    {t.video && (
                      <span className="ml-auto flex items-center gap-1 rounded-full bg-flow-deep px-3 py-1 text-xs text-white">
                        <Play size={12} /> Video
                      </span>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </motion.div>

          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-flow-accent' : 'w-2 bg-flow-deep/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
