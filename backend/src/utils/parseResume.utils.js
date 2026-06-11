import pdf from 'pdf-parse/lib/pdf-parse.js'
import https from 'https'
import http  from 'http'
import { cloudinary } from '../config/cloudinary.js'

/**
 * Fetch a remote URL and return a Buffer.
 * Follows redirects (Cloudinary sometimes redirects).
 */
const fetchBuffer = (url) =>
  new Promise((resolve, reject) => {
    const get = (targetUrl) => {
      const client = targetUrl.startsWith('https') ? https : http
      client.get(targetUrl, (res) => {
        // Follow redirect
        if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) {
          return get(res.headers.location)
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} when fetching file from Cloudinary`))
        }
        const chunks = []
        res.on('data', c => chunks.push(c))
        res.on('end',  () => resolve(Buffer.concat(chunks)))
        res.on('error', reject)
      }).on('error', reject)
    }
    get(url)
  })

/**
 * Build a signed Cloudinary URL from a public_id.
 * Works even if the asset isn't fully public.
 */
const getSignedUrl = (publicId) => {
  return cloudinary.url(publicId, {
    resource_type: 'raw',
    secure:        true,
    sign_url:      true,
    expires_at:    Math.floor(Date.now() / 1000) + 300, // valid 5 min
  })
}

/**
 * Extract raw text from a PDF.
 * Accepts either a direct URL or a Cloudinary public_id.
 * Returns empty string if parsing fails (never throws).
 */
export const extractTextFromUrl = async (urlOrPublicId, publicId = null) => {
  try {
    // Prefer signed URL if we have the public_id
    const downloadUrl = publicId
      ? getSignedUrl(publicId)
      : urlOrPublicId

    console.log('[PDF] Fetching from:', downloadUrl.slice(0, 80) + '…')
    const buffer = await fetchBuffer(downloadUrl)

    console.log('[PDF] Buffer size:', buffer.length, 'bytes')
    if (buffer.length < 100) {
      console.error('[PDF] Buffer too small — likely not a valid PDF')
      return ''
    }

    const data = await pdf(buffer)
    const text = (data.text || '').trim()
    console.log('[PDF] Extracted', text.length, 'characters')
    return text
  } catch (err) {
    console.error('[PDF] Extraction failed:', err.message)
    return ''
  }
}