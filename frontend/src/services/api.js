import axios from 'axios'
 
// ─── Base instance ────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})
 
// ─── Request interceptor – attach JWT token ───────────────────────────────────
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)
 
// ─── Response interceptor – handle errors globally ───────────────────────────
api.interceptors.response.use(
  response => response.data,
  error => {
    const status = error.response?.status
    const message = error.response?.data?.message || 'Something went wrong'
 
    if (status === 401) {
      // Token expired – clear storage and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    }
 
    if (status === 403) {
      console.error('Forbidden:', message)
    }
 
    if (status === 422) {
      console.error('Validation error:', error.response.data.errors)
    }
 
    return Promise.reject({ status, message, raw: error.response?.data })
  }
)
 
export default api