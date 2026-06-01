import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Droplets } from 'lucide-react'
import { PRODUCT_CATEGORIES, getProductsByCategory } from '../../data/products'

type Props = {
  onNavigate?: () => void
}

export function ProductsMegaMenu({ onNavigate }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="absolute top-full left-1/2 z-50 mt-3 w-[min(100vw-2rem,920px)] -translate-x-1/2 rounded-3xl border border-flow-ice/80 bg-white/95 p-6 shadow-2xl shadow-flow-deep/15 backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center justify-between border-b border-flow-ice pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-flow-accent">
            Product Range
          </p>
          <p className="font-display text-lg font-bold text-flow-deep">Flowtex Water Tanks & Pipes</p>
        </div>
        <Link
          to="/products"
          onClick={onNavigate}
          className="flex items-center gap-1 rounded-full bg-flow-deep px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="max-h-[min(70vh,520px)] overflow-y-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {PRODUCT_CATEGORIES.map((cat) => {
          const products = getProductsByCategory(cat.id)
          return (
            <div key={cat.id} className="group">
              <Link
                to={`/products?category=${cat.slug}`}
                onClick={onNavigate}
                className="font-display flex items-center gap-2 text-sm font-bold text-flow-deep transition-colors hover:text-flow-accent"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-flow-accent/10 text-flow-accent">
                  <Droplets size={16} />
                </span>
                {cat.name}
              </Link>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-flow-navy/55">
                {cat.shortDescription}
              </p>
              <ul className="mt-3 space-y-1.5 border-t border-flow-ice/80 pt-3">
                {products.slice(0, 3).map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/products/${p.slug}`}
                      onClick={onNavigate}
                      className="block truncate text-xs text-flow-navy/65 transition-colors hover:text-flow-accent"
                    >
                      {p.capacityLiters}L · {p.name.replace(/^Flowtex \d+ Litre /, '')}
                    </Link>
                  </li>
                ))}
                {products.length > 3 && (
                  <li>
                    <Link
                      to={`/products?category=${cat.slug}`}
                      onClick={onNavigate}
                      className="text-xs font-semibold text-flow-accent"
                    >
                      +{products.length - 3} more
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )
        })}
        </div>
      </div>
    </motion.div>
  )
}
