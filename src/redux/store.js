import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appslice';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
