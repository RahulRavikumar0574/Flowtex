import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Droplets, Layers, FileText } from 'lucide-react'
import type { FlowtexProduct } from '../../data/products'
import { getCategory } from '../../data/products'
import { ProductImage } from './ProductImage'

type Props = {
  product: FlowtexProduct
  onClose: () => void
}

export function ProductQuickView({ product, onClose }: Props) {
  const category = getCategory(product.categoryId)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-flow-deep/60 p-0 backdrop-blur-md sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-light max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl sm:p-8"
      >
        <button
          type="button"
          className="absolute top-4 right-4 rounded-full p-2 hover:bg-flow-ice"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <p className="text-xs font-semibold uppercase tracking-wider text-flow-accent">
          {category?.name}
        </p>
        <h3 className="font-display mt-1 pr-8 text-2xl font-bold text-flow-deep">{product.name}</h3>

        <div className="my-6 flex h-56 items-center justify-center rounded-2xl bg-gradient-to-b from-flow-ice to-white p-4">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="h-full max-h-52 w-auto max-w-full"
            imgClassName="max-h-52 w-auto"
          />
        </div>

        <dl className="grid gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Droplets size={16} className="text-flow-accent" />
            <span className="font-semibold">{product.capacityLiters.toLocaleString('en-IN')} Litre Capacity</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-flow-accent" />
            <span>
              {product.layerLabel}
              {product.puffLabel ? ` · ${product.puffLabel}` : ''}
            </span>
          </div>
          <div>
            <dt className="text-flow-navy/55">Description</dt>
            <dd className="mt-1">{product.description}</dd>
          </div>
          <div>
            <dt className="text-flow-navy/55">Specifications</dt>
            <dd className="mt-1">
              {product.specifications.storageCapacity} · {product.specifications.layerType}
            </dd>
          </div>
          <div>
            <dt className="text-flow-navy/55">Price</dt>
            <dd className="mt-1 font-semibold">{product.price}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link
            to={`/products/${product.slug}`}
            onClick={onClose}
            className="glow-cta flex-1 rounded-full bg-flow-deep py-3 text-center text-sm font-semibold text-white"
          >
            View Full Details
          </Link>
          {!product.brochure.startsWith('[') ? (
            <a
              href={product.brochure}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-flow-deep/15 py-3 text-sm font-semibold text-flow-deep hover:bg-flow-ice"
            >
              <FileText size={16} />
              Brochure
            </a>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  )
}
