import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
  },

  reducers: {
    apiRequested: (state, action) => {
      state.loading = true;
    },

    apiReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },

    apiRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const uiAction = slice.actions;

export default slice.reducer;
