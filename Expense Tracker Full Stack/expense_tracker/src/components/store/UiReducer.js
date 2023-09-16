import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isPremium: false,
  showLeaderBoard: false,
  showDownloads: false,
  pagination: {},
};
const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setIsPremium(state, action) {
      state.isPremium = action.payload;
    },
    toggleLeaderBoard(state) {
      state.showLeaderBoard = !state.showLeaderBoard;
      if (state.showLeaderBoard) state.showDownloads = false;
    },
    toggleDownloads(state) {
      state.showDownloads = !state.showDownloads;
      if (state.showDownloads) state.showLeaderBoard = false;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
  },
});

export const UIActions = UISlice.actions;
export default UISlice.reducer;
