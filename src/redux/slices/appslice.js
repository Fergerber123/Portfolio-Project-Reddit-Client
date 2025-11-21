import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedSubreddit: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
    },
  },
});

export const { setSelectedSubreddit } = appSlice.actions;
export default appSlice.reducer;
