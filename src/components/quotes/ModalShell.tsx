import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

type Props = {
  title: string
  onClose: () => void
  children: ReactNode
}

export function ModalShell({ title, onClose, children }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!mounted) return null

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-flow-deep/65 backdrop-blur-md"
        aria-hidden
      />

      {/* Modal panel */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-light relative z-[9999] flex max-h-[90vh] w-[90vw] max-w-[700px] flex-col overflow-hidden rounded-3xl shadow-2xl shadow-flow-deep/25"
      >
        <div className="shrink-0 border-b border-flow-ice/80 px-6 py-4 pr-14">
          <h2
            id="quote-modal-title"
            className="font-display text-xl font-bold text-flow-deep"
          >
            {title}
          </h2>
        </div>

        <button
          type="button"
          className="absolute top-3 right-3 z-10 rounded-full p-2 hover:bg-flow-ice"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
