import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type QuoteRequest } from '../../lib/api'
import type { ApiUser } from '../../lib/api'

type RequestRow = QuoteRequest & { userId: ApiUser }

export function AdminDashboardPage() {
  const [stats, setStats] = useState({ total: 0, pending: 0, replied: 0, closed: 0, unread: 0 })
  const [requests, setRequests] = useState<RequestRow[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const [s, r] = await Promise.all([api.adminStats(), api.adminRequests()])
    setStats(s)
    setRequests(r.requests as RequestRow[])
    setLoading(false)
  }

  useEffect(() => {
    load()
    const t = setInterval(load, 20000)
    return () => clearInterval(t)
  }, [])

  const cards = [
    { label: 'Total Requests', value: stats.total },
    { label: 'Pending Requests', value: stats.pending },
    { label: 'Replied Requests', value: stats.replied },
    { label: 'Closed Requests', value: stats.closed },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-flow-deep">Quote Requests</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-flow-navy/60">{c.label}</p>
            <p className="mt-1 text-3xl font-bold text-flow-deep">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold text-flow-deep">Recent Requests</h2>
        </div>
        {loading ? (
          <p className="p-6 text-flow-navy/60">Loading…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-flow-navy/60">
                <tr>
                  <th className="px-5 py-3 font-semibold">Customer</th>
                  <th className="px-5 py-3 font-semibold">Product</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => {
                  const customer = req.userId as ApiUser
                  return (
                    <tr key={req._id} className="border-t border-slate-100">
                      <td className="px-5 py-3">
                        <p className="font-medium text-flow-deep">{customer?.name}</p>
                        <p className="text-xs text-flow-navy/50">{customer?.email}</p>
                      </td>
                      <td className="px-5 py-3">{req.productName}</td>
                      <td className="px-5 py-3 text-flow-navy/70">
                        {new Date(req.createdAt).toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            req.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : req.status === 'replied'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {req.status === 'pending' ? 'New' : req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <Link
                          to={`/admin/dashboard/requests/${req._id}`}
                          className="font-semibold text-flow-accent hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
