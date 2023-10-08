import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "../reducers/login.reducer"
import signupReducer from "../reducers/signup.reducer"
import profileReducer from "../reducers/profile.reducer"
import logout from "../reducers/logout.reducer"

export const store=configureStore({
  reducer:{
    login:loginReducer,
    signup:signupReducer,
    profile:profileReducer,
    logout:logout
  }
})