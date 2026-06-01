import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'
import { requireAuth, signToken } from '../middleware/auth.js'

const router = Router()

router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' })
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' })
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() })
    if (existing) return res.status(409).json({ error: 'Email already registered' })

    const hash = await bcrypt.hash(password, 12)
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: (phone || '').trim(),
      password: hash,
      role: 'customer',
    })

    const token = signToken(user)
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Registration failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email?.trim() || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) return res.status(401).json({ error: 'Invalid email or password' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' })

    const token = signToken(user)
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
})

router.get('/me', requireAuth, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
    },
  })
})

export default router
