import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import resumeRoutes from './routes/resume.routes.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'

const app = express()
app.set('trust proxy', 1)

app.use((req, res, next) => {
  const origin = req.headers.origin
  if (!origin || origin.endsWith('.vercel.app') || origin.startsWith('http://localhost')) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*')
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

connectDB()
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(rateLimit({ windowMs: 15*60*1000, max: 100, standardHeaders: true, legacyHeaders: false }))

app.get('/', (_req, res) => res.json({ message: 'CareerAI API is running' }))
app.get('/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/resume', resumeRoutes)
app.use(notFound)
app.use(errorHandler)

if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT || 5000, () => console.log('Server running'))
}

export default app
