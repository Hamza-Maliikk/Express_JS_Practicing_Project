import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
    initialState: {
    token: typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // ✅ save bhi ho jayega
    },
  },
});

export const { setToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token; 
export default authSlice.reducer;