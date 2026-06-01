import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, MapPin, Share2, Globe, ExternalLink } from 'lucide-react'
import { FOOTER_LINKS, PLACEHOLDERS } from '../../data/site'
import { PRODUCT_CATEGORIES } from '../../data/products'

const FOOTER_COMPANY_HREFS: Record<string, string> = {
  Certifications: '/certifications',
  Technology: '/#technology',
}

function WaveSVG() {
  return (
    <svg
      className="absolute top-0 left-0 w-[200%] animate-[wave_12s_linear_infinite]"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{ height: 80, transform: 'translateX(0)' }}
    >
      <path
        fill="rgba(77,163,255,0.08)"
        d="M0,60 C300,120 600,0 900,60 C1050,90 1150,80 1200,60 L1200,0 L0,0 Z"
      />
      <path
        fill="rgba(77,163,255,0.05)"
        d="M0,80 C300,20 600,100 900,50 C1050,30 1150,40 1200,70 L1200,0 L0,0 Z"
      />
    </svg>
  )
}

export function Footer() {
  const wa = PLACEHOLDERS.whatsapp.replace(/[^\d]/g, '') || '919999999999'

  return (
    <footer id="quote" className="wave-footer relative overflow-hidden pt-24 pb-32 text-white md:pb-16">
      <style>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <WaveSVG />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(77,163,255,0.03) 2px,
            rgba(77,163,255,0.03) 4px
          )`,
        }}
      />

      <div className="section-pad relative mx-auto max-w-7xl pt-8">
        <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl font-bold">
              Flow<span className="text-flow-glow">tex</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              India&apos;s intelligent water storage solutions. Engineering excellence for every
              climate.
            </p>
            <div className="mt-6 flex gap-3">
              {[Share2, Globe, ExternalLink].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 hover:bg-flow-glow/30 hover:text-white"
                  aria-label="Social"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/40">{PLACEHOLDERS.social}</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-flow-glow">
              Products
            </h4>
            <ul className="max-h-48 space-y-2 overflow-y-auto">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-flow-glow">
              Company
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((l) => {
                const href = FOOTER_COMPANY_HREFS[l] ?? '#'
                const className = 'text-sm text-white/60 transition-colors hover:text-white'
                return (
                  <li key={l}>
                    {href.startsWith('/') && !href.includes('#') ? (
                      <Link to={href} className={className}>
                        {l}
                      </Link>
                    ) : (
                      <a href={href} className={className}>
                        {l}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-flow-glow">
              Contact
            </h4>
            <ul className="space-y-4">
              {[
                { icon: Phone, text: '+91 XXXXX XXXXX' },
                { icon: Mail, text: 'hello@flowtex.in' },
                { icon: MapPin, text: 'Pan-India Dealer Network' },
              ].map(({ icon: Icon, text }) => (
                <motion.li
                  key={text}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-sm text-white/60"
                >
                  <Icon size={16} className="text-flow-glow" />
                  {text}
                </motion.li>
              ))}
            </ul>
            <a
              href={`https://wa.me/${wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-cta mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-flow-glow/40 to-transparent" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} Flowtex. All rights reserved.</p>
          <p>[SEO_CONTENT] · Privacy · Terms</p>
        </div>
      </div>

      <a
        href={`https://wa.me/${wa}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-24 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-110 md:flex"
        aria-label="WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </footer>
  )
}
