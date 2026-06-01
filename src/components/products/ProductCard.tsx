import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Droplets, Layers, Sparkles } from 'lucide-react'
import clsx from 'clsx'
import type { FlowtexProduct } from '../../data/products'
import { getCategory } from '../../data/products'
import { ProductImage } from './ProductImage'
import { GetQuoteButton } from '../quotes/GetQuoteButton'

type Props = {
  product: FlowtexProduct
  index?: number
  onQuickView?: (product: FlowtexProduct) => void
  compact?: boolean
}

export function ProductCard({ product, index = 0, onQuickView, compact }: Props) {
  const category = getCategory(product.categoryId)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group flex h-full flex-col"
    >
      <div
        className={clsx(
          'cert-card flex h-full flex-col overflow-hidden rounded-3xl glass-light transition-shadow duration-500',
          compact ? 'p-4' : 'p-5',
        )}
      >
        <button
          type="button"
          onClick={() => onQuickView?.(product)}
          className="relative mb-4 block w-full overflow-hidden rounded-2xl bg-gradient-to-b from-flow-ice to-white text-left"
        >
          <div className={clsx('flex items-center justify-center', compact ? 'h-36' : 'h-44')}>
            <ProductImage
              src={product.image}
              alt={product.name}
              className={compact ? 'h-32 w-24' : 'h-40 max-h-full max-w-[85%]'}
              imgClassName="h-full w-full p-2"
            />
          </div>
          {product.puffLabel && (
            <span className="absolute top-3 left-3 rounded-full bg-flow-deep px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              {product.puffLabel}
            </span>
          )}
        </button>

        <div className="flex flex-1 flex-col">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-flow-accent">
            {category?.name}
          </p>
          <h3
            className={clsx(
              'font-display mt-1 font-bold text-flow-deep',
              compact ? 'text-base leading-snug' : 'text-lg',
            )}
          >
            {product.name}
          </h3>

          <ul className="mt-3 flex flex-wrap gap-2 text-xs text-flow-navy/70">
            {product.capacityLiters > 0 && (
              <li className="flex items-center gap-1 rounded-full bg-flow-ice px-2.5 py-1">
                <Droplets size={12} className="text-flow-accent" />
                {product.capacityLiters.toLocaleString('en-IN')} L
              </li>
            )}
            {product.productKind === 'tank' && (
              <li className="flex items-center gap-1 rounded-full bg-flow-ice px-2.5 py-1">
                <Layers size={12} className="text-flow-accent" />
                {product.layerLabel}
              </li>
            )}
            {product.productKind === 'pipe' && (
              <li className="flex items-center gap-1 rounded-full bg-flow-ice px-2.5 py-1">
                <Layers size={12} className="text-flow-accent" />
                {category?.name}
              </li>
            )}
            {product.puffLabel && (
              <li className="flex items-center gap-1 rounded-full bg-flow-accent/10 px-2.5 py-1 text-flow-accent">
                <Sparkles size={12} />
                {product.puffLabel}
              </li>
            )}
          </ul>

          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-flow-navy/60">
            {product.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to={`/products/${product.slug}`}
              className="liquid-btn flex-1 rounded-full border border-flow-accent/30 bg-flow-accent/10 py-2.5 text-center text-sm font-semibold text-flow-accent transition-colors hover:bg-flow-accent hover:text-white"
            >
              View Details
            </Link>
            <GetQuoteButton
              product={product}
              className="flex-1 rounded-full border border-flow-deep/15 py-2.5 text-center text-sm font-semibold text-flow-deep transition-colors hover:border-flow-accent hover:bg-flow-ice"
            />
          </div>
        </div>
      </div>
    </motion.article>
  )
}
