import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from './ProductCard'
import { ProductQuickView } from './ProductQuickView'
import { CategoryTabs, ProductFiltersBar } from './ProductFilters'
import {
  filterProducts,
  type FlowtexProduct,
  type ProductFilters,
} from '../../data/products'

const DEFAULT_FILTERS: ProductFilters = {
  categoryId: 'all',
  layerType: 'all',
  capacity: 'all',
  puffType: 'all',
  usageType: 'all',
  search: '',
}

type Props = {
  initialCategoryId?: string
  showViewAllLink?: boolean
  maxProducts?: number
  compact?: boolean
}

export function ProductCatalog({
  initialCategoryId = 'all',
  showViewAllLink = false,
  maxProducts,
  compact = false,
}: Props) {
  const [filters, setFilters] = useState<ProductFilters>({
    ...DEFAULT_FILTERS,
    categoryId: initialCategoryId,
  })
  const [quickView, setQuickView] = useState<FlowtexProduct | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = filterProducts(filters)
    if (maxProducts) list = list.slice(0, maxProducts)
    return list
  }, [filters, maxProducts])

  const patch = (partial: Partial<ProductFilters>) => setFilters((f) => ({ ...f, ...partial }))

  return (
    <>
      <div className="space-y-6">
        <CategoryTabs
          activeId={filters.categoryId}
          onChange={(categoryId) => patch({ categoryId })}
        />

        <ProductFiltersBar
          filters={filters}
          onChange={patch}
          mobileOpen={mobileFiltersOpen}
          onMobileOpenChange={setMobileFiltersOpen}
          resultCount={filtered.length}
        />

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-dashed border-flow-ice py-16 text-center text-flow-navy/55"
            >
              No products match your filters. Try adjusting your search.
            </motion.p>
          ) : (
            <>
              {/* Mobile: horizontal snap slider */}
              <div className="hide-scrollbar -mx-1 flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product, i) => (
                  <div
                    key={product.id}
                    className="w-[min(85vw,300px)] shrink-0 snap-center sm:w-auto sm:shrink"
                  >
                    <ProductCard
                      product={product}
                      index={i}
                      compact={compact}
                      onQuickView={setQuickView}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </AnimatePresence>

        {showViewAllLink && (
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-flow-accent/30 bg-flow-accent/10 px-6 py-3 text-sm font-semibold text-flow-accent transition-colors hover:bg-flow-accent hover:text-white"
            >
              Explore Full Catalog
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {quickView && <ProductQuickView product={quickView} onClose={() => setQuickView(null)} />}
      </AnimatePresence>
    </>
  )
}
