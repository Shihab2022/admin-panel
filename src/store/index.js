import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user";
// import storeReducer from "./stores";
// import { taskMiddleware } from "react-palm/tasks";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // stores: storeReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(),
  // middleware: [taskMiddleware],
});
