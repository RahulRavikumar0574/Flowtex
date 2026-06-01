import nodemailer from 'nodemailer'

function getTransport() {
  if (!process.env.SMTP_HOST) return null
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  })
}

export async function sendEmail({ to, subject, html }) {
  const transport = getTransport()
  if (!transport) {
    console.log('[SMTP_CONFIGURATION] Email skipped:', subject, '→', to)
    return
  }
  await transport.sendMail({
    from: process.env.SMTP_FROM || 'noreply@flowtex.in',
    to,
    subject,
    html,
  })
}

export function emailQuoteSubmitted({ adminEmail, customerName, productName }) {
  return sendEmail({
    to: adminEmail,
    subject: `New quote request — ${productName}`,
    html: `<p><strong>${customerName}</strong> requested a quote for <strong>${productName}</strong>.</p><p>Log in to the admin dashboard to respond.</p>`,
  })
}

export function emailQuoteReply({ customerEmail, productName }) {
  return sendEmail({
    to: customerEmail,
    subject: `Flowtex quote update — ${productName}`,
    html: `<p>Flowtex has replied to your quote request for <strong>${productName}</strong>.</p><p>Log in to view the conversation.</p>`,
  })
}

export function emailQuoteClosed({ customerEmail, productName }) {
  return sendEmail({
    to: customerEmail,
    subject: `Quote closed — ${productName}`,
    html: `<p>Your quote request for <strong>${productName}</strong> has been marked as closed.</p>`,
  })
}
