import { parseAdminMessageLines, getReplyAttachmentUrl } from '../../lib/quoteDisplay'
import type { QuoteReply } from '../../lib/api'

type Props = {
  reply: QuoteReply
}

export function AdminReplyBubble({ reply }: Props) {
  const lines = parseAdminMessageLines(reply.message)
  const attachment = getReplyAttachmentUrl(reply)

  return (
    <div className="max-w-[85%] rounded-2xl bg-green-50 px-4 py-3 text-sm text-flow-deep">
      <p className="mb-2 text-xs font-semibold text-flow-navy/50">Flowtex Team</p>
      <div className="space-y-1.5">
        {lines.map((line, i) =>
          line.label ? (
            <p key={i}>
              <span className="font-semibold">{line.label}:</span> {line.text}
            </p>
          ) : (
            <p key={i} className={line.text.toLowerCase().includes('contact') ? 'text-flow-navy/80' : ''}>
              {line.text}
            </p>
          ),
        )}
      </div>
      {attachment && (
        <a
          href={attachment}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="mt-3 inline-flex items-center gap-1 rounded-full border border-flow-deep/15 bg-white px-3 py-1.5 text-xs font-semibold text-flow-accent hover:bg-flow-ice"
        >
          Download Quotation PDF
        </a>
      )}
      <p className="mt-2 text-xs text-flow-navy/40">{new Date(reply.createdAt).toLocaleString()}</p>
    </div>
  )
}
