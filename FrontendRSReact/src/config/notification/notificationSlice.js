import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  notifications: []
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotifications(state, action) {
      state.notifications = action.payload;
    }
  }
});

export const { updateNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
