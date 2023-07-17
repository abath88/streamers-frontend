import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  streamers: [],
  streamer: null,
  fetchLoading: false,
  fetchError: null,

  addError: null,
  addLoading: false,

  voteLoading: false,
  voteError: null,

  streamLoading: false,
  streamError: null
}

const backendURL = 'http://localhost:3001'

export const fetchSteamers = createAsyncThunk(
  'streamer/fetchSteamers',
  async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    const res = await axios(`${backendURL}/api/streamers`, config);
    const data = await res.data;
    return data;
  }
)

export const fetchStreamer = createAsyncThunk(
  'streamer/fetchStreamer',
  async ({ id }) => {
    const res = await axios(`${backendURL}/api/streamer/${id}`);
    const data = await res.data;
    return data;
  }
)

export const addStreamer = createAsyncThunk(
  'streamer/addStreamer',
  async ({ name, platform ,description }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': "Bearer " + token
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/streamers`,
        { name, platform, description },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const voteSteamer = createAsyncThunk(
  'streamer/vote',
  async ({ id, vote }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': "Bearer " + token
        },
      };
      const { data } = await axios.put(
        `${backendURL}/api/streamer/${id}/vote`,
        { vote },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const addStream = createAsyncThunk(
  'streamer/stream',
  async ({ title, description, game, startDate, endDate, id }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': "Bearer " + token
        },
      };
      const { data } = await axios.post(
        `${backendURL}/api/stream`,
        { title, description, game, startDate, endDate, id },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const streamerSlice = createSlice({
  name: 'streamer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSteamers.pending, (state) => {
      state.fetchLoading = true
    })
    builder.addCase(fetchSteamers.fulfilled, (state, action) => {
      state.fetchLoading = false
      state.streamers = action.payload.data
    })
    builder.addCase(fetchSteamers.rejected, (state, action) => {
      state.fetchLoading = false
      state.fetchError = action.error.message
    })

    builder.addCase(fetchStreamer.pending, (state) => {
      state.fetchLoading = true
    })
    builder.addCase(fetchStreamer.fulfilled, (state, action) => {
      state.fetchLoading = false
      state.streamer = action.payload.data

    })
    builder.addCase(fetchStreamer.rejected, (state, action) => {
      state.fetchLoading = false
      state.fetchError = action.error.message
    })

    builder.addCase(addStreamer.pending, (state) => {
      state.addLoading = true
    })
    builder.addCase(addStreamer.fulfilled, (state, action) => {
      state.addLoading = false
      state.streamers.push(action.payload.data);
      state.addError = null;
    })
    builder.addCase(addStreamer.rejected, (state, action) => {
      state.addLoading = false
      console.log(action)
      state.addError = action.error.message
    })

    builder.addCase(voteSteamer.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(voteSteamer.fulfilled, (state, action) => {
      state.isLoading = false
      state.streamer = action.payload.data
      
      state.streamers = state.streamers.map(el => {
        if(el._id === action.payload.data._id) {return action.payload.data}
        else return el
      }) 
    })
    builder.addCase(voteSteamer.rejected, (state, action) => {
      state.voteLoading = false
      state.voteError = action.error.message
    })

    /* STREAM */
    builder.addCase(addStream.pending, (state) => {
      state.streamLoading = true
    })
    builder.addCase(addStream.fulfilled, (state, action) => {
      state.streamLoading = false
      state.steamError = null;
    })
    builder.addCase(addStream.rejected, (state, action) => {
      state.streamLoading = false
      state.steamError = action.error.message
    })
  }
})

export default streamerSlice.reducer