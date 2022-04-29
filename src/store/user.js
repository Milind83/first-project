import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
  },

  reducers: {
    apiRequested: (posts, action) => {
      posts.loading = true;
    },

    apiReceived: (posts, action) => {
      posts.list = action.payload;
      posts.loading = false;
    },

    apiRequestFailed: (posts, action) => {
      posts.loading = false;
    },
  },
});

export const uiAction = slice.actions;

export default slice.reducer;

const { apiRequested, apiReceived, apiRequestFailed } = slice.actions;

const url = "/clients/login";

export const login = () => async (dispatch) => {
  return await dispatch(
    apiCallBegan({
      url,
      method: "POST",
      data: {
        email: "client@mail.com",
        password: "client@123",
      },
      onStart: apiRequested.type,
      onSuccess: apiReceived.type,
      onError: apiRequestFailed.type,
    })
  );
};
