import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubredditPosts } from '../../api/fetchSubredditPosts';


export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async ({subreddit, filter}, { rejectWithValue }) => {
    try {
      const posts = await fetchSubredditPosts(subreddit, filter);
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
        filter: "hot",
        selectedPosts: [],
    },
    reducers: {
      setFilter(state, action) {
      state.filter = action.payload;
      },
      toggleSelectedPost(state, action) {
        const id = action.payload;
        if (state.selectedPosts.includes(id)) {
          state.selectedPosts = state.selectedPosts.filter(x => x !== id);
        } else {
          state.selectedPosts.push(id);
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadPosts.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(loadPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const { subreddit, filter } = action.meta.arg;
            const key = `${subreddit}:${filter}`;
            state.itemsBySubreddit[key] = action.payload;
        })
        .addCase(loadPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export const { setFilter, toggleSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;