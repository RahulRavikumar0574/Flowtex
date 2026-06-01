import { useEffect, useRef, useState } from 'react'
import { api, type QuoteReply, type QuoteRequest } from '../../lib/api'
import { useQuoteNotifications } from '../../context/QuoteNotificationsContext'
import { AdminReplyBubble } from './AdminReplyBubble'
import { getReplyAttachmentUrl } from '../../lib/quoteDisplay'

type Props = {
  quoteId: string
  isAdmin?: boolean
  onStatusChange?: () => void
}

export function QuoteConversation({ quoteId, isAdmin, onStatusChange }: Props) {
  const { refresh: refreshNotifications } = useQuoteNotifications()
  const [request, setRequest] = useState<QuoteRequest | null>(null)
  const [replies, setReplies] = useState<QuoteReply[]>([])
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const markedRead = useRef(false)

  async function load(markAsRead = false) {
    if (!markedRead.current && markAsRead && !isAdmin) {
      try {
        await api.markQuoteRead(quoteId)
        markedRead.current = true
        await refreshNotifications()
      } catch {
        /* ignore */
      }
    }

    try {
      const data = isAdmin
        ? await api.adminRequest(quoteId)
        : await api.getQuote(quoteId)
      setRequest(data.request)
      setReplies(data.replies)
      onStatusChange?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    markedRead.current = false
    setLoading(true)
    load(true)
    const interval = setInterval(() => load(false), 15000)
    return () => clearInterval(interval)
  }, [quoteId, isAdmin])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [replies])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim() && !file) return
    setSending(true)
    setError('')
    try {
      if (isAdmin) {
        await api.adminReply(quoteId, message.trim(), file ?? undefined)
      } else {
        await api.sendCustomerMessage(quoteId, message.trim())
      }
      setMessage('')
      setFile(null)
      await load(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send')
    } finally {
      setSending(false)
    }
  }

  async function handleClose() {
    if (!confirm('Mark this quote request as closed?')) return
    try {
      await api.adminClose(quoteId)
      await load(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to close')
    }
  }

  if (loading && !request) {
    return <p className="py-8 text-center text-flow-navy/70">Loading conversation…</p>
  }

  if (!request) {
    return <p className="py-8 text-center text-red-600">{error || 'Not found'}</p>
  }

  const closed = request.status === 'closed'

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-bold text-flow-deep">Conversation</h2>
          <p className="text-sm text-flow-navy/70">{request.productName}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            request.status === 'replied'
              ? 'bg-green-100 text-green-800'
              : request.status === 'closed'
                ? 'bg-gray-100 text-gray-700'
                : 'bg-amber-100 text-amber-800'
          }`}
        >
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </span>
      </div>

      <div className="flex max-h-[min(60vh,520px)] flex-col gap-3 overflow-y-auto rounded-2xl border border-flow-deep/10 bg-flow-ice/30 p-4">
        {replies.map((reply) => {
          const isCustomer = reply.senderRole === 'customer'
          const alignRight = isAdmin ? !isCustomer : isCustomer

          if (reply.senderRole === 'admin' && !isAdmin) {
            return (
              <div key={reply._id} className="flex justify-start">
                <AdminReplyBubble reply={reply} />
              </div>
            )
          }

          return (
            <div
              key={reply._id}
              className={`flex ${alignRight ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  reply.senderRole === 'admin'
                    ? 'bg-green-50 text-flow-deep'
                    : 'bg-white text-flow-navy/90 shadow-sm'
                }`}
              >
                <p className="mb-1 text-xs font-semibold text-flow-navy/50">
                  {reply.senderRole === 'admin' ? 'Flowtex Team' : 'You'}
                </p>
                <p className="whitespace-pre-wrap">{reply.message}</p>
                {getReplyAttachmentUrl(reply) && isAdmin && (
                  <a
                    href={getReplyAttachmentUrl(reply)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-flow-accent underline"
                  >
                    View PDF
                  </a>
                )}
                <p className="mt-1 text-xs text-flow-navy/40">
                  {new Date(reply.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {!closed && (
        <form onSubmit={handleSend} className="mt-4 space-y-2">
          {isAdmin && (
            <label className="block text-sm">
              <span className="text-flow-navy/70">Attach PDF quotation (optional)</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="mt-1 block w-full text-sm"
              />
            </label>
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              placeholder="Type your message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-full border border-flow-deep/10 px-4 py-2.5 text-sm"
            />
            <button
              type="submit"
              disabled={sending}
              className="shrink-0 rounded-full bg-flow-deep px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              Send
            </button>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      )}

      {isAdmin && !closed && (
        <button
          type="button"
          onClick={handleClose}
          className="mt-4 self-end text-sm font-semibold text-flow-navy/60 hover:text-flow-deep"
        >
          Mark as Closed
        </button>
      )}

      {closed && (
        <p className="mt-4 text-center text-sm text-flow-navy/60">This conversation is closed.</p>
      )}
    </div>
  )
}
