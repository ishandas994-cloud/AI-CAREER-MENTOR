import { configureStore } from '@reduxjs/toolkit'
import userReducer  from './userslice'
import resumeReducer from './resumeslice'

export const store = configureStore({
  reducer: {
    user:   userReducer,
    resume: resumeReducer,
  },
})