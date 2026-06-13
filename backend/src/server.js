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

// ── Required for Vercel / reverse proxy ───────────────────────
app.set('trust proxy', 1)

// ── Database ──────────────────────────────────────────────────
connectDB()

// ── CORS — allows all Vercel preview + production URLs ────────
const allowedOrigins = [
  // Local dev
  'http://localhost:3000',
  'http://localhost:5173',
  // Add your exact production frontend URL here once you have it
  process.env.CLIENT_URL,
]

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin) return callback(null, true)

    // Allow any vercel.app subdomain (covers all preview URLs)
    if (origin.endsWith('.vercel.app')) return callback(null, true)

    // Allow localhost
    if (origin.startsWith('http://localhost')) return callback(null, true)

    // Allow explicitly listed origins
    if (allowedOrigins.includes(origin)) return callback(null, true)

    // Block everything else
    callback(new Error(`CORS blocked: ${origin}`))
  },
  credentials: true,
}))

// ── Security & utils ──────────────────────────────────────────
app.use(helmet())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Rate limiter ──────────────────────────────────────────────
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