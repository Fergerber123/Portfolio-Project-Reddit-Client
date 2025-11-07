import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  selectedSubreddit: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
    },
  },
});

export const { setSearchTerm, setSelectedSubreddit } = appSlice.actions;
export default appSlice.reducer;
