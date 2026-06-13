import mongoose from 'mongoose'

let cached = global.mongoose || { conn: null, promise: null }
global.mongoose = cached

const connectDB = async () => {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    })
  }

  try {
    cached.conn = await cached.promise
    console.log('✅ MongoDB connected')
  } catch (err) {
    cached.promise = null
    console.error('❌ MongoDB error:', err.message)
    throw err
  }

  return cached.conn
}

export default connectDB