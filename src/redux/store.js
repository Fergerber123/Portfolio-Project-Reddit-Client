import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appslice';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    posts: postsReducer,
  },
});
