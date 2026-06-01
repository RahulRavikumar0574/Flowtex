import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import type { FlowtexProduct } from '../../data/products'
import { useAuth } from '../../context/AuthContext'
import { LoginRequiredModal } from './LoginRequiredModal'
import { QuoteRequestModal } from './QuoteRequestModal'

type Props = {
  product: FlowtexProduct
  className?: string
  unreadBadge?: number
}

export function GetQuoteButton({ product, className, unreadBadge = 0 }: Props) {
  const { user, loading } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showLogin, setShowLogin] = useState(false)
  const [showQuote, setShowQuote] = useState(false)

  useEffect(() => {
    if (loading) return
    if (searchParams.get('openQuote') !== '1') return
    const next = new URLSearchParams(searchParams)
    next.delete('openQuote')
    setSearchParams(next, { replace: true })
    if (user?.role === 'customer') setShowQuote(true)
    else if (!user) setShowLogin(true)
  }, [loading, user, searchParams, setSearchParams])

  function handleClick() {
    if (loading) return
    if (!user || user.role !== 'customer') {
      setShowLogin(true)
      return
    }
    setShowQuote(true)
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        <span className="inline-flex items-center justify-center gap-2">
          Get Quote
          {unreadBadge > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-flow-accent/90 px-2 py-0.5 text-xs font-bold text-flow-deep">
              <span aria-hidden>🔔</span>
              {unreadBadge > 9 ? '9+' : unreadBadge}
            </span>
          )}
        </span>
      </button>

      <AnimatePresence>
        {showLogin && <LoginRequiredModal onClose={() => setShowLogin(false)} />}
        {showQuote && (
          <QuoteRequestModal product={product} onClose={() => setShowQuote(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
