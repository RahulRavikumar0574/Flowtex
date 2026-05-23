import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { NAV_LINKS, PLACEHOLDERS } from '../../data/site'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          <a href="#" className="font-display text-xl font-bold tracking-tight text-flow-deep">
            {PLACEHOLDERS.logo !== '[LOGO]' ? (
              <img src={PLACEHOLDERS.logo} alt="Flowtex" className="h-8" />
            ) : (
              <span>
                Flow<span className="text-flow-accent">tex</span>
              </span>
            )}
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link text-sm font-medium text-flow-navy/90">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#quote"
              className="glow-cta liquid-btn hidden rounded-full bg-flow-deep px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] sm:inline-block"
            >
              Get Quote
            </a>
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
            className="fixed inset-x-4 top-24 z-40 rounded-2xl glass-light p-6 shadow-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="block py-2 text-lg font-medium text-flow-deep"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li>
                <a
                  href="#quote"
                  className="glow-cta mt-2 block rounded-full bg-flow-deep py-3 text-center font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Quote
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
