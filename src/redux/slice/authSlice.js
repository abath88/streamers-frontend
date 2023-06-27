import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const backendURL = 'http://localhost:3001'

const initialState = {
  loading: false,
  username: '',
  userId: null, 
  token: '',
  error: null,
  success: false,
}

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/signin`,
        { username, password },
        config
      );
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, mail, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `${backendURL}/api/signup`,
        { username, mail, password },
        config
      )
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(userLogin.fulfilled, (state, {payload}) => {
      state.loading = false
      state.userInfo = payload
      state.token = payload.data.token
      state.username = payload.data.username
      state.userId = payload.data.userId
    })
    builder.addCase(userLogin.rejected, (state, {payload}) => {
      state.loading = false
      state.error = payload
      state.success = false
    })

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false
      state.success = true
    })
    builder.addCase(registerUser.rejected, (state, {payload}) => {
      state.loading = false
      state.success = false
      state.error = payload
    })  
  },
})

export default authSlice.reducer