import { SectionHeading } from '../ui/SectionHeading'
import { ProductCatalog } from '../products/ProductCatalog'

export function ProductShowcase() {
  return (
    <section id="products" className="section-pad relative bg-flow-mist">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Product Line"
          title="Engineered For Every Scale"
          subtitle="Explore Flowtex water tanks by layer technology, capacity, and puff insulation — from residential to industrial."
        />
        <ProductCatalog showViewAllLink maxProducts={8} />
      </div>
    </section>
  )
}
