/**
 * Formats a short admin reply (e.g. "10000") into a customer-friendly message.
 */
export function formatAdminReplyMessage(rawMessage, options = {}) {
  const text = (rawMessage || '').trim()
  const delivery = options.delivery || '3-5 Working Days'

  const digitsOnly = text.replace(/[,\s₹]/g, '')
  if (/^\d+$/.test(digitsOnly)) {
    const amount = Number(digitsOnly)
    return [
      `Price: ₹${amount.toLocaleString('en-IN')}`,
      '',
      `Delivery: ${delivery}`,
      '',
      'Please contact us for order confirmation.',
    ].join('\n')
  }

  return text
}
