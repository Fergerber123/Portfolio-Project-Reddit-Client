import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubredditPosts } from '../../api/fetchSubredditPosts';


export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (subreddit, { rejectWithValue }) => {
    try {
      const posts = await fetchSubredditPosts(subreddit);
      return posts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        itemsBySubreddit: {},
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
            const subreddit = action.meta.arg;
            state.itemsBySubreddit[subreddit] = action.payload;
        })
        .addCase(loadPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export default postsSlice.reducer;