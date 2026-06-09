import pdf from 'pdf-parse/lib/pdf-parse.js'
import https from 'https'
import http from 'http'

/**
 * Fetch a remote file (Cloudinary URL) and return a Buffer.
 */
const fetchBuffer = (url) =>
  new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    client.get(url, (res) => {
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    }).on('error', reject)
  })

/**
 * Extract raw text from a PDF stored on Cloudinary.
 * Returns an empty string if parsing fails.
 */
export const extractTextFromUrl = async (url) => {
  try {
    const buffer = await fetchBuffer(url)
    const data   = await pdf(buffer)
    return data.text || ''
  } catch (err) {
    console.error('PDF parse error:', err.message)
    return ''
  }
}