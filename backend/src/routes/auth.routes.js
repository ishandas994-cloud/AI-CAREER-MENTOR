import { Router } from 'express'
import { body } from 'express-validator'
import {
  register,
  login,
  getMe,
  updateMe,
  changePassword,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller.js'
import { protect }   from '../middleware/auth.middleware.js'
import { validate }  from '../middleware/validate.middleware.js'

const router = Router()

// ── Public ────────────────────────────────────────────────────
router.post('/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validate,
  register
)

router.post('/login',
  [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  login
)

router.post('/forgot-password',
  [body('email').isEmail().normalizeEmail()],
  validate,
  forgotPassword
)

router.post('/reset-password',
  [
    body('token').notEmpty(),
    body('newPassword').isLength({ min: 6 }),
  ],
  validate,
  resetPassword
)

// ── Protected ─────────────────────────────────────────────────
router.use(protect)

router.get('/me',  getMe)
router.put('/me',  updateMe)

router.put('/change-password',
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 6 }),
  ],
  validate,
  changePassword
)

export default router