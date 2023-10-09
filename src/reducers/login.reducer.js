import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('token') || null,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    fetchDataSuccess: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },
    fetchDataError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { fetchDataSuccess, fetchDataError } = loginSlice.actions;

export const postLogin = (connectedUser) => {
  return (dispatch) => axios
    .post('http://localhost:3001/api/v1/user/login', connectedUser)
    .then((res) => {
      const { token } = res.data.body;
      if (token) {
        localStorage.setItem('token', token);
        dispatch(fetchDataSuccess(token));
        return Promise.resolve(res);
      }
    })
    .catch((error) => {
      dispatch(fetchDataError(error.response.data.message));
      return Promise.reject(error.response.data.message);
    });
};

export default loginSlice.reducer;
