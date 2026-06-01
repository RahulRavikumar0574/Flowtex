import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import clsx from 'clsx'
import {
  CAPACITY_FILTER_OPTIONS,
  LAYER_FILTER_OPTIONS,
  PUFF_FILTER_OPTIONS,
  PRODUCT_CATEGORIES,
  USAGE_FILTER_OPTIONS,
  type ProductFilters as Filters,
} from '../../data/products'

type Props = {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  mobileOpen: boolean
  onMobileOpenChange: (open: boolean) => void
  resultCount: number
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: readonly { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-flow-navy/50">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-flow-ice bg-white px-3 py-2 text-sm text-flow-deep outline-none focus:border-flow-accent focus:ring-2 focus:ring-flow-accent/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function ProductFiltersBar({
  filters,
  onChange,
  mobileOpen,
  onMobileOpenChange,
  resultCount,
}: Props) {
  const filterFields = (
    <>
      <FilterSelect
        label="Layer Type"
        value={filters.layerType}
        options={LAYER_FILTER_OPTIONS}
        onChange={(layerType) => onChange({ layerType })}
      />
      <FilterSelect
        label="Capacity"
        value={filters.capacity}
        options={CAPACITY_FILTER_OPTIONS}
        onChange={(capacity) => onChange({ capacity })}
      />
      <FilterSelect
        label="Puff Type"
        value={filters.puffType}
        options={PUFF_FILTER_OPTIONS}
        onChange={(puffType) => onChange({ puffType })}
      />
      <FilterSelect
        label="Usage"
        value={filters.usageType}
        options={USAGE_FILTER_OPTIONS}
        onChange={(usageType) => onChange({ usageType })}
      />
    </>
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-flow-navy/40" size={18} />
          <input
            type="search"
            placeholder="Search products, capacity, layers…"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            className="w-full rounded-2xl border border-flow-ice bg-white py-3 pr-4 pl-10 text-sm outline-none focus:border-flow-accent focus:ring-2 focus:ring-flow-accent/15"
          />
        </div>
        <button
          type="button"
          onClick={() => onMobileOpenChange(true)}
          className="flex items-center justify-center gap-2 rounded-2xl border border-flow-ice bg-white px-4 py-3 text-sm font-semibold text-flow-deep lg:hidden"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>
        <p className="text-sm text-flow-navy/55 lg:whitespace-nowrap">
          <span className="font-semibold text-flow-deep">{resultCount}</span> products
        </p>
      </div>

      <div className="hidden grid-cols-2 gap-3 lg:grid xl:grid-cols-4">{filterFields}</div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-flow-deep/50 backdrop-blur-sm lg:hidden"
            onClick={() => onMobileOpenChange(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-flow-ice p-4">
                <h3 className="font-display font-bold text-flow-deep">Filters</h3>
                <button type="button" onClick={() => onMobileOpenChange(false)} aria-label="Close">
                  <X size={22} />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">{filterFields}</div>
              <div className="border-t border-flow-ice p-4">
                <button
                  type="button"
                  onClick={() => onMobileOpenChange(false)}
                  className="w-full rounded-full bg-flow-deep py-3 font-semibold text-white"
                >
                  Show {resultCount} Products
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function CategoryTabs({
  activeId,
  onChange,
}: {
  activeId: string
  onChange: (id: string) => void
}) {
  return (
    <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => onChange('all')}
        className={clsx(
          'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all',
          activeId === 'all'
            ? 'bg-flow-deep text-white shadow-lg shadow-flow-deep/20'
            : 'glass-light text-flow-navy/80 hover:shadow-md',
        )}
      >
        All Products
      </button>
      {PRODUCT_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onChange(cat.id)}
          className={clsx(
            'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all',
            activeId === cat.id
              ? 'bg-flow-deep text-white shadow-lg shadow-flow-deep/20'
              : 'glass-light text-flow-navy/80 hover:shadow-md',
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
