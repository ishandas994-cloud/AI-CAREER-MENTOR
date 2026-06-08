import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'
 
// ─── Async Thunks ──────────────────────────────────────────────────────────────
 
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
 
export const registerUser = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    try {
      return await authService.register(data)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
 
export const fetchCurrentUser = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.fetchProfile()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
 
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (updates, { rejectWithValue }) => {
    try {
      return await authService.updateProfile(updates)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)
 
// ─── Initial State ─────────────────────────────────────────────────────────────
 
const storedUser = (() => {
  try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
})()
 
const initialState = {
  user: storedUser || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: {
    login: false,
    register: false,
    profile: false,
    update: false,
  },
  errors: {
    login: null,
    register: null,
    profile: null,
    update: null,
  },
}
 
// ─── Slice ─────────────────────────────────────────────────────────────────────
 
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser(state) {
      authService.logout()
      state.user = null
      state.isAuthenticated = false
    },
    clearUserErrors(state) {
      state.errors = { ...initialState.errors }
    },
    setUser(state, action) {
      state.user = action.payload
      state.isAuthenticated = true
    },
  },
  extraReducers: builder => {
    // ── Login ──
    builder
      .addCase(loginUser.pending, state => {
        state.loading.login = true
        state.errors.login = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading.login = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading.login = false
        state.errors.login = action.payload
      })
 
    // ── Register ──
    builder
      .addCase(registerUser.pending, state => {
        state.loading.register = true
        state.errors.register = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading.register = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading.register = false
        state.errors.register = action.payload
      })
 
    // ── Fetch Profile ──
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.loading.profile = true
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading.profile = false
        state.user = action.payload.user
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading.profile = false
        state.errors.profile = action.payload
      })
 
    // ── Update Profile ──
    builder
      .addCase(updateUserProfile.pending, state => {
        state.loading.update = true
        state.errors.update = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading.update = false
        state.user = { ...state.user, ...action.payload.user }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading.update = false
        state.errors.update = action.payload
      })
  },
})
 
export const { logoutUser, clearUserErrors, setUser } = userSlice.actions
 
// ─── Selectors ─────────────────────────────────────────────────────────────────
export const selectUser            = state => state.user.user
export const selectIsAuthenticated = state => state.user.isAuthenticated
export const selectUserLoading     = state => state.user.loading
export const selectUserErrors      = state => state.user.errors
 
export default userSlice.reducer