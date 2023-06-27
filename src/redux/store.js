import { configureStore } from '@reduxjs/toolkit'
import streamerReducer from './slice/streamerSlice'
import authReducer from './slice/authSlice'


export const store = configureStore({
  reducer: {
    streamers: streamerReducer,
    auth: authReducer
  },
})