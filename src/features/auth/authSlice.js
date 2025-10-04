import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // will store logged-in user data
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.isAuthenticated = false;
      window.location.href = "/login";
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
