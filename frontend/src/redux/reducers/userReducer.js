import { createSlice } from "@reduxjs/toolkit";

let userSlice = createSlice({
  name: 'user',
  initialState: { loading: false, isAuth: false, user: null, error: null, message: null },
  reducers: {
    setLoadingTrue(state) {
      state.loading = true
    },
    setLoadingFalse(state) {
      state.loading = false
    },
    setLoginSuccess(state, action) {
      state.isAuth = true
      state.user = action.payload.user
      state.message = action.payload.message
    },
    setLoginFailed(state, action) {
      state.isAuth = false
      state.user = null
      state.error = action.payload.error
    },
    setError(state, action) {
      state.error = action.payload.error
    },
    setMessage(state, action) {
      state.message = action.payload.message
    },
    setLogout(state) {
      state.isAuth = false
      state.user = null
      state.message = "Logged out successfully"
    }
  }
})

export default userSlice
export let {
  setLoadingTrue,
  setLoadingFalse,
  setLoginSuccess,
  setLoginFailed,
  setError,
  setMessage,
  setLogout } = userSlice.actions