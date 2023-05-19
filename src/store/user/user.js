import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
  token: null,
};

export const commonSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      state.info = action.user;
    },
    SET_TOKEN: (state, action) => {
      state.token = action.token;
    },
  },
});

export const { SET_TOKEN, SET_USER } = commonSlice.actions;

export default commonSlice.reducer;
