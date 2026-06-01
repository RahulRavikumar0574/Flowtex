import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProductCatalog } from '../components/products/ProductCatalog'
import { PRODUCT_CATEGORIES } from '../data/products'

export function ProductsPage() {
  const [params] = useSearchParams()
  const categorySlug = params.get('category')
  const initialCategory =
    PRODUCT_CATEGORIES.find((c) => c.slug === categorySlug)?.id ?? 'all'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [categorySlug])

  return (
    <div className="gradient-bg min-h-screen pt-28 pb-20">
      <div className="section-pad mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Flowtex Catalog"
          title="Water Storage Products"
          subtitle="Premium water storage tanks, puff insulation systems, garden pipes and PVC solutions — engineered for Indian climates."
        />
        <ProductCatalog key={initialCategory} initialCategoryId={initialCategory} />
      </div>
    </div>
  )
}
