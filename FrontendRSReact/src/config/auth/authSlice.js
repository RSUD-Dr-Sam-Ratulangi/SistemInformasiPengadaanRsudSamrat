import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  user: JSON.parse(localStorage.getItem('user')),
  role: localStorage.getItem('role')
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.role = action.payload.role;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save the username in localStorage
      localStorage.setItem('role', action.payload.role);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.role = null;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    },
    setRole(state, action) {
      state.role = action.payload; // Mengubah nilai role saat diset
    },
  },
});

export const { login, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
