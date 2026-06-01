import { motion } from 'framer-motion'
import { Award, Download, ExternalLink, Eye } from 'lucide-react'
import type { Certification } from '../../data/certifications'

type Props = {
  cert: Certification
  index: number
  onViewCertificate?: (cert: Certification) => void
}

export function CertificationCard({ cert, index, onViewCertificate }: Props) {
  const hasImage = Boolean(cert.image && !cert.image.startsWith('['))

  if (hasImage) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: index * 0.08 }}
        className="cert-card group relative flex h-full flex-col overflow-hidden rounded-3xl glass-light transition-all duration-500 hover:-translate-y-1.5"
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-flow-glow/0 via-flow-accent/0 to-flow-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-flow-glow/10 group-hover:via-flow-accent/5 group-hover:to-flow-accent/10 group-hover:opacity-100" />

        <div className="relative overflow-hidden border-b border-flow-ice/80 bg-gradient-to-b from-white to-flow-ice/40 p-4 sm:p-5">
          <div className="overflow-hidden rounded-2xl border border-flow-deep/8 bg-white shadow-inner shadow-flow-deep/5">
            <img
              src={cert.image}
              alt={`${cert.name} certificate preview`}
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto max-h-56 w-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02] sm:max-h-64"
            />
          </div>
        </div>

        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-lg font-bold leading-snug text-flow-deep sm:text-xl">
            {cert.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-flow-navy/70">{cert.description}</p>

          <button
            type="button"
            onClick={() => onViewCertificate?.(cert)}
            className="liquid-btn mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-flow-accent/30 bg-flow-accent/10 px-5 py-2.5 text-sm font-semibold text-flow-accent transition-all duration-300 hover:bg-flow-accent hover:text-white hover:shadow-lg hover:shadow-flow-accent/25 sm:w-auto"
          >
            <Eye size={16} />
            View Certificate
          </button>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="cert-card group relative overflow-hidden rounded-3xl glass-light p-6 transition-all duration-500 md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-flow-glow/0 to-flow-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-flow-glow/12 group-hover:to-flow-accent/8 group-hover:opacity-100" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-flow-ice bg-flow-mist text-flow-navy/30">
          {cert.logo.startsWith('[') ? (
            <Award size={36} className="text-flow-accent/50" />
          ) : (
            <img src={cert.logo} alt="" className="h-14 w-14 object-contain" loading="lazy" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-bold text-flow-deep">
            {cert.name.startsWith('[')
              ? `Flowtex ${cert.id.replace(/-/g, ' ').toUpperCase()}`
              : cert.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-flow-navy/70">{cert.description}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={cert.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-btn inline-flex items-center gap-2 rounded-full border border-flow-accent/30 bg-flow-accent/10 px-5 py-2.5 text-sm font-semibold text-flow-accent transition-colors hover:bg-flow-accent hover:text-white"
            >
              <ExternalLink size={16} />
              View Certificate
            </a>
            <a
              href={cert.downloadUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-flow-deep/15 px-5 py-2.5 text-sm font-semibold text-flow-deep transition-colors hover:border-flow-accent hover:bg-flow-ice"
            >
              <Download size={16} />
              Download Certificate
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
