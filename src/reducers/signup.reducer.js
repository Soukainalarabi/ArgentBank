import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  formInfo: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  isFormIncomplete: false,
  error: null,
};
export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    fetchDataSuccess: (state, action) => {
      state.formInfo.firstName = action.payload.firstName;
      state.formInfo.lastName = action.payload.lastName;
      state.formInfo.email = action.payload.email;
      state.formInfo.password = action.payload.password;
    },
    isFormIncomplete: (state, action) => {
      state.isFormIncomplete = action.payload;
    },
    fetchDataError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { fetchDataSuccess, fetchDataError, isFormIncomplete } = signupSlice.actions;
export const postSignup = (formInfo) => {
  return (dispatch) => axios
    .post('http://localhost:3001/api/v1/user/signup', formInfo)
    .then((res) => {
      dispatch(fetchDataSuccess(res.data));
      return Promise.resolve(res.data);
    })
    .catch((error) => {
      dispatch(fetchDataError(error.response.data.message));
      return Promise.reject(error.response.data.message);
    });
};
export default signupSlice.reducer;
