import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Droplets,
  FileText,
  Layers,
  Shield,
} from 'lucide-react'
import { ProductCard } from '../components/products/ProductCard'
import { GetQuoteWithNotifications } from '../components/quotes/GetQuoteWithNotifications'
import { ProductImage } from '../components/products/ProductImage'
import {
  getCategory,
  getProduct,
  getRelatedProducts,
  getSpecificationRows,
} from '../data/products'
import { useProductGallery } from '../hooks/useProductGallery'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProduct(slug) : undefined
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const { gallery, primaryImage, loading: galleryLoading } = useProductGallery(slug)
  const category = product ? getCategory(product.categoryId) : undefined
  const related = product ? getRelatedProducts(product) : []

  const activeImage = gallery[galleryIndex] ?? primaryImage ?? product?.image ?? ''

  useEffect(() => {
    window.scrollTo(0, 0)
    setGalleryIndex(0)
    setZoomed(false)
  }, [slug])

  useEffect(() => {
    setGalleryIndex(0)
  }, [gallery.length, slug])

  if (!product || !category) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-28 text-center">
        <h1 className="font-display text-2xl font-bold text-flow-deep">Product not found</h1>
        <Link to="/products" className="mt-4 text-flow-accent hover:underline">
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="gradient-bg min-h-screen pt-28 pb-20">
      <div className="section-pad mx-auto max-w-7xl">
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-flow-navy/70 hover:text-flow-accent"
        >
          <ArrowLeft size={16} />
          All Products
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <button
              type="button"
              onClick={() => primaryImage && setZoomed(true)}
              disabled={!primaryImage}
              className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-flow-ice bg-gradient-to-b from-flow-ice to-white p-6 shadow-xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-full w-full items-center justify-center"
                >
                  <ProductImage
                    src={activeImage}
                    alt={product.name}
                    className="h-full max-h-[min(420px,70vw)] w-auto max-w-full"
                    imgClassName="max-h-full w-auto drop-shadow-lg"
                  />
                </motion.div>
              </AnimatePresence>
              {product.puffLabel && (
                <span className="absolute top-4 left-4 rounded-full bg-flow-deep px-3 py-1 text-xs font-bold text-white">
                  {product.puffLabel}
                </span>
              )}
            </button>

            {galleryLoading && (
              <p className="text-center text-sm text-flow-navy/45">Loading gallery…</p>
            )}

            {!galleryLoading && gallery.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length)}
                  className="rounded-xl border border-flow-ice p-2 hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex flex-1 gap-2">
                  {gallery.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setGalleryIndex(i)}
                      className={`flex h-16 flex-1 items-center justify-center overflow-hidden rounded-xl border bg-white p-1 transition-all ${
                        galleryIndex === i
                          ? 'border-flow-accent ring-2 ring-flow-accent/20'
                          : 'border-flow-ice opacity-80 hover:opacity-100'
                      }`}
                      aria-label={`Image ${i + 1}`}
                    >
                      <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setGalleryIndex((i) => (i + 1) % gallery.length)}
                  className="rounded-xl border border-flow-ice p-2 hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-xs font-semibold uppercase tracking-wider text-flow-accent">
              {category.name}
            </p>
            <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-flow-deep md:text-4xl">
              {product.name}
            </h1>

            <ul className="mt-6 flex flex-wrap gap-3">
              {product.capacityLiters > 0 && (
                <li className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm">
                  <Droplets size={16} className="text-flow-accent" />
                  {product.capacityLiters.toLocaleString('en-IN')} Litre
                </li>
              )}
              {product.productKind === 'tank' && (
                <li className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm">
                  <Layers size={16} className="text-flow-accent" />
                  {product.layerLabel}
                  {product.puffLabel ? ` · ${product.puffLabel}` : ''}
                </li>
              )}
              {product.productKind === 'pipe' && (
                <li className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm">
                  <Layers size={16} className="text-flow-accent" />
                  {category.name}
                </li>
              )}
            </ul>

            <p className="mt-6 text-lg leading-relaxed text-flow-navy/75">{product.description}</p>
            <p className="mt-2 text-lg font-semibold text-flow-navy/70">Price on request</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GetQuoteWithNotifications
                product={product}
                buttonClassName="glow-cta flex-1 rounded-full bg-flow-deep py-3.5 text-center font-semibold text-white"
              />
              {!product.brochure.startsWith('[') ? (
                <a
                  href={product.brochure}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-flow-deep/15 bg-white py-3.5 font-semibold text-flow-deep hover:bg-flow-ice"
                >
                  <FileText size={18} />
                  Download Brochure
                </a>
              ) : (
                <span
                  aria-hidden
                  className="pointer-events-none flex flex-1 items-center justify-center gap-2 rounded-full border border-flow-deep/10 bg-flow-ice/50 py-3.5 text-sm font-semibold text-flow-navy/40"
                >
                  <FileText size={18} />
                  Brochure Soon
                </span>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 glass-light rounded-3xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-flow-deep">Technical Specifications</h2>
              <dl className="mt-3 text-sm leading-relaxed text-flow-navy/70">
                {getSpecificationRows(product.specifications).map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-6 border-b border-flow-ice/50 py-2.5 last:border-0"
                  >
                    <dt className="font-medium text-flow-navy/55">{label}</dt>
                    <dd className="text-right text-flow-deep">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 space-y-1.5 border-t border-flow-ice/80 pt-4 text-sm leading-relaxed text-flow-navy/70">
                {product.productKind === 'tank' && (
                  <>
                    <p className="font-semibold text-flow-deep">Premium Quality Water Tank.</p>
                    <p>20% Extra Strong.</p>
                    <p>
                      Available Colors:
                      <br />
                      Blue, White, Sky Blue, Orange, Green, Marble, Granite.
                    </p>
                  </>
                )}
                <p>
                  {product.productDescription.startsWith('[')
                    ? product.productDescription
                    : product.productDescription}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-6 glass-light rounded-3xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-flow-deep">Usage Applications</h2>
              <ul className="mt-3 space-y-2">
                {product.applications.map((app) => (
                  <li key={app} className="flex items-start gap-2 text-sm text-flow-navy/75">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-flow-accent" />
                    {app}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1 rounded-full bg-flow-accent/10 px-3 py-1.5 text-xs font-semibold text-flow-accent"
                >
                  <Shield size={12} />
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-flow-ice pt-16">
            <h2 className="font-display mb-8 text-2xl font-bold text-flow-deep">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      <AnimatePresence>
        {zoomed && primaryImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-flow-deep/80 p-4 backdrop-blur-md"
            onClick={() => setZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="max-h-[90vh] max-w-3xl rounded-3xl bg-white p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <ProductImage
                src={activeImage}
                alt={product.name}
                className="mx-auto max-h-[80vh] w-full"
                imgClassName="mx-auto max-h-[80vh] w-auto max-w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
