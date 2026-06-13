import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

import connectDB from './config/db.js'
import authRoutes   from './routes/auth.routes.js'
import resumeRoutes from './routes/resume.routes.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'

const app = express()

// ── Required for Vercel / any reverse proxy ───────────────────
// Must be set BEFORE rate limiter
app.set('trust proxy', 1)

// ── Database ──────────────────────────────────────────────────
connectDB()

// ── Security & utils ──────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Rate limiter (after trust proxy is set) ───────────────────
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
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

// ── Start server only in development ─────────────────────────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`))
}

export default app