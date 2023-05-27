import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    setRole(state, action) {
      state.role = action.payload; // Mengubah nilai role saat diset
    },
  },
});

export const { login, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
