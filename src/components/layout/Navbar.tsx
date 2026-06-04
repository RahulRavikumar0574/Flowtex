import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { NAV_LINKS } from '../../data/site'
import { FlowtexLogo } from '../brand/FlowtexLogo'
import { useAuth } from '../../context/AuthContext'
import { getQuoteNavPath } from '../../lib/quoteNav'
import { ProductsMegaMenu } from '../products/ProductsMegaMenu'
import { PRODUCT_CATEGORIES, getProductsByCategory } from '../../data/products'

function resolveHref(href: string, pathname: string) {
  if (href.startsWith('/')) return href
  if (href.startsWith('#') && pathname !== '/') return `/${href}`
  return href
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const productsRef = useRef<HTMLLIElement>(null)
  const { pathname } = useLocation()
  const { user } = useAuth()
  const quoteTo = getQuoteNavPath(user?.role === 'customer')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProductsOpen(false)
    setMobileProductsOpen(false)
  }, [pathname])

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const linkClass = 'nav-link text-sm font-medium text-flow-navy/90'

  const renderNavLink = (href: string, label: string, className: string, onClick?: () => void) => {
    const resolved = resolveHref(href, pathname)
    if (resolved.startsWith('/') && !resolved.includes('#')) {
      return (
        <Link to={resolved} className={className} onClick={onClick}>
          {label}
        </Link>
      )
    }
    return (
      <a href={resolved} className={className} onClick={onClick}>
        {label}
      </a>
    )
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={clsx(
          'fixed top-0 right-0 left-0 z-50 px-4 py-4 transition-all duration-500 md:px-8',
          scrolled ? 'py-3' : 'py-5',
        )}
      >
        <nav
          className={clsx(
            'mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500',
            scrolled ? 'glass-light shadow-lg shadow-flow-deep/5' : 'bg-transparent',
          )}
        >
          <Link to="/" className="block shrink-0" aria-label="Flowtex home">
            <FlowtexLogo variant="light" size="sm" />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) =>
              link.label === 'Products' ? (
                <li
                  key={link.href}
                  ref={productsRef}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button
                    type="button"
                    className={clsx(linkClass, 'flex items-center gap-1')}
                    onClick={() => setProductsOpen((o) => !o)}
                    aria-expanded={productsOpen}
                  >
                    Products
                    <ChevronDown
                      size={16}
                      className={clsx('transition-transform', productsOpen && 'rotate-180')}
                    />
                  </button>
                  <AnimatePresence>
                    {productsOpen && (
                      <ProductsMegaMenu onNavigate={() => setProductsOpen(false)} />
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={link.href}>{renderNavLink(link.href, link.label, linkClass)}</li>
              ),
            )}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to={quoteTo}
              className="glow-cta liquid-btn hidden rounded-full bg-flow-deep px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] sm:inline-block"
            >
              Get Quote
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-flow-deep/5 lg:hidden"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 90, opacity: 0 } : { rotate: 0, opacity: 1 }}
                className="absolute"
              >
                <Menu size={22} />
              </motion.span>
              <motion.span
                animate={mobileOpen ? { rotate: 0, opacity: 1 } : { rotate: -90, opacity: 0 }}
                className="absolute"
              >
                <X size={22} />
              </motion.span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl glass-light p-6 shadow-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) =>
                link.label === 'Products' ? (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-2 text-lg font-medium text-flow-deep"
                      onClick={() => setMobileProductsOpen((o) => !o)}
                    >
                      Products
                      <ChevronDown
                        size={20}
                        className={clsx('transition-transform', mobileProductsOpen && 'rotate-180')}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileProductsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-2"
                        >
                          <Link
                            to="/products"
                            className="block py-2 text-sm font-semibold text-flow-accent"
                            onClick={() => setMobileOpen(false)}
                          >
                            View All Products
                          </Link>
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <div key={cat.id} className="border-t border-flow-ice/80 py-3">
                              <Link
                                to={`/products?category=${cat.slug}`}
                                className="font-semibold text-flow-deep"
                                onClick={() => setMobileOpen(false)}
                              >
                                {cat.name}
                              </Link>
                              <ul className="mt-2 space-y-1.5">
                                {getProductsByCategory(cat.id).map((p) => (
                                  <li key={p.id}>
                                    <Link
                                      to={`/products/${p.slug}`}
                                      className="block text-sm text-flow-navy/65"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {p.capacityLiters}L — {p.name.replace(/^Flowtex \d+ Litre /, '')}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ) : (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {renderNavLink(link.href, link.label, 'block py-2 text-lg font-medium text-flow-deep', () =>
                      setMobileOpen(false),
                    )}
                  </motion.li>
                ),
              )}
              <li>
                <Link
                  to={quoteTo}
                  className="glow-cta mt-2 block rounded-full bg-flow-deep py-3 text-center font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Quote
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
