import { Router } from 'express'
import { protect }         from '../middleware/auth.middleware.js'
import { uploadResume }    from '../config/cloudinary.js'
import {
  uploadResume         as uploadResumeCtrl,
  getAllResumes,
  deleteResume,
  setActiveResume,
  parseResume,
  analyseSkillGap,
  getRoadmap,
  getInterviewQuestions,
  getProjectSuggestions,
  getJobMatches,
} from '../controllers/resume.controller.js'

const router = Router()

// All resume routes require auth
router.use(protect)

router.get('/',                    getAllResumes)
router.post('/upload',             uploadResume.single('resume'), uploadResumeCtrl)
router.delete('/:id',              deleteResume)
router.put('/:id/set-active',      setActiveResume)

router.get('/:id/parse',           parseResume)
router.post('/:id/skill-gap',      analyseSkillGap)
router.post('/:id/roadmap',        getRoadmap)
router.post('/:id/interview-questions', getInterviewQuestions)
router.post('/:id/projects',       getProjectSuggestions)
router.get('/:id/job-matches',     getJobMatches)

export default router