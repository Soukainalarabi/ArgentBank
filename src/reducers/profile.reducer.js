import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  firstName: '',
  lastName: '',
  error: null,
  editing: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetchDataSuccess: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.error = null;
    },
    fetchDataError: (state, action) => {
      state.error = action.payload;
    },
    editing: (state, action) => {
      state.editing = action.payload;
    },
  },
});

export const { fetchDataSuccess, fetchDataError, editing } = profileSlice.actions;

export const profile = (token) => {
  return (dispatch) => {
    axios
      .post('http://localhost:3001/api/v1/user/profile', {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(fetchDataSuccess(response.data.body));
      })
      .catch((error) => {
        dispatch(fetchDataError(error.response.data));
      });
  };
};

export const putProfile = (updatedData, token) => {
  return (dispatch) => {
    axios
      .put('http://localhost:3001/api/v1/user/profile', updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(fetchDataSuccess(response.data.body));
      })
      .catch((error) => {
        dispatch(fetchDataError(error.response));
      });
  };
};

export default profileSlice.reducer;
