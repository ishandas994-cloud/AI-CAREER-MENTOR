import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Store resumes as raw files (PDF / DOCX) so we can fetch & parse them
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:        'ai-career-mentor/resumes',
    resource_type: 'raw',
    allowed_formats: ['pdf', 'doc', 'docx'],
  },
})

export const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF and Word documents are allowed.'))
    }
  },
})

export { cloudinary }