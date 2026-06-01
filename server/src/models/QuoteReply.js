import mongoose from 'mongoose'

const quoteReplySchema = new mongoose.Schema(
  {
    quoteRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuoteRequest', required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    senderRole: { type: String, enum: ['customer', 'admin'], required: true },
    message: { type: String, required: true },
    attachment: { type: String, default: null },
    attachmentUrl: { type: String, default: null },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const QuoteReply = mongoose.model('QuoteReply', quoteReplySchema)
