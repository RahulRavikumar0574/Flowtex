import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { api, type QuoteRequest } from '../../lib/api'
import type { ApiUser } from '../../lib/api'
import { QuoteConversation } from '../../components/quotes/QuoteConversation'

export function AdminRequestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [request, setRequest] = useState<(QuoteRequest & { userId: ApiUser }) | null>(null)

  useEffect(() => {
    if (!id) return
    api.adminRequest(id).then(({ request: r }) => setRequest(r as QuoteRequest & { userId: ApiUser }))
  }, [id])

  if (!id) return null

  const customer = request?.userId as ApiUser | undefined

  return (
    <div>
      <Link
        to="/admin/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-flow-accent hover:underline"
      >
        <ArrowLeft size={16} />
        Back to dashboard
      </Link>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="font-display text-xl font-bold text-flow-deep">Quote Request Details</h1>
          {request && customer && (
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-flow-navy/60">Customer</dt>
                <dd className="font-semibold text-flow-deep">{customer.name}</dd>
                <dd className="text-flow-navy/70">{customer.email}</dd>
                <dd className="text-flow-navy/70">{customer.phone || '—'}</dd>
              </div>
              <div>
                <dt className="text-flow-navy/60">Product</dt>
                <dd className="font-semibold text-flow-deep">{request.productName}</dd>
              </div>
              <div>
                <dt className="text-flow-navy/60">Quantity</dt>
                <dd>{request.quantity}</dd>
              </div>
              <div>
                <dt className="text-flow-navy/60">Original Message</dt>
                <dd className="whitespace-pre-wrap rounded-xl bg-slate-50 p-3">{request.message}</dd>
              </div>
              <div>
                <dt className="text-flow-navy/60">Requested On</dt>
                <dd>{new Date(request.createdAt).toLocaleString()}</dd>
              </div>
            </dl>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <QuoteConversation
            quoteId={id}
            isAdmin
            onStatusChange={() => {
              api.adminRequest(id).then(({ request: r }) =>
                setRequest(r as QuoteRequest & { userId: ApiUser }),
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}
