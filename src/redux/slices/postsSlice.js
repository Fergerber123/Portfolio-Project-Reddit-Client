import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRedditData } from "../../api/reddit";

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (subreddit, { rejectWithValue }) => {
    try {
      const posts = await fetchRedditData(subreddit, true);
      return posts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loadPosts.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(loadPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(loadPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export default postsSlice.reducer;