import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { api, type QuoteRequest } from '../../lib/api'
import { isQuoteUnread } from '../../lib/quoteDisplay'
import { getProductById } from '../../data/products'
import { ProductImage } from '../../components/products/ProductImage'

function StatusBadge({ status }: { status: QuoteRequest['status'] }) {
  const styles = {
    pending: 'bg-amber-100 text-amber-800',
    replied: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-700',
  }
  const labels = { pending: 'Pending', replied: 'Replied', closed: 'Closed' }
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

function QuoteCard({ quote }: { quote: QuoteRequest }) {
  const product = getProductById(quote.productId)
  const imageSrc = product?.image ?? ''

  return (
    <li className="rounded-2xl glass-light p-4 transition-shadow hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-flow-ice">
          <ProductImage
            src={imageSrc}
            alt={quote.productName}
            className="h-16 w-16"
            imgClassName="max-h-16 max-w-16 object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-display font-bold text-flow-deep">{quote.productName}</h3>
            <div className="flex items-center gap-2">
              {isQuoteUnread(quote) && (
                <span
                  className="h-2 w-2 rounded-full bg-flow-accent"
                  title="Unread reply"
                  aria-hidden
                />
              )}
              <StatusBadge status={quote.status} />
            </div>
          </div>
          <dl className="mt-2 grid gap-1 text-sm text-flow-navy/70 sm:grid-cols-2">
            <div>
              <dt className="inline font-medium text-flow-navy/50">Requested: </dt>
              <dd className="inline">{new Date(quote.createdAt).toLocaleDateString()}</dd>
            </div>
            {quote.lastReplyAt && (
              <div>
                <dt className="inline font-medium text-flow-navy/50">Latest reply: </dt>
                <dd className="inline">{new Date(quote.lastReplyAt).toLocaleDateString()}</dd>
              </div>
            )}
            <div>
              <dt className="inline font-medium text-flow-navy/50">Qty: </dt>
              <dd className="inline">{quote.quantity}</dd>
            </div>
          </dl>
        </div>

        <Link
          to={`/account/quotes/${quote._id}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-flow-deep px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          <MessageSquare size={16} />
          View Conversation
        </Link>
      </div>
    </li>
  )
}

function RequestSection({ title, items }: { title: string; items: QuoteRequest[] }) {
  if (items.length === 0) return null
  return (
    <section className="mt-10">
      <h2 className="font-display text-lg font-bold text-flow-deep">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((q) => (
          <QuoteCard key={q._id} quote={q} />
        ))}
      </ul>
    </section>
  )
}

export function QuotesPage() {
  const { user, loading: authLoading } = useAuth()
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    api
      .getMyQuotes()
      .then(({ quotes: q }) => setQuotes(q))
      .finally(() => setLoading(false))
  }, [user])

  if (authLoading) return null
  if (!user) return <Navigate to="/login?return=/account/quotes" replace />

  const pending = quotes.filter((r) => r.status === 'pending')
  const replied = quotes.filter((r) => r.status === 'replied')
  const closed = quotes.filter((r) => r.status === 'closed')

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-3xl font-bold text-flow-deep">My Quotes</h1>
      <p className="mt-2 text-flow-navy/70">
        View your quote requests, admin replies, and download quotations.
      </p>

      {loading ? (
        <p className="mt-8 text-flow-navy/60">Loading…</p>
      ) : quotes.length === 0 ? (
        <p className="mt-8 rounded-2xl glass-light p-6 text-center text-flow-navy/70">
          No quote requests yet. Browse products and click Get Quote to start.
        </p>
      ) : (
        <>
          <RequestSection title="Pending" items={pending} />
          <RequestSection title="Replied" items={replied} />
          <RequestSection title="Closed" items={closed} />
        </>
      )}
    </div>
  )
}
