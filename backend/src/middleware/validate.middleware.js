import { validationResult } from 'express-validator'

/**
 * Run after express-validator chains.
 * If there are errors, respond 422 immediately.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, msg: e.msg })),
    })
  }
  next()
}