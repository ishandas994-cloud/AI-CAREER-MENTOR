import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

import connectDB from './config/db.js'
import authRoutes   from './routes/auth.routes.js'
import resumeRoutes from './routes/resume.routes.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'

const app = express()

// ── Trust proxy — required for Vercel ────────────────────────
app.set('trust proxy', 1)

// ── CORS — must be first middleware ──────────────────────────
app.use((req, res, next) => {
  const origin = req.headers.origin
  const allowed =
    !origin ||
    origin.endsWith('.vercel.app') ||
    origin.startsWith('http://localhost')

  if (allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*')
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept')

  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

// ── Database ──────────────────────────────────────────────────
connectDB()

// ── Middleware ────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Rate limiter ──────────────────────────────────────────────
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests – try again in 15 minutes.' },
}))

// ── Routes ────────────────────────────────────────────────────
app.get('/',       (_req, res) => res.json({ message: 'CareerAI API is running ✅' }))
app.get('/health', (_req, res) => res.json({ status: 'ok', ts: Date.now() }))
app.use('/api/auth',   authRoutes)
app.use('/api/resume', resumeRoutes)

// ── Error handling ────────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ── Only listen in dev — Vercel handles this in production ────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`))
}

export default app