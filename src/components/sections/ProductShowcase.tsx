import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Layers, Thermometer, Shield, Target } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { PRODUCTS } from '../../data/site'

export function ProductShowcase() {
  const [active, setActive] = useState<(typeof PRODUCTS)[number] | null>(null)

  return (
    <section id="products" className="section-pad relative bg-flow-mist">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Product Line"
          title="Engineered For Every Scale"
          subtitle="Premium water storage systems from residential to industrial applications."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -12 }}
              onClick={() => setActive(product)}
              className="group relative cursor-pointer"
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="glass-light relative overflow-hidden rounded-3xl p-6 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-flow-accent/15"
                whileHover={{
                  rotateX: 4,
                  rotateY: -6,
                  transition: { duration: 0.3 },
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-flow-glow/20 via-transparent to-flow-accent/10" />
                </div>

                <div className="relative mb-6 flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-flow-ice to-white">
                  <motion.div
                    className="flex h-36 w-28 flex-col items-center justify-center rounded-t-full rounded-b-2xl border-2 border-flow-accent/30 bg-gradient-to-b from-flow-glow/30 to-flow-accent/20 shadow-inner"
                    animate={{ rotateY: [0, 15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="text-xs font-bold text-flow-deep/50">[PRODUCT_IMAGES]</span>
                  </motion.div>
                </div>

                <h3 className="font-display text-xl font-bold text-flow-deep">{product.name}</h3>

                <ul className="mt-4 space-y-2 text-sm text-flow-navy/70">
                  <li className="flex items-center gap-2">
                    <Layers size={14} className="text-flow-accent" />
                    {product.layers}
                  </li>
                  <li className="flex items-center gap-2">
                    <Thermometer size={14} className="text-flow-accent" />
                    {product.heatResistance}
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield size={14} className="text-flow-accent" />
                    {product.warranty}
                  </li>
                  <li className="flex items-center gap-2">
                    <Target size={14} className="text-flow-accent" />
                    {product.useCase}
                  </li>
                </ul>

                <p className="mt-4 text-sm font-semibold text-flow-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Quick View →
                </p>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>

      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-flow-deep/60 p-4 backdrop-blur-md"
          onClick={() => setActive(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-light max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-8"
          >
            <button
              type="button"
              className="absolute top-4 right-4 rounded-full p-2 hover:bg-flow-ice"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <h3 className="font-display text-2xl font-bold">{active.name}</h3>
            <div className="my-6 flex h-56 items-center justify-center rounded-2xl bg-flow-ice">
              {active.image}
            </div>
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="text-flow-navy/60">Technology</dt>
                <dd className="font-semibold">{active.layers}</dd>
              </div>
              <div>
                <dt className="text-flow-navy/60">Heat Resistance</dt>
                <dd className="font-semibold">{active.heatResistance}</dd>
              </div>
              <div>
                <dt className="text-flow-navy/60">Warranty</dt>
                <dd className="font-semibold">{active.warranty}</dd>
              </div>
              <div>
                <dt className="text-flow-navy/60">Best For</dt>
                <dd className="font-semibold">{active.useCase}</dd>
              </div>
              <div>
                <dt className="text-flow-navy/60">Specifications</dt>
                <dd>{active.specs}</dd>
              </div>
            </dl>
            <a
              href="#quote"
              className="glow-cta mt-6 block rounded-full bg-flow-deep py-3 text-center font-semibold text-white"
            >
              Request Quote
            </a>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
