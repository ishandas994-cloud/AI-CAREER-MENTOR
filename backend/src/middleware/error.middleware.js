export const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.originalUrl}`)
  err.statusCode = 404
  next(err)
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500
  let message    = err.message || 'Internal Server Error'

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = 409
    const field = Object.keys(err.keyValue)[0]
    message = `An account with that ${field} already exists.`
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 422
    const errors = Object.values(err.errors).map(e => e.message)
    return res.status(statusCode).json({ message: 'Validation failed', errors })
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid token.'
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }

  res.status(statusCode).json({ message })
}