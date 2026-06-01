import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { Certification } from '../../data/certifications'

type Props = {
  cert: Certification | null
  onClose: () => void
}

export function CertificationLightbox({ cert, onClose }: Props) {
  useEffect(() => {
    if (!cert) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [cert, onClose])

  const imageSrc = cert?.image ?? cert?.viewUrl

  return (
    <AnimatePresence>
      {cert && imageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-flow-deep/85 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={cert.name}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
            aria-label="Close certificate view"
          >
            <X size={24} />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl shadow-flow-accent/20"
          >
            <div className="border-b border-flow-ice px-4 py-3 sm:px-6">
              <p className="font-display text-sm font-bold text-flow-deep sm:text-base">{cert.name}</p>
            </div>
            <div className="overflow-auto bg-flow-mist/30 p-3 sm:p-6">
              <img
                src={imageSrc}
                alt={cert.name}
                className="mx-auto h-auto max-h-[min(78vh,900px)] w-full object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
