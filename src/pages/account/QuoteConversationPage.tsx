import { Navigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { QuoteConversation } from '../../components/quotes/QuoteConversation'

export function QuoteConversationPage() {
  const { id } = useParams<{ id: string }>()
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to={`/login?return=/account/quotes/${id}`} replace />
  if (!id) return <Navigate to="/account/quotes" replace />

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Link
        to="/account/quotes"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-flow-accent hover:underline"
      >
        <ArrowLeft size={16} />
        Back to My Quotes
      </Link>
      <div className="glass-light rounded-3xl p-6 md:p-8">
        <QuoteConversation quoteId={id} />
      </div>
    </div>
  )
}
