import crypto from 'crypto'
import User from '../models/User.model.js'
import { signToken } from '../utils/jwt.utils.js'

// ── Helpers ───────────────────────────────────────────────────
const respond = (res, statusCode, user, message) => {
  const token = signToken(user._id)
  res.status(statusCode).json({ message, token, user })
}

// ─────────────────────────────────────────────────────────────
// POST /api/auth/register
// ─────────────────────────────────────────────────────────────
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ message: 'An account with that email already exists.' })
    }
    const user = await User.create({ name, email, password })
    respond(res, 201, user, 'Account created successfully.')
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/auth/login
// ─────────────────────────────────────────────────────────────
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Incorrect email or password.' })
    }
    respond(res, 200, user, 'Logged in successfully.')
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────────────────────
// GET /api/auth/me
// ─────────────────────────────────────────────────────────────
export const getMe = async (req, res) => {
  res.json({ user: req.user })
}

// ─────────────────────────────────────────────────────────────
// PUT /api/auth/me
// ─────────────────────────────────────────────────────────────
export const updateMe = async (req, res, next) => {
  try {
    const allowed = ['name', 'title', 'bio', 'targetRoles', 'skills', 'settings']
    const updates = {}
    allowed.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f] })

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    })
    res.json({ message: 'Profile updated.', user })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────────────────────
// PUT /api/auth/change-password
// ─────────────────────────────────────────────────────────────
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.user._id).select('+password')
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: 'Current password is incorrect.' })
    }
    user.password = newPassword
    await user.save()
    respond(res, 200, user, 'Password changed successfully.')
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/auth/forgot-password
// ─────────────────────────────────────────────────────────────
export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    // Always respond the same way for security
    if (!user) {
      return res.json({ message: 'If that email exists, a reset link has been sent.' })
    }
    const token = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken   = crypto.createHash('sha256').update(token).digest('hex')
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000 // 1 hour
    await user.save({ validateBeforeSave: false })

    // In a production app you would send an email here.
    // For now we return the token so the frontend can use it in dev mode.
    console.log(`[DEV] Reset token for ${user.email}: ${token}`)

    res.json({ message: 'If that email exists, a reset link has been sent.', devToken: token })
  } catch (err) {
    next(err)
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/auth/reset-password
// ─────────────────────────────────────────────────────────────
export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({
      resetPasswordToken:   hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).select('+resetPasswordToken +resetPasswordExpires')

    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired.' })
    }

    user.password             = newPassword
    user.resetPasswordToken   = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    respond(res, 200, user, 'Password reset successfully.')
  } catch (err) {
    next(err)
  }
}