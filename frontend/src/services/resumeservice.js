import api from './api'
 
// ─── Resume Service ───────────────────────────────────────────────────────────
 
/**
 * Upload a resume file (PDF/DOCX)
 * @param {File} file
 * @param {function} onProgress - optional upload progress callback (0–100)
 */
export const uploadResume = async (file, onProgress) => {
  const formData = new FormData()
  formData.append('resume', file)
 
  const res = await api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      if (onProgress && event.total) {
        const pct = Math.round((event.loaded * 100) / event.total)
        onProgress(pct)
      }
    },
  })
  return res
}
 
/**
 * Parse the uploaded resume (extract skills, experience, education)
 * @param {string} resumeId
 */
export const parseResume = async (resumeId) => {
  return api.get(`/resume/${resumeId}/parse`)
}
 
/**
 * Analyse skill gaps vs a target job role
 * @param {string} resumeId
 * @param {string} targetRole - e.g. "Full Stack Engineer"
 */
export const analyseSkillGap = async (resumeId, targetRole) => {
  return api.post(`/resume/${resumeId}/skill-gap`, { targetRole })
}
 
/**
 * Get AI-generated learning roadmap
 * @param {string} resumeId
 * @param {string} targetRole
 */
export const getRoadmap = async (resumeId, targetRole) => {
  return api.post(`/resume/${resumeId}/roadmap`, { targetRole })
}
 
/**
 * Get AI-generated interview questions
 * @param {string} resumeId
 * @param {{ role: string, type: string }} options
 */
export const getInterviewQuestions = async (resumeId, options) => {
  return api.post(`/resume/${resumeId}/interview-questions`, options)
}
 
/**
 * Get AI project suggestions based on skill gaps
 * @param {string} resumeId
 * @param {string} targetRole
 */
export const getProjectSuggestions = async (resumeId, targetRole) => {
  return api.post(`/resume/${resumeId}/projects`, { targetRole })
}
 
/**
 * Get job matches for the current resume
 * @param {string} resumeId
 * @param {{ location?: string, remote?: boolean }} filters
 */
export const getJobMatches = async (resumeId, filters = {}) => {
  return api.get(`/resume/${resumeId}/job-matches`, { params: filters })
}
 
/**
 * Fetch all resumes for the current user
 */
export const getAllResumes = async () => {
  return api.get('/resume')
}
 
/**
 * Delete a resume by ID
 * @param {string} resumeId
 */
export const deleteResume = async (resumeId) => {
  return api.delete(`/resume/${resumeId}`)
}
 
/**
 * Set a resume as the active/primary resume
 * @param {string} resumeId
 */
export const setActiveResume = async (resumeId) => {
  return api.put(`/resume/${resumeId}/set-active`)
}
 
const resumeService = {
  uploadResume,
  parseResume,
  analyseSkillGap,
  getRoadmap,
  getInterviewQuestions,
  getProjectSuggestions,
  getJobMatches,
  getAllResumes,
  deleteResume,
  setActiveResume,
}
 
export default resumeService