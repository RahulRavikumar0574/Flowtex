import type { QuoteReply, QuoteRequest } from './api'

export function isQuoteUnread(quote: QuoteRequest): boolean {
  return Boolean(quote.unreadForCustomer ?? quote.customerUnread)
}

export function getReplyAttachmentUrl(reply: QuoteReply): string | null {
  return reply.attachmentUrl || reply.attachment || null
}

/** Customer-facing text; formats legacy numeric-only admin replies */
export function formatAdminReplyForDisplay(message: string): string {
  const text = message.trim()
  const digitsOnly = text.replace(/[,\s₹]/g, '')
  if (/^\d+$/.test(digitsOnly)) {
    const amount = Number(digitsOnly)
    return [
      `Price: ₹${amount.toLocaleString('en-IN')}`,
      '',
      'Delivery: 3-5 Working Days',
      '',
      'Please contact us for order confirmation.',
    ].join('\n')
  }
  return text
}

/** Renders admin message lines (Price, Delivery, etc.) for customer view */
export function parseAdminMessageLines(message: string): { label?: string; text: string }[] {
  const lines = formatAdminReplyForDisplay(message).split('\n').filter((l) => l.trim())
  return lines.map((line) => {
    const colon = line.indexOf(':')
    if (colon > 0 && colon < 24) {
      return { label: line.slice(0, colon).trim(), text: line.slice(colon + 1).trim() }
    }
    return { text: line.trim() }
  })
}
