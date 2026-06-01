import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { FlowtexProduct } from '../../data/products'
import { useAuth } from '../../context/AuthContext'
import { api, type QuoteRequest } from '../../lib/api'
import { isQuoteUnread } from '../../lib/quoteDisplay'
import { ProductImage } from '../products/ProductImage'
import { ModalShell } from './ModalShell'

const DEFAULT_MESSAGE =
  'I am interested in this product. Please share the latest price and delivery details.'

type Props = {
  product: FlowtexProduct
  onClose: () => void
  onSubmitted?: (requestId: string) => void
}

export function QuoteRequestModal({ product, onClose, onSubmitted }: Props) {
  const { user, logout } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState(DEFAULT_MESSAGE)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [history, setHistory] = useState<QuoteRequest[]>([])

  useEffect(() => {
    if (!user) return
    api
      .getProductQuoteHistory(product.id)
      .then(({ requests }) => setHistory(requests))
      .catch(() => {})
  }, [user, product.id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const { request } = await api.createQuote({
        productId: product.id,
        productName: product.name,
        quantity,
        message,
      })
      setSuccess(true)
      onSubmitted?.(request._id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }

  if (!user) return null

  return (
    <ModalShell title="Get Quote" onClose={onClose}>
      <div className="mb-4 flex items-center justify-between rounded-2xl bg-flow-ice/60 px-4 py-2 text-sm">
        <span className="text-flow-navy/80">
          Logged in as <strong className="text-flow-deep">{user.name}</strong>
        </span>
        <button
          type="button"
          onClick={logout}
          className="font-semibold text-flow-accent hover:underline"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 rounded-2xl border border-flow-deep/10 bg-white/80 p-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-flow-ice">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="h-16 w-16"
            imgClassName="max-h-16 max-w-16"
          />
        </div>
        <div>
          <p className="font-display font-bold text-flow-deep">{product.name}</p>
          {product.capacityLiters > 0 && (
            <p className="text-sm text-flow-navy/70">{product.capacityLiters} Litre</p>
          )}
          <p className="text-sm text-flow-navy/70">{product.layerLabel}</p>
        </div>
      </div>

      {success ? (
        <div className="mt-6 rounded-2xl bg-green-50 p-4 text-center text-flow-deep">
          <p className="font-semibold">Quote request sent!</p>
          <p className="mt-1 text-sm text-flow-navy/70">
            Our team will respond shortly. You can track this under My Quotes.
          </p>
          <Link
            to="/account/quotes"
            className="mt-4 inline-block rounded-full bg-flow-deep px-6 py-2 text-sm font-semibold text-white"
            onClick={onClose}
          >
            View My Quotes
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <p className="text-sm font-semibold text-flow-deep">Request Price from Flowtex</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-flow-navy/70">Customer Name</span>
              <input
                readOnly
                value={user.name}
                className="mt-1 w-full rounded-xl border border-flow-deep/10 bg-flow-ice/40 px-3 py-2"
              />
            </label>
            <label className="block text-sm">
              <span className="text-flow-navy/70">Email</span>
              <input
                readOnly
                value={user.email}
                className="mt-1 w-full rounded-xl border border-flow-deep/10 bg-flow-ice/40 px-3 py-2"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="text-flow-navy/70">Phone Number</span>
              <input
                readOnly
                value={user.phone || '—'}
                className="mt-1 w-full rounded-xl border border-flow-deep/10 bg-flow-ice/40 px-3 py-2"
              />
            </label>
          </div>

          <label className="block text-sm">
            <span className="text-flow-navy/70">Quantity</span>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              className="mt-1 w-full rounded-xl border border-flow-deep/10 px-3 py-2"
            />
          </label>

          <label className="block text-sm">
            <span className="text-flow-navy/70">Your Message</span>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-flow-deep/10 px-3 py-2"
              required
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="glow-cta w-full rounded-full bg-flow-deep py-3 font-semibold text-white disabled:opacity-60"
          >
            {submitting ? 'Sending…' : 'Send Quote Request'}
          </button>
        </form>
      )}

      {history.length > 0 && (
        <div className="mt-8 border-t border-flow-deep/10 pt-6">
          <h3 className="text-sm font-semibold text-flow-deep">Your Previous Requests</h3>
          <ul className="mt-3 space-y-2">
            {history.map((req) => (
              <li
                key={req._id}
                className="flex items-center justify-between rounded-xl bg-flow-ice/50 px-3 py-2 text-sm"
              >
                <span className="text-flow-navy/80">
                  {new Date(req.createdAt).toLocaleDateString()}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    req.status === 'replied'
                      ? 'bg-green-100 text-green-800'
                      : req.status === 'closed'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isQuoteUnread(req) ? 'New reply' : req.status === 'pending' ? 'Pending' : req.status === 'replied' ? 'Replied' : 'Closed'}
                </span>
                <Link
                  to={`/account/quotes/${req._id}`}
                  className="font-semibold text-flow-accent hover:underline"
                  onClick={onClose}
                >
                  View Chat
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </ModalShell>
  )
}
