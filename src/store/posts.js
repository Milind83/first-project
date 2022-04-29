import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    loading: false,
    msalInstance: null,
  },

  reducers: {
    postsRequested: (posts, action) => {
      posts.loading = true;
    },

    postsReceived: (posts, action) => {
      posts.list = action.payload;
      posts.loading = false;
    },

    postsRequestFailed: (posts, action) => {
      posts.loading = false;
    },

    logout(state, action) {
      state.isAuth = action.payload.isAuth;
    },
    onMsalInstanceChange(state, action) {
      state.msalInstance = action.payload.msalInstance;
    },
  },
});

export const uiAction = slice.actions;

export default slice.reducer;

const { postsRequested, postsReceived, postsRequestFailed } = slice.actions;

const url = "/posts";

export const loadposts = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url,
      onStart: postsRequested.type,
      onSuccess: postsReceived.type,
      onError: postsRequestFailed.type,
    })
  );
};
