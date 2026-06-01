import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle2 } from 'lucide-react'
import { Particles } from '../components/ui/Particles'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CertificationCard } from '../components/certifications/CertificationCard'
import { CertificationLightbox } from '../components/certifications/CertificationLightbox'
import {
  CERTIFICATION_CATEGORIES,
  CERTIFICATIONS,
  ISO_CERTIFICATION_SUMMARY,
  type Certification,
} from '../data/certifications'

const TRUST_POINTS = [
  'National manufacturing standards',
  'Third-party audited quality',
  'Food-grade material compliance',
  'Continuous safety monitoring',
]

export function CertificationsPage() {
  const [lightboxCert, setLightboxCert] = useState<Certification | null>(null)

  return (
    <div className="gradient-bg min-h-screen pt-28 pb-20">
      <Particles count={35} className="opacity-60" />
      <CertificationLightbox cert={lightboxCert} onClose={() => setLightboxCert(null)} />

      {/* Hero */}
      <section className="section-pad relative overflow-hidden pb-16">
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-flow-accent"
          >
            <Shield size={14} />
            Certified Excellence
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-bold tracking-tight text-flow-deep md:text-6xl"
          >
            Flowtex Certifications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-flow-navy/75"
          >
            Independently verified standards that reflect our commitment to trust, quality, and
            reliability across every tank we manufacture.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            {TRUST_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 rounded-full glass-light px-4 py-2 text-sm font-medium text-flow-navy/80"
              >
                <CheckCircle2 size={16} className="text-flow-accent" />
                {point}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {CERTIFICATION_CATEGORIES.map((category) => {
        const items = CERTIFICATIONS.filter((c) => c.category === category.id)
        const isIso = category.id === 'iso'

        return (
          <section
            key={category.id}
            id={category.id}
            className="section-pad border-t border-flow-ice/80 bg-white/50"
          >
            <div className="mx-auto max-w-5xl">
              <SectionHeading
                eyebrow="Certified"
                title={category.title}
                subtitle={category.subtitle}
                align="left"
              />

              {isIso ? (
                <>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                    {items.map((cert, i) => (
                      <CertificationCard
                        key={cert.id}
                        cert={cert}
                        index={i}
                        onViewCertificate={setLightboxCert}
                      />
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="cert-card mt-10 rounded-3xl glass-light p-6 md:p-8"
                  >
                    <h3 className="font-display text-lg font-bold text-flow-deep">
                      Certification Summary
                    </h3>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {ISO_CERTIFICATION_SUMMARY.map((line) => (
                        <li
                          key={line}
                          className="flex items-center gap-3 text-sm font-medium text-flow-navy/85 sm:text-base"
                        >
                          <CheckCircle2
                            size={20}
                            className="shrink-0 text-flow-accent"
                            aria-hidden
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </>
              ) : (
                <div className="space-y-6">
                  {items.map((cert, i) => (
                    <CertificationCard key={cert.id} cert={cert} index={i} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
