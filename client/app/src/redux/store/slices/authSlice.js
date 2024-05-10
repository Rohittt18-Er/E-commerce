import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  isAdmin: localStorage.getItem("isAdmin") === "true" ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("action.payload", action.payload);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.isAdmin;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAdmin", action.payload.isAdmin);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false; // Reset isAdmin state on logout
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin"); // Remove isAdmin from local storage on logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.isAdmin;

export default authSlice.reducer;
export const authReducer = authSlice.reducer;
