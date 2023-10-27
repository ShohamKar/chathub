import {configureStore} from '@reduxjs/toolkit'
import userSlice from './reducers/userReducer'
import chatSlice from './reducers/chatReducer'

export let server = '/api/v1'
let store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatSlice.reducer
  }
})


export default store
