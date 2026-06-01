import mongoose from 'mongoose'

const quoteRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'replied', 'closed'],
      default: 'pending',
    },
    adminUnread: { type: Boolean, default: true },
    unreadForCustomer: { type: Boolean, default: false },
    lastReplyAt: { type: Date, default: null },
    /** @deprecated use unreadForCustomer */
    customerUnread: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema)
