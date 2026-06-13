import mongoose from 'mongoose'

// Cache connection across serverless function invocations
let cached = global.mongoose || { conn: null, promise: null }
global.mongoose = cached

const connectDB = async () => {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn
  }

  // Return existing promise if connection is in progress
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    }).then(mongoose => {
      console.log('✅ MongoDB connected')
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null
    console.error('❌ MongoDB connection error:', err.message)
    throw err
  }

  return cached.conn
}

export default connectDB