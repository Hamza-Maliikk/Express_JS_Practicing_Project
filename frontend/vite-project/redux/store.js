import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/loginSlice/check";

export const store = configureStore({
  reducer: {
    auth: auth,
  },
});