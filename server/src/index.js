import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from './models/User.js'
import authRoutes from './routes/auth.js'
import quoteRoutes from './routes/quotes.js'
import adminRoutes from './routes/admin.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 4000
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads')

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())
app.use('/uploads', express.static(uploadDir))

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.use('/api/auth', authRoutes)
app.use('/api/quotes', quoteRoutes)
app.use('/api/admin', adminRoutes)

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) return

  const existing = await User.findOne({ email: email.toLowerCase() })
  if (existing) return

  const hash = await bcrypt.hash(password, 12)
  await User.create({
    name: 'Flowtex Admin',
    email: email.toLowerCase(),
    phone: '',
    password: hash,
    role: 'admin',
  })
  console.log(`Admin user seeded: ${email}`)
}

async function start() {
  console.log('MONGODB_URI =', process.env.MONGODB_URI)

  const uri =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flowtex'
  await mongoose.connect(uri)
  console.log('MongoDB connected')

  await seedAdmin()

  app.listen(PORT, () => {
    console.log(`Flowtex API running on http://localhost:${PORT}`)
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
