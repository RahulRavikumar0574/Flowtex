import { Router } from 'express'
import { QuoteRequest } from '../models/QuoteRequest.js'
import { QuoteReply } from '../models/QuoteReply.js'
import { requireAuth } from '../middleware/auth.js'
import { emailQuoteSubmitted } from '../utils/email.js'

const router = Router()

const DEFAULT_MESSAGE =
  'I am interested in this product. Please share the latest price and delivery details.'

router.use(requireAuth)

/** All quotes for the logged-in customer */
router.get('/my', async (req, res) => {
  try {
    const quotes = await QuoteRequest.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .lean()
    res.json({ quotes })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load quotes' })
  }
})

/** Legacy alias */
router.get('/', async (req, res) => {
  try {
    const requests = await QuoteRequest.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .lean()
    res.json({ requests })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load quotes' })
  }
})

router.get('/unread-count', async (req, res) => {
  try {
    const count = await QuoteRequest.countDocuments({
      userId: req.user._id,
      $or: [{ unreadForCustomer: true }, { customerUnread: true }],
    })
    res.json({ count })
  } catch {
    res.status(500).json({ error: 'Failed to load unread count' })
  }
})

/** Legacy alias */
router.get('/notifications/count', async (req, res) => {
  try {
    const count = await QuoteRequest.countDocuments({
      userId: req.user._id,
      $or: [{ unreadForCustomer: true }, { customerUnread: true }],
    })
    res.json({ count })
  } catch {
    res.status(500).json({ error: 'Failed to load notifications' })
  }
})

router.get('/notifications', async (req, res) => {
  try {
    const notifications = await QuoteRequest.find({
      userId: req.user._id,
      $or: [{ unreadForCustomer: true }, { customerUnread: true }],
    })
      .sort({ lastReplyAt: -1, updatedAt: -1 })
      .lean()
    res.json({ notifications })
  } catch {
    res.status(500).json({ error: 'Failed to load notifications' })
  }
})

router.get('/product/:productId/history', async (req, res) => {
  try {
    const requests = await QuoteRequest.find({
      userId: req.user._id,
      productId: req.params.productId,
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
    res.json({ requests })
  } catch {
    res.status(500).json({ error: 'Failed to load history' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const request = await QuoteRequest.findById(req.params.id).lean()
    if (!request || request.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: 'Quote request not found' })
    }
    const replies = await QuoteReply.find({ quoteRequestId: request._id })
      .sort({ createdAt: 1 })
      .populate('senderId', 'name role')
      .lean()

    res.json({ request, replies })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to load conversation' })
  }
})

router.post('/:id/read', async (req, res) => {
  try {
    const request = await QuoteRequest.findOne({
      _id: req.params.id,
      userId: req.user._id,
    })
    if (!request) return res.status(404).json({ error: 'Quote request not found' })

    request.unreadForCustomer = false
    request.customerUnread = false
    await request.save()

    await QuoteReply.updateMany(
      { quoteRequestId: request._id, senderRole: 'admin' },
      { isRead: true },
    )

    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to mark as read' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { productId, productName, quantity, message } = req.body
    if (!productId || !productName) {
      return res.status(400).json({ error: 'Product information is required' })
    }

    const request = await QuoteRequest.create({
      userId: req.user._id,
      productId,
      productName,
      quantity: Math.max(1, Number(quantity) || 1),
      message: (message || DEFAULT_MESSAGE).trim(),
      status: 'pending',
      adminUnread: true,
      unreadForCustomer: false,
    })

    await QuoteReply.create({
      quoteRequestId: request._id,
      senderId: req.user._id,
      senderRole: 'customer',
      message: request.message,
      isRead: true,
    })

    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail) {
      await emailQuoteSubmitted({
        adminEmail,
        customerName: req.user.name,
        productName: request.productName,
      })
    }

    res.status(201).json({ request })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to submit quote request' })
  }
})

router.post('/:id/messages', async (req, res) => {
  try {
    const request = await QuoteRequest.findById(req.params.id)
    if (!request || request.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: 'Quote request not found' })
    }
    if (request.status === 'closed') {
      return res.status(400).json({ error: 'This quote request is closed' })
    }

    const { message } = req.body
    if (!message?.trim()) return res.status(400).json({ error: 'Message is required' })

    const reply = await QuoteReply.create({
      quoteRequestId: request._id,
      senderId: req.user._id,
      senderRole: 'customer',
      message: message.trim(),
      isRead: true,
    })

    request.adminUnread = true
    await request.save()

    res.status(201).json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

export default router
