import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { 
  token: localStorage.getItem("token") || null,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    fetchDataSuccess: (state, action) => {
      state.token = action.payload;
      state.error = null; // Réinitialisez l'erreur en cas de succès
    },
    fetchDataError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { fetchDataSuccess, fetchDataError } = loginSlice.actions;

export const postLogin = (connectedUser) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/api/v1/user/login", connectedUser)
      .then((res) => {
        const token = res.data.body.token;
        if (token) {
          localStorage.setItem("token", token);
          dispatch(fetchDataSuccess(token));
        }
      })
      .catch((error) => {
        dispatch(fetchDataError(error.response.data)); // Utilisez error.response.data pour obtenir les erreurs de réponse HTTP
      });
  };
};

export default loginSlice.reducer;
