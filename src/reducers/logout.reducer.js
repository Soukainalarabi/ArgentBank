import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token'),
  error: null,

};
const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    logoutDone: (state) => {
      state.token = null; // mise à jour du state avec null
      localStorage.removeItem('token');
      return localStorage.removeItem('token');
    },
    logoutError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { logoutDone, logoutError } = logoutSlice.actions;
export default logoutSlice.reducer;
