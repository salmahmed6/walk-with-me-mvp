import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: number
  email: string
  username: string
  photoUrl?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true

      // Store in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", action.payload.token)
        localStorage.setItem("user", JSON.stringify(action.payload.user))
      }
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken")
        localStorage.removeItem("user")
      }
    },
    loadFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("authToken")
        const userStr = localStorage.getItem("user")

        if (token && userStr) {
          state.token = token
          state.user = JSON.parse(userStr)
          state.isAuthenticated = true
        }
      }
    },
  },
})

export const { setCredentials, logout, loadFromStorage } = authSlice.actions
export default authSlice.reducer
