import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resumeService from '../services/resumeService'
 
// ─── Async Thunks ──────────────────────────────────────────────────────────────
 
export const uploadResume = createAsyncThunk(
  'resume/upload',
  async ({ file, onProgress }, { rejectWithValue }) => {
    try {
      return await resumeService.uploadResume(file, onProgress)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
 
export const parseResume = createAsyncThunk(
  'resume/parse',
  async (resumeId, { rejectWithValue }) => {
    try {
      return await resumeService.parseResume(resumeId)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
 
export const analyseSkillGap = createAsyncThunk(
  'resume/skillGap',
  async ({ resumeId, targetRole }, { rejectWithValue }) => {
    try {
      return await resumeService.analyseSkillGap(resumeId, targetRole)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
 
export const getRoadmap = createAsyncThunk(
  'resume/roadmap',
  async ({ resumeId, targetRole }, { rejectWithValue }) => {
    try {
      return await resumeService.getRoadmap(resumeId, targetRole)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
 
export const getJobMatches = createAsyncThunk(
  'resume/jobMatches',
  async ({ resumeId, filters }, { rejectWithValue }) => {
    try {
      return await resumeService.getJobMatches(resumeId, filters)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
 
export const getAllResumes = createAsyncThunk(
  'resume/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await resumeService.getAllResumes()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
 
export const deleteResume = createAsyncThunk(
  'resume/delete',
  async (resumeId, { rejectWithValue }) => {
    try {
      await resumeService.deleteResume(resumeId)
      return resumeId
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
 
// ─── Initial State ─────────────────────────────────────────────────────────────
 
const initialState = {
  resumes: [],           // list of all user resumes
  activeResume: null,    // currently selected resume object
 
  // Parsed data
  parsedData: null,      // { skills, experience, education, ... }
  skillGap: null,        // { gaps: [], matched: [] }
  roadmap: null,         // { phases: [] }
  jobMatches: [],        // [{ title, company, match, ... }]
 
  // Upload progress
  uploadProgress: 0,
 
  // Loading states per operation
  loading: {
    upload: false,
    parse: false,
    skillGap: false,
    roadmap: false,
    jobMatches: false,
    list: false,
  },
 
  // Error states per operation
  errors: {
    upload: null,
    parse: null,
    skillGap: null,
    roadmap: null,
    jobMatches: null,
    list: null,
  },
}
 
// ─── Slice ─────────────────────────────────────────────────────────────────────
 
const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setActiveResume(state, action) {
      state.activeResume = action.payload
    },
    setUploadProgress(state, action) {
      state.uploadProgress = action.payload
    },
    clearErrors(state) {
      state.errors = { ...initialState.errors }
    },
    resetResumeState() {
      return initialState
    },
  },
  extraReducers: builder => {
    // ── Upload ──
    builder
      .addCase(uploadResume.pending, state => {
        state.loading.upload = true
        state.errors.upload = null
        state.uploadProgress = 0
      })
      .addCase(uploadResume.fulfilled, (state, action) => {
        state.loading.upload = false
        state.uploadProgress = 100
        state.activeResume = action.payload.resume
        state.resumes.unshift(action.payload.resume)
      })
      .addCase(uploadResume.rejected, (state, action) => {
        state.loading.upload = false
        state.errors.upload = action.payload
      })
 
    // ── Parse ──
    builder
      .addCase(parseResume.pending, state => {
        state.loading.parse = true
        state.errors.parse = null
      })
      .addCase(parseResume.fulfilled, (state, action) => {
        state.loading.parse = false
        state.parsedData = action.payload
      })
      .addCase(parseResume.rejected, (state, action) => {
        state.loading.parse = false
        state.errors.parse = action.payload
      })
 
    // ── Skill Gap ──
    builder
      .addCase(analyseSkillGap.pending, state => {
        state.loading.skillGap = true
        state.errors.skillGap = null
      })
      .addCase(analyseSkillGap.fulfilled, (state, action) => {
        state.loading.skillGap = false
        state.skillGap = action.payload
      })
      .addCase(analyseSkillGap.rejected, (state, action) => {
        state.loading.skillGap = false
        state.errors.skillGap = action.payload
      })
 
    // ── Roadmap ──
    builder
      .addCase(getRoadmap.pending, state => {
        state.loading.roadmap = true
        state.errors.roadmap = null
      })
      .addCase(getRoadmap.fulfilled, (state, action) => {
        state.loading.roadmap = false
        state.roadmap = action.payload
      })
      .addCase(getRoadmap.rejected, (state, action) => {
        state.loading.roadmap = false
        state.errors.roadmap = action.payload
      })
 
    // ── Job Matches ──
    builder
      .addCase(getJobMatches.pending, state => {
        state.loading.jobMatches = true
        state.errors.jobMatches = null
      })
      .addCase(getJobMatches.fulfilled, (state, action) => {
        state.loading.jobMatches = false
        state.jobMatches = action.payload.jobs
      })
      .addCase(getJobMatches.rejected, (state, action) => {
        state.loading.jobMatches = false
        state.errors.jobMatches = action.payload
      })
 
    // ── Get All Resumes ──
    builder
      .addCase(getAllResumes.pending, state => {
        state.loading.list = true
      })
      .addCase(getAllResumes.fulfilled, (state, action) => {
        state.loading.list = false
        state.resumes = action.payload.resumes
      })
      .addCase(getAllResumes.rejected, (state, action) => {
        state.loading.list = false
        state.errors.list = action.payload
      })
 
    // ── Delete ──
    builder
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.resumes = state.resumes.filter(r => r._id !== action.payload)
        if (state.activeResume?._id === action.payload) {
          state.activeResume = null
        }
      })
  },
})
 
export const {
  setActiveResume,
  setUploadProgress,
  clearErrors,
  resetResumeState,
} = resumeSlice.actions
 
// ─── Selectors ─────────────────────────────────────────────────────────────────
export const selectActiveResume  = state => state.resume.activeResume
export const selectParsedData    = state => state.resume.parsedData
export const selectSkillGap      = state => state.resume.skillGap
export const selectRoadmap       = state => state.resume.roadmap
export const selectJobMatches    = state => state.resume.jobMatches
export const selectResumeLoading = state => state.resume.loading
export const selectResumeErrors  = state => state.resume.errors
export const selectUploadProg    = state => state.resume.uploadProgress
 
export default resumeSlice.reducer