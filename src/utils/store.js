import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../reducers/login.reducer';
import profileReducer from '../reducers/profile.reducer';
import logoutReducer from '../reducers/logout.reducer';
import signupReducer from '../reducers/signup.reducer';

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    profile: profileReducer,
    logout: logoutReducer,
  },
});
export default store;
