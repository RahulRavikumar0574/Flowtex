import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
import { QuoteRequest } from '../models/QuoteRequest.js'
import { QuoteReply } from '../models/QuoteReply.js'
import { User } from '../models/User.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'
import { emailQuoteClosed, emailQuoteReply } from '../utils/email.js'
import { formatAdminReplyMessage } from '../utils/formatAdminReply.js'

const router = Router()

router.use(requireAuth, requireAdmin)

const uploadDir = process.env.UPLOAD_DIR || './uploads'
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')
    cb(null, `${Date.now()}-${safe}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Only PDF files are allowed'))
  },
})

router.get('/stats', async (_req, res) => {
  try {
    const [total, pending, replied, closed] = await Promise.all([
      QuoteRequest.countDocuments(),
      QuoteRequest.countDocuments({ status: 'pending' }),
      QuoteRequest.countDocuments({ status: 'replied' }),
      QuoteRequest.countDocuments({ status: 'closed' }),
    ])
    const unread = await QuoteRequest.countDocuments({ adminUnread: true })
    res.json({ total, pending, replied, closed, unread })
  } catch {
    res.status(500).json({ error: 'Failed to load stats' })
  }
})

router.get('/requests', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query
    const filter = status ? { status } : {}
    const requests = await QuoteRequest.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .populate('userId', 'name email phone')
      .lean()
    res.json({ requests })
  } catch {
    res.status(500).json({ error: 'Failed to load requests' })
  }
})

router.get('/requests/:id', async (req, res) => {
  try {
    const request = await QuoteRequest.findById(req.params.id)
      .populate('userId', 'name email phone')
      .lean()
    if (!request) return res.status(404).json({ error: 'Request not found' })

    const replies = await QuoteReply.find({ quoteRequestId: request._id })
      .sort({ createdAt: 1 })
      .populate('senderId', 'name role')
      .lean()

    await QuoteRequest.findByIdAndUpdate(request._id, { adminUnread: false })

    res.json({ request, replies })
  } catch {
    res.status(500).json({ error: 'Failed to load request' })
  }
})

router.post('/requests/:id/reply', upload.single('attachment'), async (req, res) => {
  try {
    const request = await QuoteRequest.findById(req.params.id).populate('userId', 'email name')
    if (!request) return res.status(404).json({ error: 'Request not found' })

    const { message, delivery } = req.body
    if (!message?.trim()) return res.status(400).json({ error: 'Message is required' })

    const attachmentUrl = req.file ? `/uploads/${req.file.filename}` : null
    const formattedMessage = formatAdminReplyMessage(message.trim(), { delivery })

    const reply = await QuoteReply.create({
      quoteRequestId: request._id,
      senderId: req.user._id,
      senderRole: 'admin',
      message: formattedMessage,
      attachment: attachmentUrl,
      attachmentUrl,
      isRead: false,
    })

    const now = new Date()
    request.status = 'replied'
    request.adminUnread = false
    request.unreadForCustomer = true
    request.customerUnread = true
    request.lastReplyAt = now
    await request.save()

    const customer = request.userId
    if (customer?.email) {
      await emailQuoteReply({ customerEmail: customer.email, productName: request.productName })
    }

    res.status(201).json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message || 'Failed to send reply' })
  }
})

router.patch('/requests/:id/close', async (req, res) => {
  try {
    const request = await QuoteRequest.findById(req.params.id).populate('userId', 'email')
    if (!request) return res.status(404).json({ error: 'Request not found' })

    request.status = 'closed'
    request.unreadForCustomer = true
    request.customerUnread = true
    request.lastReplyAt = new Date()
    await request.save()

    if (request.userId?.email) {
      await emailQuoteClosed({
        customerEmail: request.userId.email,
        productName: request.productName,
      })
    }

    res.json({ request })
  } catch {
    res.status(500).json({ error: 'Failed to close request' })
  }
})

export default router
